import styles from './Footer.module.css';

const Footer = () => {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span>☕</span>
              <span className={styles.logoText}>Brew Haven Café</span>
            </div>
            <p className={styles.tagline}>
              Artistry in every drop. Warmth in every visit.
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialBtn} aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className={styles.socialBtn} aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          <nav className={styles.links}>
            <h4 className={styles.linkHeading}>Navigate</h4>
            <button className={styles.link} onClick={() => scrollTo('hero')}>Home</button>
            <button className={styles.link} onClick={() => scrollTo('menu')}>Menu</button>
            <button className={styles.link} onClick={() => scrollTo('about')}>About</button>
          </nav>

          <nav className={styles.links}>
            <h4 className={styles.linkHeading}>Legal</h4>
            <button className={styles.link}>Privacy Policy</button>
            <button className={styles.link}>Terms of Service</button>
            <button className={styles.link}>Cookie Settings</button>
          </nav>

          <div className={styles.contact}>
            <h4 className={styles.linkHeading}>Contact</h4>
            <p>123 Roast Avenue</p>
            <p>Bengaluru, India</p>
            <p>hello@brewhaven.cafe</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2025 Brew Haven Café. Sipped with ♥ and good beans.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
