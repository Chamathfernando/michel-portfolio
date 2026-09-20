import type { CSSProperties } from 'react';

/** How an element enters when it is reached while scrolling. See src/styles/reveal.css. */
export type RevealEffect = 'up' | 'down' | 'left' | 'right' | 'zoom' | 'pop' | 'fade' | 'zoom-out';

/**
 * Props for any element that should animate in when it scrolls into view:
 *
 *   <h2 {...reveal('up', 2)}>…</h2>
 *
 * `step` staggers siblings (each step delays the animation by `gap` ms).
 * The animation plays when the element itself is scrolled into view (see hooks/useScrollReveal.ts).
 */
export function reveal(effect: RevealEffect = 'up', step = 0, gap = 90) {
  return {
    'data-reveal': effect,
    style: { '--reveal-delay': `${step * gap}ms` } as CSSProperties,
  };
}
