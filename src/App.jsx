import { useState } from 'react';

import Scene3D from './three/Scene3D.jsx';
import UIOverlay from './ui/UIOverlay.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('knowledge');
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoverCategory, setHoverCategory] = useState(null);

  const handleSelectCategory = (categoryId) => {
    setActiveCategory((current) => (current === categoryId ? null : categoryId));
  };

  return (
    <div className="app-root">
      <Scene3D
        activeTab={activeTab}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        onHoverCategory={setHoverCategory}
      />

      <UIOverlay
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activeCategory={activeCategory}
        hoverCategory={hoverCategory}
        onSelectCategory={handleSelectCategory}
        onHoverCategory={setHoverCategory}
      />
    </div>
  );
}
