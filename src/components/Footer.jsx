import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';

// Simple inline SVG brand icons
const Ig = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);
const Fb = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function Footer() {
  return (
    <footer style={{ background: '#1a1a1a', color: '#fff', marginTop: 'auto' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 32px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: 48, marginBottom: 56 }}>

          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, letterSpacing: '0.08em', marginBottom: 4 }}>WHIFFORA</div>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', color: '#c9a227', textTransform: 'uppercase', marginBottom: 20 }}>Fine Fragrances</div>
            <p style={{ fontSize: 13, color: '#888', lineHeight: 1.8, maxWidth: 240 }}>
              Artisan perfumes crafted with rare ingredients. Each bottle holds a story.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              {[Ig].map((Icon, i) => (
                <a key={i} target="_blank" href="https://www.instagram.com/whiffora_scents.pk?igsh=c2Q3bmtoMmRjM2Y2&utm_source=qr" style={{ width: 34, height: 34, border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a227'; e.currentTarget.style.color = '#c9a227'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.color = '#888'; }}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a227', marginBottom: 20 }}>Shop</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[['All Fragrances', '/shop'], ['Floral', '/shop?category=floral'], ['Oriental', '/shop?category=oriental'], ['Woody', '/shop?category=woody'], ['Citrus', '/shop?category=citrus']].map(([label, to]) => (
                <Link key={label} to={to} style={{ fontSize: 13, color: '#888', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#888'}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Help */}
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a227', marginBottom: 20 }}>Help</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[['Shipping', '#'], ['Returns', '#'], ['FAQ', '#'], ['Track Order', '#']].map(([label, to]) => (
                <a key={label} href={to} style={{ fontSize: 13, color: '#888', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#888'}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact + newsletter */}
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a227', marginBottom: 20 }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 13, color: '#888' }}>
                <Phone size={13} color="#c9a227" strokeWidth={1.5} /> +92 308 4886368
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 13, color: '#888' }}>
                <Mail size={13} color="#c9a227" strokeWidth={1.5} /> whifforascents@gmail.com
              </div>
            </div>
            <div style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666', marginBottom: 10 }}>Newsletter</div>
            <div style={{ display: 'flex' }}>
              <input type="email" placeholder="Your email" style={{ flex: 1, background: '#2a2a2a', border: '1px solid #333', borderRight: 'none', padding: '10px 14px', fontSize: 12, color: '#fff', outline: 'none' }} />
              <button style={{ background: '#c9a227', border: 'none', padding: '10px 16px', cursor: 'pointer', color: '#fff', fontSize: 13 }}>→</button>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #2a2a2a', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 12, color: '#555' }}>© {new Date().getFullYear()} Whiffora. All rights reserved.</span>
          <span style={{ fontSize: 12, color: '#555' }}>Crafted in Pakistan 🇵🇰</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 480px) {
          footer > div > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
