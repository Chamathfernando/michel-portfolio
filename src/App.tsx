import { useCallback, useEffect, useRef, useState } from 'react';
import About from './components/About';
import Brands from './components/Brands';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import MobileMenu from './components/MobileMenu';
import Work from './components/Work';
import { useLayout } from './context/layout';
import { SECTION_IDS } from './data/site';
import { useScrollSpy } from './hooks/useScrollSpy';

export default function App() {
  const { wide } = useLayout();
  const current = useScrollSpy(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback((restoreFocus: boolean) => {
    setMenuOpen(false);
    if (restoreFocus) toggleRef.current?.focus({ preventScroll: true });
  }, []);

  // The phone menu makes no sense on wide screens: close it if the window grows.
  useEffect(() => {
    if (wide) setMenuOpen(false);
  }, [wide]);

  return (
    <>
      <Header
        current={current}
        menuOpen={menuOpen}
        toggleRef={toggleRef}
        onToggleMenu={() => (menuOpen ? closeMenu(true) : setMenuOpen(true))}
      />
      <MobileMenu open={menuOpen} current={current} onClose={closeMenu} />
      <main>
        <Hero />
        <About />
        <Brands />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
