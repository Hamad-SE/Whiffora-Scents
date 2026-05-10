import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';

/* ── Design tokens ───────────────────────────────── */
const S = {
  container: { maxWidth: 1200, margin: '0 auto', padding: '0 32px' },
};

/* ── Hero ───────────────────────────────────────── */
function Hero() {
  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 640, display: 'flex', alignItems: 'center' }}>
      <img
        src="https://images.unsplash.com/photo-1557170334-a9632e77c6e4?w=1800&q=85"
        alt="Whiffora hero"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />

      <div style={{ ...S.container, position: 'relative', zIndex: 2, width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ maxWidth: 520 }}
        >
          <p style={{ fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c9a227', marginBottom: 20 }}>
            Whiffora Scents  — Est. 2026
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(44px, 6vw, 72px)', fontWeight: 300, color: '#fff', lineHeight: 1.1, marginBottom: 24 }}>
            Wear the scent<br /><em>of your story.</em>
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, marginBottom: 36, maxWidth: 380 }}>
            Artisan perfumes crafted with rare ingredients from around the world.
          </p>
          <Link
            to="/shop"
            id="hero-cta"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 32px',
              background: '#fff', color: '#1a1a1a',
              fontFamily: 'Inter, sans-serif', fontSize: 10,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'background 0.3s, color 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#c9a227'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#1a1a1a'; }}
          >
            Explore Collection <ArrowRight size={13} strokeWidth={1.5} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Featured Products ──────────────────────────── */
function FeaturedProducts() {
  const { products, loading } = useProducts({ featured: true });

  return (
    <section style={{ padding: '96px 0' }}>
      <div style={S.container}>
        {/* Section header */}
        <div style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c9a227', marginBottom: 12 }}>
            The Collection
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 300, color: '#1a1a1a' }}>
              Signature Scents
            </h2>
            <Link to="/shop"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1a1a1a', textDecoration: 'none', borderBottom: '1px solid #1a1a1a', paddingBottom: 2, transition: 'color 0.2s, border-color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#c9a227'; e.currentTarget.style.borderColor = '#c9a227'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#1a1a1a'; e.currentTarget.style.borderColor = '#1a1a1a'; }}>
              View All <ArrowRight size={11} strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div style={{ aspectRatio: '3/4', background: '#f0ede8', animation: 'pulse 1.5s infinite' }} />
                <div style={{ height: 16, background: '#f0ede8', marginTop: 16, width: '60%' }} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Split Banner ───────────────────────────────── */
function SplitBanner() {
  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 480 }}>
      {/* Image */}
      <div style={{ overflow: 'hidden' }}>
        <img
          src="/Velora.jpeg"
          alt="Perfume crafting"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      {/* Text */}
      <div style={{ background: '#f7f5f2', display: 'flex', alignItems: 'center', padding: '64px' }}>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c9a227', marginBottom: 20 }}>Our Craft</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 300, color: '#1a1a1a', lineHeight: 1.2, marginBottom: 20 }}>
            Rare ingredients.<br />Extraordinary results.
          </h2>
          <p style={{ fontSize: 13, color: '#777', lineHeight: 1.9, marginBottom: 32, maxWidth: 340 }}>
            Every fragrance begins with a journey. We source rose from Bulgaria, oud from India, vanilla from Madagascar — and bring them together in harmony.
          </p>
          <Link to="/shop"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1a1a1a', textDecoration: 'none', borderBottom: '1px solid #1a1a1a', paddingBottom: 2 }}>
            Discover More <ArrowRight size={11} strokeWidth={1.5} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Home ───────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <SplitBanner />
    </>
  );
}
