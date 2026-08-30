const groupInputs = (inputs) => {
  const groups = new Map()

  inputs.forEach((input) => {
    const key = input.group ?? 'Inputs'
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(input)
  })

  return [...groups.entries()]
}

export function InputsPanel({ inputs, onChange, onReset, values }) {
  return (
    <form className="labInputs" onSubmit={(event) => event.preventDefault()}>
      <div className="labInputsHeader">
        <h2>Inputs</h2>
        <button className="labGhostButton" onClick={onReset} type="button">
          Reset
        </button>
      </div>

      {groupInputs(inputs).map(([group, groupItems]) => (
        <fieldset className="labInputGroup" key={group}>
          <legend>{group}</legend>

          {groupItems.map((input) => {
            const id = `lab-input-${input.key}`

            return (
              <div className="labInputField" key={input.key}>
                <label htmlFor={id}>
                  {input.label}
                  {input.unit ? <span className="labInputUnit">{input.unit}</span> : null}
                </label>

                {input.type === 'select' ? (
                  <select
                    id={id}
                    onChange={(event) => onChange(input.key, event.target.value)}
                    value={values[input.key]}
                  >
                    {input.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={id}
                    inputMode="decimal"
                    max={input.max}
                    min={input.min}
                    onChange={(event) => onChange(input.key, event.target.value)}
                    step={input.step}
                    type="number"
                    value={values[input.key]}
                  />
                )}

                {input.help ? <p className="labInputHelp">{input.help}</p> : null}
              </div>
            )
          })}
        </fieldset>
      ))}
    </form>
  )
}
