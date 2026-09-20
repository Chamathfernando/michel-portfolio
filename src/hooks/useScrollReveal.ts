import { useEffect } from 'react';

/**
 * true  → an element's entrance plays again every time it is scrolled back into view.
 * false → each element animates once, the first time it is reached.
 */
export const REPLAY_ON_REENTRY = true;

const SELECTOR = '[data-reveal], [data-watch]';

/**
 * Scroll-triggered entrance animations.
 *
 * Every element marked `data-reveal="<effect>"` (or `data-watch`, for elements that only need to
 * be tracked) is watched with an IntersectionObserver. While it is on screen the hook sets
 * `data-in-view="true"` on it; when it has left, `"false"`. reveal.css turns that attribute into
 * the animation, so the effect plays when the element is REACHED by scrolling, not just on load.
 *
 *  · An element counts as reached when its top edge is inside the upper 88% of the viewport,
 *    and is reset (ready to play again) once it has left the screen completely.
 *  · `data-reveal-edge` elements (the footer, which can never rise that high) are reached the
 *    moment they appear.
 *  · Elements that appear later (e.g. the next page of Work cards) are picked up automatically.
 *
 * A data attribute is used rather than a class so React re-renders never wipe it.
 */
export function useScrollReveal(): void {
  useEffect(() => {
    const all = () => document.querySelectorAll<HTMLElement>(SELECTOR);

    if (typeof IntersectionObserver === 'undefined') {
      all().forEach((el) => (el.dataset.inView = 'true')); // very old browsers: just show everything
      return;
    }

    // "enter": the element's top edge is inside the upper 88% of the viewport → play the entrance.
    const enter = (rootMargin: string) =>
      new IntersectionObserver(
        (entries, observer) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target as HTMLElement;
            el.dataset.inView = 'true';
            if (!REPLAY_ON_REENTRY) observer.unobserve(el);
          }
        },
        { rootMargin, threshold: 0 },
      );

    // "leave": only once it is completely off screen is it reset, so it can play again next time.
    const leave = new IntersectionObserver(
      (entries) => {
        if (!REPLAY_ON_REENTRY) return;
        for (const entry of entries) {
          if (!entry.isIntersecting) (entry.target as HTMLElement).dataset.inView = 'false';
        }
      },
      { threshold: 0 },
    );

    const main = enter('0px 0px -12% 0px');
    const edge = enter('0px');
    const seen = new WeakSet<Element>();

    const scan = () => {
      all().forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        (el.hasAttribute('data-reveal-edge') ? edge : main).observe(el);
        leave.observe(el);
      });
    };

    scan();
    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      main.disconnect();
      edge.disconnect();
      leave.disconnect();
    };
  }, []);
}
