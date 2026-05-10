import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { categories } from '../data/products';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || null);

  useEffect(() => {
    setActiveCategory(searchParams.get('category') || null);
  }, [searchParams]);

  const { products, loading } = useProducts({ category: activeCategory });

  const setCategory = (cat) => {
    if (cat) setSearchParams({ category: cat });
    else setSearchParams({});
    setActiveCategory(cat);
  };

  const filterBtn = (label, value) => {
    const active = activeCategory === value || (!activeCategory && !value);
    return (
      <button
        key={label}
        id={`filter-${value || 'all'}`}
        onClick={() => setCategory(value)}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'Inter, sans-serif', fontSize: 11,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: active ? '#1a1a1a' : '#aaa',
          paddingBottom: 4,
          borderBottom: active ? '1px solid #1a1a1a' : '1px solid transparent',
          transition: 'all 0.2s',
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <div style={{ paddingTop: 72, minHeight: '100vh' }}>
      {/* Page title */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 32px 40px' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c9a227', marginBottom: 10 }}>
            Whiffora
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 300, color: '#1a1a1a', marginBottom: 36 }}>
            All Fragrances
          </h1>

          {/* Filters */}
          <div style={{ display: 'flex', gap: 28, borderBottom: '1px solid #f0ede8', paddingBottom: 20, flexWrap: 'wrap' }}>
            {filterBtn('All', null)}
            {categories.map((c) => filterBtn(c.name, c.id))}
          </div>

          <p style={{ marginTop: 16, fontSize: 11, color: '#bbb', letterSpacing: '0.08em' }}>
            {products.length} {products.length === 1 ? 'fragrance' : 'fragrances'}
          </p>
        </motion.div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 96px' }}>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                <div style={{ aspectRatio: '3/4', background: '#f0ede8', opacity: 0.6 }} />
                <div style={{ height: 14, background: '#f0ede8', marginTop: 16, width: '55%' }} />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, color: '#1a1a1a' }}>No fragrances found</p>
            <p style={{ fontSize: 13, color: '#aaa', marginTop: 8 }}>Try a different category</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>

      <style>{`@media(max-width:768px){
        #shop-grid { grid-template-columns: repeat(2,1fr) !important; }
      } @media(max-width:480px){
        #shop-grid { grid-template-columns: 1fr !important; }
      }`}</style>
    </div>
  );
}
