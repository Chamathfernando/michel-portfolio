import { useLayoutEffect, useState, type RefObject } from 'react';
import { useLayout } from '../context/layout';

/**
 * About: the image height follows the text height (3:5 frame), so its width is
 * `0.6 × text height`. When that width would run into the text column, the
 * section (and the whole page, via <html>) switches to the stacked layout.
 *
 * On wide screens it also measures the free band between the end of the text
 * and the image and, when it is wide enough, positions the "themes" list in it
 * (via --aside-x / --aside-y / --aside-w) and returns `hasAside = true`.
 */
export function useAboutFit(
  sectionRef: RefObject<HTMLElement | null>,
  gridRef: RefObject<HTMLElement | null>,
  textRef: RefObject<HTMLElement | null>,
  copyRef: RefObject<HTMLElement | null>,
): boolean {
  const { wide, setStacked } = useLayout();
  const [hasAside, setHasAside] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const text = textRef.current;
    const copy = copyRef.current;
    if (!section || !grid || !text || !copy) return;
    const root = document.documentElement;
    let raf = 0;

    const fit = () => {
      raf = 0;
      // Measure the natural two-column layout, so drop the stacked styling first.
      section.classList.remove('is-stacked');
      root.classList.remove('is-stacked');
      section.style.removeProperty('--about-w');

      let stacked = false;
      let aside: { x: number; y: number; w: number } | null = null;
      if (wide) {
        // phones have their own layout rules
        const textHeight = text.offsetHeight;
        const cols = getComputedStyle(grid).gridTemplateColumns.split(' ').map(parseFloat);
        const need = textHeight * 0.6;
        if (cols.length >= 2 && need > 0) {
          if (need > cols[1]) stacked = true; // would run into the text column
          else {
            section.style.setProperty('--about-w', `${need.toFixed(1)}px`);
            // free band between the end of the text and the start of the image
            const rem = parseFloat(getComputedStyle(root).fontSize) || 16;
            const g = grid.getBoundingClientRect();
            const c = copy.getBoundingClientRect();
            const from = c.right - g.left;
            const free = g.width - need - from;
            const w = Math.min(free - 3 * rem, free * 0.7, 34 * rem);
            if (w >= 11 * rem) aside = { x: from + (free - w) / 2, y: c.top - g.top, w };
          }
        }
      }
      if (stacked) {
        section.classList.add('is-stacked');
        root.classList.add('is-stacked');
      }
      if (aside) {
        section.style.setProperty('--aside-x', `${aside.x.toFixed(1)}px`);
        section.style.setProperty('--aside-y', `${aside.y.toFixed(1)}px`);
        section.style.setProperty('--aside-w', `${aside.w.toFixed(1)}px`);
      }
      setHasAside(aside !== null);
      setStacked(stacked);
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(fit);
    };

    fit();
    const ro = new ResizeObserver(queue);
    ro.observe(text);
    ro.observe(grid);
    window.addEventListener('resize', queue);
    void document.fonts?.ready.then(queue);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', queue);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [wide, setStacked, sectionRef, gridRef, textRef, copyRef]);

  return hasAside;
}
