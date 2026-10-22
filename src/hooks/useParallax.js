import { useEffect } from 'react';
import { prefersReducedMotion } from '../lib/motion.js';

// Subtle mouse parallax (desktop only). Uses the CSS `translate` property so it never fights the entrance animation.
export default function useParallax(figRef, haloRef) {
  useEffect(() => {
    const fig = figRef.current;
    const halo = haloRef.current;
    if (!fig || !halo) return;
    if (prefersReducedMotion()) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      fig.style.translate = `${cx * 16}px ${cy * 6}px`;
      halo.style.translate = `${cx * -26}px ${cy * -10}px`;
      raf = Math.abs(tx - cx) > 0.0008 || Math.abs(ty - cy) > 0.0008 ? requestAnimationFrame(loop) : 0;
    };
    const onMove = (e) => {
      if (window.scrollY > window.innerHeight) return; // hero is off screen
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [figRef, haloRef]);
}
