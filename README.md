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
