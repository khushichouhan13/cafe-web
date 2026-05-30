import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import styles from './Navbar.module.css';

const Navbar = ({ onCartOpen }) => {
  const { itemCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <div className={styles.logo} onClick={() => scrollTo('hero')}>
          <span className={styles.logoIcon}>☕</span>
          <span className={styles.logoText}>Brew Haven Café</span>
        </div>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          <button className={styles.navLink} onClick={() => scrollTo('hero')}>Home</button>
          <button className={styles.navLink} onClick={() => scrollTo('menu')}>Menu</button>
          <button className={styles.navLink} onClick={() => scrollTo('about')}>About</button>
          <button className={styles.navLink} onClick={() => scrollTo('footer')}>Contact</button>
        </nav>

        <div className={styles.actions}>
          <button
            id="cart-btn"
            className={styles.cartBtn}
            onClick={onCartOpen}
            aria-label="Open cart"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {itemCount > 0 && (
              <span className={styles.badge}>{itemCount}</span>
            )}
          </button>

          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(p => !p)}
            aria-label="Toggle menu"
          >
            <span className={`${styles.bar} ${menuOpen ? styles.bar1Open : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.bar2Open : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.bar3Open : ''}`} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
