export function ContactTerminal({
  contactItems,
  focusedContactIndex,
  onSelectContact,
  setFocusedContactIndex,
}) {
  return (
    <div className="contactTerminal" aria-label="Contact terminal">
      <div className="terminalHeader">
        <span></span>
        <span></span>
        <span></span>
        <strong>sanjaya.contact-terminal</strong>
      </div>

      <div className="terminalBody">
        {contactItems.map((item, index) => (
          <button
            className={focusedContactIndex === index ? 'isFocused' : ''}
            data-gesture-contact-index={index}
            data-gesture-target="contact"
            key={item.id}
            onClick={() => onSelectContact(item)}
            onFocus={() => setFocusedContactIndex(index)}
            type="button"
          >
            <span>&gt; {item.command}</span>
            <strong>{item.label}</strong>
            <small>{item.value}</small>
          </button>
        ))}
      </div>
    </div>
  )
}
