import { useLanguage } from '../../i18n/LanguageProvider.jsx';

export default function TraitsPanel() {
  const { t } = useLanguage();

  return (
    <div className="traits">
      <p className="panel-item panel-lead">{t.ui.traitsLead}</p>

      <ul className="trait-list">
        {t.traits.map((trait) => (
          <li className="trait panel-item" key={trait.name}>
            <div className="trait-head">
              <h3>{trait.name}</h3>
              <span className="trait-level">
                {t.ui.level} {trait.level}
              </span>
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
