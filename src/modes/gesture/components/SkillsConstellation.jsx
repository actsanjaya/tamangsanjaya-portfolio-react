export function SkillsConstellation({ selectedSkillId, setSelectedSkillId, skills }) {
  const selectedSkill =
    skills.find((skill) => skill.id === selectedSkillId) ??
    skills.find((skill) => skill.core)

  return (
    <div className="skillsConstellation">
      <div className="constellationMap" aria-label="Actuarial automation skill constellation">
        {skills.map((skill, index) => (
          <button
            className={`skillNode ${skill.core ? 'coreNode' : ''} ${
              selectedSkill?.id === skill.id ? 'isSelected' : ''
            }`}
            key={skill.id}
            onClick={() => setSelectedSkillId(skill.id)}
            style={{ '--node-index': index }}
            type="button"
          >
            {skill.label}
          </button>
        ))}
      </div>

      <aside className="skillDetailPanel">
        <span>Selected Skill</span>
        <h3>{selectedSkill.label}</h3>
        <p>{selectedSkill.detail}</p>
      </aside>
    </div>
  )
}
