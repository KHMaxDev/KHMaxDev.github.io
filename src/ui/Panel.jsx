import { TABS } from '../data/tabs.js';
import KnowledgePanel from './panels/KnowledgePanel.jsx';
import ProjectsPanel from './panels/ProjectsPanel.jsx';
import TraitsPanel from './panels/TraitsPanel.jsx';
import InfoPanel from './panels/InfoPanel.jsx';

const PANELS = {
  knowledge: KnowledgePanel,
  projects: ProjectsPanel,
  traits: TraitsPanel,
  info: InfoPanel,
};

export default function Panel({ activeTab }) {
  const tab = TABS.find((item) => item.id === activeTab) ?? TABS[0];
  const Content = PANELS[activeTab] ?? KnowledgePanel;

  return (
    <section className="panel" aria-live="polite">
      <header className="panel-header">
        <span className="panel-kicker">{tab.hint}</span>
        <h2 className="panel-title">{tab.label}</h2>
        <span className="panel-rule" aria-hidden="true" />
      </header>

      <div className="panel-body">
        <Content />
      </div>
    </section>
  );
}
