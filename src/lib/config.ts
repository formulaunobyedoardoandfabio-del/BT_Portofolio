export const PLAY_STORE_URL = "#play-store-link"
export const INSTAGRAM_HANDLE = "@bt_formula1"
export const INSTAGRAM_URL = "https://www.instagram.com/bt_formula1/"
export const EMAIL = "bt.formula1@gmail.com"
export const APP_NAME = "B&T App"
export const APP_URL = "https://bt-app-2.vercel.app/"

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

// Sezione "Lavori": una cartella per area, ogni file è un link.
// art: "aurora" | "ember" | "dusk" | "verdant" | "none" (colori della stampa sotto il vetro)
type Art = "aurora" | "ember" | "dusk" | "verdant" | "none"
export const FOLDERS: {
  label: string
  meta: string
  art: Art
  tone: "light" | "dark"
  seed: number
  files: { name: string; meta: string; art: Art; href: string }[]
}[] = [
  {
    label: "L'app",
    meta: "Android · Web",
    art: "ember",
    tone: "light",
    seed: 3,
    files: [
      { name: "B&T App", meta: "Google Play", art: "ember", href: PLAY_STORE_URL },
      { name: "Prova nel browser", meta: "bt-app-2.vercel.app", art: "dusk", href: APP_URL },
    ],
  },
  {
    label: "Reel F1",
    meta: "Instagram · Video",
    art: "aurora",
    tone: "light",
    seed: 7,
    files: REELS.slice(0, 4).map((r) => ({ name: r.title, meta: `Reel ${r.id}`, art: "aurora", href: INSTAGRAM_URL })),
  },
  {
    label: "Brand & UI",
    meta: "Logo · Interfacce",
    art: "dusk",
    tone: "dark",
    seed: 11,
    files: [
      { name: "Logo B&T", meta: "Vettoriale", art: "none", href: "#brand" },
      { name: "Interfacce animate", meta: "UI · UX", art: "verdant", href: `mailto:${EMAIL}` },
      { name: "Prossimamente", meta: "In lavorazione", art: "none", href: INSTAGRAM_URL },
    ],
  },
]

// Recensioni dell'app e del sito. Finché REVIEWS_ARE_EXAMPLES è true il sito mostra un badge
// "Esempi": sostituisci le voci con recensioni vere (es. dal Play Store) e poi mettilo a false.
export const REVIEWS_ARE_EXAMPLES = true
export const REVIEWS: { name: string; handle: string; body: string; source: "App" | "Sito"; stars: number }[] = [
  { name: "Recensione 1", handle: "Play Store", source: "App", stars: 5, body: "Spazio per una recensione vera dell'app dal Play Store." },
  { name: "Recensione 2", handle: "Instagram", source: "Sito", stars: 5, body: "Spazio per un commento reale sul sito o sui reel." },
  { name: "Recensione 3", handle: "Play Store", source: "App", stars: 4, body: "Incolla qui il testo di una recensione dell'app." },
  { name: "Recensione 4", handle: "Email", source: "Sito", stars: 5, body: "Un messaggio ricevuto da chi ha visitato il sito." },
  { name: "Recensione 5", handle: "Play Store", source: "App", stars: 5, body: "Le recensioni si modificano in src/lib/config.ts." },
  { name: "Recensione 6", handle: "Instagram", source: "Sito", stars: 5, body: "Nome, fonte, stelle e testo: tutto in un solo punto." },
]

export const FEATURES = [
  { t: "Veloce", d: "Si apre in un lampo e non ti fa aspettare." },
  { t: "Semplice", d: "Poche mosse, tutto chiaro fin dal primo tap." },
  { t: "Tuo", d: "Personalizzabile, con un look che ti somiglia." },
  { t: "Gratis", d: "Scaricala dal Play Store e provala subito." },
]
