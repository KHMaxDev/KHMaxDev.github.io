import { TRAITS } from '../../data/portfolio.js';

export default function TraitsPanel() {
  return (
    <div className="traits">
      <p className="panel-item panel-lead">
        Talentos pasivos que sostienen cada proyecto, más allá del código.
      </p>

      <ul className="trait-list">
        {TRAITS.map((trait) => (
          <li className="trait panel-item" key={trait.name}>
            <div className="trait-head">
              <h3>{trait.name}</h3>
              <span className="trait-level">Nv. {trait.level}</span>
            </div>

            <div className="trait-meter" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  className={`trait-pip${index < trait.level ? ' is-on' : ''}`}
                />
              ))}
            </div>

            <p className="trait-note">{trait.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
