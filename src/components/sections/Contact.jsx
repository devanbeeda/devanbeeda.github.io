import Section from '../Section.jsx';
import Reveal from '../Reveal.jsx';
import { contact, roles } from '../../data/content.js';
import { logo } from '../../utils/logos.js';

export default function Contact() {
  return (
    <Section id="contact" title="Contact">
      <Reveal className="contact">
        <p className="contact__lead">I'm open to roles in data and AI, including:</p>
        <ul className="contact__roles">
          {roles.map((r) => <li key={r} className="chip">{r}</li>)}
        </ul>
        <a className="contact__mail" href={`mailto:${contact.email}`}>{contact.email}</a>
        <p className="contact__meta">
          <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
          <span>{contact.location}</span>
        </p>
        <div className="contact__links">
          <a className="btn btn--solid" href={contact.gmail} target="_blank" rel="noreferrer noopener">
            <img src={logo('gmail')} alt="" width="20" height="20" /> Email me on Gmail
          </a>
          <a className="btn" href={contact.github} target="_blank" rel="noreferrer">
            <img src={logo('github')} alt="" width="20" height="20" /> GitHub
          </a>
          <a className="btn" href={contact.linkedin} target="_blank" rel="noreferrer">
            <img src={logo('linkedin')} alt="" width="20" height="20" /> LinkedIn
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
