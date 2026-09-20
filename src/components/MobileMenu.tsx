import { useEffect, useRef } from 'react';
import { NAV_ITEMS, type SectionId } from '../data/site';
import { CloseIcon } from './icons';

interface MobileMenuProps {
  open: boolean;
  current: SectionId;
  /** `restoreFocus` puts focus back on the hamburger button. */
  onClose: (restoreFocus: boolean) => void;
}

/** Full-screen phone menu overlay (the hamburger opens it). */
export default function MobileMenu({ open, current, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // html.menu-open locks page scroll (see CSS); move focus into the menu when it opens.
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    let raf = 0;
    if (open) raf = requestAnimationFrame(() => closeRef.current?.focus({ preventScroll: true }));
    return () => {
      if (raf) cancelAnimationFrame(raf);
      document.documentElement.classList.remove('menu-open');
    };
  }, [open]);

  // Escape closes; Tab is trapped inside the open menu.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose(true);
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable = menuRef.current?.querySelectorAll<HTMLElement>('a[href], button');
      if (!focusable || !focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <div ref={menuRef} className={open ? 'm-menu is-open' : 'm-menu'} id="m-menu" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="m-menu__bar">
        <a className="m-menu__brand" href="#home">
          Michel Nugawela
        </a>
        <button ref={closeRef} className="m-toggle" id="menu-close" type="button" aria-label="Close menu" onClick={() => onClose(true)}>
          <CloseIcon />
        </button>
      </div>
      <nav aria-label="Primary">
        <ul className="m-menu__list">
          {NAV_ITEMS.map((item, i) => (
            <li key={item.id}>
              <a
                className="m-menu__link"
                href={`#${item.id}`}
                aria-current={current === item.id ? 'page' : 'false'}
                onClick={() => onClose(false)}
              >
                <span className="m-menu__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="m-menu__label">{item.label}</span>
                <span className="m-menu__cur">Current</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="m-menu__foot">
        <p>Ideas &nbsp;|&nbsp; Brands &nbsp;|&nbsp; People</p>
        <p>Interbrand &bull; Aspiring Author</p>
      </div>
    </div>
  );
}
