import { useEffect, useRef } from 'react';
import type { WorkItem } from '../data/works';
import { asset } from '../utils/asset';
import { ArrowRight, CloseIcon } from './icons';

interface CaseStudyModalProps {
  /** The project to show. Keep passing the last one while closed so nothing flashes. */
  work: WorkItem | null;
  open: boolean;
  onClose: () => void;
}

/** Case-study popup built on the native <dialog> element (focus trap, Esc, backdrop for free). */
export default function CaseStudyModal({ work, open, onClose }: CaseStudyModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open && typeof dialog.showModal === 'function') {
      if (infoRef.current) infoRef.current.scrollTop = 0;
      document.documentElement.classList.add('modal-open');
      dialog.showModal();
      closeRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => () => document.documentElement.classList.remove('modal-open'), []);

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      className="viewer"
      id="viewer"
      aria-labelledby="viewer-title"
      onClose={() => {
        document.documentElement.classList.remove('modal-open');
        onClose();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) close(); // click on the backdrop
      }}
    >
      <div className="viewer__media">
        <img id="viewer-img" src={work ? asset(work.file) : undefined} alt={work?.alt ?? ''} />
      </div>
      <div ref={infoRef} className="viewer__info">
        <p className="viewer__meta">
          <span className="viewer__cat" id="viewer-cat">{work?.category}</span>
          <span className="viewer__year" id="viewer-year">{work?.year}</span>
        </p>
        <h3 className="viewer__title" id="viewer-title">{work?.title}</h3>
        <p className="viewer__sub" id="viewer-sub">{work?.subtitle}</p>
        <div className="viewer__rule" />
        <p className="viewer__desc" id="viewer-desc">{work?.description}</p>
        <div className="viewer__foot">
          <span className="viewer__case">
            Michel Nugawela
            <br />
            Case Study
          </span>
          <button className="viewer__back" id="viewer-back" type="button" onClick={close}>
            <span>
              Back to
              <br />
              gallery
            </span>
            <ArrowRight />
          </button>
        </div>
      </div>
      <button ref={closeRef} className="viewer__close" id="viewer-close" type="button" aria-label="Close" onClick={close}>
        <CloseIcon strokeWidth={2} />
      </button>
    </dialog>
  );
}
