import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { useGSAP } from '@gsap/react';

import { CATEGORIES, CATEGORY_TECHS } from '../data/categories.js';

gsap.registerPlugin(Draggable, InertiaPlugin);

const SIZE = 560;
const RADIUS = 250;
const CENTER = SIZE / 2;
const ITEM_WIDTH = 156;
const ITEM_OFFSET_Y = 22;
const ANGLE_OFFSET = 90;
const WHEEL_ITEMS = [...CATEGORIES, ...CATEGORIES];
const STEP = 360 / WHEEL_ITEMS.length;

function itemStyle(index, color) {
  const angle = (ANGLE_OFFSET + index * STEP) * (Math.PI / 180);

  return {
    left: CENTER + Math.cos(angle) * RADIUS - ITEM_WIDTH / 2,
    top: CENTER + Math.sin(angle) * RADIUS - ITEM_OFFSET_Y,
    '--cat-color': color,
  };
}

export default function WheelUI({ activeCategory, hoverCategory, onSelect, onHover }) {
  const stageRef = useRef(null);
  const rotatorRef = useRef(null);
  const techRef = useRef(null);
  const lastHoveredRef = useRef(null);

  useEffect(() => {
    if (hoverCategory) lastHoveredRef.current = hoverCategory;
  }, [hoverCategory]);

  useGSAP(
    () => {
      if (!rotatorRef.current) return;

      const items = gsap.utils.toArray('.wheel-item', stageRef.current);

      const keepUpright = (self) => {
        const fromDom = parseFloat(gsap.getProperty(rotatorRef.current, 'rotation'));
        const rotation = Number.isFinite(fromDom) ? fromDom : self?.x ?? 0;

        gsap.set(items, {
          rotation: -rotation,
          transformOrigin: '50% 50%',
        });
      };

      Draggable.create(rotatorRef.current, {
        type: 'rotation',
        inertia: true,
        dragClickables: true,
        onDrag: keepUpright,
        onThrowUpdate: keepUpright,
        onThrowComplete: keepUpright,
      });
    },
    { scope: stageRef }
  );

  useGSAP(
    () => {
      if (!techRef.current) return;

      gsap.to(techRef.current, {
        autoAlpha: hoverCategory ? 1 : 0,
        x: hoverCategory ? 0 : 24,
        yPercent: -50,
        duration: 0.35,
        ease: hoverCategory ? 'power2.out' : 'power2.in',
      });
    },
    { dependencies: [hoverCategory], scope: stageRef }
  );

  const displayId = hoverCategory ?? lastHoveredRef.current;
  const hovered = CATEGORIES.find((category) => category.id === displayId);
  const techs = hovered ? CATEGORY_TECHS[hovered.id] : [];

  return (
    <>
      <div className="wheel-stage" ref={stageRef}>
        <div className="wheel-ring" aria-hidden="true" />
        <div className="wheel-center" aria-hidden="true" />

        <div className="wheel-rotator" ref={rotatorRef}>
          {WHEEL_ITEMS.map((category, index) => (
            <button
              key={`${category.id}-${index}`}
              type="button"
              className={`wheel-item${activeCategory === category.id ? ' is-active' : ''}`}
              style={itemStyle(index, category.color)}
              onClick={() => onSelect(category.id)}
              onMouseEnter={() => onHover(category.id)}
              onMouseLeave={() => onHover(null)}
            >
              <span className="wheel-item-dot" aria-hidden="true" />
              <span className="wheel-item-text">
                <strong>{category.label}</strong>
                <small>{category.subtitle}</small>
              </span>
            </button>
          ))}
        </div>
      </div>

      <aside className="wheel-tech" ref={techRef} aria-live="polite">
        {hovered && (
          <>
            <span className="wheel-tech-kicker">Tecnologías</span>
            <h3 className="wheel-tech-title" style={{ color: hovered.color }}>
              {hovered.label}
            </h3>
            <ul className="wheel-tech-list">
              {techs.map((tech) => (
                <li key={tech.name}>
                  <span className="wheel-tech-dot" style={{ background: tech.color }} />
                  {tech.name}
                </li>
              ))}
            </ul>
          </>
        )}
      </aside>
    </>
  );
}
