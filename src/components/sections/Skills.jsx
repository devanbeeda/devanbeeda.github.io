import Section from '../Section.jsx';
import Reveal from '../Reveal.jsx';
import { skillGroups } from '../../data/content.js';
import { logo } from '../../utils/logos.js';

const LogoTile = ({ name, logo: key }) => (
  <li className="logo">
    <div className="logo__tile">
      <img src={logo(key)} alt="" width="44" height="44" loading="lazy" />
    </div>
    <span>{name}</span>
  </li>
);

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="skills">
        {skillGroups.map((g, i) => (
          <Reveal className="skillgroup" key={g.title} delay={Math.min(i * 0.06, 0.3)}>
            <h3>{g.title}</h3>
            <div className="skillgroup__items">
              {g.logos && (
                <ul className="tiles">
                  {g.logos.map((l) => <LogoTile key={l.name} {...l} />)}
                </ul>
              )}
              {g.chips && (
                <ul className="chips">
                  {g.chips.map((c) => <li key={c} className="chip">{c}</li>)}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
