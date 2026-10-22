import Section from '../Section.jsx';
import Timeline from '../Timeline.jsx';
import { education } from '../../data/content.js';

export default function Education() {
  return (
    <Section id="education" title="Education">
      <Timeline items={education} />
    </Section>
  );
}
