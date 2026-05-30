import { useEffect, useRef } from 'react';
import styles from './BackgroundCanvas.module.css';

/* ------------------------------------------------------------------
   Floating Bokeh Particles — Canvas-based, requestAnimationFrame
   Draws soft warm-toned circles that drift gently upward
   ------------------------------------------------------------------ */

const PARTICLE_COUNT = 28;

const COLORS = [
  'rgba(196, 149, 106, {a})',   // warm tan
  'rgba(232, 213, 183, {a})',   // cream
  'rgba(232, 193, 145, {a})',   // golden
  'rgba(242, 224, 195, {a})',   // pale peach
  'rgba(180, 120,  80, {a})',   // mid brown
];

function makeParticle(canvasW, canvasH) {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  return {
    x: Math.random() * canvasW,
    y: canvasH + Math.random() * canvasH,   // start below viewport
    r: 6 + Math.random() * 28,              // radius 6–34px
    vx: (Math.random() - 0.5) * 0.35,      // gentle horizontal drift
    vy: -(0.18 + Math.random() * 0.35),    // slow upward
    alpha: 0.03 + Math.random() * 0.07,    // very subtle
    color,
    // subtle wobble
    wobbleSpeed: 0.004 + Math.random() * 0.006,
    wobbleAmp:   6 + Math.random() * 14,
    wobbleOffset: Math.random() * Math.PI * 2,
    age: 0,
  };
}

const BackgroundCanvas = () => {
  const canvasRef = useRef(null);
  const stateRef  = useRef({ particles: [], raf: null, t: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const state = stateRef.current;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // Init particles spread across the full height
    state.particles = Array.from({ length: PARTICLE_COUNT }, () =>
      makeParticle(canvas.width, canvas.height)
    );
    // Scatter initial Y so they don't all start at bottom
    state.particles.forEach(p => {
      p.y = Math.random() * canvas.height * 2;
    });

    const draw = () => {
      state.t += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      state.particles.forEach((p, i) => {
        p.age++;
        const wobbleX = Math.sin(state.t * p.wobbleSpeed + p.wobbleOffset) * p.wobbleAmp;
        p.x += p.vx + wobbleX * 0.02;
        p.y += p.vy;

        // Wrap horizontally
        if (p.x < -p.r) p.x = canvas.width + p.r;
        if (p.x > canvas.width + p.r) p.x = -p.r;

        // Reset when particle exits top
        if (p.y < -p.r * 2) {
          state.particles[i] = makeParticle(canvas.width, canvas.height);
          return;
        }

        // Draw soft circle with radial gradient
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        const fillColor = p.color.replace('{a}', p.alpha);
        const edgeColor = p.color.replace('{a}', '0');
        grad.addColorStop(0, fillColor);
        grad.addColorStop(1, edgeColor);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      state.raf = requestAnimationFrame(draw);
    };

    state.raf = requestAnimationFrame(draw);

    const onResize = () => {
      resize();
      state.particles = Array.from({ length: PARTICLE_COUNT }, () =>
        makeParticle(canvas.width, canvas.height)
      );
      state.particles.forEach(p => { p.y = Math.random() * canvas.height * 2; });
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(state.raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
};

export default BackgroundCanvas;
