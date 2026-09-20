/** Contact-form validation. Front-end only; a backend should repeat these checks. */

export type FieldName = 'first' | 'last' | 'email' | 'message';
export type FormValues = Record<FieldName, string>;
export type FormErrors = Partial<Record<FieldName, string>>;

export const FIELD_ORDER: readonly FieldName[] = ['first', 'last', 'email', 'message'];

/** Letters from any alphabet (accents included), plus spaces, hyphens, apostrophes and full stops: "Anne-Marie", "O'Neil", "José". No digits. */
const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}\s'’.-]*$/u;

/** name@domain.tld: a real domain with a dot and a 2+ letter ending; no spaces, no "..". */
const EMAIL_RE = /^[A-Za-z0-9._%+'-]+@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;

function validateName(value: string, label: string): string {
  const v = value.trim();
  if (!v) return `Please enter your ${label}.`;
  if (/\d/.test(v)) return `Your ${label} can’t contain numbers.`;
  if (!NAME_RE.test(v)) return `Your ${label} can only contain letters, spaces, hyphens and apostrophes.`;
  return '';
}

function validateEmail(value: string): string {
  const v = value.trim();
  if (!v) return 'Please enter your email address.';
  if (!EMAIL_RE.test(v) || v.includes('..') || v.startsWith('.') || v.split('@')[0].endsWith('.')) {
    return 'Please enter a valid email address, like name@example.com.';
  }
  return '';
}

/** Returns an error message, or '' when the value is fine. */
export function validateField(name: FieldName, value: string): string {
  switch (name) {
    case 'first':
      return validateName(value, 'first name');
    case 'last':
      return validateName(value, 'last name');
    case 'email':
      return validateEmail(value);
    case 'message':
      return value.trim() ? '' : 'Please write a message.';
  }
}

export function validateAll(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  for (const name of FIELD_ORDER) {
    const message = validateField(name, values[name]);
    if (message) errors[name] = message;
  }
  return errors;
}
