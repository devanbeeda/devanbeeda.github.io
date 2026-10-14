import Section from '../Section.jsx';
import Reveal from '../Reveal.jsx';
import ProjectVisual from '../ProjectVisual.jsx';
import { projectGroups } from '../../data/content.js';
import { logo } from '../../utils/logos.js';

function Project({ p, flip }) {
  return (
    <article className={`project${flip ? ' project--flip' : ''}`}>
      {p.visual && <Reveal className="project__visual"><ProjectVisual kind={p.visual} /></Reveal>}
      <Reveal className="project__body" delay={0.12}>
        <h4>{p.title}</h4>
        <ul>{p.points.map((t) => <li key={t}>{t}</li>)}</ul>
        <ul className="stack" aria-label="Tech stack">
          {p.stack.map((s) => (
            <li key={s.name} className="stack__item">
              {s.logo && <img src={logo(s.logo)} alt="" width="18" height="18" />}
              {s.name}
            </li>
          ))}
        </ul>
        {p.repo && (
          <a className="btn btn--sm project__repo" href={p.repo} target="_blank" rel="noreferrer noopener">
            <img src={logo('github')} alt="" width="18" height="18" /> View on GitHub
          </a>
        )}
      </Reveal>
    </article>
  );
}

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      {projectGroups.map((g) => (
        <div className="projgroup" key={g.title}>
          <Reveal as="h3" className="projgroup__title">{g.title}</Reveal>
          {g.projects.map((p, i) => <Project key={p.title} p={p} flip={i % 2 === 1} />)}
        </div>
      ))}
    </Section>
  );
}
