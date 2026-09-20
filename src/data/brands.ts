export interface Brand {
  name: string;
  /** File inside public/assets/brands/ — replace the image, keep the name (or change it here). */
  file: string;
  width: number;
  height: number;
}

/**
 * Client logos for "Brands I've worked with".
 * Add, remove or reorder freely: the carousel, dots and phone swipe row adapt.
 * Use transparent logos, roughly 2.4:1 to 3:1 wide, ~256px tall or larger (PNG, SVG or WebP).
 */
export const BRANDS: readonly Brand[] = [
  { name: 'Interbrand', file: 'interbrand.png', width: 620, height: 256 },
  { name: 'Coca-Cola', file: 'coca-cola.png', width: 560, height: 256 },
  { name: 'Samsung', file: 'samsung.png', width: 616, height: 256 },
  { name: 'Toyota', file: 'toyota.png', width: 476, height: 256 },
  { name: 'Microsoft', file: 'microsoft.png', width: 504, height: 256 },
  { name: 'Unilever', file: 'unilever.png', width: 448, height: 256 },
];
