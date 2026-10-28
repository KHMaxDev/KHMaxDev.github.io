import { useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

import { MOBILE_BREAKPOINT } from '../hooks/useIsMobile.js';

export const CAMERA_PRESETS = {
  knowledge: { position: [0, 1.5, 5.4], target: [0, 1.05, 0] },
  projects: { position: [3.2, 3.0, 9.4], target: [0, 1.15, -1.4] },
  traits: { position: [-3.2, 2.1, 8.3], target: [0, 1.0, 0] },
  info: { position: [0, 2.5, 10.6], target: [0, 1.05, 0] },
};

export const MOBILE_CAMERA_PRESETS = {
  knowledge: { position: [0, 1.85, 8.6], target: [0, 1.15, 0] },
  projects: { position: [0, 2.15, 9.8], target: [0, 1.3, 0] },
  traits: { position: [0, 2.0, 9.2], target: [0, 1.2, 0] },
  info: { position: [0, 2.2, 10.2], target: [0, 1.25, 0] },
};

export default function CameraController({ activeTab }) {
  const camera = useThree((state) => state.camera);
  const controls = useThree((state) => state.controls);
  const viewportWidth = useThree((state) => state.size.width);
  const isMobile = viewportWidth <= MOBILE_BREAKPOINT;
  const firstRun = useRef(true);

  useGSAP(
    () => {
      if (!controls) return;

      const presets = isMobile ? MOBILE_CAMERA_PRESETS : CAMERA_PRESETS;
      const preset = presets[activeTab] ?? presets.knowledge;
      const duration = firstRun.current ? 0 : 1.6;
      firstRun.current = false;

      gsap.to(camera.position, {
        x: preset.position[0],
        y: preset.position[1],
        z: preset.position[2],
        duration,
        ease: 'power3.inOut',
        overwrite: 'auto',
      });

      gsap.to(controls.target, {
        x: preset.target[0],
        y: preset.target[1],
        z: preset.target[2],
        duration,
        ease: 'power3.inOut',
        overwrite: 'auto',
      });
    },
    { dependencies: [activeTab, controls, isMobile] }
  );

  return null;
}
