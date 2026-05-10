import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export default function ProductCard({ product, index = 0 }) {
  const [hovered, setHovered] = useState(false);
  const addToCart = useCartStore((s) => s.addToCart);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ cursor: 'pointer' }}
      onClick={() => navigate(`/product/${product.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      id={`product-card-${product.id}`}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', background: '#f7f5f2', aspectRatio: '3/4' }}>
        <img
          src={product.image_url}
          alt={product.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.6s ease',
            display: 'block',
          }}
        />
        {/* Add to bag — appears on hover */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'rgba(26,26,26,0.92)',
          padding: '14px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          transform: hovered ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.35s ease',
        }}>
          <button
            id={`add-to-cart-${product.id}`}
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 8,
              color: '#fff', fontFamily: 'Inter, sans-serif',
              fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
            }}
          >
            <ShoppingBag size={13} strokeWidth={1.5} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div style={{ paddingTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 17, fontWeight: 400, color: '#1a1a1a', marginBottom: 2 }}>
              {product.name}
            </p>
            <p style={{ fontSize: 11, color: '#aaa', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {product.category}
            </p>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#1a1a1a', fontWeight: 400, whiteSpace: 'nowrap', paddingTop: 2 }}>
            Rs. {product.price.toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
