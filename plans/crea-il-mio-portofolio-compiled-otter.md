# Portfolio B&T — piano

# FASE 2 — Animazioni, colori e caricamento (da approvare)

## Context
Il sito esiste già (hero 3D, marquee, reel impilati, contatore follower). L'utente vuole che scelga animazioni più d'impatto, la palette migliore e un nuovo caricamento. Il filo conduttore è il tema Formula 1 dell'account `@bt_formula1`: ogni effetto nuovo deve ricordare velocità, semafori, giri e telemetria.

## Colori (palette già nei token di `src/index.css`)
Regola: nero e bianco sono la base, ogni sezione ha un solo colore protagonista.
- **Giallo `#ffd400`**: colore del marchio, solo per CTA, numeri e dettagli da cliccare.
- **Blu `#1f4bff` e viola `#8a3dff`**: atmosfera, bagliori, gradienti e luci 3D.
- **Rosso `#ff2a2a`**: i semafori del caricamento, errori e "live".
- **Verde `#19e36b`**: "via libera", stato live e conferme.
- **Capitoli di colore**: lo sfondo cambia mentre si scorre (nero, blu, nero, bianco, nero, giallo nel footer), con una tendina di colore tra una sezione e l'altra. Testo sempre nero su giallo/bianco e bianco su nero/blu/viola per tenere il contrasto.

## Caricamento: semafori di partenza
Sostituisce il preloader attuale (`src/components/Preloader.tsx`).
1. Sfondo nero, cinque luci rosse che si accendono una alla volta (come il via di un Gran Premio).
2. Sotto, un cronometro `0:00.000` con il contatore a rulli già presente (`SpinningCounter.tsx`).
3. Tutte le luci si spengono insieme ("lights out"): il cronometro si ferma, il logo B&T compare a scatto e lo schermo si apre in due metà verso l'alto e il basso.
4. Dura circa 2,5 secondi, si salta con un click, e dalla seconda visita nella sessione (`sessionStorage`) è più breve.
5. Con `prefers-reduced-motion` le luci si accendono senza animazione.

## Animazioni da aggiungere (in ordine di impatto)
1. **Tracciato che si disegna con lo scroll**: sostituire la barra di avanzamento in `Nav.tsx` con un piccolo circuito SVG; un punto colorato percorre il tracciato mentre scorri (`stroke-dashoffset`).
2. **Contagiri legato allo scroll**: lancetta e numeri che salgono con la velocità di scroll, fissi in basso a destra (nuovo `components/Rev.tsx`).
3. **Scia del mouse a colori**: nastro in canvas che segue il cursore e cambia colore nella palette, sopra l'hero (nuovo `components/Trail.tsx`).
4. **Pneumatico che rotola**: nello scroll tra hero e "Chi siamo", un pneumatico 3D (riuso `Tyre` in `three/HeroScene.tsx`) attraversa lo schermo e scatena il reveal del testo.
5. **Titoli con maschera e cambio colore per lettera**: estendere `Chars` in `Reveal.tsx` con colori diversi per lettera mentre il titolo entra.
6. **Banda a scacchi**: nuova striscia a scacchi bianchi e neri che scorre accanto al marquee (`Marquee.tsx`).
7. **Card "Lavori" che si aprono a schermo intero**: click sulla card, espansione con transizione condivisa e dettaglio del progetto (`Work.tsx`).
8. **Footer interattivo**: lettere di "Parliamo insieme" che si scostano dal mouse e coriandoli nei colori della palette quando si copia l'email (`Contact.tsx`).
9. **Click con scintilla**: piccolo scoppio di particelle colorate su ogni CTA (`Magnetic.tsx`).

## Prestazioni e accessibilità
Caricare il 3D solo quando serve (già `lazy`), mettere in pausa i canvas fuori schermo, ridurre le particelle su mobile e disattivare scia, cursore e contagiri con `prefers-reduced-motion` o dispositivi touch.

## Verifica
Controllare nel browser: caricamento (anche il salto e il reduced-motion), cambio colore tra le sezioni, tracciato e contagiri durante lo scroll, mobile (~390px) e assenza di errori in console. Solo typecheck mirato se serve.

---
# FASE 1 — Piano originale (già realizzato)

