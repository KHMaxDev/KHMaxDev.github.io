import { useMemo } from 'react';

import { SKILLS } from '../../data/portfolio.js';

export default function KnowledgePanel() {
  const groups = useMemo(() => {
    return SKILLS.reduce((acc, skill) => {
      const bucket = acc[skill.category] ?? (acc[skill.category] = []);
      bucket.push(skill);
      return acc;
    }, {});
  }, []);

  return (
    <div className="knowledge">
      <p className="panel-item panel-lead">
        Mi caja de artefactos: herramientas que invoco a diario para construir, medir y desplegar.
      </p>

      {Object.entries(groups).map(([category, items]) => (
        <div className="chip-group panel-item" key={category}>
          <h3 className="chip-group-title">{category}</h3>
          <ul className="chip-list">
            {items.map((skill) => (
              <li className="chip" key={skill.name} style={{ '--chip': skill.color }}>
                <span className="chip-dot" aria-hidden="true" />
                {skill.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
