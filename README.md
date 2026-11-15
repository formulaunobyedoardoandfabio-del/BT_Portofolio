# B&T Portfolio

Versione esportata da Figma Make del portfolio B&T.

## Avvio locale

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## Logo

Il logo B&T è vettoriale in `src/lib/logo.ts` (tracciato SVG ricavato dal PNG originale `src/assets/bt-logo-white.png`).
Lo usano la navbar (`Logo.tsx`), il logo 3D estruso dell'hero (`three/HeroScene.tsx`), lo zoom del marchio (`BrandPortal.tsx`) e la favicon (`public/favicon.svg`).

## Componenti animati (`src/components/ui/`)

| Componente | Dove | Cosa fa |
| --- | --- | --- |
| `DotField` | Sfondo dell'hero | Membrana di punti a mezzatinta: uno swipe lascia una scia, un click manda un'onda (KokonutUI, MIT) |
| `GlyphBackground` | Sezione "Piede a fondo" | Campo di caratteri ASCII con forme colorate e bagliore sotto il mouse |
| `GlassFolder` | Sezione "Lavori" | Cartelle di vetro: si inclinano al passaggio e si aprono mostrando i link |
| `Marquee` (3D) | Sezione "Recensioni" | Colonne di recensioni che scorrono in prospettiva, si fermano al passaggio |
| `SocialFlipButton` | Contatti | Lettere "CIAO" che si girano e mostrano Instagram, email, Play Store e app web |
| `Dock` | Barra in basso (desktop) | Navigazione in stile macOS con ingrandimento e sezione attiva |
| `SpecialText` | Etichette `( 01 ) …` | Effetto "decodifica" in stile codice |
| `RevealText` | Titoli "Lavori" e "Dicono di noi" | Lettere che entrano a molla e si colorano al passaggio |

Contenuti da modificare in `src/lib/config.ts`: `FOLDERS` (cartelle e file della sezione Lavori) e `REVIEWS`.
Le recensioni attuali sono **segnaposto**: sostituiscile con recensioni vere e imposta `REVIEWS_ARE_EXAMPLES = false` per togliere il badge "Esempi".

## GitHub Pages

Il workflow `.github/workflows/deploy-pages.yml` pubblica automaticamente la versione di `main` su GitHub Pages.

Repository:

```text
https://github.com/formulaunobyedoardoandfabio-del/BT_Portofolio
```

URL previsto:

```text
https://formulaunobyedoardoandfabio-del.github.io/BT_Portofolio/
```

Se GitHub Pages non è ancora attivo, apri **Settings → Pages**, seleziona **GitHub Actions** come sorgente e rilancia il workflow.

Le chiavi private, come `APIFY_API_TOKEN`, non devono essere inserite nel frontend statico. Per API private serve un endpoint server-side separato.
