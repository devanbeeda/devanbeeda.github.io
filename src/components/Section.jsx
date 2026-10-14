import Reveal from './Reveal.jsx';

export default function Section({ id, title, children, bleed = false }) {
  return (
    <section id={id} className="sec">
      <div className="wrap">
        <Reveal as="h2" className="sec__title">{title}</Reveal>
        {!bleed && children}
      </div>
      {bleed && children}
    </section>
  );
}
