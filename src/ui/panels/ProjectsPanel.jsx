import { useLanguage } from '../../i18n/LanguageProvider.jsx';

export default function ProjectsPanel() {
  const { t } = useLanguage();

  return (
    <div className="constellation">
      <p className="panel-item panel-lead">{t.ui.projectsLead}</p>

      <ol className="constellation-list">
        {t.projects.map((project) => (
          <li className="constellation-node panel-item" key={project.name}>
            <span className="constellation-star" aria-hidden="true">
              <span className="constellation-star-core" />
            </span>

            <div className="constellation-card">
              <div className="constellation-head">
                <h3>{project.name}</h3>
                <span className="constellation-year">{project.year}</span>
              </div>
              <p className="constellation-role">{project.role}</p>
              <p className="constellation-desc">{project.description}</p>
              <div className="constellation-foot">
                <ul className="constellation-stack">
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
                <span className="constellation-rating" aria-label={t.ui.rating(project.stars)}>
                  {'★'.repeat(project.stars)}
                  <i>{'★'.repeat(5 - project.stars)}</i>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
