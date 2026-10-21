import { PROJECTS } from '../../data/portfolio.js';

export default function ProjectsPanel() {
  return (
    <div className="constellation">
      <p className="panel-item panel-lead">
        Cada proyecto es una estrella trazada en mi constelación profesional.
      </p>

      <ol className="constellation-list">
        {PROJECTS.map((project) => (
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
                <span className="constellation-rating" aria-label={`${project.stars} de 5 estrellas`}>
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
