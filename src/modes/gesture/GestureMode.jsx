import { useCallback, useEffect, useMemo, useState } from 'react'
import { GestureCalibration } from './components/GestureCalibration.jsx'
import { GestureCommandCenter } from './components/GestureCommandCenter.jsx'
import { GestureLanding } from './components/GestureLanding.jsx'
import { GesturePointer } from './components/GesturePointer.jsx'
import { GestureStatusHUD } from './components/GestureStatusHUD.jsx'
import { GestureTutorial } from './components/GestureTutorial.jsx'
import { ProjectModal } from './components/ProjectModal.jsx'
import { RadialMenu } from './components/RadialMenu.jsx'
import {
  commandSections,
  createContactItems,
  gestureProjects,
  refinedCommandMenuItems,
  resumeContent,
  skillNodes,
  timelineItems,
} from './data/gesturePortfolioData.js'
import { useGestureEngine } from './hooks/useGestureEngine.js'
import './gestureMode.css'

export function GestureMode({ onNavigate, siteData }) {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [controlMode, setControlMode] = useState('fallback')
  const [focusedContactIndex, setFocusedContactIndex] = useState(0)
  const [hoverTarget, setHoverTarget] = useState(null)
  const [focusedMenuIndex, setFocusedMenuIndex] = useState(0)
  const [focusedProjectIndex, setFocusedProjectIndex] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedSkillId, setSelectedSkillId] = useState('core')
  const [step, setStep] = useState('landing')
  const [timelineIndex, setTimelineIndex] = useState(0)

  const contactItems = useMemo(() => createContactItems(siteData), [siteData])
  const activeSection = commandSections[activeSectionIndex]
  const interactionState = selectedProject
    ? 'modalOpen'
    : isMenuOpen
      ? 'commandPanel'
      : step === 'command'
        ? controlMode === 'fallback'
          ? 'fallback'
          : 'exploration'
        : 'calibration'

  const goToSectionById = useCallback((sectionId) => {
    const nextIndex = commandSections.findIndex((section) => section.id === sectionId)
    if (nextIndex >= 0) {
      setActiveSectionIndex(nextIndex)
    }
  }, [])

  const nextSection = useCallback(() => {
    setActiveSectionIndex((index) => (index + 1) % commandSections.length)
  }, [])

  const previousSection = useCallback(() => {
    setActiveSectionIndex(
      (index) => (index - 1 + commandSections.length) % commandSections.length,
    )
  }, [])

  const selectMenuItem = useCallback((item) => {
    if (item.sectionId) {
      goToSectionById(item.sectionId)
      setIsMenuOpen(false)
      return
    }

    if (item.action === 'next') {
      nextSection()
      setIsMenuOpen(false)
      return
    }

    if (item.action === 'previous') {
      previousSection()
      setIsMenuOpen(false)
      return
    }

    if (item.action === 'exit') {
      onNavigate('/default')
    }
  }, [goToSectionById, nextSection, onNavigate, previousSection])

  const openContactItem = useCallback((item) => {
    if (!item.href) {
      return
    }

    if (item.href.startsWith('mailto:')) {
      window.location.href = item.href
      return
    }

    window.open(item.href, '_blank', 'noopener,noreferrer')
  }, [])

  const selectActiveItem = useCallback(() => {
    if (isMenuOpen) {
      selectMenuItem(refinedCommandMenuItems[focusedMenuIndex])
      return
    }

    if (selectedProject && hoverTarget?.type === 'modal-close') {
      setSelectedProject(null)
      return
    }

    if (hoverTarget?.type === 'section' && hoverTarget.sectionId) {
      goToSectionById(hoverTarget.sectionId)
      return
    }

    if (hoverTarget?.type === 'next') {
      nextSection()
      return
    }

    if (hoverTarget?.type === 'previous') {
      previousSection()
      return
    }

    if (hoverTarget?.type === 'menu-button') {
      setFocusedMenuIndex(0)
      setIsMenuOpen(true)
      return
    }

    if (activeSection.id === 'projects') {
      setSelectedProject(gestureProjects[focusedProjectIndex])
      return
    }

    if (activeSection.id === 'contact') {
      openContactItem(contactItems[focusedContactIndex])
      return
    }
  }, [
    activeSection.id,
    contactItems,
    focusedContactIndex,
    focusedMenuIndex,
    focusedProjectIndex,
    goToSectionById,
    hoverTarget,
    isMenuOpen,
    nextSection,
    openContactItem,
    previousSection,
    selectMenuItem,
    selectedProject,
  ])

  const closeLayerOrBack = useCallback(() => {
    if (selectedProject) {
      setSelectedProject(null)
      return
    }

    if (isMenuOpen) {
      setIsMenuOpen(false)
      return
    }

    previousSection()
  }, [isMenuOpen, previousSection, selectedProject])

  const handleGesture = useCallback(
    (gesture, payload = {}) => {
      if (gesture === 'Open Palm Swipe Left') {
        if (isMenuOpen || selectedProject) {
          return
        }
        nextSection()
      }
      if (gesture === 'Open Palm Swipe Right') {
        if (isMenuOpen || selectedProject) {
          return
        }
        previousSection()
      }
      if (gesture === 'Open Palm Hold') {
        if (selectedProject) {
          return
        }
        setFocusedMenuIndex(0)
        setIsMenuOpen((value) => !value)
      }
      if (gesture === 'Pinch') {
        selectActiveItem()
      }
      if (gesture === 'Two-Finger Scroll') {
        if (isMenuOpen || selectedProject) {
          return
        }
        window.scrollBy({ top: payload.deltaY ?? 0, behavior: 'auto' })
      }
    },
    [isMenuOpen, nextSection, previousSection, selectActiveItem, selectedProject],
  )

  const gestureEngine = useGestureEngine({
    interactionState,
    onGesture: handleGesture,
  })
  const { emitGesture } = gestureEngine

  const beginGestureMode = async () => {
    const result = await gestureEngine.startGestureMode({ cameraEnabled: true })
    setControlMode(result.mode)
    setStep('tutorial')
  }

  const beginFallbackMode = async () => {
    await gestureEngine.startGestureMode({ cameraEnabled: false })
    setControlMode('fallback')
    setStep('tutorial')
  }

  const returnToLanding = () => {
    gestureEngine.stopGestureMode()
    setIsMenuOpen(false)
    setSelectedProject(null)
    setActiveSectionIndex(0)
    setStep('landing')
  }

  const exitToDefaultMode = () => {
    gestureEngine.stopGestureMode()
    onNavigate('/default')
  }

  useEffect(() => {
    if (step !== 'command') {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        if (isMenuOpen) {
          setFocusedMenuIndex((index) => (index + 1) % refinedCommandMenuItems.length)
          return
        }
        emitGesture('Open Palm Swipe Left', { source: 'keyboard' })
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        if (isMenuOpen) {
          setFocusedMenuIndex(
            (index) =>
              (index - 1 + refinedCommandMenuItems.length) %
              refinedCommandMenuItems.length,
          )
          return
        }
        emitGesture('Open Palm Swipe Right', { source: 'keyboard' })
      }

      if (event.key === 'Enter') {
        event.preventDefault()
        emitGesture('Pinch', { source: 'keyboard' })
      }

      if (event.key === 'Escape') {
        event.preventDefault()
        closeLayerOrBack()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closeLayerOrBack, emitGesture, isMenuOpen, step])

  useEffect(() => {
    let frameId

    if (!gestureEngine.pointerActive || !gestureEngine.pointerPosition) {
      frameId = window.requestAnimationFrame(() => setHoverTarget(null))
      return () => window.cancelAnimationFrame(frameId)
    }

    frameId = window.requestAnimationFrame(() => {
      const element = document
        .elementFromPoint(
          gestureEngine.pointerPosition.x,
          gestureEngine.pointerPosition.y,
        )
        ?.closest('[data-gesture-target]')

      if (!element) {
        setHoverTarget(null)
        return
      }

      const menuIndex = element.getAttribute('data-gesture-menu-index')
      const projectIndex = element.getAttribute('data-gesture-project-index')
      const contactIndex = element.getAttribute('data-gesture-contact-index')
      const sectionId = element.getAttribute('data-gesture-section-id')
      const targetType = element.getAttribute('data-gesture-target')

      setHoverTarget({ sectionId, type: targetType })

      if (menuIndex !== null) {
        setFocusedMenuIndex(Number(menuIndex))
      }
      if (projectIndex !== null) {
        setFocusedProjectIndex(Number(projectIndex))
      }
      if (contactIndex !== null) {
        setFocusedContactIndex(Number(contactIndex))
      }
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [gestureEngine.pointerActive, gestureEngine.pointerPosition])

  return (
    <main className="site gestureExperience" id="top">
      {step === 'landing' ? (
        <GestureLanding
          errorMessage={gestureEngine.errorMessage}
          onEnableGesture={beginGestureMode}
          onUseFallback={beginFallbackMode}
        />
      ) : null}

      {step === 'tutorial' ? (
        <GestureTutorial
          mode={controlMode}
          onBack={returnToLanding}
          onContinue={() =>
            setStep(controlMode === 'gesture' ? 'calibration' : 'command')
          }
        />
      ) : null}

      {step === 'calibration' ? (
        <GestureCalibration
          cameraStatus={gestureEngine.cameraStatus}
          confidence={gestureEngine.confidence}
          currentGesture={gestureEngine.currentGesture}
          errorMessage={gestureEngine.errorMessage}
          fallbackReason={gestureEngine.fallbackReason}
          handDetected={gestureEngine.handDetected}
          isFallback={gestureEngine.isFallback}
          modelStatus={gestureEngine.modelStatus}
          onContinue={() => setStep('command')}
          onUseFallback={beginFallbackMode}
          palmHoldProgress={gestureEngine.palmHoldProgress}
          pointerActive={gestureEngine.pointerActive}
          pointerPosition={gestureEngine.pointerPosition}
          pointerState={gestureEngine.pointerState}
          videoRef={gestureEngine.videoRef}
        />
      ) : null}

      {step === 'command' ? (
        <>
          <GestureStatusHUD
            cameraStatus={gestureEngine.cameraStatus}
            confidence={gestureEngine.confidence}
            cooldownActive={gestureEngine.cooldownActive}
            currentGesture={gestureEngine.currentGesture}
            handDetected={gestureEngine.handDetected}
            isFallback={gestureEngine.isFallback}
            onExit={returnToLanding}
            palmHoldProgress={gestureEngine.palmHoldProgress}
            pointerActive={gestureEngine.pointerActive}
            pointerPosition={gestureEngine.pointerPosition}
            pinchState={gestureEngine.pinchState}
            rawGesture={gestureEngine.rawGesture}
            scrollActive={gestureEngine.scrollActive}
            scrollDelta={gestureEngine.scrollDelta}
          />

          <GestureCommandCenter
            activeSection={activeSection}
            activeSectionIndex={activeSectionIndex}
            cameraStatus={gestureEngine.cameraStatus}
            commandSections={commandSections}
            contactItems={contactItems}
            emitGesture={emitGesture}
            focusedContactIndex={focusedContactIndex}
            focusedProjectIndex={focusedProjectIndex}
            interactionState={interactionState}
            onNextSection={nextSection}
            onOpenMenu={() => {
              setFocusedMenuIndex(0)
              setIsMenuOpen(true)
            }}
            onOpenProject={setSelectedProject}
            onPreviousSection={previousSection}
            onSelectContact={openContactItem}
            projects={gestureProjects}
            resumeContent={resumeContent}
            selectedSkillId={selectedSkillId}
            setActiveSectionById={goToSectionById}
            setFocusedContactIndex={setFocusedContactIndex}
            setFocusedProjectIndex={setFocusedProjectIndex}
            setSelectedSkillId={setSelectedSkillId}
            setTimelineIndex={setTimelineIndex}
            skillNodes={skillNodes}
            timelineIndex={timelineIndex}
            timelineItems={timelineItems}
            videoRef={gestureEngine.videoRef}
          />
        </>
      ) : null}

      {isMenuOpen ? (
        <RadialMenu
          focusedIndex={focusedMenuIndex}
          items={refinedCommandMenuItems}
          onClose={() => setIsMenuOpen(false)}
          onFocusItem={setFocusedMenuIndex}
          onSelect={selectMenuItem}
        />
      ) : null}

      <ProjectModal
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />

      <button className="gestureDefaultExit" onClick={exitToDefaultMode} type="button">
        Return to Default Mode
      </button>

      <GesturePointer
        isHovering={Boolean(hoverTarget)}
        palmHoldProgress={gestureEngine.palmHoldProgress}
        pointerActive={step === 'command' && gestureEngine.pointerActive}
        pointerPosition={gestureEngine.pointerPosition}
        pointerState={gestureEngine.pointerState}
      />
    </main>
  )
}
