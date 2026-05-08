export function ResumeViewer({ resumeContent }) {
  return (
    <div className="resumeViewer">
      <section>
        <h3>Summary</h3>
        <p>{resumeContent.summary}</p>
      </section>
      <section>
        <h3>Experience</h3>
        <ul>
          {resumeContent.experience.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Skills</h3>
        <div className="gestureToolList">
          {resumeContent.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>
      <section>
        <h3>Projects</h3>
        <ul>
          {resumeContent.projects.map((project) => (
            <li key={project}>{project}</li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Education / Certifications</h3>
        <p>{resumeContent.education}</p>
      </section>
      <button disabled type="button">
        Download Resume Coming Soon
      </button>
    </div>
  )
}
