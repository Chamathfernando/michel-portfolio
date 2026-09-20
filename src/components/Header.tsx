import { useRef, type RefObject } from 'react';
import { NAV_ITEMS, type SectionId } from '../data/site';
import { useStickyHeader } from '../hooks/useStickyHeader';
import { MenuIcon } from './icons';

interface HeaderProps {
  current: SectionId;
  menuOpen: boolean;
  onToggleMenu: () => void;
  toggleRef: RefObject<HTMLButtonElement | null>;
}

export default function Header({ current, menuOpen, onToggleMenu, toggleRef }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  useStickyHeader(headerRef);

  return (
    <header ref={headerRef} className="site-header">
      <a className="brand" href="#home">
        Michel Nugawela
      </a>
      <nav className="site-nav" aria-label="Primary">
        {NAV_ITEMS.map((item) => (
          <a key={item.id} href={`#${item.id}`} aria-current={current === item.id ? 'page' : 'false'}>
            {item.label}
          </a>
        ))}
      </nav>
      <button
        ref={toggleRef}
        className="m-toggle"
        id="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="m-menu"
        onClick={onToggleMenu}
      >
        <MenuIcon />
      </button>
    </header>
  );
}
