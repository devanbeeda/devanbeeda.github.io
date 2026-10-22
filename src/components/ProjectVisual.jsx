import Tilt from './Tilt.jsx';

// Small illustrations for the two projects (pure SVG, no images).
export default function ProjectVisual({ kind }) {
  return <Tilt className={`pv pv--${kind}`}>{kind === 'detect' ? <Detect /> : <Regress />}</Tilt>;
}

function Detect() {
  const box = (x, y, w, h, label) => (
    <g className="pv__box">
      <path d={`M${x} ${y + 14}V${y}H${x + 14}M${x + w - 14} ${y}H${x + w}V${y + 14}M${x + w} ${y + h - 14}V${y + h}H${x + w - 14}M${x + 14} ${y + h}H${x}V${y + h - 14}`} />
      <rect x={x} y={y - 22} width="92" height="20" rx="3" className="pv__tag" />
      <text x={x + 8} y={y - 8} className="pv__label">{label}</text>
    </g>
  );
  const animal = (cx, cy, s) => (
    <g className="pv__animal" transform={`translate(${cx} ${cy}) scale(${s})`}>
      <ellipse cx="0" cy="0" rx="46" ry="24" />
      <circle cx="52" cy="-16" r="13" />
      <path d="M-30 18v30M-12 20v30M16 20v30M34 18v30M62-26l8-14M56-28l2-14" />
    </g>
  );
  return (
    <svg viewBox="0 0 420 300" role="img" aria-label="Illustration of an object detector drawing boxes around animals">
      <defs>
        <pattern id="pvgrid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0H0V30" fill="none" stroke="rgba(143,211,196,.08)" />
        </pattern>
      </defs>
      <rect width="420" height="300" fill="url(#pvgrid)" />
      <path d="M0 232H420" className="pv__ground" />
      {animal(120, 178, 1)}
      {box(52, 118, 160, 118, 'animal 0.94')}
      {animal(312, 196, 0.72)}
      {box(268, 150, 112, 86, 'animal 0.91')}
      <rect className="pv__scan" x="0" y="0" width="2" height="300" />
    </svg>
  );
}

function Regress() {
  const pts = [];
  for (let i = 0; i < 26; i++) {
    const x = 50 + i * 13.2;
    const jitter = Math.sin(i * 12.9898) * 22;
    pts.push([x, 238 - i * 7.2 + jitter]);
  }
  return (
    <svg viewBox="0 0 420 300" role="img" aria-label="Illustration of predicted versus actual crop yield">
      <path d="M44 24V252H396" className="pv__axis" />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M44 ${60 + i * 48}H396`} className="pv__gridline" />
      ))}
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4.2" className="pv__dot" style={{ '--i': i }} />
      ))}
      <path d="M50 240L380 52" className="pv__line" />
      <g transform="translate(250 270)" className="pv__legend">
        <circle cx="0" cy="-4" r="4" className="pv__dot pv__dot--on" />
        <text x="12" y="0" className="pv__label pv__label--dim">actual</text>
        <path d="M78 -4H100" className="pv__line pv__line--static" />
        <text x="108" y="0" className="pv__label pv__label--dim">predicted</text>
      </g>
    </svg>
  );
}
