import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { PAGES, TOTAL_WORKS, WORKS, WORKS_PER_PAGE, type WorkKey } from '../data/works';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';
import { asset } from '../utils/asset';
import { reveal } from '../utils/reveal';
import LazyImage from './LazyImage';
import { ChevronLeft, ChevronRight } from './icons';
import SectionMarker from './SectionMarker';

const FADE_MS = 250;

// The case-study popup is only needed once a card is opened, so it is its own JS chunk.
const loadModal = () => import('./CaseStudyModal');
const CaseStudyModal = lazy(loadModal);

/** "02 Work": paginated grid of projects; each card opens the case-study modal. */
export default function Work() {
  const reduceMotion = usePrefersReducedMotion();
  const [page, setPage] = useState(0);
  const [fading, setFading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<WorkKey | null>(null);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const lastPage = PAGES.length - 1;

  const goTo = (target: number) => {
    const next = Math.max(0, Math.min(lastPage, target));
    if (next === page || fading) return;
    if (reduceMotion) {
      setPage(next);
      return;
    }
    setFading(true);
    timer.current = window.setTimeout(() => {
      setPage(next);
      setFading(false);
    }, FADE_MS);
  };

  const from = page * WORKS_PER_PAGE + 1;
  const to = Math.min(TOTAL_WORKS, (page + 1) * WORKS_PER_PAGE);

  return (
    <>
      <section className="work" id="work" aria-labelledby="work-title">
        <div className="work__head">
          <SectionMarker as="h2" id="work-title" num="02" label="Work" />
          <p className="work__kicker" {...reveal('right', 1)}>Selected work</p>
        </div>

        <ul className={fading ? 'work__grid is-fading' : 'work__grid'} id="work-grid">
          {PAGES[page].map((key, i) => {
            const w = WORKS[key];
            return (
              <li key={`${page}-${i}`} {...reveal('up', i % 3)}>
                <button
                  className="card"
                  type="button"
                  onPointerEnter={loadModal}
                  onFocus={loadModal}
                  onClick={() => {
                    setActiveKey(key);
                    setModalOpen(true);
                  }}
                >
                  <span className="card__frame">
                    <LazyImage src={asset(w.file)} width={w.width} height={w.height} alt={w.alt} />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="work__foot" {...reveal('up', 0)}>
          <p className="work__count" id="work-count" aria-live="polite">
            {`Showing ${from}–${to} of ${TOTAL_WORKS} works`}
          </p>
          <nav className="pager" aria-label="Work pages">
            <button className="pager__step" id="pager-prev" type="button" disabled={page === 0} onClick={() => goTo(page - 1)}>
              <ChevronLeft strokeWidth={1.6} />
              <span>Prev</span>
            </button>
            <div className="pager__pages">
              {PAGES.map((_, i) => (
                <button
                  key={i}
                  className="pager__num"
                  type="button"
                  aria-current={i === page ? 'true' : 'false'}
                  aria-label={`Page ${i + 1}`}
                  onClick={() => goTo(i)}
                >
                  {String(i + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
            <button className="pager__step" id="pager-next" type="button" disabled={page === lastPage} onClick={() => goTo(page + 1)}>
              <span>Next</span>
              <ChevronRight strokeWidth={1.6} />
            </button>
          </nav>
        </div>
      </section>

      {activeKey && (
        <Suspense fallback={null}>
          <CaseStudyModal work={WORKS[activeKey]} open={modalOpen} onClose={() => setModalOpen(false)} />
        </Suspense>
      )}
    </>
  );
}
