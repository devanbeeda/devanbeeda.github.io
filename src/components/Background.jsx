import Scene3D from './Scene3D.jsx';

// Static gradient (cheap) + one WebGL canvas.
export default function Background({ stage }) {
  return (
    <div className="bg" aria-hidden="true">
      <Scene3D stage={stage} />
    </div>
  );
}
