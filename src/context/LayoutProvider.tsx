import { useLayoutEffect, useMemo, useState, type ReactNode } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { LayoutContext } from './layout';

export function LayoutProvider({ children }: { children: ReactNode }) {
  const wide = useMediaQuery('(min-width: 48rem)');
  const [stacked, setStacked] = useState(false);

  // The stylesheet keys off html.is-stacked, so keep it in sync with the state.
  useLayoutEffect(() => {
    document.documentElement.classList.toggle('is-stacked', stacked);
    return () => document.documentElement.classList.remove('is-stacked');
  }, [stacked]);

  const value = useMemo(() => ({ wide, stacked, setStacked }), [wide, stacked]);
  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}
