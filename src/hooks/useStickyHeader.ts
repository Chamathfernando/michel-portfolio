import { useEffect, type RefObject } from 'react';

/**
 * Keeps the header useful while it is stuck to the top of the screen:
 *  · publishes its height as `--sticky-h` on <html>, so anchor links can stop just below it
 *    (see `[id] { scroll-margin-top }` in desktop.css). It is measured, because the header can grow
 *    when the nav wraps on narrow tablets;
 *  · sets `data-scrolled="true"` on it once the page has moved, so it can gain a soft edge and shadow.
 */
export function useStickyHeader(ref: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    const root = document.documentElement;

    const measure = () => root.style.setProperty('--sticky-h', `${header.offsetHeight}px`);
    measure();
    const resize = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    resize?.observe(header);

    const onScroll = () => header.setAttribute('data-scrolled', window.scrollY > 8 ? 'true' : 'false');
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      resize?.disconnect();
      window.removeEventListener('scroll', onScroll);
      root.style.removeProperty('--sticky-h');
    };
  }, [ref]);
}
