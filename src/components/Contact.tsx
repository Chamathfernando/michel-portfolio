import { useState, type FormEvent, type ReactNode } from 'react';
import { SOCIAL_LINKS } from '../data/site';
import { asset, BLANK_GIF } from '../utils/asset';
import { BehanceMark, FacebookIcon, InstagramIcon, PinterestIcon, XIcon } from './icons';
import SectionMarker from './SectionMarker';

const SOCIAL_ICONS: Record<string, ReactNode> = {
  facebook: <FacebookIcon />,
  instagram: <InstagramIcon />,
  x: <XIcon />,
  pinterest: <PinterestIcon />,
  behance: <BehanceMark />,
};

const SOCIAL_CLASS: Record<string, string> = {
  facebook: 'social__fb',
  instagram: 'social__ig',
  x: 'social__x',
  pinterest: 'social__pin',
  behance: 'social__be',
};

export default function Contact() {
  const [status, setStatus] = useState('');

  /* NOTE: front-end only. Point this handler at your form endpoint / email service to actually send messages. */
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus('');
      return;
    }
    setStatus('Thank you — your message is on its way to Michel.');
    form.reset();
  };

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      {/* wide-screen leaf; phones skip the download */}
      <picture>
        <source media="(min-width: 48em)" srcSet={asset('leaf.webp')} />
        <img className="contact__leaf" src={BLANK_GIF} width={697} height={1300} alt="" />
      </picture>
      <div className="contact__grid">
        <div className="contact__card">
          <div>
            <SectionMarker num="03" label="Contact" />
            <h2 className="contact__title" id="contact-title">
              Let’s create something meaningful.
            </h2>
            <div className="contact__rule" />
            <p className="contact__lede">Have a project, an idea or just want to say hello? I’d love to hear from you.</p>
          </div>
          <ul className="social">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.id}>
                <a className={SOCIAL_CLASS[s.id]} href={s.href} aria-label={s.label}>
                  {SOCIAL_ICONS[s.id]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form className="form" id="contact-form" noValidate onSubmit={onSubmit}>
          <div className="form__row">
            <div className="field">
              <label htmlFor="first-name">First Name</label>
              <input id="first-name" name="first-name" type="text" autoComplete="given-name" required />
            </div>
            <div className="field">
              <label htmlFor="last-name">Last Name</label>
              <input id="last-name" name="last-name" type="text" autoComplete="family-name" required />
            </div>
          </div>
          <div className="field">
            <label htmlFor="email">Email Address</label>
            <input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="field field--grow">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={3} required />
          </div>
          <div className="form__actions">
            <button className="btn" type="submit">
              <span>Contact Michel</span>
              <span aria-hidden="true">→</span>
            </button>
            <p className="form__status" id="form-status" role="status" aria-live="polite">
              {status}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
