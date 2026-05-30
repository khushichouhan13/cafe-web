import { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { fetchProducts } from '../../api/axios';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import styles from './Menu.module.css';

const TABS = [
  { label: 'All', value: 'all' },
  { label: 'Coffee', value: 'coffee' },
  { label: 'Oat Milk', value: 'oatmilk' },
  { label: 'Snacks', value: 'snacks' }
];

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { ref, isVisible } = useScrollAnimation(0.1);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetchProducts(activeTab);
        setProducts(res.data.data);
      } catch (err) {
        setError('Could not load menu. Is the server running?');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [activeTab]);

  return (
    <section id="menu" className={styles.section}>
      <div className={styles.container}>
        <div
          ref={ref}
          className={`${styles.header} ${isVisible ? styles.headerVisible : ''}`}
        >
          <h2 className={styles.title}>The Seasonal Menu</h2>
          <div className={styles.divider} />

          <div className={styles.tabs} role="tablist">
            {TABS.map(tab => (
              <button
                key={tab.value}
                id={`tab-${tab.value}`}
                role="tab"
                aria-selected={activeTab === tab.value}
                className={`${styles.tab} ${activeTab === tab.value ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className={styles.loadingState}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        )}

        {error && (
          <div className={styles.error}>
            <span>⚠️</span> {error}
          </div>
        )}

        {!loading && !error && (
          <div className={styles.grid}>
            {products.map((product, i) => (
              <ProductCard key={product._id} product={product} index={i} />
            ))}
            {products.length === 0 && (
              <p className={styles.empty}>No items in this category yet.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;
