export function CareerTimeline({ activeIndex, items, setActiveIndex }) {
  const activeItem = items[activeIndex]

  const move = (direction) => {
    setActiveIndex((current) => {
      const nextIndex = current + direction
      if (nextIndex < 0) {
        return items.length - 1
      }
      if (nextIndex >= items.length) {
        return 0
      }
      return nextIndex
    })
  }

  return (
    <div className="careerTimeline">
      <div className="timelineRail" aria-label="Career timeline">
        {items.map((item, index) => (
          <button
            aria-current={activeIndex === index ? 'step' : undefined}
            className="timelineDot"
            key={item.title}
            onClick={() => setActiveIndex(index)}
            type="button"
          >
            <span>{index + 1}</span>
            {item.title}
          </button>
        ))}
      </div>

      <article className="timelineDetail">
        <span>
          {String(activeIndex + 1).padStart(2, '0')} /{' '}
          {String(items.length).padStart(2, '0')}
        </span>
        <h3>{activeItem.title}</h3>
        <p>{activeItem.detail}</p>
        <div className="timelineActions">
          <button onClick={() => move(-1)} type="button">
            Previous
          </button>
          <button onClick={() => move(1)} type="button">
            Next
          </button>
        </div>
      </article>
    </div>
  )
}
