import type { ReactNode } from "react"

function Icon({ children, size = 24 }: { children: ReactNode; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

type P = { size?: number }

export const IconArrowUpRight = (p: P) => (
  <Icon {...p}>
    <path d="M17 7l-10 10" />
    <path d="M8 7l9 0l0 9" />
  </Icon>
)
export const IconArrowUp = (p: P) => (
  <Icon {...p}>
    <path d="M12 5l0 14" />
    <path d="M18 11l-6 -6l-6 6" />
  </Icon>
)
export const IconInstagram = (p: P) => (
  <Icon {...p}>
    <path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
    <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
    <path d="M16.5 7.5v.01" />
  </Icon>
)
export const IconPlay = (p: P) => (
  <Icon {...p}>
    <path d="M4 3.71v16.58a.7 .7 0 0 0 1.05 .6l15.03 -8.29a.7 .7 0 0 0 0 -1.2l-15.03 -8.29a.7 .7 0 0 0 -1.05 .6z" />
    <path d="M15 9l-10.8 11.5" />
    <path d="M4.2 3.5l10.8 11.5" />
  </Icon>
)
export const IconMail = (p: P) => (
  <Icon {...p}>
    <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
    <path d="M3 7l9 6l9 -6" />
  </Icon>
)
export const IconHome = (p: P) => (
  <Icon {...p}>
    <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
  </Icon>
)
export const IconUser = (p: P) => (
  <Icon {...p}>
    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
  </Icon>
)
export const IconFolder = (p: P) => (
  <Icon {...p}>
    <path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" />
  </Icon>
)
export const IconPhone = (p: P) => (
  <Icon {...p}>
    <path d="M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14z" />
    <path d="M11 4h2" />
    <path d="M12 17v.01" />
  </Icon>
)
export const IconStar = (p: P) => (
  <Icon {...p}>
    <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
  </Icon>
)
export const IconGlobe = (p: P) => (
  <Icon {...p}>
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
    <path d="M3.6 9h16.8" />
    <path d="M3.6 15h16.8" />
    <path d="M11.5 3a17 17 0 0 0 0 18" />
    <path d="M12.5 3a17 17 0 0 1 0 18" />
  </Icon>
)
export const IconPlus = (p: P) => (
  <Icon {...p}>
    <path d="M12 5l0 14" />
    <path d="M5 12l14 0" />
  </Icon>
)
export const IconSparkles = (p: P) => (
  <Icon {...p}>
    <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2z" />
    <path d="M4 10a6 6 0 0 0 6 -6a6 6 0 0 0 6 6a6 6 0 0 0 -6 6a6 6 0 0 0 -6 -6z" />
  </Icon>
)
