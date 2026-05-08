export function ProjectModal({ onClose, project }) {
  if (!project) {
    return null
  }

  return (
    <div className="projectModalOverlay">
      <section
        aria-labelledby="project-modal-title"
        aria-modal="true"
        className="projectModal"
        role="dialog"
      >
        <div className="projectModalHeader">
          <span>Project Detail</span>
          <h2 id="project-modal-title">{project.title}</h2>
          <button
            aria-label="Close project detail"
            data-gesture-target="modal-close"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>

        <div className="projectModalGrid">
          <div>
            <h3>Problem</h3>
            <p>{project.problem}</p>
          </div>
          <div>
            <h3>Solution</h3>
            <p>{project.solution}</p>
          </div>
          <div>
            <h3>Tools Used</h3>
            <div className="gestureToolList">
              {project.tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </div>
          <div>
            <h3>Impact</h3>
            <p>{project.impact}</p>
          </div>
        </div>

        <button
          className="modalCloseButton"
          data-gesture-target="modal-close"
          onClick={onClose}
          type="button"
        >
          Close
        </button>
      </section>
    </div>
  )
}
