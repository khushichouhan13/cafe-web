import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { placeOrder } from '../../api/axios';
import styles from './CartSidebar.module.css';

const CartSidebar = ({ isOpen, onClose }) => {
  const { items, total, increment, decrement, removeItem, clearCart } = useCart();
  const [ordering, setOrdering] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const handlePlaceOrder = async () => {
    if (items.length === 0) return;
    setOrdering(true);
    try {
      const orderItems = items.map(i => ({
        productId: i._id,
        name: i.name,
        price: i.price,
        quantity: i.quantity
      }));
      const res = await placeOrder(orderItems, parseFloat(total.toFixed(2)));
      setConfirmation(res.data.message);
      clearCart();
      setTimeout(() => {
        setConfirmation(null);
        onClose();
      }, 3000);
    } catch (err) {
      setConfirmation('Something went wrong. Please try again.');
    } finally {
      setOrdering(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        id="cart-sidebar"
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}
        aria-label="Shopping cart"
      >
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>Your Cart</h2>
            {items.length > 0 && (
              <span className={styles.count}>{items.reduce((s, i) => s + i.quantity, 0)} items</span>
            )}
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className={styles.body}>
          {confirmation ? (
            <div className={styles.confirmation}>
              <div className={styles.confIcon}>✓</div>
              <p className={styles.confMsg}>{confirmation}</p>
            </div>
          ) : items.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>☕</div>
              <p>Your cart is empty</p>
              <span>Add some delicious items from our menu!</span>
            </div>
          ) : (
            <ul className={styles.itemList}>
              {items.map(item => (
                <li key={item._id} className={styles.item}>
                  <img src={item.imageUrl} alt={item.name} className={styles.itemImg} />
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemPrice}>₹{(item.price * item.quantity).toFixed(2)}</p>
                    <div className={styles.qtyControls}>
                      <button
                        id={`decrement-${item._id}`}
                        className={styles.qtyBtn}
                        onClick={() => decrement(item._id)}
                        aria-label="Decrease quantity"
                      >−</button>
                      <span className={styles.qty}>{item.quantity}</span>
                      <button
                        id={`increment-${item._id}`}
                        className={styles.qtyBtn}
                        onClick={() => increment(item._id)}
                        aria-label="Increase quantity"
                      >+</button>
                    </div>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(item._id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && !confirmation && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span className={styles.totalAmt}>₹{total.toFixed(2)}</span>
            </div>
            <button
              id="place-order-btn"
              className={styles.orderBtn}
              onClick={handlePlaceOrder}
              disabled={ordering}
            >
              {ordering ? 'Placing Order…' : 'Place Order'}
            </button>
            <button className={styles.clearBtn} onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartSidebar;
