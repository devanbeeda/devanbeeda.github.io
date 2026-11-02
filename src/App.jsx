import { useEffect, useState } from 'react';
import Background from './components/Background.jsx';
import Intro from './components/Intro.jsx';
import Home from './components/Home.jsx';
import Nav from './components/Nav.jsx';
import Site from './components/Site.jsx';
import Spotlight from './components/Spotlight.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import { initSmoothScroll } from './lib/scroll.js';
import { timing } from './data/profile.js';

// stage: 'intro' -> 'exit' (intro fades, home starts) -> 'home'
export default function App() {
  const [stage, setStage] = useState('intro');

  useEffect(() => initSmoothScroll(), []);

  useEffect(() => {
    const t1 = setTimeout(() => setStage('exit'), timing.introDuration);
    const t2 = setTimeout(() => setStage('home'), timing.introDuration + timing.exitDuration);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <>
      <Background stage={stage} />
      {stage !== 'home' && <Intro leaving={stage === 'exit'} />}
      {stage !== 'intro' && (
        <>
          <Spotlight />
          <ScrollProgress />
          <Nav />
          <Home />
          <Site />
        </>
      )}
    </>
  );
}
