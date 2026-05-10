import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';

const links = [
  { to: '/shop', label: 'Shop' },
  { to: '/shop?category=floral', label: 'Floral' },
  { to: '/shop?category=oriental', label: 'Oriental' },
  { to: '/shop?category=woody', label: 'Woody' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openCart, getCount } = useCartStore();
  const count = getCount();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isSolid = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          borderBottom: isSolid ? '1px solid #f0ede8' : '1px solid transparent',
          background: isSolid ? 'rgba(255,255,255,0.97)' : 'transparent',
          backdropFilter: isSolid ? 'blur(8px)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 400, letterSpacing: '0.06em', color: isSolid ? '#1a1a1a' : '#fff', lineHeight: 1 }}>
              WHIFFORA
            </div>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', color: '#c9a227', textTransform: 'uppercase', marginTop: 2 }}>
              Scents of Soul
            </div>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', gap: 36 }} className="hidden-mobile">
            {links.map(({ to, label }) => (
              <NavLink
                key={label}
                to={to}
                style={({ isActive }) => ({
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 11,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 400,
                  textDecoration: 'none',
                  color: isSolid ? (isActive ? '#c9a227' : '#1a1a1a') : (isActive ? '#c9a227' : 'rgba(255,255,255,0.88)'),
                  transition: 'color 0.3s',
                  paddingBottom: 2,
                  borderBottom: isActive ? '1px solid #c9a227' : '1px solid transparent',
                })}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Cart + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <button
              id="open-cart-btn"
              onClick={openCart}
              aria-label="Open cart"
              style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', padding: 4 }}
            >
              <ShoppingBag size={19} color={isSolid ? '#1a1a1a' : '#fff'} strokeWidth={1.5} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    style={{ position: 'absolute', top: -4, right: -4, width: 16, height: 16, borderRadius: '50%', background: '#c9a227', color: '#fff', fontSize: 9, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile hamburger */}
            <button
              className="show-mobile"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none' }}
            >
              <Menu size={20} color={isSolid ? '#1a1a1a' : '#fff'} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenuOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 60 }} />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 280, background: '#fff', zIndex: 70, display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0ede8' }}>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18 }}>Menu</span>
                <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={18} />
                </button>
              </div>
              <nav style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 28 }}>
                {[{ to: '/', label: 'Home' }, ...links].map(({ to, label }) => (
                  <Link key={label} to={to} onClick={() => setMenuOpen(false)}
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', color: '#1a1a1a' }}>
                    {label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
