import Section from '../Section.jsx';
import Reveal from '../Reveal.jsx';
import { about } from '../../data/content.js';

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="about">
        {about.text.map((t, i) => (
          <Reveal as="p" key={i} delay={i * 0.12}>{t}</Reveal>
        ))}
      </div>
    </Section>
  );
}
