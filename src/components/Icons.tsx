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
export const IconSparkles = (p: P) => (
  <Icon {...p}>
    <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2z" />
    <path d="M4 10a6 6 0 0 0 6 -6a6 6 0 0 0 6 6a6 6 0 0 0 -6 6a6 6 0 0 0 -6 -6z" />
  </Icon>
)
