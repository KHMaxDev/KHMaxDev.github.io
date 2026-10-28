import { useLanguage } from '../../i18n/LanguageProvider.jsx';

export default function InfoPanel() {
  const { t } = useLanguage();
  const info = t.info;

  return (
    <div className="info">
      <div className="info-identity panel-item">
        <div className="info-avatar" aria-hidden="true">
          <span>{info.name.charAt(0)}</span>
        </div>
        <div>
          <h3 className="info-name">{info.name}</h3>
          <p className="info-role">{info.role}</p>
          <span className="info-element">{info.element} · {info.region}</span>
        </div>
      </div>

      <p className="panel-item panel-lead">{info.vision}</p>

      <ul className="info-stats panel-item">
        {info.stats.map((stat) => (
          <li key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </li>
        ))}
      </ul>

      <ul className="info-contact panel-item">
        {info.contact.map((item) => (
          <li key={item.label}>
            <span className="info-contact-label">{item.label}</span>
            <span className="info-contact-value">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
