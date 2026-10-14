import useTypewriter from '../hooks/useTypewriter.js';
import { profile, timing } from '../data/profile.js';

export default function Intro({ leaving, onTyped }) {
  const { text, started } = useTypewriter(profile.hook, {
    startDelay: timing.typeStart,
    onDone: onTyped,
  });

  return (
    <main className={`stage intro${leaving ? ' is-leaving' : ''}`}>
      <h1 className="intro__title">
        <span className="intro__a">{profile.welcome}</span>
        <span className="intro__b">{profile.title}</span>
      </h1>
      <div className="intro__rule" />
      <p className={`intro__hook${started ? ' is-on' : ''}`} aria-label={profile.hook}>
        <span className="intro__prompt">&gt;</span> <span>{text}</span>
        <span className="intro__cursor" />
      </p>
    </main>
  );
}
