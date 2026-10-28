import { CATEGORIES, CATEGORY_TECHS } from '../data/categories.js';
import { useLanguage } from '../i18n/LanguageProvider.jsx';

export default function MobileKnowledge({ activeCategory, onSelect }) {
  const { t } = useLanguage();
  const active = CATEGORIES.find((category) => category.id === activeCategory) ?? null;
  const activeCopy = active ? t.categories[active.id] ?? active : null;
  const techs = active ? CATEGORY_TECHS[active.id] ?? [] : [];

  return (
    <div className="mobile-knowledge">
      {active && activeCopy && (
        <aside
          key={active.id}
          className="mobile-tech"
          style={{ '--cat-color': active.color }}
          aria-live="polite"
        >
          <header className="mobile-tech-head">
            <span className="mobile-tech-kicker">{t.ui.technologies}</span>
            <h3 className="mobile-tech-title">{activeCopy.label}</h3>
          </header>

          <ul className="mobile-tech-list">
            {techs.map((tech) => (
              <li key={tech.name}>
                <span
                  className="mobile-tech-dot"
                  style={{ background: tech.color, color: tech.color }}
                  aria-hidden="true"
                />
                {tech.name}
              </li>
            ))}
          </ul>
        </aside>
      )}

      <div className="mobile-cats" role="tablist" aria-label={t.ui.categoriesAria}>
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category.id;
          const copy = t.categories[category.id] ?? category;

          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`mobile-cat${isActive ? ' is-active' : ''}`}
              style={{ '--cat-color': category.color }}
              onClick={() => onSelect(category.id)}
            >
              <span className="mobile-cat-dot" aria-hidden="true" />
              <span className="mobile-cat-label">{copy.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
