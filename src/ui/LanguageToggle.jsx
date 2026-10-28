import { useLanguage } from '../i18n/LanguageProvider.jsx';

export default function LanguageToggle() {
  const { language, toggleLanguage, t } = useLanguage();
  const isSpanish = language === 'es';

  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={toggleLanguage}
      aria-label={t.ui.languageToggle}
      title={t.ui.languageToggle}
    >
      <span className={`lang-option${isSpanish ? ' is-active' : ''}`}>ES</span>
      <span className="lang-divider" aria-hidden="true" />
      <span className={`lang-option${isSpanish ? '' : ' is-active'}`}>EN</span>
    </button>
  );
}
