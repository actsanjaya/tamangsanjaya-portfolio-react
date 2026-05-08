import profileImg from '../../assets/profile.png'
import { Button } from '../../components/ui/Button.jsx'
import { Card } from '../../components/ui/Card.jsx'
import { defaultModeData } from './defaultModeData.js'

export function DefaultMode({ siteData }) {
  const { about, focusAreas, hero, projects, skills } = defaultModeData

  return (
    <main className="site defaultMode" id="top">
      <section id="home" className="hero">
        <div className="heroContent">
          <p className="eyebrow">{hero.eyebrow}</p>

          <h1>
            {hero.titleLines[0]}
            <span>{hero.titleLines[1]}</span>
          </h1>

          <p className="heroRole">
            {hero.role} <span>•</span> {hero.roleAccent}
          </p>

          <p className="heroText">{hero.text}</p>

          <div className="heroActions">
            <Button href="#projects">💼 View Projects</Button>
            <Button href="#contact" variant="secondary">
              ✉ Get In Touch
            </Button>
          </div>

          <div className="heroBadges">
            {hero.badges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
        </div>

        <div className="heroVisual" aria-label="Professional portrait and data visuals">
          <div className="chartCard floatingCard">
            <strong>Data Into Impact</strong>
            <p>Building solutions that deliver accuracy, efficiency, and clarity.</p>
          </div>

          <div className="visualCircle"></div>
          <div className="barChart" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="donutChart" aria-hidden="true"></div>

          <img src={profileImg} alt={siteData.name} className="profileImage" />
        </div>
      </section>

      <section className="overviewGrid">
        <Card className="aboutPanel" id="about">
          <div className="sectionTitle">
            <span className="sectionIcon" aria-hidden="true">
              👤
            </span>
            <h2>About Me</h2>
          </div>

          <p>{about.text}</p>

          <div className="aboutHighlights">
            {about.highlights.map((highlight) => (
              <span key={highlight}>{highlight}</span>
            ))}
          </div>
        </Card>

        <Card id="skills">
          <div className="sectionTitle">
            <span className="sectionIcon" aria-hidden="true">
              ⌘
            </span>
            <h2>Skills</h2>
          </div>

          <div className="skillGrid">
            {skills.map((skill) => (
              <div className="skillCard" key={skill.name}>
                <span className="skillIcon">{skill.icon}</span>
                <h3>{skill.name}</h3>
                <p>{skill.detail}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section id="projects" className="sectionBlock">
        <div className="sectionHeader">
          <div className="sectionTitle">
            <span className="sectionIcon" aria-hidden="true">
              💼
            </span>
            <h2>Projects</h2>
          </div>

          <a href="#projects" className="viewLink">
            View All Projects →
          </a>
        </div>

        <div className="projectGrid">
          {projects.map((project) => (
            <article className="projectCard" key={project.title}>
              <div className="projectIcon" aria-hidden="true">
                {project.icon}
              </div>

              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="tagList">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="sectionBlock experienceBlock">
        <div className="sectionTitle">
          <span className="sectionIcon" aria-hidden="true">
            📌
          </span>
          <h2>Technical Focus</h2>
        </div>

        <div className="focusGrid">
          {focusAreas.map((focusArea) => (
            <div key={focusArea.title}>
              <strong>{focusArea.title}</strong>
              <p>{focusArea.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="contactSection">
        <div>
          <div className="sectionTitle">
            <span className="sectionIcon" aria-hidden="true">
              ✉
            </span>
            <h2>Let&apos;s Work Together</h2>
          </div>

          <p>
            I&apos;m open to opportunities in actuarial analytics, automation,
            reporting, and technical actuarial work. Let&apos;s connect and
            build something impactful.
          </p>

          <div className="contactDetails">
            <span>✉ {siteData.email}</span>
            <span>📍 {siteData.location}</span>
            <a href={siteData.domain}>🌐 {siteData.domain}</a>
            <a href={siteData.linkedin}>🔗 {siteData.linkedin}</a>
            <span>📞 {siteData.phone}</span>
          </div>
        </div>

        <div className="contactCard">
          <a href={`mailto:${siteData.email}`}>Send a Message</a>
        </div>
      </section>
    </main>
  )
}
