# Handoff: Portfolio Gabriel Rakoto

## Overview
Portfolio one-page site (FR/EN) for Gabriel Rakoto — freelance web/SEO services for local Quebec businesses. 4 views: Home, Projects, Services, Contact, sharing a fixed nav + footer.

## About the Design Files
The file in this bundle (`Gabriel Rakoto Portfolio.dc.html`) is a **design reference built in HTML** — a working prototype showing the intended look, content, and interaction behavior, not production code to copy verbatim. The task is to **recreate this design in the target codebase's existing environment** (e.g. React/Next.js, Vue, plain static site) using its established patterns and libraries. If no environment/framework is chosen yet, pick the most appropriate one (a static/Next.js site is a natural fit for this kind of marketing portfolio) and implement the design there.

## Fidelity
**High-fidelity.** Colors, typography, spacing, copy, and interactions in the HTML file are final — recreate pixel-perfectly.

## Screens / Views
Single-page-app style, client-side routed between 4 "pages" (all in one file, toggled by state):

### 1. Home
- Fixed nav bar (logo "GR.", Accueil/Projets/Services/Contact links, FR/EN toggle button) — background blurs/solidifies on scroll.
- Hero: large title, dotted badge "SEO Local · Québec", bottom-left "Travaillons ensemble →" CTA (black bg, inverts to white bg/black text + slight scale on hover), bottom-right floating info card with 3D/canvas element.
- About section: single centered column (max 900px) — no portrait photo yet; the "QUÉBEC, CA · Disponible" tag sits inline next to the "00 — À propos" label. Bio text, skill pills, stats grid. Re-plays its entrance animation every time it scrolls into view (not just once).
- Réalisations (4 featured projects: TBG Paysagiste, Kami Auto Garage, Lotus Impérial, Plomberie Pro): full-viewport scroll-driven stacked reveal — each project slides in/out as you scroll, JS computes opacity/transform per scroll position (see `_setupProjReveal` in the logic class). Each card: laptop-style image mock, title, niche, service tag pills, "Voir le projet →" pill button (only clickable element — opens project's live URL in new tab via `window.open`).
- CTA banner (black full-width block) → goes to Contact.

### 2. Projects (`/projets`)
- Header "02 — Réalisations" + title.
- Same scroll-driven stacked-card reveal technique as Home Réalisations, but for the full project list (JS: `_setupProjectsPageReveal`). Cards are wider layout (image/copy side-by-side), rounded corners, light-grey card background. Only the "Voir le projet →" pill button is clickable — clicking anywhere else on the card does nothing (intentional, avoids accidental navigation).
- Bottom CTA text + "Travaillons ensemble" button → Contact.

### 3. Services (`/services`)
- Curtain-reveal panel effect on entry.
- 3 pricing cards (500$ tier etc.), each: icon/illustration, title, bullet list, price, "Commencer" button (black→white invert hover).

### 4. Contact (`/contact`)
- Left: contact form (name, email, message) → "Envoyer" button (black→white invert hover); on submit shows a black-bordered success confirmation panel.
- Right: subtitle copy, then contact info blocks (Email / Téléphone / LinkedIn), an "ou" divider, then a Calendly booking link button.
- **Real contact info (must be preserved exactly):**
  - Email: `gabrielrakotor40@gmail.com`
  - Phone: `581-979-2198`
  - LinkedIn: `https://www.linkedin.com/in/gabriel-rakoto-708b39351/`

### Footer (all pages)
- Logo + tagline, "Pages" column (links to Home/Projects/Services/Contact), "Contact" column (email, phone, LinkedIn — same as above), copyright line "© 2026 Gabriel Rakoto · Québec, Canada".

## Interactions & Behavior
- **Color inversion hover pattern** used on ALL primary buttons: solid black (`#111111`) background/border with white text → on hover, background goes white, text/border goes black (or vice versa depending on base state). Applied via inline `style` + `style-hover` in the source; recreate as a CSS `:hover` transition (`background-color`/`color` ~0.2–0.25s ease), some with an added `translateY(-3px)` or slight `scale()` lift.
- **Nav links** hover: light-grey (`#F0F0F0`) background pill.
- **Scroll-driven stacked reveal** (Home Réalisations + Projects page): a tall spacer div drives scroll progress; a `position: fixed` stage shows the active card(s), computing per-card opacity/transform from scroll offset in a scroll/rAF listener — no CSS `position: sticky` (deliberately avoided due to gap/flicker issues). Recreate with `IntersectionObserver`/scroll-progress math + `transform`/`opacity`, or a library like GSAP ScrollTrigger/Framer Motion `useScroll`.
- **About section entrance**: re-triggers every time the section re-enters the viewport (not just first mount) — use an IntersectionObserver that resets/re-adds the animation class on each `isIntersecting` toggle, rather than a one-shot "has animated" flag.
- **Language toggle**: FR/EN switch swaps all copy via a translation dictionary (`t.fr` / `t.en` keyed object) — see bottom of the DC file's logic class for the full string tables.
- **Mobile nav**: hamburger opens a full-screen white overlay menu with large stacked page links.

## State Management
- `page`: `'home' | 'projects' | 'services' | 'contact'` — drives which section renders.
- `lang`: `'fr' | 'en'` — selects translation object.
- `menuOpen`: boolean — mobile overlay menu visibility.
- `formSubmitted`: boolean — swaps contact form for the success panel.
- Scroll-driven reveal progress is derived on scroll (not stored in component state) — recompute from scroll position each frame/listener call.

## Design Tokens
- **Colors**: `#111111` (primary black/text), `#FFFFFF` (white bg), `#F7F7F7`/`#F0F0F0` (light grey fills/hover), `#EDEDED`/`#E0E0E0`/`#D8D8D8`/`#DADADA` (borders), `#444`/`#555`/`#666`/`#888` (secondary text), `#BCBCBC`/`#B0B0B0`/`#C6C6C6`/`#D2D2D2` (muted/labels). No color accent — pure black/white/grey palette by design.
- **Typography**: Headings/UI labels in **Syne** (weight 800 for headings/buttons, 700 for smaller labels); body copy in **DM Sans** (weight 300–500). Google Fonts.
- **Spacing/sizing**: fluid `clamp()` used throughout for responsive type and padding (e.g. hero title `clamp(44px,7vw,96px)`); section horizontal padding `clamp(20px,5vw,72px)`.
- **Radius**: pill buttons `border-radius: 100px`; project cards on the Projects page `28px`; nav pills `100px`.
- **Borders**: `1px`–`1.5px` solid, mostly `#111111` (buttons/cards) or light greys (`#EDEDED`/`#E0E0E0`) for dividers.

## Responsive / Mobile
A single `@media (max-width: 820px)` block in the file's `<helmet>` carries all mobile overrides — recreate these behaviors:
- **Hero**: absolute positioning is dropped; blocks stack in a flex column with explicit `order` — badge → title → 3D GR. canvas (centered, capped at `min(62vw,260px)`) → CTA button → info card (left-aligned, full width). Prevents the 3D logo overlapping the headline.
- **Home project cards**: card `min(520px,92vw)`, screenshot in a `16/10` box with `background-size: contain` so the full screenshot shows instead of being cropped; tighter info padding, 19px title.
- **Projects page cards**: `max-height: 86vh` with `overflow-y: auto`, condensed padding/type, image capped at `30vh` — so the "Voir le projet" button stays reachable.
- **Services page**: grid collapses to one column; cards separated by a top border instead of vertical left borders, min-heights removed, page title 34px.

## Project Data
Each project entry (in the FR/EN translation tables): `{ tag, tagBg, title, niche, desc, services[], img, url }`. The `url` opens in a new tab from the "Voir le projet" button (`window.open(url, '_blank')`) — the ONLY clickable element on a card.
- TBG Paysagiste — landscaping, Québec QC
- Kami Auto Garage — auto, Québec QC
- Lotus Impérial — Filipino restaurant, Montréal QC — `https://delice-de-manille.vercel.app/`
- Plomberie Pro — plumbing, Québec QC — `https://designhandoffplomberiepro.vercel.app/`

## Assets
- `assets/tbg-paysagiste.png`, `assets/kami-auto-garage.png`, `assets/lotus-imperial.png`, `assets/plomberie-pro.png` — used as the "laptop screen" mockup image per project card. Copied into this handoff's `assets/` folder.
- No icon font/library — a couple of inline SVG illustrations in the Services cards.

## Files
- `Gabriel Rakoto Portfolio.dc.html` — full source (single file: template + logic class + FR/EN translation tables at the bottom).
- `assets/` — project screenshot images referenced by the design.
