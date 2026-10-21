import { Suspense, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';

import ErrorBoundary from './ErrorBoundary.jsx';

const TAB_TO_ANIMATION = {
  knowledge: 'flex',
  projects: 'pointing',
  traits: 'floating',
  info: 'idle',
};

// const TAB_TO_ANIMATION = {
//   knowledge: 'floating',
//   projects: 'pointing',
//   traits: 'flex',
//   info: 'idle',
// };


const FADE = 0.5;

useGLTF.preload('/avatar.glb');

function AvatarModel({ activeTab }) {
  const { scene, animations } = useGLTF('/avatar.glb');
  const { actions } = useAnimations(animations, scene);
  const currentAnim = useRef('idle');

  useEffect(() => {
    if (!actions) return;

    const names = Object.keys(actions);
    if (!names.length) return;

    const requested = TAB_TO_ANIMATION[activeTab] ?? 'idle';
    const next = actions[requested] ? requested : names[0];
    const prev = currentAnim.current;

    if (prev === next) {
      actions[next].reset().fadeIn(FADE).play();
      return;
    }

    actions[prev]?.fadeOut(FADE);
    actions[next].reset().fadeIn(FADE).play();
    currentAnim.current = next;
  }, [activeTab, actions]);

  return <primitive object={scene} rotation={[0, Math.PI, 0]} position={[0, 0, 0]} />;
}

export default function Character({ activeTab }) {
  const haloRef = useRef(null);

  useFrame((state) => {
    if (haloRef.current) {
      haloRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[1.7, 64]} />
        <meshBasicMaterial color="#2fe6b8" transparent opacity={0.1} depthWrite={false} />
      </mesh>

      <mesh ref={haloRef} rotation={[Math.PI / 2.1, 0, 0]} position={[0, 0.06, 0]}>
        <torusGeometry args={[1.4, 0.015, 16, 96]} />
        <meshBasicMaterial color="#e9d6a6" transparent opacity={0.6} />
      </mesh>

      <ErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <AvatarModel activeTab={activeTab} />
        </Suspense>
      </ErrorBoundary>
    </group>
  );
}
