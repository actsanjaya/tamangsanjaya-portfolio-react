export function RadialMenu({ focusedIndex, items, onClose, onFocusItem, onSelect }) {
  return (
    <div
      aria-labelledby="radial-menu-title"
      aria-modal="true"
      className="radialOverlay"
      role="dialog"
    >
      <div className="radialMenu">
        <div className="radialCore">
          <span id="radial-menu-title">Command Menu</span>
          <button onClick={onClose} type="button">
            Close
          </button>
        </div>

        {items.map((item, index) => {
          const angle = -90 + (360 / items.length) * index

          return (
            <button
              aria-current={focusedIndex === index ? 'true' : undefined}
              className="radialItem"
              data-gesture-menu-index={index}
              data-gesture-target="menu"
              key={item.id}
              onFocus={() => onFocusItem(index)}
              onClick={() => onSelect(item)}
              style={{ '--menu-angle': `${angle}deg` }}
              type="button"
            >
              {item.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
