import Lenis from 'lenis';
import { prefersReducedMotion } from './motion.js';

// Buttery smooth scrolling (Lenis). Skipped when the visitor asked for reduced motion.
let lenis = null;

export function initSmoothScroll() {
  if (prefersReducedMotion()) return () => {};
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    autoRaf: true,
  });
  return () => {
    lenis?.destroy();
    lenis = null;
  };
}

export const getLenis = () => lenis;

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: id === 'top' ? 0 : -56, duration: 1.4 });
  else el.scrollIntoView({ behavior: 'auto' });
}
