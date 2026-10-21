import { INFO } from '../../data/portfolio.js';

export default function InfoPanel() {
  return (
    <div className="info">
      <div className="info-identity panel-item">
        <div className="info-avatar" aria-hidden="true">
          <span>{INFO.name.charAt(0)}</span>
        </div>
        <div>
          <h3 className="info-name">{INFO.name}</h3>
          <p className="info-role">{INFO.role}</p>
          <span className="info-element">{INFO.element} · {INFO.region}</span>
        </div>
      </div>

      <p className="panel-item panel-lead">{INFO.vision}</p>

      <ul className="info-stats panel-item">
        {INFO.stats.map((stat) => (
          <li key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </li>
        ))}
      </ul>

      <ul className="info-contact panel-item">
        {INFO.contact.map((item) => (
          <li key={item.label}>
            <span className="info-contact-label">{item.label}</span>
            <span className="info-contact-value">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
