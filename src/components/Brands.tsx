import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLayout } from '../context/layout';
import { BRANDS } from '../data/brands';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';
import { asset } from '../utils/asset';
import { reveal } from '../utils/reveal';
import { ChevronLeft, ChevronRight } from './icons';

const AUTOPLAY_MS = 4500;
const FADE_MS = 200;

/**
 * "Brands I've worked with".
 *  · Full desktop layout: a looping carousel that rotates one logo at a time
 *    (auto-advances, pauses on hover/focus, one dot per logo).
 *  · Stacked / phone layout: a native horizontal swipe row (one dot per "page" of logos).
 */
export default function Brands() {
  const { wide, stacked } = useLayout();
  const reduceMotion = usePrefersReducedMotion();
  const desk = wide && !stacked;
  const n = BRANDS.length;

  const viewportRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0); // carousel: which logo is first
  const [fading, setFading] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [restart, setRestart] = useState(0); // bump to restart the autoplay timer
  const [pages, setPages] = useState(1); // swipe row: number of "pages"
  const [swipeIndex, setSwipeIndex] = useState(0);

  const offsetRef = useRef(0);
  const busy = useRef(false);
  const fadeTimer = useRef<number | undefined>(undefined);
  useEffect(() => {
    offsetRef.current = offset;
  }, [offset]);

  const shown = desk ? offset : 0;

  /* ---------- carousel (desktop) ---------- */
  const go = useCallback(
    (target: number) => {
      const next = ((target % n) + n) % n;
      if (busy.current || next === offsetRef.current) return;
      if (reduceMotion) {
        setOffset(next);
        return;
      }
      busy.current = true;
      setFading(true);
      fadeTimer.current = window.setTimeout(() => {
        setOffset(next);
        setFading(false);
        busy.current = false;
      }, FADE_MS);
    },
    [n, reduceMotion],
  );

  // Back to the first logo whenever the layout mode changes.
  useEffect(() => {
    window.clearTimeout(fadeTimer.current);
    busy.current = false;
    setFading(false);
    setOffset(0);
  }, [desk]);
  useEffect(() => () => window.clearTimeout(fadeTimer.current), []);

  const paused = hovered || focused;
  useEffect(() => {
    if (reduceMotion || !desk || paused) return;
    const id = window.setInterval(() => {
      if (!document.hidden) go(offsetRef.current + 1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, desk, paused, go, restart]);

  /* ---------- swipe row (phone / stacked) ---------- */
  const measure = useCallback(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const p = Math.max(1, Math.ceil(vp.scrollWidth / vp.clientWidth - 0.05));
    const max = vp.scrollWidth - vp.clientWidth;
    setPages(p);
    setSwipeIndex(max > 0 ? Math.round((vp.scrollLeft / max) * (p - 1)) : 0);
  }, []);

  useLayoutEffect(() => {
    if (desk) return;
    measure();
    let t: number | undefined;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(measure, 150);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('resize', onResize);
    };
  }, [desk, measure]);

  const swipeTo = (i: number) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const max = vp.scrollWidth - vp.clientWidth;
    vp.scrollTo({ left: pages > 1 ? (max * i) / (pages - 1) : 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const step = (dir: 1 | -1) => {
    if (desk) {
      go(offsetRef.current + dir);
      // A click restarts autoplay even though the pointer/focus is still on the arrow.
      setHovered(false);
      setFocused(false);
      setRestart((r) => r + 1);
    } else {
      const vp = viewportRef.current;
      vp?.scrollBy({ left: dir * vp.clientWidth * 0.8, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  };

  const order = Array.from({ length: n }, (_, i) => BRANDS[(shown + i) % n]);
  const dotCount = desk ? n : pages;
  const activeDot = desk ? shown : swipeIndex;
  const isStatic = !desk && pages <= 1;

  return (
    <section
      className={isStatic ? 'brands is-static' : 'brands'}
      aria-label="Brands I've worked with"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <div className="brands__bar">
        <p className="brands__label" {...reveal('left', 0)}>
          <span>Brands</span> <span>I&apos;ve worked with</span>
          <i />
        </p>
        <button className="brands__nav" id="brands-prev" type="button" {...reveal('fade', 2)} aria-label="Previous brands" onClick={() => step(-1)}>
          <ChevronLeft />
        </button>
        <div ref={viewportRef} className="brands__viewport" id="brands-viewport" {...reveal('up', 1)} onScroll={() => !desk && measure()}>
          <ul className={fading ? 'brands__track is-fading' : 'brands__track'} id="brands-track">
            {order.map((brand) => (
              <li className="brand-mark" key={brand.name}>
                <img
                  src={asset(`brands/${brand.file}`)}
                  width={brand.width}
                  height={brand.height}
                  alt={brand.name}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </li>
            ))}
          </ul>
        </div>
        <button className="brands__nav" id="brands-next" type="button" {...reveal('fade', 2)} aria-label="Next brands" onClick={() => step(1)}>
          <ChevronRight />
        </button>
      </div>
      <div className="brands__dots" id="brands-dots" role="group" aria-label="Brand slides" {...reveal('fade', 3)}>
        {Array.from({ length: dotCount }, (_, i) => (
          <button
            key={i}
            type="button"
            className="dot"
            aria-label={`Show brands ${i + 1}`}
            aria-current={i === activeDot ? 'true' : 'false'}
            onClick={() => (desk ? go(i) : swipeTo(i))}
          />
        ))}
      </div>
    </section>
  );
}
