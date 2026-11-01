import logoUrl from "../assets/bt-logo-white.png"

export const LOGO_URL = logoUrl

export default function Logo({
  className = "",
  tone = "light",
}: {
  className?: string
  tone?: "light" | "dark"
}) {
  return (
    <span className={`block aspect-square overflow-hidden ${className}`} role="img" aria-label="Logo B&T">
      <img
        src={logoUrl}
        alt=""
        draggable={false}
        className={`h-full w-full max-w-none scale-[2.6] select-none ${
          tone === "light" ? "invert mix-blend-screen" : "mix-blend-multiply"
        }`}
        style={{ transformOrigin: "51% 51%" }}
      />
    </span>
  )
}
