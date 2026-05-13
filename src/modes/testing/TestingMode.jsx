import { useEffect, useRef, useState } from 'react'
import portfolioPromo from '../../assets/portfolio-promo.mp4'
import { Button } from '../../components/ui/Button.jsx'
import { HeroStaticMascot } from '../default/components/HeroStaticMascot.jsx'
import { defaultModeData } from '../default/defaultModeData.js'
import { testingModeData } from './testingModeData.js'
import './testingMode.css'

const copyTextToClipboard = async (text) => {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    await navigator.clipboard.writeText(text)
    return
  }

  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.setAttribute('readonly', '')
  textArea.style.position = 'fixed'
  textArea.style.left = '-9999px'
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand('copy')
  document.body.removeChild(textArea)
}

function TestingAboutAndSkills({ about }) {
  return (
    <div className="testingAboutSkillsFlow">
      <section className="testingAboutSection" id="about" aria-labelledby="testing-about-title">
        <div className="testingAboutCopy">
          <p className="testingSectionEyebrow">About Me</p>
          <h2 id="testing-about-title">Technical Actuarial Professional with a practical system mindset.</h2>
          <p>{about.text}</p>
        </div>

        <div className="testingAboutHighlights" aria-label="Professional strengths">
          {testingModeData.about.highlights.map((highlight) => (
            <span key={highlight}>{highlight}</span>
          ))}
        </div>
      </section>

      <section className="testingSkillsSection" id="skills" aria-labelledby="testing-skills-title">
        <div className="testingSkillsHeader">
          <p className="testingSectionEyebrow">Skills</p>
        </div>

        <div className="testingGroupedSkillsGrid">
          {testingModeData.skills.map((skillGroup) => (
            <article className="testingGroupedSkillCard" key={skillGroup.group}>
              <span>{skillGroup.accent}</span>
              <h3>{skillGroup.group}</h3>
              <ul>
                {skillGroup.items.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

function TestingProjectCard({ project }) {
  return (
    <article className="testingProjectCard">
      <h3>{project.title}</h3>
      <p>{project.description}</p>

      <div className="testingProjectTags" aria-label={`${project.title} tools`}>
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <button className="testingProjectAction" type="button" disabled>
        Coming Soon
      </button>
    </article>
  )
}

function TestingProjectsSection() {
  const { eyebrow } = testingModeData.projectSection

  return (
    <section id="projects" className="testingProjectsSection" aria-labelledby="testing-projects-title">
      <div className="testingProjectsHeader">
        <p className="testingSectionEyebrow">{eyebrow}</p>
      </div>

      <div className="testingProjectsGrid">
        {testingModeData.projects.map((project) => (
          <TestingProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}

function TestingExperienceSection() {
  const { eyebrow } = testingModeData.experienceSection

  return (
    <section
      id="experience"
      className="testingExperienceSection"
      aria-labelledby="testing-experience-title"
    >
      <div className="testingExperienceHeader">
        <p className="testingSectionEyebrow">{eyebrow}</p>
      </div>

      <div className="testingExperienceList">
        {testingModeData.experience.map((experience) => (
          <article className="testingExperienceCard" key={`${experience.company}-${experience.role}`}>
            <div className="testingExperienceMeta">
              <span>{experience.company}</span>
              <h3>{experience.role}</h3>
              <p>{experience.period}</p>
              {experience.location ? <small>{experience.location}</small> : null}
            </div>

            <div className="testingExperienceTags" aria-label={`${experience.role} focus areas`}>
              {experience.focus.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function TestingCertificationsSection() {
  return (
    <section
      id="certifications"
      className="testingCertificationsSection"
      aria-labelledby="testing-certifications-title"
    >
      <div className="testingCertificationsHeader">
        <p className="testingSectionEyebrow" id="testing-certifications-title">
          {testingModeData.certificationSection.eyebrow}
        </p>
      </div>

      <div className="testingCertificationGrid">
        {testingModeData.certifications.map((certification) => (
          <article className="testingCertificationCard" key={certification.title}>
            <h3>{certification.title}</h3>
          </article>
        ))}
      </div>
    </section>
  )
}

function TestingTechnicalFocusSection() {
  const { eyebrow } = testingModeData.technicalFocusSection

  return (
    <section
      id="technical-focus"
      className="testingTechnicalFocus"
      aria-labelledby="testing-technical-focus-title"
    >
      <div className="testingTechnicalFocusHeader">
        <p className="testingSectionEyebrow">{eyebrow}</p>
      </div>

      <div className="testingFocusGrid">
        {testingModeData.technicalFocus.map((focusArea, index) => (
          <article className="testingFocusCard" key={focusArea.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{focusArea.title}</h3>
            <p>{focusArea.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function TestingContactSection({
  copiedType,
  copyContactValue,
  gmailComposeUrl,
  isContactOptionsOpen,
  phoneHref,
  setIsContactOptionsOpen,
  siteData,
}) {
  const { eyebrow } = testingModeData.contactSection

  return (
    <section id="contact" className="testingContact" aria-labelledby="testing-contact-title">
      <div className="testingContactHeader">
        <p className="testingSectionEyebrow">{eyebrow}</p>
      </div>

      <div className="testingContactGrid">
        <div className="testingContactDetails" aria-label="Visible contact details">
          <article className="testingContactRow">
            <span>Email</span>
            <a href={gmailComposeUrl} rel="noreferrer" target="_blank">
              {siteData.email}
            </a>
            <button onClick={() => copyContactValue('email', siteData.email)} type="button">
              {copiedType === 'email' ? 'Copied' : 'Copy'}
            </button>
          </article>

          <article className="testingContactRow">
            <span>Location</span>
            <strong>{siteData.location}</strong>
          </article>

          <article className="testingContactRow">
            <span>Website</span>
            <a href={siteData.domain} rel="noreferrer" target="_blank">
              {siteData.domain}
            </a>
          </article>

          <article className="testingContactRow">
            <span>LinkedIn</span>
            <a href={siteData.linkedin} rel="noreferrer" target="_blank">
              {siteData.linkedin}
            </a>
          </article>

          <article className="testingContactRow">
            <span>Phone</span>
            <strong>{siteData.phone}</strong>
            <button onClick={() => copyContactValue('phone', siteData.phone)} type="button">
              {copiedType === 'phone' ? 'Copied' : 'Copy'}
            </button>
          </article>
        </div>

        <div className="testingContactActions">
          <span>Preferred contact options</span>
          <h3>Choose how to connect</h3>
          <p>
            Open Gmail in the browser, copy direct contact details, connect on
            LinkedIn, or use the phone actions without launching a desktop mail app.
          </p>

          <button
            aria-expanded={isContactOptionsOpen}
            className="testingContactToggle"
            onClick={() => setIsContactOptionsOpen((isOpen) => !isOpen)}
            type="button"
          >
            {isContactOptionsOpen ? 'Hide contact options' : 'Show contact options'}
          </button>

          {isContactOptionsOpen ? (
            <div className="testingContactOptionsPanel" aria-label="Preferred contact options">
              <article className="testingContactOptionCard">
                <span>Email</span>
                <strong>{siteData.email}</strong>
                <a
                  className="testingContactOptionPrimary"
                  href={gmailComposeUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  Open Gmail
                </a>
                <button
                  className="testingContactOptionSecondary"
                  onClick={() => copyContactValue('email', siteData.email)}
                  type="button"
                >
                  {copiedType === 'email' ? 'Email copied' : 'Copy email'}
                </button>
              </article>

              <article className="testingContactOptionCard">
                <span>LinkedIn</span>
                <strong>Professional profile</strong>
                <a
                  className="testingContactOptionPrimary"
                  href={siteData.linkedin}
                  rel="noreferrer"
                  target="_blank"
                >
                  Connect on LinkedIn
                </a>
              </article>

              <article className="testingContactOptionCard">
                <span>Phone</span>
                <strong>{siteData.phone}</strong>
                <button
                  className="testingContactOptionPrimary"
                  onClick={() => copyContactValue('phone', siteData.phone)}
                  type="button"
                >
                  {copiedType === 'phone' ? 'Phone copied' : 'Copy phone'}
                </button>
                <a className="testingContactOptionSecondary" href={phoneHref}>
                  Call
                </a>
              </article>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export function TestingMode({ siteData }) {
  const { about, hero } = defaultModeData
  const [copiedType, setCopiedType] = useState(null)
  const [isContactOptionsOpen, setIsContactOptionsOpen] = useState(false)
  const copiedTimeoutRef = useRef(null)
  const phoneHref = `tel:${siteData.phone.replace(/\s+/g, '')}`
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    siteData.email,
  )}&su=Portfolio%20Inquiry`

  useEffect(
    () => () => {
      if (copiedTimeoutRef.current) {
        window.clearTimeout(copiedTimeoutRef.current)
      }
    },
    [],
  )

  const copyContactValue = async (type, value) => {
    await copyTextToClipboard(value)
    setCopiedType(type)

    if (copiedTimeoutRef.current) {
      window.clearTimeout(copiedTimeoutRef.current)
    }

    copiedTimeoutRef.current = window.setTimeout(() => {
      setCopiedType(null)
    }, 2000)
  }

  return (
    <main className="site defaultMode testingDefaultReplica" id="top">
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

      <TestingAboutAndSkills about={about} />

      <TestingProjectsSection />

      <TestingExperienceSection />

      <TestingCertificationsSection />

      <TestingTechnicalFocusSection />

      <TestingContactSection
        copiedType={copiedType}
        copyContactValue={copyContactValue}
        gmailComposeUrl={gmailComposeUrl}
        isContactOptionsOpen={isContactOptionsOpen}
        phoneHref={phoneHref}
        setIsContactOptionsOpen={setIsContactOptionsOpen}
        siteData={siteData}
      />
    </main>
  )
}
