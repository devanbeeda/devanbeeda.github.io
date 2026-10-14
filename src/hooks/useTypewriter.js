import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion.js';

export default function useTypewriter(full, { startDelay = 0, min = 60, max = 100, onDone } = {}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (prefersReducedMotion()) {
      setCount(full.length);
      setStarted(true);
      doneRef.current?.();
      return;
    }
    let i = 0;
    let t;
    const tick = () => {
      i += 1;
      setStarted(true);
      setCount(i);
      if (i < full.length) t = setTimeout(tick, min + Math.random() * (max - min));
      else doneRef.current?.();
    };
    t = setTimeout(tick, startDelay);
    return () => clearTimeout(t);
  }, [full, startDelay, min, max]);

  return { text: full.slice(0, count), started };
}
