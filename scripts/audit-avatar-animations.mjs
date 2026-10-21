import fs from 'node:fs';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

globalThis.ProgressEvent = class ProgressEvent {
  constructor(type, init = {}) {
    this.type = type;
    Object.assign(this, init);
  }
};

const file = new URL('../public/avatar.glb', import.meta.url);
const json = JSON.parse(fs.readFileSync(file, 'utf8'));

delete json.images;
delete json.textures;
delete json.samplers;
for (const material of json.materials ?? []) {
  delete material.pbrMetallicRoughness?.baseColorTexture;
  delete material.pbrMetallicRoughness?.metallicRoughnessTexture;
  delete material.normalTexture;
  delete material.occlusionTexture;
  delete material.emissiveTexture;
}

const expected = ['idle', 'floating', 'pointing', 'flex'];
const loader = new GLTFLoader();

loader.parse(JSON.stringify(json), '', (gltf) => {
  const failures = [];
  const names = gltf.animations.map((clip) => clip.name);
  for (const name of expected) {
    if (!names.includes(name)) failures.push(`falta el clip ${name}`);
  }

  const floating = gltf.animations.find((clip) => clip.name === 'floating');
  if (!floating) {
    failures.push('no existe floating');
  } else {
    if (floating.duration > 1 / 60) {
      failures.push(`floating dura ${floating.duration}s; debería ser una pose estática (< 1/60s)`);
    }
    const multiKey = floating.tracks.filter((track) => track.times.length > 1);
    if (multiKey.length) {
      failures.push(`floating tiene ${multiKey.length} track(s) con más de un keyframe`);
    }
  }

  const leg = gltf.scene.getObjectByName('Right_Leg');
  if (!leg) failures.push('no existe el nodo Right_Leg');

  const samples = [];
  if (leg && floating) {
    const mixer = new THREE.AnimationMixer(gltf.scene);
    const action = mixer.clipAction(floating);
    action.play();
    for (let frame = 0; frame < 60; frame += 1) {
      mixer.update(1 / 60);
      samples.push(leg.quaternion.clone());
    }
    const maxDelta = samples.reduce((max, q, index) => {
      if (index === 0) return max;
      return Math.max(max, q.angleTo(samples[index - 1]));
    }, 0);
    if (maxDelta > THREE.MathUtils.degToRad(0.01)) {
      failures.push(`Right_Leg cambia ${THREE.MathUtils.radToDeg(maxDelta).toFixed(2)}° entre frames`);
    }
  }

  const summary = gltf.animations.map((clip) => ({
    name: clip.name,
    duration: Number(clip.duration.toFixed(6)),
    tracks: clip.tracks.length,
  }));

  console.log(JSON.stringify({
    file: file.pathname,
    animations: summary,
    rightLegAngle: samples[0]
      ? Number((2 * Math.acos(Math.min(1, Math.abs(samples[0].w))) * 180 / Math.PI).toFixed(2))
      : null,
    stableFrames: samples.length,
    failures,
  }, null, 2));

  if (failures.length) process.exitCode = 1;
}, (error) => {
  console.error('No se pudo cargar el avatar:', error);
  process.exitCode = 1;
});
