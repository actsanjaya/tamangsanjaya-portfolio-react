export function ProjectCard({ index, isFocused, onFocus, onOpen, project }) {
  return (
    <article
      className={`gestureProjectCard ${isFocused ? 'isFocused' : ''}`}
      data-gesture-project-index={index}
      data-gesture-target="project"
      onFocus={onFocus}
      tabIndex={0}
    >
      <div className="projectCardHeader">
        <span>Project</span>
        <strong>{project.title}</strong>
      </div>
      <p>
        <b>Problem:</b> {project.problem}
      </p>
      <p>
        <b>Solution:</b> {project.solution}
      </p>
      <div className="gestureToolList">
        {project.tools.map((tool) => (
          <span key={tool}>{tool}</span>
        ))}
      </div>
      <p>
        <b>Impact:</b> {project.impact}
      </p>
      <div className="projectCardActions">
        <button
          data-gesture-project-index={index}
          data-gesture-target="project"
          onClick={onOpen}
          type="button"
        >
          View Details
        </button>
        <button disabled type="button">
          GitHub
        </button>
        <button disabled type="button">
          Demo
        </button>
        <button disabled type="button">
          Screenshot
        </button>
      </div>
    </article>
  )
}