## Context
Il progetto è uno scaffold vuoto (`src/App.tsx` restituisce un div vuoto, `src/index.css` contiene solo `@import 'tailwindcss'`). L'utente vuole un portfolio "B&T" fortemente animato, con interazioni col mouse e scroll ispirate a landonorris.com e Awwwards (solo come idee, non una copia). Il sito deve promuovere l'app sul Play Store e l'account Instagram. L'immagine allegata è il logo B&T: segno bianco su nero, usato come contenuto (asset), non come riferimento di layout.

## Stance
**Kinetic**, su fondo nero come il logo. Testo off-white, un solo accento acido (lime `#C6FF3D`) per CTA e hover. Il movimento è l'elemento principale.
- Font (Google, `@import` in cima a `src/index.css`): **Unbounded** per i titoli (geometrico, largo, giocoso), **Inter Tight** per il corpo, **DM Mono** per le etichette.
- Token CSS in `:root` di `src/index.css`, mappati in `@theme`: background, foreground, muted, accent, border.

## Asset
- `figma attachments get b14d2537-bb6b-4996-8964-f4f362adb3b3 --dest src/assets/bt-logo.jpg`. Il logo è su fondo nero, quindi si fonde con la pagina.
- Icone: Tabler (`@tabler/icons-react`, da installare): brand-google-play, brand-instagram, arrow-up-right, device-mobile, sparkles, mail.

## Struttura file (`src/`)
- `App.tsx`: compone le sezioni e monta cursore, progress bar e smooth scroll.
- `components/Cursor.tsx`: cursore custom con cerchio che segue il mouse con lerp. Su link e card diventa un'etichetta ("Apri", "Drag") e ha effetto magnetico sui pulsanti. Disattivato su touch.
- `components/Preloader.tsx`: il logo B&T si rivela con clip-path e contatore 0–100, poi la tendina sale.
- `components/Nav.tsx`: header fisso con logo, link e pill "Scarica l'app". Menu a schermo intero su mobile.
- `components/Hero.tsx`: titolo gigante con reveal lettera per lettera. Il logo B&T segue il mouse con parallax/tilt e le parole hanno uno stretch al passaggio del cursore. Sotto, due CTA magnetiche (Play Store, Instagram).
- `components/Marquee.tsx`: banda di testo che scorre, con velocità e direzione legate alla velocità di scroll.
- `components/About.tsx`: paragrafo che si colora parola per parola mentre si scorre (scroll-linked), con contatori animati.
- `components/Work.tsx`: sezione progetti con scroll orizzontale pinnato (sticky, `translateX` legato allo scroll). Le card hanno tilt 3D e hover che rivela l'immagine.
- `components/AppShowcase.tsx`: sezione dedicata all'app del Play Store. Mockup telefono che ruota e si ingrandisce con lo scroll, feature che compaiono in sequenza, badge "Disponibile su Google Play". Link `PLAY_STORE_URL`.
- `components/Instagram.tsx`: griglia di post finti con hover parallax e CTA "Seguimi" verso `INSTAGRAM_URL`.
- `components/Contact.tsx` + footer: testo gigante con hover che cambia, email, social, bottone "torna su".
- `hooks/useSmoothScroll.ts`: scroll con inerzia (lerp su `requestAnimationFrame`, senza dipendenze extra). Se instabile, ripiego su scroll nativo.
- `hooks/useReveal.ts`: IntersectionObserver per i reveal.
- `lib/config.ts`: `PLAY_STORE_URL`, `INSTAGRAM_URL`, `EMAIL` e testi, per modificarli in un punto solo.

## Animazioni
Libreria: `motion` (`motion/react`) per `useScroll`, `useTransform`, `useSpring` e reveal. Il resto è CSS puro. Va rispettato `prefers-reduced-motion`, che disattiva cursore, smooth scroll e parallax. Su ~1000px le griglie collassano e lo scroll orizzontale diventa verticale.

## Contenuti segnaposto (da confermare)
Link Play Store e Instagram, nome e descrizione dell'app, progetti, bio ed email non sono stati forniti. Userò testi italiani plausibili con link `#` ben visibili in `config.ts`. Le immagini dei progetti e dei post vengono da Unsplash.

## Verifica
Avviare il dev server già in esecuzione e controllare nel browser: preloader, cursore, reveal dell'hero, marquee legata allo scroll, scroll orizzontale pinnato, sezione app, layout mobile (~390px) e reduced-motion. Eseguire solo un typecheck mirato se compaiono errori.
