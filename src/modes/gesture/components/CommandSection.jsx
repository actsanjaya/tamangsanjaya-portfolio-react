import { CareerTimeline } from './CareerTimeline.jsx'
import { ContactTerminal } from './ContactTerminal.jsx'
import { ProjectCard } from './ProjectCard.jsx'
import { ResumeViewer } from './ResumeViewer.jsx'
import { SkillsConstellation } from './SkillsConstellation.jsx'

function KnowledgePanel({ items }) {
  return (
    <div className="knowledgeGrid">
      {items.map((item) => (
        <article className="knowledgeCard" key={item.title}>
          <span>{item.code}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  )
}

export function CommandSection({
  activeSection,
  contactItems,
  focusedContactIndex,
  focusedProjectIndex,
  onOpenProject,
  onSelectContact,
  projects,
  resumeContent,
  selectedSkillId,
  setFocusedContactIndex,
  setFocusedProjectIndex,
  setSelectedSkillId,
  setTimelineIndex,
  skillNodes,
  timelineIndex,
  timelineItems,
}) {
  if (activeSection.id === 'projects') {
    return (
      <div className="gestureProjectGrid">
        {projects.map((project, index) => (
          <ProjectCard
            index={index}
            isFocused={focusedProjectIndex === index}
            key={project.id}
            onFocus={() => setFocusedProjectIndex(index)}
            onOpen={() => onOpenProject(project)}
            project={project}
          />
        ))}
      </div>
    )
  }

  if (activeSection.id === 'skills') {
    return (
      <SkillsConstellation
        selectedSkillId={selectedSkillId}
        setSelectedSkillId={setSelectedSkillId}
        skills={skillNodes}
      />
    )
  }

  if (activeSection.id === 'timeline') {
    return (
      <CareerTimeline
        activeIndex={timelineIndex}
        items={timelineItems}
        setActiveIndex={setTimelineIndex}
      />
    )
  }

  if (activeSection.id === 'resume') {
    return <ResumeViewer resumeContent={resumeContent} />
  }

  if (activeSection.id === 'contact') {
    return (
      <ContactTerminal
        contactItems={contactItems}
        focusedContactIndex={focusedContactIndex}
        onSelectContact={onSelectContact}
        setFocusedContactIndex={setFocusedContactIndex}
      />
    )
  }

  if (activeSection.id === 'valuation') {
    return (
      <KnowledgePanel
        title="RBC / Valuation Knowledge Zone"
        items={[
          {
            code: 'RBC',
            title: 'Capital analytics',
            text: 'Scenario-ready capital and solvency views for technical review.',
          },
          {
            code: 'VAL',
            title: 'Valuation controls',
            text: 'Traceable assumptions, calculations, and review-friendly outputs.',
          },
          {
            code: 'RES',
            title: 'Reserving support',
            text: 'Structured data preparation for actuarial reporting cycles.',
          },
        ]}
      />
    )
  }

  if (activeSection.id === 'dashboards') {
    return (
      <KnowledgePanel
        title="Power BI Dashboard Gallery"
        items={[
          {
            code: 'KPI',
            title: 'Management KPIs',
            text: 'Clean performance tracking for recurring reporting.',
          },
          {
            code: 'DAX',
            title: 'Measures and models',
            text: 'DAX measures and semantic models for consistent insights.',
          },
          {
            code: 'SQL',
            title: 'Reporting datasets',
            text: 'SQL-backed tables designed for dashboard reliability.',
          },
        ]}
      />
    )
  }

  if (activeSection.id === 'ai') {
    return (
      <KnowledgePanel
        title="RAG / AI Experiments"
        items={[
          {
            code: 'RAG',
            title: 'Policy assistant',
            text: 'Search and summarize policy documents with grounded retrieval.',
          },
          {
            code: 'DOC',
            title: 'Document intelligence',
            text: 'Parse technical references and surface relevant context faster.',
          },
          {
            code: 'AI',
            title: 'Workflow support',
            text: 'Use AI carefully as a technical assistant, not a black box.',
          },
        ]}
      />
    )
  }

  return (
    <div className="commandOverviewGrid">
      {activeSection.metrics.map((metric) => (
        <article className="commandMetricCard" key={metric}>
          <span>Signal</span>
          <strong>{metric}</strong>
          <p>{activeSection.summary}</p>
        </article>
      ))}
    </div>
  )
}
