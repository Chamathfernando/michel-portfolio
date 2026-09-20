/**
 * Every image in `src/assets/` is picked up here at build time, so Vite can
 * hash, optimise and cache-bust it. Look one up by its path *inside* the
 * assets folder, e.g. asset('brands/samsung.png') or asset('hero.webp').
 *
 * To swap an image, replace the file in `src/assets/` (keep the file name)
 * or point the entry in `src/data/*.ts` at a new file.
 */
const images = import.meta.glob<string>('../assets/**/*.{webp,png,jpg,jpeg,svg,avif,gif}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export function asset(path: string): string {
  const url = images[`../assets/${path}`];
  if (!url) {
    console.warn(`[asset] "src/assets/${path}" was not found.`);
    return '';
  }
  return url;
}

/**
 * 1×1 transparent GIF. The hero and contact artwork use `<picture>` so phones
 * never download the wide-screen images; this placeholder is what phones see.
 */
export const BLANK_GIF = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
