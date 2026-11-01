export const PLAY_STORE_URL = "#play-store-link"
export const INSTAGRAM_HANDLE = "@bt_formula1"
export const INSTAGRAM_URL = "https://www.instagram.com/bt_formula1/"
export const EMAIL = "bt.formula1@gmail.com"
export const APP_NAME = "B&T App"

// Contatore follower: se FOLLOWERS_ENDPOINT è vuoto il sito mostra un valore dimostrativo.
// L'endpoint deve rispondere con JSON { "followers": 12345 } (vedi useFollowers.ts).
export const FOLLOWERS_ENDPOINT = ""
export const FOLLOWERS_FALLBACK = 12480
export const FOLLOWERS_POLL_MS = 30000

// Metti i video in public/reels/ e inserisci qui il percorso, es. src: "/reels/reel-1.mp4".
export const REELS: { id: string; title: string; src?: string }[] = [
  { id: "01", title: "Pole position" },
  { id: "02", title: "Pit stop" },
  { id: "03", title: "Dietro le quinte" },
  { id: "04", title: "Gran Premio" },
  { id: "05", title: "Onboard" },
  { id: "06", title: "Podio" },
]

export const PROJECTS = [
  { n: "01", title: "B&T App", tag: "Android · Play Store", hue: 48, cta: "Scarica su Google Play", href: PLAY_STORE_URL, desc: "La nostra app per Android, veloce e semplice da usare. Disponibile sul Play Store." },
  { n: "02", title: "Reel Formula 1", tag: "Instagram · Video", hue: 225, cta: "Guarda su Instagram", href: INSTAGRAM_URL, desc: "Video e contenuti sulla Formula 1 pubblicati ogni settimana su @bt_formula1." },
  { n: "03", title: "Brand Identity", tag: "Logo · Visual", hue: 270, cta: "Scrivici", href: `mailto:${EMAIL}`, desc: "Il marchio B&T: una B spezzata e una T in corsa, pensata per muoversi." },
  { n: "04", title: "Interfacce", tag: "UI · UX", hue: 0, cta: "Scrivici", href: `mailto:${EMAIL}`, desc: "Interfacce animate e interazioni curate nei minimi dettagli." },
  { n: "05", title: "Prossimamente", tag: "In lavorazione", hue: 145, cta: "Resta aggiornato", href: INSTAGRAM_URL, desc: "Nuovi progetti in arrivo. Segui l'account per scoprirli per primo." },
]

export const FEATURES = [
  { t: "Veloce", d: "Si apre in un lampo e non ti fa aspettare." },
  { t: "Semplice", d: "Poche mosse, tutto chiaro fin dal primo tap." },
  { t: "Tuo", d: "Personalizzabile, con un look che ti somiglia." },
  { t: "Gratis", d: "Scaricala dal Play Store e provala subito." },
]
