import { LOGO_PATH, LOGO_VIEWBOX } from "../lib/logo"

export default function Logo({ className = "", title = "Logo B&T" }: { className?: string; title?: string }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} role="img" aria-label={title} fill="currentColor">
      <path d={LOGO_PATH} fillRule="evenodd" />
    </svg>
  )
}
