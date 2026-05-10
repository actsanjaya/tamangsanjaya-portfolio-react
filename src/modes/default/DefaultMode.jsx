import { useMemo, useState } from 'react'
import portfolioPromo from '../../assets/portfolio-promo.mp4'
import { Button } from '../../components/ui/Button.jsx'
import { Card } from '../../components/ui/Card.jsx'
import {
  portfolioProjects,
  projectDataDisclaimer,
  projectFilters,
  projectStatusLabels,
} from '../../config/projectsData.js'
import { HeroStaticMascot } from './components/HeroStaticMascot.jsx'
import { defaultModeData } from './defaultModeData.js'

const projectActionConfig = [
  { key: 'caseStudy', label: 'View Case Study' },
  { key: 'liveApp', label: 'Live App' },
  { key: 'github', label: 'GitHub' },
  { key: 'download', label: 'Download Template', onlyFor: 'Excel Tool' },
]

function ProjectAction({ href, label }) {
  if (href) {
    return (
      <a className="portfolioProjectAction" href={href} target="_blank" rel="noreferrer">
        {label}
      </a>
    )
  }

  return (
    <button className="portfolioProjectAction portfolioProjectActionDisabled" type="button" disabled>
      {label} Coming Soon
    </button>
  )
}

function PortfolioProjectCard({ project }) {
  const roadmapNote = project.futureRoadmap?.[0]

  return (
    <article className="portfolioProjectCard">
      <div className="portfolioProjectHeader">
        <div>
          <p className="portfolioProjectCategory">{project.category}</p>
          <h3>{project.title}</h3>
          <p className="portfolioProjectSubtitle">{project.subtitle}</p>
        </div>

        <span className={`portfolioProjectStatus status-${project.status}`}>
          {projectStatusLabels[project.status] ?? project.status}
        </span>
      </div>

      <p className="portfolioProjectSummary">{project.summary}</p>

      <div className="portfolioProjectDetail">
        <strong>{project.status === 'planned' ? 'Roadmap' : 'Impact'}</strong>
        <span>{project.status === 'planned' ? roadmapNote : project.impact}</span>
      </div>

      <div className="tagList portfolioProjectTags" aria-label={`${project.title} tools`}>
        {project.tools.slice(0, 5).map((tool) => (
          <span key={tool}>{tool}</span>
        ))}
      </div>

      <div className="portfolioProjectMeta">
        <span>Future hub: {project.appSubdomain}</span>
        <span>Repo plan: {project.repoName}</span>
      </div>

      <div className="portfolioProjectActions">
        {projectActionConfig
          .filter((action) => !action.onlyFor || action.onlyFor === project.category)
          .map((action) => (
            <ProjectAction
              key={action.key}
              href={project.links[action.key]}
              label={action.label}
            />
          ))}
      </div>
    </article>
  )
}

export function DefaultMode({ siteData }) {
  const { about, focusAreas, hero, skills } = defaultModeData
  const [activeProjectFilter, setActiveProjectFilter] = useState('all')

  const filteredProjects = useMemo(() => {
    if (activeProjectFilter === 'all') {
      return portfolioProjects
    }

    return portfolioProjects.filter((project) => project.filterGroup === activeProjectFilter)
  }, [activeProjectFilter])

  const featuredProjectCount = portfolioProjects.filter((project) => project.featured).length

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

        <div className="heroVisual" aria-label="Portfolio promo video and data visuals">
          <div className="visualCircle"></div>
          <div className="barChart" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="donutChart" aria-hidden="true"></div>

          <div className="heroVideoFrameWrapper">
            <HeroStaticMascot />

            <div className="heroVideoFrame" aria-label="Portfolio promo video">
              <video
                autoPlay
                className="heroVideo"
                controls
                muted
                playsInline
                preload="metadata"
                src={portfolioPromo}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
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
            <h2>Apps I&apos;m Building</h2>
          </div>

          <p className="sectionMeta">
            {featuredProjectCount} featured ideas, {portfolioProjects.length} focused builds
          </p>
        </div>

        <div className="projectRoadmapIntro">
          <p>
            This portfolio is the central hub for actuarial and technical apps I am
            building separately. Serious tools will live in their own repos and
            deployments, while this page tracks the roadmap, case studies, links,
            downloads, and demos as they become available.
          </p>
        </div>

        <div className="portfolioProjectFilters" aria-label="Filter projects">
          {projectFilters.map((filter) => (
            <button
              aria-pressed={activeProjectFilter === filter.id}
              className="portfolioProjectFilter"
              key={filter.id}
              onClick={() => setActiveProjectFilter(filter.id)}
              type="button"
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="portfolioProjectGrid">
          {filteredProjects.map((project) => (
            <PortfolioProjectCard key={project.id} project={project} />
          ))}
        </div>

        <p className="portfolioProjectDisclaimer">{projectDataDisclaimer}</p>
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
