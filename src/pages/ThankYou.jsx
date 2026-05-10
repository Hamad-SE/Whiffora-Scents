import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function ThankYou() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#faf9f7', paddingTop: 72 }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ textAlign: 'center', maxWidth: 480, padding: '0 32px' }}
      >
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2, damping: 14 }}
          style={{ width: 64, height: 64, margin: '0 auto 32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e8e4dd', background: '#fff' }}
        >
          <CheckCircle2 size={28} color="#c9a227" strokeWidth={1.5} />
        </motion.div>

        <p style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c9a227', marginBottom: 16 }}>Order Confirmed</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 300, color: '#1a1a1a', marginBottom: 16 }}>
          Thank you for your order
        </h1>
        <p style={{ fontSize: 13, color: '#888', lineHeight: 1.8, marginBottom: 8 }}>
          Our team will contact you shortly to confirm your delivery details.
        </p>
        <p style={{ fontSize: 11, color: '#bbb', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 48 }}>
          Cash on Delivery — Payment at your door
        </p>

        {/* Timeline */}
        <div style={{ background: '#fff', border: '1px solid #f0ede8', padding: '24px 28px', marginBottom: 40, textAlign: 'left' }}>
          {[
            { step: 'Order Received', time: 'Just now', active: true },
            { step: 'Processing', time: '1–2 business days', active: false },
            { step: 'Delivered', time: '3–5 business days', active: false },
          ].map(({ step, time, active }) => (
            <div key={step} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f7f5f2' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: active ? '#c9a227' : '#e8e4dd', flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: active ? '#1a1a1a' : '#aaa' }}>{step}</span>
              </div>
              <span style={{ fontSize: 11, color: '#bbb' }}>{time}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" id="back-home"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '13px 28px', border: '1px solid #1a1a1a', color: '#1a1a1a', fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1a1a1a'; }}
          >
            Home
          </Link>
          <Link to="/shop" id="continue-shopping"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', background: '#1a1a1a', color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#c9a227'}
            onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}
          >
            Continue Shopping <ArrowRight size={12} strokeWidth={1.5} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
