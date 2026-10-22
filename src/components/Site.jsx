import About from './sections/About.jsx';
import Skills from './sections/Skills.jsx';
import Projects from './sections/Projects.jsx';
import Experience from './sections/Experience.jsx';
import Education from './sections/Education.jsx';
import Certifications from './sections/Certifications.jsx';
import Contact from './sections/Contact.jsx';
import { profile } from '../data/profile.js';

export default function Site() {
  return (
    <main className="site">
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <Contact />
      <footer className="footer">
        <p>&copy; 2026 {profile.firstName} {profile.lastName}</p>
      </footer>
    </main>
  );
}
