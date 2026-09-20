/**
 * Resolves a file inside `public/assets/` so it works whatever `base` Vite is
 * configured with (root, sub-folder or relative). Pass the path *inside* the
 * assets folder, e.g. asset('brands/samsung.png').
 */
export const asset = (path: string): string => `${import.meta.env.BASE_URL}assets/${path}`;

/**
 * 1×1 transparent GIF. The hero and contact artwork use `<picture>` so phones
 * never download the wide-screen images; this placeholder is what phones see.
 */
export const BLANK_GIF = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
