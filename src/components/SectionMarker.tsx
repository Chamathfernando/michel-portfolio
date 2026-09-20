interface SectionMarkerProps {
  num: string;
  label: string;
  /** Render as a heading (the Work section uses <h2>) or a plain paragraph. */
  as?: 'p' | 'h2';
  id?: string;
}

/** The "01 ── About" section header. Same size on every screen. */
export default function SectionMarker({ num, label, as: Tag = 'p', id }: SectionMarkerProps) {
  return (
    <Tag className="marker" id={id}>
      <span className="marker__num">{num}</span>
      <span className="marker__rule" />
      <span className="marker__label">{label}</span>
    </Tag>
  );
}
