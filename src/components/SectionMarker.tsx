import { reveal } from '../utils/reveal';

interface SectionMarkerProps {
  num: string;
  label: string;
  /** Render as a heading (the Work section uses <h2>) or a plain paragraph. */
  as?: 'p' | 'h2';
  id?: string;
  /** Stagger position of its entrance animation (0 = first). */
  step?: number;
}

/** The "01 ── About" section header. Same size on every screen; slides in when reached. */
export default function SectionMarker({ num, label, as: Tag = 'p', id, step = 0 }: SectionMarkerProps) {
  return (
    <Tag className="marker" id={id} {...reveal('left', step)}>
      <span className="marker__num">{num}</span>
      <span className="marker__rule" />
      <span className="marker__label">{label}</span>
    </Tag>
  );
}
