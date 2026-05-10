import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Plus, Minus, ChevronRight } from 'lucide-react';
import { useProduct, useProducts } from '../hooks/useProducts';
import ScentNotes from '../components/ScentNotes';
import ProductCard from '../components/ProductCard';
import { useCartStore } from '../store/useCartStore';

export default function ProductDetail() {
  const { id } = useParams();
  const { product, loading } = useProduct(id);
  const { products: all } = useProducts();
  const addToCart = useCartStore((s) => s.addToCart);

  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  if (loading) {
    return (
      <div style={{ paddingTop: 72, height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 28, height: 28, border: '1.5px solid #c9a227', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ paddingTop: 72, textAlign: 'center', padding: '120px 32px' }}>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28 }}>Fragrance not found</p>
        <Link to="/shop" style={{ display: 'inline-block', marginTop: 24, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1a1a1a', textDecoration: 'none', borderBottom: '1px solid #1a1a1a', paddingBottom: 2 }}>
          Back to Shop
        </Link>
      </div>
    );
  }

  const effectiveSize = selectedSize || product.sizes?.[1] || { label: '50ml', price: product.price };
  const related = all.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product, effectiveSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Breadcrumb */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 32px 0', display: 'flex', gap: 8, alignItems: 'center', fontSize: 11, color: '#aaa', letterSpacing: '0.08em' }}>
        <Link to="/" style={{ color: '#aaa', textDecoration: 'none' }}>Home</Link>
        <ChevronRight size={11} />
        <Link to="/shop" style={{ color: '#aaa', textDecoration: 'none' }}>Shop</Link>
        <ChevronRight size={11} />
        <span style={{ color: '#1a1a1a' }}>{product.name}</span>
      </div>

      {/* Main */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 32px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>

        {/* ── Left: Images ── */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImg}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ background: '#f7f5f2', aspectRatio: '1/1', overflow: 'hidden' }}
            >
              <img
                src={product.gallery?.[activeImg] || product.image_url}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </motion.div>
          </AnimatePresence>

          {product.gallery?.length > 1 && (
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              {product.gallery.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  style={{ width: 64, height: 64, border: i === activeImg ? '1.5px solid #c9a227' : '1.5px solid transparent', background: 'none', cursor: 'pointer', overflow: 'hidden', padding: 0, opacity: i === activeImg ? 1 : 0.5, transition: 'all 0.2s' }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: Info ── */}
        <div>
          <p style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a227', marginBottom: 12 }}>{product.category}</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 300, color: '#1a1a1a', marginBottom: 8 }}>{product.name}</h1>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 16, color: '#888', marginBottom: 28 }}>{product.tagline}</p>

          {/* Divider */}
          <div style={{ width: 40, height: 1, background: '#e8e4dd', marginBottom: 28 }} />

          <p style={{ fontSize: 13, color: '#666', lineHeight: 1.9, marginBottom: 36 }}>{product.description}</p>

          {/* Size selector */}
          {product.sizes && (
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaa', marginBottom: 14 }}>Select Size</p>
              <div style={{ display: 'flex', gap: 10 }}>
                {product.sizes.map((size) => {
                  const active = effectiveSize?.label === size.label;
                  return (
                    <button
                      key={size.label}
                      id={`size-${size.label}`}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: '10px 20px', border: `1px solid ${active ? '#1a1a1a' : '#e8e4dd'}`,
                        background: active ? '#1a1a1a' : '#fff',
                        color: active ? '#fff' : '#1a1a1a',
                        cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                        fontSize: 12, transition: 'all 0.2s', textAlign: 'center',
                      }}
                    >
                      <div>{size.label}</div>
                      <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>Rs. {size.price.toLocaleString()}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price */}
          <div style={{ marginBottom: 28 }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, color: '#1a1a1a' }}>Rs. {effectiveSize.price.toLocaleString()}</span>
            <span style={{ fontSize: 11, color: '#aaa', marginLeft: 8, letterSpacing: '0.1em', textTransform: 'uppercase' }}>/ {effectiveSize.label}</span>
          </div>

          {/* Qty + Add */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e8e4dd' }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 44, height: 52, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Minus size={13} strokeWidth={1.5} />
              </button>
              <span style={{ width: 36, textAlign: 'center', fontSize: 14 }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} style={{ width: 44, height: 52, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Plus size={13} strokeWidth={1.5} />
              </button>
            </div>

            <motion.button
              id="add-to-cart-detail"
              onClick={handleAdd}
              whileTap={{ scale: 0.98 }}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                background: added ? '#2e7d32' : '#1a1a1a', color: '#fff', border: 'none', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
                transition: 'background 0.3s',
              }}
            >
              <ShoppingBag size={14} strokeWidth={1.5} />
              {added ? 'Added to Bag' : 'Add to Bag'}
            </motion.button>
          </div>

          {/* Perks */}
          <div style={{ display: 'flex', gap: 0, borderTop: '1px solid #f0ede8', paddingTop: 24 }}>
            {[['🚚', 'Free delivery', 'Orders over Rs. 5,000'], ['✅', 'Authentic', '100% genuine'], ['↩️', 'Easy returns', 'Within 7 days']].map(([icon, title, sub]) => (
              <div key={title} style={{ flex: 1, textAlign: 'center' }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                <p style={{ fontSize: 11, color: '#1a1a1a', marginTop: 6, fontWeight: 500 }}>{title}</p>
                <p style={{ fontSize: 10, color: '#aaa', marginTop: 2 }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scent Notes */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 80px' }}>
        <ScentNotes topNotes={product.top_notes} heartNotes={product.heart_notes} baseNotes={product.base_notes} />
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div style={{ borderTop: '1px solid #f0ede8', padding: '80px 0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
            <p style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c9a227', marginBottom: 10 }}>You May Also Like</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 300, marginBottom: 40 }}>Related Fragrances</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        </div>
      )}

      {/* Mobile sticky CTA */}
      <div style={{ display: 'none' }} className="mobile-sticky-cta">
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '1px solid #f0ede8', padding: '16px 20px', display: 'flex', gap: 12, alignItems: 'center', zIndex: 40 }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18 }}>Rs. {effectiveSize.price.toLocaleString()}</p>
            <p style={{ fontSize: 10, color: '#aaa', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{effectiveSize.label}</p>
          </div>
          <button onClick={handleAdd}
            style={{ background: added ? '#2e7d32' : '#1a1a1a', color: '#fff', border: 'none', padding: '14px 24px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            {added ? 'Added!' : 'Add to Bag'}
          </button>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .mobile-sticky-cta { display: block !important; }
          #product-main-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          #related-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </div>
  );
}
