import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

import Sidebar from './Sidebar.jsx';
import Panel from './Panel.jsx';
import WheelUI from './WheelUI.jsx';
import LanguageToggle from './LanguageToggle.jsx';

export default function UIOverlay({
  activeTab,
  onTabChange,
  activeCategory,
  hoverCategory,
  onSelectCategory,
  onHoverCategory,
}) {
  const panelRef = useRef(null);
  const isKnowledge = activeTab === 'knowledge';

  useGSAP(
    () => {
      if (!panelRef.current) return;

      const q = gsap.utils.selector(panelRef);

      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, x: 56, filter: 'blur(8px)' },
        {
          autoAlpha: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 0.7,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        q('.panel-item'),
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
          delay: 0.1,
        }
      );
    },
    { dependencies: [activeTab], revertOnUpdate: true }
  );

  return (
    <div className="ui-layer">
      <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
      <LanguageToggle />

      {isKnowledge ? (
        <WheelUI
          activeCategory={activeCategory}
          hoverCategory={hoverCategory}
          onSelect={onSelectCategory}
          onHover={onHoverCategory}
        />
      ) : (
        <div className="panel-column">
          <div className="panel-anchor" ref={panelRef}>
            <Panel activeTab={activeTab} />
          </div>
        </div>
      )}
    </div>
  );
}
