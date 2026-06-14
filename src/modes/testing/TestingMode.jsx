import { useEffect, useRef, useState } from 'react'
import {
  Award,
  BarChart3,
  BrainCircuit,
  BriefcaseBusiness,
  Calculator,
  Cog,
  ExternalLink,
  FileSpreadsheet,
  Globe,
  LineChart,
  Mail,
  MapPin,
  Phone,
  Shield,
  Table2,
  Workflow,
} from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import heroPic from '../../assets/hero_pic.png'
import portfolioPromo from '../../assets/portfolio-promo.mp4'
import { Button } from '../../components/ui/Button.jsx'
import { HeroStaticMascot } from '../default/components/HeroStaticMascot.jsx'
import { defaultModeData } from '../default/defaultModeData.js'
import {
  TestingCube3D,
  TestingOrb,
  TestingPyramid3D,
  TestingSphere3D,
} from './components/Testing3DShapes.jsx'
import { Testing3DCard } from './components/Testing3DCard.jsx'
import { testingModeData } from './testingModeData.js'
import {
  cardReveal,
  card3DHover,
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
import './testing3d.css'
import './testingMode.css'

const skillGroupIcons = {
  'Actuarial and modeling': Calculator,
  'Data and reporting': BarChart3,
  'Systems and automation': Workflow,
}

const projectIcons = {
  'Asset Valuation': LineChart,
  'Liability Valuation': Shield,
  'Daily Reporting Automation': Workflow,
  'Bordereaux Formulation': FileSpreadsheet,
  'Excel Modelling': Table2,
  'Power BI Dashboard': BarChart3,
  'RAG Assistant': BrainCircuit,
}

const technicalFocusIcons = {
  'Actuarial Automation': Workflow,
  'Model Conversion': Cog,
  'Data & Dashboarding': BarChart3,
}

const contactIcons = {
  Email: Mail,
  Location: MapPin,
  Website: Globe,
  LinkedIn: ExternalLink,
  Phone,
}

const heroBadgeIcons = {
  'Actuarial Expertise': Shield,
  'Automation Focused': Workflow,
  'Data Driven': BarChart3,
}

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

function RevealItem({
  accent,
  children,
  enabled,
  hover,
  icon,
  tiltEnabled,
  variants,
  ...props
}) {
  return (
    <Testing3DCard
      {...props}
      accent={accent}
      hover={hover}
      icon={icon}
      motionEnabled={enabled}
      tiltEnabled={tiltEnabled}
      variants={variants}
    >
      {children}
    </Testing3DCard>
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

function TestingAboutAndSkills({
  about,
  cardVariants,
  itemHover,
  revealEnabled,
  sectionVariants,
  threeDEnabled,
  tiltEnabled,
}) {
  return (
    <RevealContainer
      as="div"
      className="testingAboutSkillsFlow"
      enabled={revealEnabled}
      variants={sectionVariants}
    >
      {threeDEnabled ? (
        <section
          className="testingAboutSection"
          id="about"
          aria-labelledby="testing-about-title"
        >
          <div className="testingAboutHeader">
            <p className="testingSectionEyebrow">About Me</p>
          </div>

          <Testing3DCard
          as="div"
          className="testingAboutCard"
          hover={itemHover}
          icon={BriefcaseBusiness}
          maxRotateX={2.5}
          maxRotateY={3.5}
          motionEnabled={tiltEnabled}
          tiltEnabled={tiltEnabled}
        >
            <div className="testingAboutCopy">
              <h2 id="testing-about-title">
                Technical Actuarial Professional with a practical system mindset.
              </h2>
              <p>{about.text}</p>
            </div>

            <div className="testingAboutHighlights" aria-label="Professional strengths">
              {testingModeData.about.highlights.map((highlight) => (
                <span key={highlight}>{highlight}</span>
              ))}
            </div>
          </Testing3DCard>
        </section>
      ) : (
        <section className="testingAboutSection" id="about" aria-labelledby="testing-about-title">
          <div className="testingAboutCopy">
            <p className="testingSectionEyebrow">About Me</p>
            <h2 id="testing-about-title">
              Technical Actuarial Professional with a practical system mindset.
            </h2>
            <p>{about.text}</p>
          </div>

          <div className="testingAboutHighlights" aria-label="Professional strengths">
            {testingModeData.about.highlights.map((highlight) => (
              <span key={highlight}>{highlight}</span>
            ))}
          </div>
        </section>
      )}

      <section className="testingSkillsSection" id="skills" aria-labelledby="testing-skills-title">
        <div className="testingSkillsHeader">
          <p className="testingSectionEyebrow">Skills</p>
        </div>

        <RevealGroup className="testingGroupedSkillsGrid" enabled={revealEnabled}>
          {testingModeData.skills.map((skillGroup) => (
            <RevealItem
              accent={skillGroup.accent}
              className="testingGroupedSkillCard"
              enabled={revealEnabled}
              hover={itemHover}
              icon={threeDEnabled ? skillGroupIcons[skillGroup.group] : undefined}
              key={skillGroup.group}
              tiltEnabled={tiltEnabled}
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

function TestingProjectCard({
  cardVariants,
  itemHover,
  project,
  revealEnabled,
  threeDEnabled,
  tiltEnabled,
}) {
  return (
    <RevealItem
      accent={project.title}
      className="testingProjectCard"
      enabled={revealEnabled}
      hover={itemHover}
      icon={threeDEnabled ? projectIcons[project.title] : undefined}
      tiltEnabled={tiltEnabled}
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

function TestingProjectsSection({
  cardVariants,
  itemHover,
  revealEnabled,
  sectionVariants,
  threeDEnabled,
  tiltEnabled,
}) {
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
            threeDEnabled={threeDEnabled}
            tiltEnabled={tiltEnabled}
          />
        ))}
      </RevealGroup>
    </RevealContainer>
  )
}

function TestingExperienceSection({
  cardVariants,
  itemHover,
  revealEnabled,
  sectionVariants,
  threeDEnabled,
  tiltEnabled,
}) {
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
            accent={experience.company}
            className="testingExperienceCard"
            enabled={revealEnabled}
            hover={itemHover}
            icon={threeDEnabled ? BriefcaseBusiness : undefined}
            key={`${experience.company}-${experience.role}`}
            tiltEnabled={tiltEnabled}
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

function TestingCertificationsSection({
  cardVariants,
  itemHover,
  revealEnabled,
  sectionVariants,
  threeDEnabled,
  tiltEnabled,
}) {
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
            accent={certification.title}
            className="testingCertificationCard"
            enabled={revealEnabled}
            hover={itemHover}
            icon={threeDEnabled ? Award : undefined}
            key={certification.title}
            tiltEnabled={tiltEnabled}
            variants={cardVariants}
          >
            <h3>{certification.title}</h3>
          </RevealItem>
        ))}
      </RevealGroup>
    </RevealContainer>
  )
}

function TestingTechnicalFocusSection({
  cardVariants,
  itemHover,
  revealEnabled,
  sectionVariants,
  threeDEnabled,
  tiltEnabled,
}) {
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
            accent={focusArea.title}
            className="testingFocusCard"
            enabled={revealEnabled}
            hover={itemHover}
            icon={threeDEnabled ? technicalFocusIcons[focusArea.title] : undefined}
            key={focusArea.title}
            tiltEnabled={tiltEnabled}
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
  threeDEnabled,
  tiltEnabled,
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
            icon={threeDEnabled ? contactIcons.Email : undefined}
            tiltEnabled={tiltEnabled}
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
            icon={threeDEnabled ? contactIcons.Location : undefined}
            tiltEnabled={tiltEnabled}
            variants={cardVariants}
          >
            <span>Location</span>
            <strong>{siteData.location}</strong>
          </RevealItem>

          <RevealItem
            className="testingContactRow"
            enabled={revealEnabled}
            hover={itemHover}
            icon={threeDEnabled ? contactIcons.Website : undefined}
            tiltEnabled={tiltEnabled}
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
            icon={threeDEnabled ? contactIcons.LinkedIn : undefined}
            tiltEnabled={tiltEnabled}
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
            icon={threeDEnabled ? contactIcons.Phone : undefined}
            tiltEnabled={tiltEnabled}
            variants={cardVariants}
          >
            <span>Phone</span>
            <strong>{siteData.phone}</strong>
            <button onClick={() => copyContactValue('phone', siteData.phone)} type="button">
              {copiedType === 'phone' ? 'Copied' : 'Copy'}
            </button>
          </RevealItem>
        </RevealGroup>

        <Testing3DCard
          as="div"
          className="testingContactActions"
          icon={threeDEnabled ? Mail : undefined}
          tiltEnabled={tiltEnabled}
        >
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
                  icon={threeDEnabled ? contactIcons.Email : undefined}
                  key="email"
                  tiltEnabled={tiltEnabled}
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
                  icon={threeDEnabled ? contactIcons.LinkedIn : undefined}
                  key="linkedin"
                  tiltEnabled={tiltEnabled}
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
                  icon={threeDEnabled ? contactIcons.Phone : undefined}
                  key="phone"
                  tiltEnabled={tiltEnabled}
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
        </Testing3DCard>
      </div>
    </RevealContainer>
  )
}

export function TestingMode({ enableSectionReveal = true, enableTesting3D = true, siteData }) {
  const { about, hero } = defaultModeData
  const [copiedType, setCopiedType] = useState(null)
  const [isContactOptionsOpen, setIsContactOptionsOpen] = useState(false)
  const copiedTimeoutRef = useRef(null)
  const heroRef = useRef(null)
  const pointerFrameRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const revealEnabled = enableSectionReveal
  const pointer3DEnabled = enableTesting3D && !prefersReducedMotion
  const tiltEnabled = enableTesting3D && !prefersReducedMotion
  const cardVariants = prefersReducedMotion ? reducedMotionVariants.card : cardReveal
  const heroItemVariants = prefersReducedMotion ? reducedMotionVariants.heroItem : heroItem
  const heroVisualVariants = prefersReducedMotion ? reducedMotionVariants.heroVisual : heroVisualReveal
  const itemHover = !prefersReducedMotion && revealEnabled
    ? enableTesting3D
      ? card3DHover
      : softHover
    : undefined
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

      if (pointerFrameRef.current) {
        window.cancelAnimationFrame(pointerFrameRef.current)
      }
    },
    [],
  )

  const setHeroPointerVars = (x, y) => {
    if (pointerFrameRef.current) {
      window.cancelAnimationFrame(pointerFrameRef.current)
    }

    pointerFrameRef.current = window.requestAnimationFrame(() => {
      if (!heroRef.current) return

      heroRef.current.style.setProperty('--testing-pointer-x', x.toFixed(4))
      heroRef.current.style.setProperty('--testing-pointer-y', y.toFixed(4))
      heroRef.current.style.setProperty('--testing-depth-x-1', `${(x * 8).toFixed(2)}px`)
      heroRef.current.style.setProperty('--testing-depth-y-1', `${(y * 8).toFixed(2)}px`)
      heroRef.current.style.setProperty('--testing-depth-x-2', `${(x * 18).toFixed(2)}px`)
      heroRef.current.style.setProperty('--testing-depth-y-2', `${(y * 18).toFixed(2)}px`)
      heroRef.current.style.setProperty('--testing-depth-x-3', `${(x * 34).toFixed(2)}px`)
      heroRef.current.style.setProperty('--testing-depth-y-3', `${(y * 30).toFixed(2)}px`)
      heroRef.current.style.setProperty('--testing-depth-soft-x', `${(x * 8).toFixed(2)}px`)
      heroRef.current.style.setProperty('--testing-depth-soft-y', `${(y * 8).toFixed(2)}px`)
      heroRef.current.style.setProperty('--testing-depth-mid-x', `${(x * 18).toFixed(2)}px`)
      heroRef.current.style.setProperty('--testing-depth-mid-y', `${(y * 18).toFixed(2)}px`)
      heroRef.current.style.setProperty('--testing-depth-strong-x', `${(x * 32).toFixed(2)}px`)
      heroRef.current.style.setProperty('--testing-depth-strong-y', `${(y * 28).toFixed(2)}px`)
      heroRef.current.style.setProperty('--testing-tilt-x', `${(y * -4).toFixed(2)}deg`)
      heroRef.current.style.setProperty('--testing-tilt-y', `${(x * 5).toFixed(2)}deg`)
    })
  }

  const handleHeroPointerMove = (event) => {
    if (!pointer3DEnabled || !heroRef.current) return

    const rect = heroRef.current.getBoundingClientRect()
    const normalizedX = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const normalizedY = ((event.clientY - rect.top) / rect.height - 0.5) * 2

    setHeroPointerVars(
      Math.max(-1, Math.min(1, normalizedX)),
      Math.max(-1, Math.min(1, normalizedY)),
    )
  }

  const handleHeroPointerLeave = () => {
    if (!pointer3DEnabled) return
    setHeroPointerVars(0, 0)
  }

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
    <main
      className={`site defaultMode testingDefaultReplica${enableTesting3D ? ' testing3DExperienceEnabled' : ''}`}
      id="top"
    >
      <section
        id="home"
        className={`hero${enableTesting3D ? ' testingHero3DEnabled' : ''}`}
        onPointerLeave={handleHeroPointerLeave}
        onPointerMove={handleHeroPointerMove}
        ref={heroRef}
      >
        {enableTesting3D ? (
          <div className="testingHero3DScene testing3dPerspective" aria-hidden="true">
            <div className="testingHero3DGrid testing3dGridBackground"></div>
            <TestingOrb className="testingHero3DOrb testingHero3DOrbOne" />
            <TestingOrb className="testingHero3DOrb testingHero3DOrbTwo" />
            <div className="testingHero3DCubeWrap">
              <TestingCube3D />
            </div>
            <div className="testingHero3DSphereWrap">
              <TestingSphere3D />
            </div>
            <div className="testingHero3DPyramidWrap">
              <TestingPyramid3D />
            </div>
            <div className="testingHero3DGlassPanel testingHero3DGlassPanelOne">Automation</div>
            <div className="testingHero3DGlassPanel testingHero3DGlassPanelTwo">Valuation</div>
            <div className="testingHero3DGlassPanel testingHero3DGlassPanelThree">Dashboards</div>
          </div>
        ) : null}

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
            {hero.badges.map((badge) => {
              const BadgeIcon = enableTesting3D ? heroBadgeIcons[badge] : null

              return (
                <span key={badge}>
                  {BadgeIcon ? <BadgeIcon aria-hidden="true" size={15} strokeWidth={2.1} /> : null}
                  {badge}
                </span>
              )
            })}
          </HeroRevealItem>
        </HeroRevealGroup>

        <HeroVisualReveal
          className="heroVisual"
          aria-label={enableTesting3D ? 'Portfolio image and data visuals' : 'Portfolio promo video and data visuals'}
          enabled={revealEnabled}
          variants={heroVisualVariants}
        >
          <div className={enableTesting3D ? 'testingHeroVisualTiltWrap' : undefined}>
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

              {enableTesting3D ? (
                <div className="testingHeroImageFrame">
                  <img
                    src={heroPic}
                    alt="Sanjaya Tamang portfolio preview"
                    className="testingHeroImage"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              ) : (
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
              )}
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
        threeDEnabled={enableTesting3D}
        tiltEnabled={tiltEnabled}
      />

      <TestingProjectsSection
        cardVariants={cardVariants}
        itemHover={itemHover}
        revealEnabled={revealEnabled}
        sectionVariants={sectionVariants}
        threeDEnabled={enableTesting3D}
        tiltEnabled={tiltEnabled}
      />

      <TestingExperienceSection
        cardVariants={cardVariants}
        itemHover={itemHover}
        revealEnabled={revealEnabled}
        sectionVariants={sectionVariants}
        threeDEnabled={enableTesting3D}
        tiltEnabled={tiltEnabled}
      />

      <TestingCertificationsSection
        cardVariants={cardVariants}
        itemHover={itemHover}
        revealEnabled={revealEnabled}
        sectionVariants={sectionVariants}
        threeDEnabled={enableTesting3D}
        tiltEnabled={tiltEnabled}
      />

      <TestingTechnicalFocusSection
        cardVariants={cardVariants}
        itemHover={itemHover}
        revealEnabled={revealEnabled}
        sectionVariants={sectionVariants}
        threeDEnabled={enableTesting3D}
        tiltEnabled={tiltEnabled}
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
        threeDEnabled={enableTesting3D}
        tiltEnabled={tiltEnabled}
      />
    </main>
  )
}
