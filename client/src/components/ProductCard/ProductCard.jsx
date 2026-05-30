import { useCart } from '../../context/CartContext';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, index = 0 }) => {
  const { addItem } = useCart();
  const { ref, isVisible } = useScrollAnimation(0.1);

  const handleAdd = () => addItem(product);

  return (
    <article
      ref={ref}
      className={`${styles.card} ${isVisible ? styles.visible : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
      id={`product-card-${product._id}`}
    >
      <div className={styles.imageWrap}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className={styles.image}
          loading="lazy"
        />
        {product.badge && (
          <span className={styles.badge}>{product.badge}</span>
        )}
        <div className={styles.priceTag}>₹{product.price.toFixed(2)}</div>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <button
          id={`add-to-cart-${product._id}`}
          className={styles.addBtn}
          onClick={handleAdd}
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
