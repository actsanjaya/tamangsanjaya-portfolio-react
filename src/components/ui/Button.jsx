export function Button({
  children,
  className = '',
  href,
  onClick,
  type = 'button',
  variant = 'primary',
}) {
  const buttonClassName = `button button-${variant} ${className}`.trim()

  if (href) {
    return (
      <a className={buttonClassName} href={href} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <button className={buttonClassName} onClick={onClick} type={type}>
      {children}
    </button>
  )
}
