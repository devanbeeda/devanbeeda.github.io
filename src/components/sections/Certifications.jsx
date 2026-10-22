import Section from '../Section.jsx';
import Reveal from '../Reveal.jsx';
import { certifications } from '../../data/content.js';

export default function Certifications() {
  return (
    <Section id="certifications" title="Certifications">
      <Reveal className="certs">
        <ul>
          {certifications.map((c) => (
            <li key={c.name}>
              <div className="certs__main">
                <span>{c.name}</span>
                <em>{c.issuer}</em>
              </div>
              {c.url && (
                <a className="btn btn--sm" href={c.url} target="_blank" rel="noreferrer noopener">
                  View certificate <span aria-hidden="true">&#8599;</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
