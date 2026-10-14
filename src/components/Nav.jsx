import { useEffect, useState } from 'react';
import useActiveSection from '../hooks/useActiveSection.js';
import { navItems } from '../data/content.js';
import { scrollToId } from '../lib/scroll.js';
import { profile } from '../data/profile.js';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(navItems.map((n) => n.id));

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <a className="nav__brand" href="#top" onClick={(e) => { e.preventDefault(); setOpen(false); scrollToId('top'); }}>
        {profile.firstName} {profile.lastName}
      </a>
      <button className="nav__toggle" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span /><span />
      </button>
      <nav className="nav__links">
        {navItems.map((n) => (
          <a key={n.id} href={`#${n.id}`} className={active === n.id ? 'is-active' : ''} onClick={(e) => { e.preventDefault(); setOpen(false); scrollToId(n.id); }}>
            {n.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
