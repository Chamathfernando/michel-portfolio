import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { SOCIAL_LINKS } from '../data/site';
import { asset, BLANK_GIF } from '../utils/asset';
import { reveal } from '../utils/reveal';
import { FIELD_ORDER, validateAll, validateField, type FieldName, type FormErrors, type FormValues } from '../utils/validation';
import ContactSuccessDialog from './ContactSuccessDialog';
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

const EMPTY: FormValues = { first: '', last: '', email: '', message: '' };
const INPUT_ID: Record<FieldName, string> = { first: 'first-name', last: 'last-name', email: 'email', message: 'message' };

export default function Contact() {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sender, setSender] = useState('');
  const [status, setStatus] = useState('');
  const dialogRef = useRef<HTMLDialogElement>(null);

  /** Props shared by every input: value, live re-validation once a field has an error, and error wiring for screen readers. */
  const bind = (name: FieldName) => ({
    id: INPUT_ID[name],
    value: values[name],
    'aria-invalid': errors[name] ? (true as const) : undefined,
    'aria-describedby': errors[name] ? `${INPUT_ID[name]}-error` : undefined,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setValues((v) => ({ ...v, [name]: value }));
      if (errors[name]) setErrors((err) => ({ ...err, [name]: validateField(name, value) || undefined }));
    },
    onBlur: () => {
      if (!values[name] && !errors[name]) return; // don't nag people who just tabbed through an empty field
      setErrors((err) => ({ ...err, [name]: validateField(name, values[name]) || undefined }));
    },
  });

  const error = (name: FieldName) =>
    errors[name] ? (
      <p className="field__error" id={`${INPUT_ID[name]}-error`}>
        {errors[name]}
      </p>
    ) : null;

  /* NOTE: front-end only. There is no backend yet, so a valid form simply shows the confirmation.
     Send `values` to your form endpoint / email service here before opening the dialog. */
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateAll(values);
    setErrors(found);
    const firstBad = FIELD_ORDER.find((name) => found[name]);
    if (firstBad) {
      setStatus('');
      document.getElementById(INPUT_ID[firstBad])?.focus();
      return;
    }
    setSender(values.first.trim());
    setValues(EMPTY);
    const dialog = dialogRef.current;
    if (dialog && typeof dialog.showModal === 'function') {
      document.documentElement.classList.add('modal-open');
      dialog.showModal();
    } else {
      setStatus('Message sent successfully. Thank you — Michel will be in touch soon.');
    }
  };

  return (
    <>
      <section className="contact" id="contact" aria-labelledby="contact-title">
        {/* wide-screen leaf; phones skip the download */}
        <picture>
          <source media="(min-width: 48em)" srcSet={asset('leaf.webp')} />
          <img
            className="contact__leaf"
            {...reveal('fade')}
            src={BLANK_GIF}
            width={697}
            height={1300}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </picture>
        <div className="contact__grid">
          <div className="contact__card" {...reveal('fade', 0)}>
            <div>
              <SectionMarker num="03" label="Contact" step={1} />
              <h2 className="contact__title" id="contact-title" {...reveal('up', 2)}>
                Let’s create something meaningful.
              </h2>
              <div className="contact__rule" {...reveal('left', 3)} />
              <p className="contact__lede" {...reveal('up', 4)}>
                Have a project, an idea or just want to say hello? I’d love to hear from you.
              </p>
            </div>
            <ul className="social">
              {SOCIAL_LINKS.map((s, i) => (
                <li key={s.id} {...reveal('pop', 5 + i, 70)}>
                  <a className={SOCIAL_CLASS[s.id]} href={s.href} aria-label={s.label}>
                    {SOCIAL_ICONS[s.id]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <form className="form" id="contact-form" noValidate onSubmit={onSubmit}>
            <div className="form__row" {...reveal('right', 1)}>
              <div className="field">
                <label htmlFor="first-name">First Name</label>
                <input {...bind('first')} name="first-name" type="text" autoComplete="given-name" maxLength={60} required />
                {error('first')}
              </div>
              <div className="field">
                <label htmlFor="last-name">Last Name</label>
                <input {...bind('last')} name="last-name" type="text" autoComplete="family-name" maxLength={60} required />
                {error('last')}
              </div>
            </div>
            <div className="field" {...reveal('right', 2)}>
              <label htmlFor="email">Email Address</label>
              <input {...bind('email')} name="email" type="email" autoComplete="email" inputMode="email" required />
              {error('email')}
            </div>
            <div className="field field--grow" {...reveal('right', 3)}>
              <label htmlFor="message">Message</label>
              <textarea {...bind('message')} name="message" rows={3} required />
              {error('message')}
            </div>
            <div className="form__actions" {...reveal('up', 4)}>
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
      <ContactSuccessDialog ref={dialogRef} name={sender} onClose={() => document.documentElement.classList.remove('modal-open')} />
    </>
  );
}
