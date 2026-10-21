import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

import { TABS } from '../data/tabs.js';
import TabIcon from './TabIcon.jsx';

export default function Sidebar({ activeTab, onTabChange }) {
  const listRef = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(listRef);

      gsap.fromTo(
        q('.nav-item'),
        { autoAlpha: 0, x: -40 },
        { autoAlpha: 1, x: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.15 }
      );
    },
    { scope: listRef }
  );

  return (
    <nav className="sidebar" ref={listRef} aria-label="Secciones del portafolio">
      <div className="sidebar-brand">
        <span className="brand-mark" aria-hidden="true" />
        <div className="brand-text">
          <strong>BIENVENIDO</strong>
          <small>Portafolio interactivo</small>
        </div>
      </div>

      <ul className="nav-list">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <li key={tab.id}>
              <button
                type="button"
                className={`nav-item${isActive ? ' is-active' : ''}`}
                onClick={() => onTabChange(tab.id)}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="nav-icon" aria-hidden="true">
                  <TabIcon id={tab.id} />
                </span>
                <span className="nav-text">
                  <strong>{tab.label}</strong>
                  <small>{tab.hint}</small>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="sidebar-hint">Eleva tu mirada · explora cada constelación</p>
    </nav>
  );
}
