import sleepingMascot from '../../../assets/mascot.webp'

export function HeroStaticMascot() {
  return (
    <img
      alt=""
      aria-hidden="true"
      className="heroStaticMascot"
      draggable="false"
      decoding="async"
      loading="lazy"
      src={sleepingMascot}
    />
  )
}
