export function Card({ children, className = '', id }) {
  return (
    <article className={`panel ${className}`.trim()} id={id}>
      {children}
    </article>
  )
}
