import { asset, BLANK_GIF } from '../utils/asset';
import { reveal } from '../utils/reveal';

export default function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <span className="hero__arch hero__arch--fill m-only" aria-hidden="true" />
      <span className="hero__arch hero__arch--line m-only" aria-hidden="true" />
      <div className="hero__copy">
        <div className="hero__main">
          <p className="hero__eyebrow" {...reveal('up', 0)}>
            Ideas&nbsp;<i className="sep" aria-hidden="true">|</i> Brands&nbsp;<i className="sep" aria-hidden="true">|</i> People&nbsp;<i className="sep" aria-hidden="true">|</i> A&nbsp;better&nbsp;tomorrow
          </p>
          <h1 className="hero__title" id="hero-title" {...reveal('up', 1)}>
            Michel
            <br />
            Nugawela
          </h1>
          <p className="hero__role" {...reveal('up', 2)}>
            <span>Interbrand</span>
            <span className="hero__dot" aria-hidden="true" />
            <span>Aspiring Author</span>
          </p>
          <div className="hero__rule" {...reveal('left', 3)} />
          <div className="hero__plaque" {...reveal('up', 4)}>
            <p className="hero__quote">“Brands are stories we choose to believe in.”</p>
            <div className="hero__meta m-only">
              <span>Philosophy &amp; Vision</span>
              <span>M.N.</span>
            </div>
          </div>
        </div>
        <div className="hero__foot" {...reveal('fade', 6)}>
          <a className="hero__scroll" href="#about" aria-label="Scroll to About">
            <span>Scroll</span>
            <i />
          </a>
        </div>
      </div>
      {/* wide-screen artwork; phones skip the download */}
      <picture>
        <source media="(min-width: 48em)" srcSet={`${asset('hero-1600.webp')} 1600w, ${asset('hero.webp')} 2560w`} sizes="100vw" />
        <img
          className="hero__art"
          {...reveal('zoom-out')}
          src={BLANK_GIF}
          fetchPriority="high"
          width={2560}
          height={1440}
          alt="A terracotta arch above a sunlit staircase with a small olive tree, beside the words A More Meaningful Tomorrow"
        />
      </picture>
    </section>
  );
}
