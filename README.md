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
   │  ├─ CaseStudyModal.tsx   Native <dialog> case-study popup (loaded on demand as its own JS chunk)
   │  ├─ Contact.tsx          Social links + contact form (validation, confirmation)
   │  ├─ ContactSuccessDialog.tsx  "Message sent successfully" popup
   │  ├─ Footer.tsx
   │  ├─ LazyImage.tsx        <img loading="lazy"> that fades in once loaded
   │  ├─ SectionMarker.tsx    "01 ── About" style section header
   │  └─ icons.tsx            Inline SVG icons
   ├─ data/                   ← content you edit
   │  ├─ works.ts             Projects, case-study text, pages of the grid
   │  ├─ brands.ts            Brand logo list
   │  ├─ about.ts             The four words shown between the About text and image on wide screens
   │  └─ site.ts              Nav items and social-media links
   ├─ hooks/
   │  ├─ useAboutFit.ts       Sizes the About image and decides when to stack
   │  ├─ useCleanHashLinks.ts  In-page links scroll to the section, then remove "#section" from the URL
   │  ├─ useScrollReveal.ts   Scroll-triggered animations (marks elements as on screen / off screen)
   │  ├─ useScrollSpy.ts      Highlights the current section in the nav
   │  └─ useMediaQuery.ts
   ├─ context/                Shared "wide / stacked" layout state
   ├─ styles/
   │  ├─ base.css             Colours, fonts, resets, modal styles
   │  ├─ desktop.css          Tablet + desktop design (≥ 48rem)
   │  ├─ mobile.css           Phone design (< 48rem)
   │  └─ reveal.css           Scroll animations + lazy-image fade
   └─ utils/
      ├─ validation.ts        Contact-form field rules (names, email, message)
      ├─ asset.ts             Looks up a file in src/assets, e.g. asset('brands/samsung.png')
      └─ reveal.ts            reveal('up', 2) → props that animate an element in when it is reached
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

## Scroll animations and lazy loading

**Animations play when a section is reached, not only on page load.** Every animated element carries
`data-reveal="<effect>"` (added with the `reveal()` helper). `useScrollReveal()` (called once in `App.tsx`) watches them with an
`IntersectionObserver`: when an element scrolls into view it gets `data-in-view="true"` and `src/styles/reveal.css` plays its
entrance; once it has left the screen it is reset, so it plays again the next time you scroll back to it.

```tsx
<h2 {...reveal('up', 1)}>…</h2>     // effect, then a "step" that staggers siblings (each step = 90 ms)
```

- **Effects:** `up`, `down`, `left`, `right`, `zoom`, `pop`, `fade`, `zoom-out`. Their start positions and timings are at the top of `reveal.css`.
- **Play once instead of every time:** set `REPLAY_ON_REENTRY = false` in `src/hooks/useScrollReveal.ts`.
- **Animate something new:** spread `{...reveal('up')}` onto it. Elements that appear later (like the next page of Work cards) are picked up automatically.
- **Reduced motion:** visitors who ask their system for reduced motion get everything shown immediately, with no movement.

**Lazy loading**

- The About picture and every Work card use `<LazyImage>` (`loading="lazy"`): the browser only downloads them as they approach the screen,
  and they fade in when ready. Always give lazy images `width` and `height` so the page never jumps.
- Brand logos and the contact leaf are `loading="lazy"` too; the hero artwork is loaded first (`fetchPriority="high"`).
- The case-study popup is a separate JavaScript chunk (`React.lazy`). It is fetched the first time you hover or focus a card, so it is
  ready by the time it is clicked.

## Contact form: validation and confirmation

The form is **front-end only** for now (there is no backend yet):

- **Validation** (`src/utils/validation.ts`): first and last name are required and can't contain numbers (letters from any alphabet, spaces, hyphens and apostrophes are fine); the email must look like `name@example.com`; the message can't be blank. Errors appear under each field, clear as soon as they're fixed, and the first invalid field gets focus.
- **Confirmation:** when every field is valid, a "Message sent successfully" dialog opens (`src/components/ContactSuccessDialog.tsx`) and the form is cleared. Close it with the button, **Esc**, or a click outside.

When you have a backend, send the data in `onSubmit` in `src/components/Contact.tsx`, just before the dialog opens, for example:

```ts
await fetch('https://your-endpoint.example/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(values),
});
```

(Make `onSubmit` `async`; if the request fails, set an error message instead of opening the dialog. Repeat the validation on the server.)

## Accessibility notes

- Semantic landmarks, visible focus rings and `aria-current` on the active nav link.
- The phone menu and case-study popup trap focus and close with **Esc**.
- In-page links (`#about`, `#work`, …) scroll smoothly, then the `#section` is removed from the address bar; the section gets keyboard focus. To keep the hash in the URL, delete the `useCleanHashLinks()` call in `App.tsx`.
- Animations (scroll reveals, carousel fade, grid fade, smooth scroll) are disabled when the visitor prefers reduced motion.

## Troubleshooting

- **Fonts look different offline** — the Google Fonts link in `index.html` needs internet access; the page falls back to Georgia / Arial without it.
- **Blank images after deploying to a sub-folder** — make sure `base` in `vite.config.ts` is still `'./'`.
- **An image doesn't show / `[asset] ... was not found` in the console** — the file name in `src/data/*.ts` doesn't match a file in `src/assets/` (names are case-sensitive). New or renamed image files are picked up automatically by the dev server; for a production site, run `npm run build` again.
- **`npm install` complains about the Node version** — upgrade to Node 20.19+ or 22.12+.
