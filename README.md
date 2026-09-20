# Michel Nugawela — Portfolio (React + TypeScript + Vite)

A responsive, single-page portfolio built with **React 19**, **TypeScript** and **Vite**.
It is a direct conversion of the original hand-written HTML page: same design, same behaviour,
now split into typed components, hooks and data files.

One codebase serves two designs:

| Screen | Design |
| --- | --- |
| **Phone** (under 768px / `48rem`) | Sticky header with hamburger + full-screen menu, plaque quote, 2-up work grid, swipeable brand row, stacked contact |
| **Tablet + desktop** (`48rem` and up) | Full-width fluid layout, looping brand carousel, 3/4-column work grid, side-by-side contact |

Between roughly 768px and 900px the About, brands and contact sections automatically switch to a
stacked, phone-style layout whenever the About image would otherwise collide with the text.

---

## Requirements

- **Node.js 20.19+** (or 22.12+) — check with `node -v`
- **npm** (bundled with Node). `pnpm` or `yarn` work too.

## Run it

```bash
# 1. install dependencies (once)
npm install

# 2. start the dev server with hot reload
npm run dev
```

Open the URL Vite prints (normally <http://localhost:5173>).

### All scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot module reload |
| `npm run build` | Type-checks (`tsc`) then creates the production build in `dist/` |
| `npm run preview` | Serves the built `dist/` locally (default <http://localhost:4173>) to test the real build |
| `npm run typecheck` | TypeScript type-check only |

## Build and deploy

```bash
npm run build
```

`dist/` is a plain static site. Upload its contents to any static host (Netlify, Vercel, Cloudflare Pages,
GitHub Pages, S3, a shared web host, nginx…). `vite.config.ts` uses `base: './'`, so the build works from a
domain root **or** any sub-folder without changes. If you always deploy at the domain root you may switch it to `'/'`.

## Project structure

```
├─ index.html                 Vite entry: page title, meta description, Google Fonts link
└─ src/
   ├─ assets/                 Images, bundled and cache-busted by Vite (hero, work photos…)
   │  └─ brands/              Client logos for "Brands I've worked with"
   ├─ main.tsx                Mounts <App/> and loads the stylesheets
   ├─ App.tsx                 Page layout, phone-menu state, scroll-spy
   ├─ components/
   │  ├─ Header.tsx           Logo, desktop nav, hamburger button
   │  ├─ MobileMenu.tsx       Full-screen phone menu (focus trap, Esc to close)
   │  ├─ Hero.tsx
   │  ├─ About.tsx            Image height follows the text height; on wide screens a themes list fills the gap
   │  ├─ Brands.tsx           Desktop carousel / phone swipe row
   │  ├─ Work.tsx             Paginated grid + opens the modal
   │  ├─ CaseStudyModal.tsx   Native <dialog> case-study popup
   │  ├─ Contact.tsx          Social links + contact form
   │  ├─ Footer.tsx
   │  ├─ SectionMarker.tsx    "01 ── About" style section header
   │  └─ icons.tsx            Inline SVG icons
   ├─ data/                   ← content you edit
   │  ├─ works.ts             Projects, case-study text, pages of the grid
   │  ├─ brands.ts            Brand logo list
   │  ├─ about.ts             The four words shown between the About text and image on wide screens
   │  └─ site.ts              Nav items and social-media links
   ├─ hooks/
   │  ├─ useAboutFit.ts       Sizes the About image and decides when to stack
   │  ├─ useScrollSpy.ts      Highlights the current section in the nav
   │  └─ useMediaQuery.ts
   ├─ context/                Shared "wide / stacked" layout state
   ├─ styles/
   │  ├─ base.css             Colours, fonts, resets, modal styles
   │  ├─ desktop.css          Tablet + desktop design (≥ 48rem)
   │  └─ mobile.css           Phone design (< 48rem)
   └─ utils/asset.ts          Looks up a file in src/assets, e.g. asset('brands/samsung.png')
```

## Editing content

**Text** (hero, about, contact copy) lives directly in the components: `Hero.tsx`, `About.tsx`, `Contact.tsx`, `Footer.tsx`.

**Brand logos** — replace the files in `src/assets/brands/` (keep the names) or edit `src/data/brands.ts`.
Add, remove or reorder entries freely; the carousel, dots and swipe row adapt automatically.
Use transparent logos, roughly 2.4:1 to 3:1 wide, about 256px tall or larger (PNG, SVG or WebP).

**Work projects** — edit `src/data/works.ts`:

1. Add the image to `src/assets/`.
2. Add an entry to `WORKS` (file name, size, alt text, and the case-study title / category / year / subtitle / description shown in the popup).
3. Reference its key in `PAGES` (12 projects per page). Add another array to `PAGES` for a third page, and update `TOTAL_WORKS`.

**Social links** — set the real profile URLs in `src/data/site.ts` (`SOCIAL_LINKS`; they are `#` placeholders now).

**Colours, fonts, spacing** — the palette and font stacks are CSS variables at the top of `src/styles/base.css`
(`--terracotta`, `--sage`, `--charcoal`, `--f-serif`, …). The phone design overrides the fonts in `src/styles/mobile.css`.
Fonts are loaded from Google Fonts in `index.html`.

**Hero and contact artwork** — `src/assets/hero.webp`, `hero-1600.webp` and `leaf.webp`. Phones never download these
(they use a `<picture>` source that only applies at `48em` and up).

## Making the contact form actually send

The form validates and shows a thank-you message, but it is **front-end only**. In `src/components/Contact.tsx`,
inside `onSubmit`, send the data to your form service before showing the message, for example:

```ts
const data = Object.fromEntries(new FormData(form));
await fetch('https://your-endpoint.example/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
```

(Make `onSubmit` `async`, and handle errors by setting a different status message.)

## Accessibility notes

- Semantic landmarks, visible focus rings and `aria-current` on the active nav link.
- The phone menu and case-study popup trap focus and close with **Esc**.
- Animations (carousel fade, grid fade, smooth scroll) are disabled when the visitor prefers reduced motion.

## Troubleshooting

- **Fonts look different offline** — the Google Fonts link in `index.html` needs internet access; the page falls back to Georgia / Arial without it.
- **Blank images after deploying to a sub-folder** — make sure `base` in `vite.config.ts` is still `'./'`.
- **An image doesn't show / `[asset] ... was not found` in the console** — the file name in `src/data/*.ts` doesn't match a file in `src/assets/` (names are case-sensitive). New or renamed image files are picked up automatically by the dev server; for a production site, run `npm run build` again.
- **`npm install` complains about the Node version** — upgrade to Node 20.19+ or 22.12+.
