import { useEffect, useRef } from 'react';
import SteamEffect from '../SteamEffect/SteamEffect';
import styles from './Hero.module.css';

const Hero = () => {
  const heroRef  = useRef(null);
  const imgRef   = useRef(null);

  // Parallax — background moves at 40% of scroll speed
  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current || !heroRef.current) return;
      const scrollY  = window.scrollY;
      const heroH    = heroRef.current.offsetHeight;
      // Only apply while hero is in view
      if (scrollY <= heroH) {
        imgRef.current.style.transform = `scale(1) translateY(${scrollY * 0.4}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToMenu  = () => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToAbout = () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className={styles.hero} ref={heroRef}>

      {/* Parallax background image */}
      <img
        ref={imgRef}
        src="/images/hero_coffee.png"
        alt="Coffee being poured into a white cup with warm bokeh lights"
        className={styles.heroImg}
      />

      {/* Dark gradient overlay */}
      <div className={styles.overlay} />

      {/* Animated warm glow — layer 1 (centre) */}
      <div className={styles.glowCenter} aria-hidden="true" />

      {/* Animated warm glow — layer 2 (top-left accent) */}
      <div className={styles.glowAccent} aria-hidden="true" />

      {/* Grain texture for film-like depth */}
      <div className={styles.grain} aria-hidden="true" />

      {/* Steam wisps rise from bottom */}
      <SteamEffect />

      {/* Hero content */}
      <div className={styles.content}>
        <p className={styles.tagline}>Welcome to Brew Haven</p>
        <h1 className={styles.title}>
          Where Every Cup<br />
          <em>Tells a Story</em>
        </h1>
        <p className={styles.subtitle}>
          Handcrafted seasonal drinks, artisanal snacks<br />
          and the warmth of a place to call your own.
        </p>
        <div className={styles.actions}>
          <button id="explore-menu-btn" className={styles.btnPrimary} onClick={scrollToMenu}>
            Explore Our Menu
          </button>
          <button id="our-story-btn" className={styles.btnSecondary} onClick={scrollToAbout}>
            Our Story
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}>
          <div className={styles.wheel} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
