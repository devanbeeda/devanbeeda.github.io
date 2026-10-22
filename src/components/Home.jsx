import { useRef } from 'react';
import useParallax from '../hooks/useParallax.js';
import { profile } from '../data/profile.js';
import devan from '../assets/devan.webp';

export default function Home() {
  const figRef = useRef(null);
  const haloRef = useRef(null);
  useParallax(figRef, haloRef);

  return (
    <section id="top" className="home" aria-label="Home">
      <div className="home__halo" ref={haloRef} aria-hidden="true" />

      {/* Sits BEHIND the photo and is clipped at the person's centre line,
          so the text appears to slide out from inside the person. */}
      <div className="home__reveal">
        <h2 className="home__name">
          <span>{profile.firstName}</span> <span>{profile.lastName}</span>
        </h2>
        <p className="home__role">{profile.role}</p>
      </div>

      <div className="home__scroll" aria-hidden="true"><span>Scroll</span></div>

      <div className="home__fig" ref={figRef}>
        <img className="home__cut" src={devan} alt={`Portrait of ${profile.firstName} ${profile.lastName}`} />
      </div>
    </section>
  );
}
