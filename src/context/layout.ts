import { createContext, useContext } from 'react';

export interface LayoutState {
  /** ≥ 48rem: tablet / desktop design. Below it, the phone design applies. */
  wide: boolean;
  /**
   * Wide screens where the About columns would overlap, so About, the brands
   * strip and the contact section switch to their stacked (phone-style) layout.
   * Also mirrored as the `is-stacked` class on <html> for the CSS.
   */
  stacked: boolean;
  setStacked: (value: boolean) => void;
}

export const LayoutContext = createContext<LayoutState | null>(null);

export function useLayout(): LayoutState {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error('useLayout must be used inside <LayoutProvider>');
  return ctx;
}
