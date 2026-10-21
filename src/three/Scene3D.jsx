import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import SceneLights from './SceneLights.jsx';
import NebulaBackground from './NebulaBackground.jsx';
import Character from './Character.jsx';
import SkillOrbs from './SkillOrbs.jsx';
import CameraController from './CameraController.jsx';

export default function Scene3D({
  activeTab,
  activeCategory,
  onSelectCategory,
  onHoverCategory,
}) {
  return (
    <div className="scene-layer">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 1.5, 5.4], fov: 42, near: 0.1, far: 400 }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1;
        }}
      >
        <color attach="background" args={['#04181c']} />

        <SceneLights />
        <NebulaBackground />
        <Character activeTab={activeTab} />
        <SkillOrbs
          activeTab={activeTab}
          activeCategory={activeCategory}
          onSelectCategory={onSelectCategory}
          onHoverCategory={onHoverCategory}
        />
        <CameraController activeTab={activeTab} />

        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom
          minDistance={3}
          maxDistance={12}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.8}
          enableDamping
          dampingFactor={0.08}
        />
      </Canvas>
    </div>
  );
}
