export function PlayerAvatar({ bounds, direction, isMoving, position }) {
  return (
    <div
      className={`playerAvatar is-${direction} ${isMoving ? 'isMoving' : ''}`}
      style={{
        left: `${(position.x / bounds.width) * 100}%`,
        top: `${(position.y / bounds.height) * 100}%`,
      }}
      aria-label="Player avatar"
    >
      <span className="avatarShadow"></span>
      <span className="avatarBody">
        <span className="avatarFace"></span>
        <span className="avatarDirection"></span>
      </span>
    </div>
  )
}
