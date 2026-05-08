import { CommandSection } from './CommandSection.jsx'

export function GestureCommandCenter({
  activeSection,
  activeSectionIndex,
  cameraStatus,
  commandSections,
  contactItems,
  emitGesture,
  focusedContactIndex,
  focusedProjectIndex,
  interactionState,
  onNextSection,
  onOpenMenu,
  onOpenProject,
  onPreviousSection,
  onSelectContact,
  projects,
  resumeContent,
  selectedSkillId,
  setActiveSectionById,
  setFocusedContactIndex,
  setFocusedProjectIndex,
  setSelectedSkillId,
  setTimelineIndex,
  skillNodes,
  timelineIndex,
  timelineItems,
  videoRef,
}) {
  return (
    <section className="gestureCommandCenter" aria-labelledby="command-center-title">
      <div className="commandTopbar">
        <div>
          <span className="gestureKicker">Actuarial Command Center</span>
          <h1 id="command-center-title">{activeSection.title}</h1>
          <p>{activeSection.summary}</p>
        </div>

        <div className="commandControls">
          <button data-gesture-target="previous" onClick={onPreviousSection} type="button">
            Previous
          </button>
          <button data-gesture-target="menu-button" onClick={onOpenMenu} type="button">
            Menu
          </button>
          <button data-gesture-target="next" onClick={onNextSection} type="button">
            Next
          </button>
        </div>
      </div>

      <div className="commandLayout">
        <nav className="sectionDock" aria-label="Gesture portfolio sections">
          {commandSections.map((section, index) => (
            <button
              aria-current={activeSection.id === section.id ? 'page' : undefined}
              data-gesture-section-id={section.id}
              data-gesture-target="section"
              key={section.id}
              onClick={() => setActiveSectionById(section.id)}
              type="button"
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {section.label}
            </button>
          ))}
        </nav>

        <div className="commandMainPanel">
          <div className="commandPanelHeader">
            <span>{activeSection.eyebrow}</span>
            <strong>
              {interactionState} ·{' '}
              {String(activeSectionIndex + 1).padStart(2, '0')} /{' '}
              {String(commandSections.length).padStart(2, '0')}
            </strong>
          </div>

          <CommandSection
            activeSection={activeSection}
            contactItems={contactItems}
            focusedContactIndex={focusedContactIndex}
            focusedProjectIndex={focusedProjectIndex}
            onOpenProject={onOpenProject}
            onSelectContact={onSelectContact}
            projects={projects}
            resumeContent={resumeContent}
            selectedSkillId={selectedSkillId}
            setFocusedContactIndex={setFocusedContactIndex}
            setFocusedProjectIndex={setFocusedProjectIndex}
            setSelectedSkillId={setSelectedSkillId}
            setTimelineIndex={setTimelineIndex}
            skillNodes={skillNodes}
            timelineIndex={timelineIndex}
            timelineItems={timelineItems}
          />
        </div>

        <aside className="gestureSimulator" aria-label="Fallback gesture controls">
          <div className="commandCameraPreview">
            {cameraStatus === 'active' ? (
              <video
                aria-label="Mirrored local camera preview for gesture control"
                autoPlay
                muted
                playsInline
                ref={videoRef}
              />
            ) : (
              <p>Camera preview is off. Fallback controls remain active.</p>
            )}
            <small>Mirrored preview for natural control</small>
          </div>

          <span>Fallback Gesture Controls</span>
          <p>Use these controls to test the same actions without relying on the camera.</p>
          <button onClick={() => emitGesture('Open Palm Swipe Right')} type="button">
            Palm Swipe Right
          </button>
          <button onClick={() => emitGesture('Open Palm Hold')} type="button">
            Palm Hold
          </button>
          <button onClick={() => emitGesture('Pinch')} type="button">
            Pinch
          </button>
          <button
            onClick={() => emitGesture('Two-Finger Scroll', { deltaY: 180 })}
            type="button"
          >
            Two-Finger Scroll
          </button>
          <button onClick={() => emitGesture('Open Palm Swipe Left')} type="button">
            Palm Swipe Left
          </button>
        </aside>
      </div>
    </section>
  )
}
