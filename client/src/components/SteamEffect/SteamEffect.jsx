import styles from './SteamEffect.module.css';

/* ------------------------------------------------------------------
   SteamEffect — CSS-only animated steam wisps
   Renders N wisps with staggered delays, blur, and opacity animation
   ------------------------------------------------------------------ */

const WISPS = [
  { delay: '0s',    duration: '3.8s', left: '18%', width: '10px' },
  { delay: '0.7s',  duration: '4.2s', left: '30%', width: '14px' },
  { delay: '1.4s',  duration: '3.5s', left: '42%', width: '8px'  },
  { delay: '0.3s',  duration: '4.8s', left: '54%', width: '12px' },
  { delay: '1.1s',  duration: '3.9s', left: '65%', width: '10px' },
  { delay: '0.9s',  duration: '4.4s', left: '76%', width: '9px'  },
];

const SteamEffect = () => (
  <div className={styles.steamContainer} aria-hidden="true">
    {WISPS.map((w, i) => (
      <div
        key={i}
        className={styles.wisp}
        style={{
          left:              w.left,
          width:             w.width,
          animationDelay:    w.delay,
          animationDuration: w.duration,
        }}
      />
    ))}
  </div>
);

export default SteamEffect;
