import Section from '../Section.jsx';
import Timeline from '../Timeline.jsx';
import { experience } from '../../data/content.js';

export default function Experience() {
  const items = experience.map((e) => ({ dates: e.dates, title: e.role, subtitle: e.company, points: e.points }));
  return (
    <Section id="experience" title="Experience">
      <Timeline items={items} />
    </Section>
  );
}
