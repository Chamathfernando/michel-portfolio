import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

/* ---------- UI icons ---------- */

export const MenuIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" {...p}>
    <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
  </svg>
);

export const CloseIcon = ({ strokeWidth = 1.6, ...p }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" aria-hidden="true" {...p}>
    <path d="M5 5l14 14M19 5 5 19" />
  </svg>
);

export const ChevronLeft = ({ strokeWidth = 1.5, ...p }: IconProps) => (
  <svg viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M7 1 1 7l6 6" />
  </svg>
);

export const ChevronRight = ({ strokeWidth = 1.5, ...p }: IconProps) => (
  <svg viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="m1 1 6 6-6 6" />
  </svg>
);

export const ArrowRight = (p: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M2 8h11M9 4l4 4-4 4" />
  </svg>
);

/* ---------- Social icons (brand colours are applied in CSS via .social__*) ---------- */

export const FacebookIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M14 8V6.5c0-.7.2-1 1.2-1H17V2h-2.6C11.6 2 10.5 3.6 10.5 6v2H8v3.5h2.5V22H14V11.5h2.8L17.3 8H14z" />
  </svg>
);

export const InstagramIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="url(#ig-grad)" strokeWidth="1.9" aria-hidden="true" {...p}>
    <defs>
      <linearGradient id="ig-grad" x1="3" y1="21" x2="21" y2="3" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#f58529" />
        <stop offset=".35" stopColor="#dd2a7b" />
        <stop offset=".7" stopColor="#8134af" />
        <stop offset="1" stopColor="#515bd4" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="1.1" fill="url(#ig-grad)" stroke="none" />
  </svg>
);

export const XIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

export const PinterestIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z" />
  </svg>
);

/** Behance has no simple glyph here, so it is set as text ("Bē"), as in the design. */
export const BehanceMark = () => (
  <span className="be" aria-hidden="true">
    Bē
  </span>
);
