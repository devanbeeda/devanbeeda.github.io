import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/motion.js';

// Soft light that follows the mouse (desktop only). One element, moved with transform.
export default function Spotlight() {
  const ref = useRef(null);
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches || prefersReducedMotion()) return;
    const el = ref.current;
    let raf = 0, x = 0, y = 0;
    const draw = () => { el.style.transform = `translate3d(${x}px, ${y}px, 0)`; el.style.opacity = 1; raf = 0; };
    const onMove = (e) => { x = e.clientX; y = e.clientY; if (!raf) raf = requestAnimationFrame(draw); };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => { window.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} className="spot" aria-hidden="true" />;
}
