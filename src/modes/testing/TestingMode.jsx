import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import portfolioPromo from '../../assets/portfolio-promo.mp4'
import { Button } from '../../components/ui/Button.jsx'
import { HeroStaticMascot } from '../default/components/HeroStaticMascot.jsx'
import { defaultModeData } from '../default/defaultModeData.js'
import { testingModeData } from './testingModeData.js'
import {
  cardReveal,
  contactPanelReveal,
  containerStagger,
  heroContainer,
  heroItem,
  heroVisualReveal,
  reducedMotionVariants,
  sectionReveal,
  softHover,
  viewportOnce,
} from './testingMotion.js'
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

function RevealContainer({ as = 'section', children, enabled, variants, ...props }) {
  const motionProps = enabled
    ? {
        initial: 'hidden',
        variants,
        viewport: viewportOnce,
        whileInView: 'visible',
      }
    : {}

  if (as === 'div') {
    return enabled ? (
      <motion.div {...props} {...motionProps}>
        {children}
      </motion.div>
    ) : (
      <div {...props}>{children}</div>
    )
  }

  return enabled ? (
    <motion.section {...props} {...motionProps}>
      {children}
    </motion.section>
  ) : (
    <section {...props}>{children}</section>
  )
}

function RevealGroup({ children, enabled, variants = containerStagger, ...props }) {
  const motionProps = enabled
    ? {
        initial: 'hidden',
        variants,
        viewport: viewportOnce,
        whileInView: 'visible',
      }
    : {}

  return enabled ? (
    <motion.div {...props} {...motionProps}>
      {children}
    </motion.div>
  ) : (
    <div {...props}>{children}</div>
  )
}

function RevealItem({ children, enabled, hover, variants, ...props }) {
  const motionProps = enabled
    ? {
        variants,
        whileHover: hover,
      }
    : {}

  return enabled ? (
    <motion.article {...props} {...motionProps}>
      {children}
    </motion.article>
  ) : (
    <article {...props}>{children}</article>
  )
}

function HeroRevealGroup({ children, enabled, variants, ...props }) {
  if (!enabled) {
    return <div {...props}>{children}</div>
  }

  return (
    <motion.div {...props} animate="visible" initial="hidden" variants={variants}>
      {children}
    </motion.div>
  )
}

function HeroRevealItem({ as = 'div', children, enabled, variants, ...props }) {
  if (!enabled) {
    if (as === 'p') {
      return <p {...props}>{children}</p>
    }

    if (as === 'h1') {
      return <h1 {...props}>{children}</h1>
    }

    return <div {...props}>{children}</div>
  }

  if (as === 'p') {
    return (
      <motion.p {...props} variants={variants}>
        {children}
      </motion.p>
    )
  }

  if (as === 'h1') {
    return (
      <motion.h1 {...props} variants={variants}>
        {children}
      </motion.h1>
    )
  }

  return (
    <motion.div {...props} variants={variants}>
      {children}
    </motion.div>
  )
}

function HeroVisualReveal({ children, enabled, variants, ...props }) {
  if (!enabled) {
    return <div {...props}>{children}</div>
  }

  return (
    <motion.div {...props} animate="visible" initial="hidden" variants={variants}>
      {children}
    </motion.div>
  )
}

