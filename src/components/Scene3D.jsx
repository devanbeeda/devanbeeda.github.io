import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { prefersReducedMotion } from '../lib/motion.js';

// Interactive 3D "neural core": glowing wireframe, orbiting data rings, drifting particles.
// It follows the mouse, turns as you scroll, and glides from the centre (intro) to the side (site).
// Everything is drawn in about a dozen GPU draw calls, so it stays light.

const MINT = '#8fd3c4';
const BLUE = '#4f93c9';
const VIOLET = '#9b86e6';

const VERT = `
  attribute float aSize; attribute float aPhase; attribute vec3 aColor;
  uniform float uTime; uniform float uPx;
  varying vec3 vColor; varying float vPulse;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    float pulse = 0.72 + 0.28 * sin(uTime * 1.5 + aPhase);
    gl_PointSize = min(aSize * uPx * pulse * (7.0 / -mv.z), 26.0 * uPx);
    vColor = aColor; vPulse = pulse;
  }`;
const FRAG = `
  uniform float uAlpha; varying vec3 vColor; varying float vPulse;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = pow(smoothstep(0.5, 0.0, d), 1.7);
    gl_FragColor = vec4(vColor, a * uAlpha * vPulse);
  }`;

export default function Scene3D({ stage }) {
  const canvasRef = useRef(null);
  const stageRef = useRef(stage);
  const wakeRef = useRef(() => {});

  useEffect(() => {
    stageRef.current = stage;
    wakeRef.current();
  }, [stage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (e) {
      canvas.classList.add('is-off'); // no WebGL: the CSS gradient background stays
      return;
    }
    const still = prefersReducedMotion();
    const hover = window.matchMedia('(hover: hover)').matches;
    const small = window.innerWidth < 820;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.25 : 1.5));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
    camera.position.z = 7;
    const rig = new THREE.Group();
    scene.add(rig);
    const core = new THREE.Group();
    rig.add(core);

    const uTime = { value: 0 };
    const uPx = { value: renderer.getPixelRatio() };
    const fades = []; // [material or uniform holder, base opacity]
    const disposables = [];

    const cMint = new THREE.Color(MINT), cBlue = new THREE.Color(BLUE), cViolet = new THREE.Color(VIOLET);

    const lineMat = (color, opacity) => {
      const m = new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false });
      fades.push({ set: (f) => (m.opacity = opacity * f) });
      disposables.push(m);
      return m;
    };
    const cloud = (positions, colors, sizes, alpha) => {
      const g = new THREE.BufferGeometry();
      const n = positions.length / 3;
      g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      g.setAttribute('aColor', new THREE.Float32BufferAttribute(colors, 3));
      g.setAttribute('aSize', new THREE.Float32BufferAttribute(sizes, 1));
      g.setAttribute('aPhase', new THREE.Float32BufferAttribute(Array.from({ length: n }, () => Math.random() * 6.283), 1));
      const m = new THREE.ShaderMaterial({
        uniforms: { uTime, uPx, uAlpha: { value: alpha } },
        vertexShader: VERT, fragmentShader: FRAG,
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      });
      fades.push({ set: (f) => (m.uniforms.uAlpha.value = alpha * f) });
      disposables.push(g, m);
      return new THREE.Points(g, m);
    };

    // outer wireframe + glowing nodes
    const outerGeo = new THREE.IcosahedronGeometry(1.25, 2);
    const outerEdges = new THREE.EdgesGeometry(outerGeo, 1);
    core.add(new THREE.LineSegments(outerEdges, lineMat(cMint, 0.42)));
    const pos = outerGeo.attributes.position, seen = new Set(), nodes = [], nodeCol = [], nodeSize = [];
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      const key = `${x.toFixed(3)},${y.toFixed(3)},${z.toFixed(3)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      nodes.push(x, y, z);
      const c = Math.random() < 0.2 ? cViolet : cMint;
      nodeCol.push(c.r, c.g, c.b);
      nodeSize.push(4.2 + Math.random() * 3);
    }
    core.add(cloud(nodes, nodeCol, nodeSize, 0.95));

    // inner counter-rotating shape
    const innerGeo = new THREE.IcosahedronGeometry(0.72, 1);
    const inner = new THREE.LineSegments(new THREE.EdgesGeometry(innerGeo, 1), lineMat(cViolet, 0.5));
    core.add(inner);
    disposables.push(outerGeo, outerEdges, innerGeo, inner.geometry);

    // soft glow at the centre
    core.add(cloud([0, 0, 0], [cBlue.r, cBlue.g, cBlue.b], [60], 0.4));

    // orbit rings with travelling pulses
    const rings = [];
    [[1.95, [1.2, 0.2, 0], 0.18], [2.45, [0.4, 0.9, 0.3], -0.12], [2.95, [-0.5, 0.3, 1.0], 0.08]].forEach(([r, tilt, speed]) => {
      const pts = [];
      for (let i = 0; i < 128; i++) { const a = (i / 128) * Math.PI * 2; pts.push(Math.cos(a) * r, Math.sin(a) * r, 0); }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      disposables.push(g);
      const grp = new THREE.Group();
      grp.rotation.set(...tilt);
      grp.add(new THREE.LineLoop(g, lineMat(cMint, 0.2)));
      const pulse = cloud([0, 0, 0], [cMint.r, cMint.g, cMint.b], [9], 1);
      grp.add(pulse);
      core.add(grp);
      rings.push({ grp, pulse, r, speed, phase: Math.random() * 6 });
    });

    // drifting particle shell
    const dustN = small ? 520 : 950;
    const dp = [], dc = [], ds = [], palette = [cMint, cViolet, cBlue];
    for (let i = 0; i < dustN; i++) {
      const r = 2.3 + Math.pow(Math.random(), 0.7) * 2.3;
      const th = Math.random() * 6.283, ph = Math.acos(2 * Math.random() - 1);
      dp.push(r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph) * 0.85, r * Math.sin(ph) * Math.sin(th));
      const c = palette[(Math.random() * 3) | 0];
      dc.push(c.r, c.g, c.b);
      ds.push(1.6 + Math.random() * 2.6);
    }
    const dust = cloud(dp, dc, ds, 0.7);
    rig.add(dust);

    // ---- layout, input, loop ----
    let W = 0, H = 0, halfW = 1, halfH = 1, fit = 1, scrollMax = 1;
    const resize = (force) => {
      const w = window.innerWidth, h = window.innerHeight;
      if (!force && w === W && Math.abs(h - H) < 120) return; // ignore mobile address-bar jiggle
      W = w; H = h;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      halfH = Math.tan(THREE.MathUtils.degToRad(22.5)) * camera.position.z;
      halfW = halfH * camera.aspect;
      fit = Math.min(1.15, halfW / 1.75);
      uPx.value = renderer.getPixelRatio();
      wake();
    };
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let t = 0, scrollP = 0, awakeUntil = 0, last = performance.now();
    const wake = () => { awakeUntil = performance.now() + 2500; };
    wakeRef.current = wake;

    const onMove = (e) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
      wake();
    };
    const onScroll = () => wake();
    if (hover) window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => resize(false));
    const ro = new ResizeObserver(() => { scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight); });
    ro.observe(document.body);

    const smooth = (x) => x * x * (3 - 2 * x);
    const frame = () => {
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (still && now > awakeUntil) return; // reduced motion: only draw when something changes

      t += still ? 0 : dt;
      uTime.value = t;
      const intro = stageRef.current === 'intro';

      if (!hover) { pointer.tx = Math.sin(t * 0.25) * 0.35; pointer.ty = Math.cos(t * 0.2) * 0.2; }
      const kp = 1 - Math.exp(-dt * 4);
      pointer.x += (pointer.tx - pointer.x) * kp;
      pointer.y += (pointer.ty - pointer.y) * kp;

      const target = Math.min(1, Math.max(0, window.scrollY / scrollMax));
      scrollP += (target - scrollP) * (1 - Math.exp(-dt * 6));

      const wide = camera.aspect > 1.1;
      const tx = intro || !wide ? 0 : halfW * 0.52 * Math.cos(scrollP * Math.PI * 3);
      const ty = intro ? 0 : wide ? Math.sin(scrollP * 6) * halfH * 0.08 : -halfH * 0.12 + Math.sin(scrollP * Math.PI * 2) * halfH * 0.12;
      const ts = (intro ? fit * 1.15 : fit) * (1 + scrollP * 0.15);
      const kk = 1 - Math.exp(-dt * 2.2);
      rig.position.x += (tx - rig.position.x) * kk;
      rig.position.y += (ty - rig.position.y) * kk;
      rig.scale.setScalar(rig.scale.x + (ts - rig.scale.x) * kk);

      core.rotation.y = t * 0.12 + scrollP * 7 + pointer.x * 0.7;
      core.rotation.x = Math.sin(t * 0.2) * 0.15 + scrollP * 2.2 + pointer.y * 0.45;
      inner.rotation.y = -t * 0.3;
      inner.rotation.z = t * 0.17;
      dust.rotation.y = t * 0.018 + scrollP * 0.9;
      rings.forEach((r) => {
        r.grp.rotation.z += dt * r.speed * (still ? 0 : 1);
        const a = t * (0.55 + r.speed * 2) + r.phase;
        r.pulse.position.set(Math.cos(a) * r.r, Math.sin(a) * r.r, 0);
      });

      const f = intro ? 0.62 : 1 - 0.64 * smooth(Math.min(1, scrollP * 10));
      fades.forEach((m) => m.set(f));

      camera.position.x = pointer.x * 0.35;
      camera.position.y = -pointer.y * 0.25;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };

    const start = () => { last = performance.now(); renderer.setAnimationLoop(frame); };
    const onVis = () => (document.hidden ? renderer.setAnimationLoop(null) : start());
    document.addEventListener('visibilitychange', onVis);

    resize(true);
    rig.scale.setScalar(fit * 1.15);
    start();

    return () => {
      renderer.setAnimationLoop(null);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      ro.disconnect();
      disposables.forEach((d) => d.dispose && d.dispose());
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="scene3d" aria-hidden="true" />;
}
