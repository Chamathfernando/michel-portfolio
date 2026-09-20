import { useEffect } from 'react';

/** Drops "#section" from the address bar (without adding a history entry or moving the page). */
function stripHash() {
  try {
    if (window.location.hash) {
      window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
    }
  } catch {
    /* some embedded / sandboxed pages don't allow changing the URL: nothing to clean */
  }
}

function targetOf(hash: string): HTMLElement | null {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  return id ? document.getElementById(id) : null;
}

/**
 * In-page links (#about, #work, …) scroll to their section and then leave the address bar clean,
 * so the URL never ends in "#about". Also cleans a "#section" the page was opened with, once it has
 * scrolled there.
 *
 *  · scrolling uses the page's own CSS (smooth scrolling, scroll-margin-top, reduced-motion),
 *  · the section receives focus, so keyboard and screen-reader users continue from there.
 */
export function useCleanHashLinks(): void {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="#"]');
      if (!link || (link.target && link.target !== '_self')) return;
      const el = targetOf(link.getAttribute('href') ?? '');
      if (!el) return; // "#" placeholders and unknown ids behave as normal links
      e.preventDefault();
      el.scrollIntoView();
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
      stripHash();
    };

    // The page was opened at /#contact, or the hash was edited by hand.
    const settle = () => {
      const el = targetOf(window.location.hash);
      if (el) el.scrollIntoView({ behavior: 'instant' });
      stripHash();
    };

    document.addEventListener('click', onClick);
    window.addEventListener('hashchange', settle);
    let onLoad: (() => void) | undefined;
    if (document.readyState === 'complete') settle();
    else {
      onLoad = settle;
      window.addEventListener('load', onLoad, { once: true });
    }

    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('hashchange', settle);
      if (onLoad) window.removeEventListener('load', onLoad);
    };
  }, []);
}
