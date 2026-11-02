import { profile } from '../data/profile.js';

export default function Intro({ leaving }) {
  return (
    <main className={`stage intro${leaving ? ' is-leaving' : ''}`}>
      <h1 className="intro__title">
        <span className="intro__a">{profile.introLine1}</span>
        <span className="intro__b">{profile.introLine2}</span>
      </h1>
      <div className="intro__rule" />
    </main>
  );
}
