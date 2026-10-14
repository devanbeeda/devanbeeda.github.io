import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/motion.js';

// 3D tilt on hover (mouse devices only).
export default function Tilt({ className = '', max = 7, children }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches || prefersReducedMotion()) return;
    const el = ref.current;
    let raf = 0;
    const set = (rx, ry, gx, gy) => {
      el.style.setProperty('--rx', `${rx}deg`);
      el.style.setProperty('--ry', `${ry}deg`);
      el.style.setProperty('--gx', `${gx}%`);
      el.style.setProperty('--gy', `${gy}%`);
    };
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => set((-y * max).toFixed(2), (x * max).toFixed(2), (x + 0.5) * 100, (y + 0.5) * 100));
    };
    const leave = () => { cancelAnimationFrame(raf); set(0, 0, 50, 50); };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); cancelAnimationFrame(raf); };
  }, [max]);
  return <div ref={ref} className={`tilt ${className}`}>{children}</div>;
}
