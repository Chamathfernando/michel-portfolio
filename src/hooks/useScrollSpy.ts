import { useEffect, useState } from 'react';

/** Returns the id of the section currently crossing ~35% of the viewport height. */
export function useScrollSpy<T extends string>(ids: readonly T[]): T {
  const [current, setCurrent] = useState<T>(ids[0]);

  useEffect(() => {
    let queued = false;
    const spy = () => {
      queued = false;
      const line = window.innerHeight * 0.35;
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) cur = id;
      }
      setCurrent(cur);
    };
    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(spy);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    spy();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids]);

  return current;
}
