import Reveal from './Reveal.jsx';

// Vertical timeline used by Experience and Education.
// item: { dates, title, subtitle (text, or a list of lines), points? }
export default function Timeline({ items }) {
  return (
    <div className="timeline">
      {items.map((it, i) => {
        const [first, ...rest] = Array.isArray(it.subtitle) ? it.subtitle : [it.subtitle];
        return (
        <Reveal className="job" key={it.title} delay={i * 0.12}>
          <p className="job__dates">{it.dates}</p>
          <h3>{it.title}</h3>
          <p className="job__company">{first}</p>
          {rest.map((line) => <p className="job__detail" key={line}>{line}</p>)}
          {it.points && <ul>{it.points.map((t) => <li key={t}>{t}</li>)}</ul>}
        </Reveal>
        );
      })}
    </div>
  );
}
