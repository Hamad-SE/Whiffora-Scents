import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';

export default function CartDrawer() {
  const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity, getTotal } = useCartStore();
  const total = getTotal();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="bd"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeCart}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 60 }}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 300 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, width: 400,
              maxWidth: '100vw', background: '#fff', zIndex: 70,
              display: 'flex', flexDirection: 'column',
              boxShadow: '-4px 0 40px rgba(0,0,0,0.08)',
            }}
          >
            {/* Header */}
            <div style={{ padding: '28px 28px 20px', borderBottom: '1px solid #f0ede8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 400 }}>Your Bag</h2>
                <p style={{ fontSize: 11, color: '#aaa', letterSpacing: '0.1em', marginTop: 2 }}>
                  {cart.length} {cart.length === 1 ? 'item' : 'items'}
                </p>
              </div>
              <button onClick={closeCart} aria-label="Close cart"
                style={{ background: 'none', border: '1px solid #e8e4dd', width: 34, height: 34, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s' }}>
                <X size={14} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px' }}>
              {cart.length === 0 ? (
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, textAlign: 'center' }}>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, color: '#1a1a1a' }}>Your bag is empty</p>
                  <p style={{ fontSize: 13, color: '#aaa' }}>Discover our collection</p>
                  <Link to="/shop" onClick={closeCart}
                    style={{ marginTop: 12, display: 'inline-block', padding: '12px 28px', background: '#1a1a1a', color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none' }}>
                    Shop Now
                  </Link>
                </div>
              ) : (
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.cartKey}
                      layout
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0 }}
                      style={{ display: 'flex', gap: 16, paddingBottom: 20, marginBottom: 20, borderBottom: '1px solid #f0ede8' }}
                    >
                      {/* Thumb */}
                      <div style={{ width: 72, height: 88, background: '#f7f5f2', flexShrink: 0, overflow: 'hidden' }}>
                        <img src={item.image_url} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>

                      {/* Details */}
                      <div style={{ flex: 1 }}>
                        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16 }}>{item.name}</p>
                        {item.selectedSize && <p style={{ fontSize: 10, color: '#aaa', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 2 }}>{item.selectedSize}</p>}
                        <p style={{ fontSize: 13, color: '#c9a227', marginTop: 6 }}>Rs. {(item.price * item.quantity).toLocaleString()}</p>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                          {/* Qty */}
                          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e8e4dd' }}>
                            <button onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                              style={{ width: 30, height: 30, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Minus size={11} strokeWidth={1.5} />
                            </button>
                            <span style={{ width: 28, textAlign: 'center', fontSize: 13 }}>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                              style={{ width: 30, height: 30, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Plus size={11} strokeWidth={1.5} />
                            </button>
                          </div>
                          <button onClick={() => removeFromCart(item.cartKey)} aria-label="Remove"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ccc', transition: 'color 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.color = '#e57373'}
                            onMouseLeave={e => e.currentTarget.style.color = '#ccc'}>
                            <Trash2 size={13} strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div style={{ padding: '20px 28px 28px', borderTop: '1px solid #f0ede8', background: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: '#aaa', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Subtotal</span>
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18 }}>Rs. {total.toLocaleString()}</span>
                </div>
                <p style={{ fontSize: 11, color: '#aaa', marginBottom: 20 }}>Shipping calculated at checkout</p>

                <Link to="/checkout" onClick={closeCart} id="checkout-btn"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '15px', background: '#1a1a1a', color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#c9a227'}
                  onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}>
                  Checkout <ArrowRight size={13} strokeWidth={1.5} />
                </Link>

                <button onClick={closeCart}
                  style={{ width: '100%', marginTop: 12, background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: '#aaa', letterSpacing: '0.15em', textTransform: 'uppercase', padding: 8 }}>
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
