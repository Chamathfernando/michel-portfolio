import { forwardRef } from 'react';
import { CheckIcon } from './icons';

interface ContactSuccessDialogProps {
  /** First name of the sender, used in the thank-you line. */
  name: string;
  onClose: () => void;
}

/** "Message sent" confirmation, built on the native <dialog> (focus trap, Esc, backdrop for free). Opened by Contact.tsx. */
const ContactSuccessDialog = forwardRef<HTMLDialogElement, ContactSuccessDialogProps>(function ContactSuccessDialog(
  { name, onClose },
  ref,
) {
  return (
    <dialog
      ref={ref}
      className="notice"
      aria-labelledby="notice-title"
      aria-describedby="notice-text"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close(); // click on the backdrop
      }}
    >
      <CheckIcon className="notice__icon" />
      <h3 className="notice__title" id="notice-title">
        Message sent successfully
      </h3>
      <p className="notice__text" id="notice-text">
        {name ? `Thank you, ${name}. ` : 'Thank you. '}Your message is on its way to Michel, and he’ll be in touch soon.
      </p>
      <button className="notice__btn" type="button" autoFocus onClick={(e) => e.currentTarget.closest('dialog')?.close()}>
        Close
      </button>
    </dialog>
  );
});

export default ContactSuccessDialog;
