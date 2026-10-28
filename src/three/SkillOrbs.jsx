import { Suspense, useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Billboard, Line, useTexture } from '@react-three/drei';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';

import { CATEGORIES, TECH_CATEGORY } from '../data/categories.js';
import { SKILLS } from '../data/portfolio.js';
import { MOBILE_BREAKPOINT } from '../hooks/useIsMobile.js';
import ErrorBoundary from './ErrorBoundary.jsx';

const ORIGIN = [0, 1, 0];
const MOBILE_ORIGIN = [0, 0, 0];
const SPIN_SPEED = 0.1;
const MOBILE_SPIN_SPEED = 0.07;
const BASE_ROTATION = [0.16, 0, -0.07];

function TechLine({ origin, target, color }) {
  const lineRef = useRef(null);
  const points = useMemo(() => [origin, target], [origin, target]);
  const length = useMemo(
    () => new THREE.Vector3(...origin).distanceTo(new THREE.Vector3(...target)),
    [origin, target]
  );

  useGSAP(
    () => {
      const material = lineRef.current?.material;
      if (!material) return;

      material.dashSize = length;
      material.gapSize = length;
      material.dashOffset = -length;
      material.needsUpdate = true;

      gsap.to(material, {
        dashOffset: 0,
        duration: 1,
        ease: 'power2.inOut',
      });
    },
    { dependencies: [length] }
  );

  return (
    <Line
      ref={lineRef}
      points={points}
      color={color}
      lineWidth={2}
      dashed
      dashSize={length}
      gapSize={length}
      dashOffset={-length}
      transparent
      opacity={0.9}
    />
  );
}

function SkillIcon({ icon, isActive, isDimmed, onSelect, onHover }) {
  const texture = useTexture(icon.logo);

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  return (
    <Billboard position={icon.position} scale={isActive ? icon.scale * 1.14 : icon.scale}>
      <mesh
        onClick={(event) => {
          event.stopPropagation();
          if (icon.categoryId) onSelect(icon.categoryId);
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          if (icon.categoryId) onHover(icon.categoryId);
        }}
        onPointerOut={(event) => {
          event.stopPropagation();
          onHover(null);
        }}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={isDimmed ? 0.2 : 1}
          color={isDimmed ? '#6b7a78' : '#ffffff'}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </Billboard>
  );
}

export default function SkillOrbs({
  activeTab,
  activeCategory,
  onSelectCategory,
  onHoverCategory,
}) {
  const scaleRef = useRef(null);
  const spinRef = useRef(null);
  const viewportWidth = useThree((state) => state.size.width);
  const isMobile = viewportWidth <= MOBILE_BREAKPOINT;

  const icons = useMemo(() => {
    if (isMobile) {
      return SKILLS.map((tech, index) => {
        const angle = (index / SKILLS.length) * Math.PI * 2;

        return {
          ...tech,
          categoryId: TECH_CATEGORY[tech.name] ?? null,
          position: [Math.cos(angle) * 1.32, Math.sin(angle) * 1.08, 0.3],
          scale: 0.24,
        };
      });
    }

    const counts = [12, 12];

    return SKILLS.map((tech, index) => {
      const ring = index % 2;
      const indexInRing = Math.floor(index / 2);
      const count = counts[ring];
      const angle = (indexInRing / count) * Math.PI * 2 + (ring === 0 ? 0 : Math.PI / 12);
      const radius = ring === 0 ? 2.4 : 3;
      const y = 1.15 + Math.sin((indexInRing / count) * Math.PI * 4 + ring * 1.3) * (ring === 0 ? 0.4 : 0.55);

      return {
        ...tech,
        categoryId: TECH_CATEGORY[tech.name] ?? null,
        position: [Math.cos(angle) * radius, y, Math.sin(angle) * radius],
        scale: ring === 0 ? 0.38 : 0.33,
      };
    });
  }, [isMobile]);

  const isVisible = activeTab === 'knowledge';
  const activeColor = useMemo(
    () => CATEGORIES.find((category) => category.id === activeCategory)?.color ?? '#f7f1e4',
    [activeCategory]
  );
  const activeIcons = useMemo(
    () => (activeCategory ? icons.filter((icon) => icon.categoryId === activeCategory) : []),
    [icons, activeCategory]
  );

  useFrame((state, delta) => {
    if (!spinRef.current) return;

    if (isMobile) {
      spinRef.current.rotation.z += delta * MOBILE_SPIN_SPEED;
    } else {
      spinRef.current.rotation.y += delta * SPIN_SPEED;
    }

    spinRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.04;
  });

  useGSAP(
    () => {
      if (!scaleRef.current) return;

      gsap.to(scaleRef.current.scale, {
        x: isVisible ? 1 : 0.001,
        y: isVisible ? 1 : 0.001,
        z: isVisible ? 1 : 0.001,
        duration: isVisible ? 0.9 : 0.6,
        ease: isVisible ? 'back.out(1.7)' : 'power3.in',
        overwrite: 'auto',
      });
    },
    { dependencies: [isVisible] }
  );

  return (
    <group ref={scaleRef}>
      <group position={isMobile ? [0, 1.15, 0] : [0, 0, 0]}>
        <group ref={spinRef} rotation={isMobile ? [0, 0, 0] : BASE_ROTATION}>
          <ErrorBoundary fallback={null}>
            <Suspense fallback={null}>
              {icons.map((icon) => (
                <SkillIcon
                  key={icon.name}
                  icon={icon}
                  isActive={activeCategory === icon.categoryId}
                  isDimmed={activeCategory !== null && activeCategory !== icon.categoryId}
                  onSelect={onSelectCategory}
                  onHover={onHoverCategory}
                />
              ))}

              {activeIcons.map((icon) => (
                <TechLine
                  key={`${activeCategory}-${icon.name}`}
                  origin={isMobile ? MOBILE_ORIGIN : ORIGIN}
                  target={icon.position}
                  color={activeColor}
                />
              ))}
            </Suspense>
          </ErrorBoundary>
        </group>
      </group>
    </group>
  );
}
