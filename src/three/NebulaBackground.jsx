import { Suspense, useLayoutEffect } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

import ErrorBoundary from './ErrorBoundary.jsx';

function Skybox() {
  const texture = useTexture('/space-panorama.jpg');

  useLayoutEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
  }, [texture]);

  return (
    <mesh>
      <sphereGeometry args={[100, 32, 32]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

function SkyboxFallback() {
  return (
    <mesh>
      <sphereGeometry args={[100, 24, 24]} />
      <meshBasicMaterial color="#04181c" side={THREE.BackSide} depthWrite={false} />
    </mesh>
  );
}

export default function NebulaBackground() {
  return (
    <ErrorBoundary fallback={<SkyboxFallback />}>
      <Suspense fallback={<SkyboxFallback />}>
        <Skybox />
      </Suspense>
    </ErrorBoundary>
  );
}