function ContactOptionsPanel({
  children,
  enabled,
  panelVariants,
}) {
  if (!enabled) {
    return (
      <div className="testingContactOptionsPanel" aria-label="Preferred contact options">
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className="testingContactOptionsPanel"
      aria-label="Preferred contact options"
      animate="visible"
      exit="exit"
      initial="hidden"
      variants={panelVariants}
    >
      {children}
    </motion.div>
  )
}

function TestingAboutAndSkills({ about, cardVariants, itemHover, revealEnabled, sectionVariants }) {
  return (
    <RevealContainer
      as="div"
      className="testingAboutSkillsFlow"
      enabled={revealEnabled}
      variants={sectionVariants}
    >
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

        <RevealGroup className="testingGroupedSkillsGrid" enabled={revealEnabled}>
          {testingModeData.skills.map((skillGroup) => (
            <RevealItem
              className="testingGroupedSkillCard"
              enabled={revealEnabled}
              hover={itemHover}
              key={skillGroup.group}
              variants={cardVariants}
            >
              <span>{skillGroup.accent}</span>
              <h3>{skillGroup.group}</h3>
              <ul>
                {skillGroup.items.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    </RevealContainer>
  )
}

function TestingProjectCard({ cardVariants, itemHover, project, revealEnabled }) {
  return (
    <RevealItem
      className="testingProjectCard"
      enabled={revealEnabled}
      hover={itemHover}
      variants={cardVariants}
    >
      <h3>{project.title}</h3>
      <p>{project.description}</p>

      <div className="testingProjectTags" aria-label={`${project.title} tools`}>
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </RevealItem>
  )
}

function TestingProjectsSection({ cardVariants, itemHover, revealEnabled, sectionVariants }) {
  const { eyebrow } = testingModeData.projectSection

  return (
    <RevealContainer
      id="projects"
      className="testingProjectsSection"
      aria-labelledby="testing-projects-title"
      enabled={revealEnabled}
      variants={sectionVariants}
    >
      <div className="testingProjectsHeader">
        <p className="testingSectionEyebrow">{eyebrow}</p>
      </div>

      <RevealGroup className="testingProjectsGrid" enabled={revealEnabled}>
        {testingModeData.projects.map((project) => (
          <TestingProjectCard
            cardVariants={cardVariants}
            itemHover={itemHover}
            key={project.title}
            project={project}
            revealEnabled={revealEnabled}
          />
        ))}
      </RevealGroup>
    </RevealContainer>
  )
}

function TestingExperienceSection({ cardVariants, itemHover, revealEnabled, sectionVariants }) {
  const { eyebrow } = testingModeData.experienceSection

  return (
    <RevealContainer
      id="experience"
      className="testingExperienceSection"
      aria-labelledby="testing-experience-title"
      enabled={revealEnabled}
      variants={sectionVariants}
    >
      <div className="testingExperienceHeader">
        <p className="testingSectionEyebrow">{eyebrow}</p>
      </div>

      <RevealGroup className="testingExperienceList" enabled={revealEnabled}>
        {testingModeData.experience.map((experience) => (
          <RevealItem
            className="testingExperienceCard"
            enabled={revealEnabled}
            hover={itemHover}
            key={`${experience.company}-${experience.role}`}
            variants={cardVariants}
          >
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
          </RevealItem>
        ))}
      </RevealGroup>
    </RevealContainer>
  )
}

function TestingCertificationsSection({ cardVariants, itemHover, revealEnabled, sectionVariants }) {
  return (
    <RevealContainer
      id="certifications"
      className="testingCertificationsSection"
      aria-labelledby="testing-certifications-title"
      enabled={revealEnabled}
      variants={sectionVariants}
    >
      <div className="testingCertificationsHeader">
        <p className="testingSectionEyebrow" id="testing-certifications-title">
          {testingModeData.certificationSection.eyebrow}
        </p>
      </div>

      <RevealGroup className="testingCertificationGrid" enabled={revealEnabled}>
        {testingModeData.certifications.map((certification) => (
          <RevealItem
            className="testingCertificationCard"
            enabled={revealEnabled}
            hover={itemHover}
            key={certification.title}
            variants={cardVariants}
          >
            <h3>{certification.title}</h3>
          </RevealItem>
        ))}
      </RevealGroup>
    </RevealContainer>
  )
}

function TestingTechnicalFocusSection({ cardVariants, itemHover, revealEnabled, sectionVariants }) {
  const { eyebrow } = testingModeData.technicalFocusSection

  return (
    <RevealContainer
      id="technical-focus"
      className="testingTechnicalFocus"
      aria-labelledby="testing-technical-focus-title"
      enabled={revealEnabled}
      variants={sectionVariants}
    >
      <div className="testingTechnicalFocusHeader">
        <p className="testingSectionEyebrow">{eyebrow}</p>
      </div>

      <RevealGroup className="testingFocusGrid" enabled={revealEnabled}>
        {testingModeData.technicalFocus.map((focusArea, index) => (
          <RevealItem
            className="testingFocusCard"
            enabled={revealEnabled}
            hover={itemHover}
            key={focusArea.title}
            variants={cardVariants}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{focusArea.title}</h3>
            <p>{focusArea.text}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </RevealContainer>
  )
}

function TestingContactSection({
  cardVariants,
  copiedType,
  copyContactValue,
  gmailComposeUrl,
  isContactOptionsOpen,
  itemHover,
  panelVariants,
  phoneHref,
  revealEnabled,
  sectionVariants,
  setIsContactOptionsOpen,
  siteData,
}) {
  const { eyebrow } = testingModeData.contactSection

  return (
    <RevealContainer
      id="contact"
      className="testingContact"
      aria-labelledby="testing-contact-title"
      enabled={revealEnabled}
      variants={sectionVariants}
    >
      <div className="testingContactHeader">
        <p className="testingSectionEyebrow">{eyebrow}</p>
      </div>

      <div className="testingContactGrid">
        <RevealGroup
          className="testingContactDetails"
          aria-label="Visible contact details"
          enabled={revealEnabled}
        >
          <RevealItem
            className="testingContactRow"
            enabled={revealEnabled}
            hover={itemHover}
            variants={cardVariants}
          >
            <span>Email</span>
            <a href={gmailComposeUrl} rel="noreferrer" target="_blank">
              {siteData.email}
            </a>
            <button onClick={() => copyContactValue('email', siteData.email)} type="button">
              {copiedType === 'email' ? 'Copied' : 'Copy'}
            </button>
          </RevealItem>

          <RevealItem
            className="testingContactRow"
            enabled={revealEnabled}
            hover={itemHover}
            variants={cardVariants}
          >
            <span>Location</span>
            <strong>{siteData.location}</strong>
          </RevealItem>

          <RevealItem
            className="testingContactRow"
            enabled={revealEnabled}
            hover={itemHover}
            variants={cardVariants}
          >
            <span>Website</span>
            <a href={siteData.domain} rel="noreferrer" target="_blank">
              {siteData.domain}
            </a>
          </RevealItem>

          <RevealItem
            className="testingContactRow"
            enabled={revealEnabled}
            hover={itemHover}
            variants={cardVariants}
          >
            <span>LinkedIn</span>
            <a href={siteData.linkedin} rel="noreferrer" target="_blank">
              {siteData.linkedin}
            </a>
          </RevealItem>

          <RevealItem
            className="testingContactRow"
            enabled={revealEnabled}
            hover={itemHover}
            variants={cardVariants}
          >
            <span>Phone</span>
            <strong>{siteData.phone}</strong>
            <button onClick={() => copyContactValue('phone', siteData.phone)} type="button">
              {copiedType === 'phone' ? 'Copied' : 'Copy'}
            </button>
          </RevealItem>
        </RevealGroup>

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

          <AnimatePresence initial={false}>
            {isContactOptionsOpen ? (
              <ContactOptionsPanel
                enabled={revealEnabled}
                panelVariants={panelVariants}
              >
                <RevealItem
                  className="testingContactOptionCard"
                  enabled={revealEnabled}
                  hover={itemHover}
                  key="email"
                  variants={cardVariants}
                >
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
                </RevealItem>

                <RevealItem
                  className="testingContactOptionCard"
                  enabled={revealEnabled}
                  hover={itemHover}
                  key="linkedin"
                  variants={cardVariants}
                >
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
                </RevealItem>

                <RevealItem
                  className="testingContactOptionCard"
                  enabled={revealEnabled}
                  hover={itemHover}
                  key="phone"
                  variants={cardVariants}
                >
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
                </RevealItem>
              </ContactOptionsPanel>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </RevealContainer>
  )
}

export function TestingMode({ enableSectionReveal = true, siteData }) {
  const { about, hero } = defaultModeData
  const [copiedType, setCopiedType] = useState(null)
  const [isContactOptionsOpen, setIsContactOptionsOpen] = useState(false)
  const copiedTimeoutRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const revealEnabled = enableSectionReveal
  const cardVariants = prefersReducedMotion ? reducedMotionVariants.card : cardReveal
  const heroItemVariants = prefersReducedMotion ? reducedMotionVariants.heroItem : heroItem
  const heroVisualVariants = prefersReducedMotion ? reducedMotionVariants.heroVisual : heroVisualReveal
  const itemHover = !prefersReducedMotion && revealEnabled ? softHover : undefined
  const panelVariants = prefersReducedMotion ? reducedMotionVariants.panel : contactPanelReveal
  const sectionVariants = prefersReducedMotion ? reducedMotionVariants.section : sectionReveal
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
        <HeroRevealGroup className="heroContent" enabled={revealEnabled} variants={heroContainer}>
          <HeroRevealItem
            as="p"
            className="eyebrow"
            enabled={revealEnabled}
            variants={heroItemVariants}
          >
            {hero.eyebrow}
          </HeroRevealItem>

          <HeroRevealItem as="h1" enabled={revealEnabled} variants={heroItemVariants}>
            {hero.titleLines[0]}
            <span>{hero.titleLines[1]}</span>
          </HeroRevealItem>

          <HeroRevealItem
            as="p"
            className="heroRole"
            enabled={revealEnabled}
            variants={heroItemVariants}
          >
            {hero.role} <span>•</span> {hero.roleAccent}
          </HeroRevealItem>

          <HeroRevealItem
            as="p"
            className="heroText"
            enabled={revealEnabled}
            variants={heroItemVariants}
          >
            {hero.text}
          </HeroRevealItem>

          <HeroRevealItem
            className="heroActions"
            enabled={revealEnabled}
            variants={heroItemVariants}
          >
            <Button href="#projects">💼 View Projects</Button>
            <Button href="#contact" variant="secondary">
              ✉ Get In Touch
            </Button>
          </HeroRevealItem>

          <HeroRevealItem
            className="heroBadges"
            enabled={revealEnabled}
            variants={heroItemVariants}
          >
            {hero.badges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </HeroRevealItem>
        </HeroRevealGroup>

        <HeroVisualReveal
          className="heroVisual"
          aria-label="Portfolio promo video and data visuals"
          enabled={revealEnabled}
          variants={heroVisualVariants}
        >
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
        </HeroVisualReveal>
      </section>

      <TestingAboutAndSkills
        about={about}
        cardVariants={cardVariants}
        itemHover={itemHover}
        revealEnabled={revealEnabled}
        sectionVariants={sectionVariants}
      />

      <TestingProjectsSection
        cardVariants={cardVariants}
        itemHover={itemHover}
        revealEnabled={revealEnabled}
        sectionVariants={sectionVariants}
      />

      <TestingExperienceSection
        cardVariants={cardVariants}
        itemHover={itemHover}
        revealEnabled={revealEnabled}
        sectionVariants={sectionVariants}
      />

      <TestingCertificationsSection
        cardVariants={cardVariants}
        itemHover={itemHover}
        revealEnabled={revealEnabled}
        sectionVariants={sectionVariants}
      />

      <TestingTechnicalFocusSection
        cardVariants={cardVariants}
        itemHover={itemHover}
        revealEnabled={revealEnabled}
        sectionVariants={sectionVariants}
      />

      <TestingContactSection
        cardVariants={cardVariants}
        copiedType={copiedType}
        copyContactValue={copyContactValue}
        gmailComposeUrl={gmailComposeUrl}
        isContactOptionsOpen={isContactOptionsOpen}
        itemHover={itemHover}
        panelVariants={panelVariants}
        phoneHref={phoneHref}
        revealEnabled={revealEnabled}
        sectionVariants={sectionVariants}
        setIsContactOptionsOpen={setIsContactOptionsOpen}
        siteData={siteData}
      />
    </main>
  )
}
