import { useRef } from 'react';
import { useLayout } from '../context/layout';
import { ABOUT_THEMES } from '../data/about';
import { useAboutFit } from '../hooks/useAboutFit';
import { asset } from '../utils/asset';
import SectionMarker from './SectionMarker';

export default function About() {
  const { stacked } = useLayout();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const hasAside = useAboutFit(sectionRef, gridRef, textRef, copyRef);
  const className = ['about', stacked && 'is-stacked', hasAside && 'has-aside'].filter(Boolean).join(' ');

  return (
    <section ref={sectionRef} className={className} id="about" aria-labelledby="about-title">
      <div ref={gridRef} className="about__grid">
        <div ref={textRef} className="about__text">
          <SectionMarker num="01" label="About" />
          <h2 className="about__title" id="about-title">
            A lifelong fascination with what makes brands matter.
          </h2>
          <div ref={copyRef} className="about__copy">
            <p>
              Michel Nugawela is a brand strategist and creative thinker focused on helping organisations discover, articulate and express what makes them distinctive. With experience across global and regional brands, he brings a unique blend of strategic insight, creative direction and human understanding to the world of branding.
            </p>
            <p>
              Beyond brands, Michel is an aspiring author, exploring ideas that inspire people, provoke thought and celebrate the stories that shape our world.
            </p>
          </div>
          <div className="about__sign">
            <div className="about__rule" />
            <p className="about__tag">
              Different perspectives
              <br />
              Stronger brands
            </p>
          </div>
        </div>
        {/* wide screens: fills the gap between text and image (positioned by useAboutFit when there is room) */}
        <ul className="about__themes">
          {ABOUT_THEMES.map((theme) => (
            <li key={theme}>{theme}</li>
          ))}
        </ul>
        <div className="about__visual">
          <div className="about__book">
            <img
              src={asset('books.webp')}
              width={1046}
              height={1504}
              alt="A stack of four books titled Strategy, Creativity, Culture and Humanity"
              decoding="async"
            />
          </div>
          <div className="about__script" aria-hidden="true">
            <p>
              More <br />
              than <br />
              brands
            </p>
            <i />
          </div>
        </div>
      </div>
    </section>
  );
}
