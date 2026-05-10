import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

const inputStyle = {
  width: '100%', border: '1px solid #e8e4dd', padding: '12px 16px',
  fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#1a1a1a',
  background: '#fff', outline: 'none', transition: 'border-color 0.2s',
};

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, getTotal, clearCart } = useCartStore();
  const total = getTotal();
  const delivery = total >= 5000 ? 0 : 250;
  const grandTotal = total + delivery;

  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', city: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e) => { setForm(p => ({ ...p, [e.target.name]: e.target.value })); setError(''); };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.city) { setError('Please fill in all required fields.'); return; }
    setSubmitting(true);

    // Construct WhatsApp Message
    let message = `*New Order from Whiffora Scents!*\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${form.name}\n`;
    message += `Phone: ${form.phone}\n`;
    if (form.email) message += `Email: ${form.email}\n`;
    message += `Address: ${form.address}\n`;
    message += `City: ${form.city}\n`;
    if (form.notes) message += `Notes: ${form.notes}\n`;

    message += `\n*Order Details:*\n`;
    cart.forEach(item => {
      message += `- ${item.name} ${item.selectedSize ? `(${item.selectedSize})` : ''} x ${item.quantity} = Rs. ${(item.price * item.quantity).toLocaleString()}\n`;
    });

    message += `\n*Subtotal:* Rs. ${total.toLocaleString()}`;
    message += `\n*Delivery:* ${delivery === 0 ? 'Free' : `Rs. ${delivery}`}`;
    message += `\n*Grand Total:* Rs. ${grandTotal.toLocaleString()}`;
    message += `\n*Payment Method:* Cash on Delivery`;

    const encodedMessage = encodeURIComponent(message);
    // TODO: The shop owner needs to change this to their real WhatsApp number (including country code)
    const phoneNumber = "+923084886368";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    try {
      await new Promise(r => setTimeout(r, 800));
      window.open(whatsappUrl, '_blank');
      clearCart();
      navigate('/thank-you');
    } catch { setError('Something went wrong. Please try again.'); }
    finally { setSubmitting(false); }
  };

  if (cart.length === 0) {
    return (
      <div style={{ paddingTop: 72, minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '120px 32px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, color: '#1a1a1a' }}>Your bag is empty</p>
        <Link to="/shop" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1a1a1a', textDecoration: 'none', borderBottom: '1px solid #1a1a1a', paddingBottom: 2, marginTop: 8 }}>Shop Now</Link>
      </div>
    );
  }

  // Delivery calculation is now moved to the top of the component

  return (
    <div style={{ paddingTop: 72, minHeight: '100vh', background: '#faf9f7' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 32px 80px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48, alignItems: 'start' }}>

        {/* ── Form ── */}
        <div>
          <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#aaa', textDecoration: 'none', marginBottom: 32 }}>
            <ArrowLeft size={12} strokeWidth={1.5} /> Back to Shop
          </Link>

          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 300, color: '#1a1a1a', marginBottom: 36 }}>Checkout</h1>

          <form onSubmit={onSubmit} noValidate>
            {/* Contact */}
            <div style={{ background: '#fff', border: '1px solid #f0ede8', padding: '32px', marginBottom: 20 }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 400, marginBottom: 24 }}>Contact</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[['Full Name', 'name', 'text', 'Aisha Rahman', true], ['Phone', 'phone', 'tel', '+92 300 0000000', true], ['Email', 'email', 'email', 'Optional', false]].map(([label, name, type, ph, req]) => (
                  <div key={name} style={{ gridColumn: name === 'email' ? 'span 2' : 'auto' }}>
                    <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#aaa', marginBottom: 8 }}>{label}{req ? ' *' : ''}</label>
                    <input id={`checkout-${name}`} name={name} type={type} value={form[name]} onChange={onChange} placeholder={ph} required={req}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#c9a227'}
                      onBlur={e => e.target.style.borderColor = '#e8e4dd'}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping */}
            <div style={{ background: '#fff', border: '1px solid #f0ede8', padding: '32px', marginBottom: 20 }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 400, marginBottom: 24 }}>Shipping</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[['Address', 'address', true], ['City', 'city', true], ['Order Notes', 'notes', false]].map(([label, name, req]) =>
                  name === 'address' || name === 'notes' ? (
                    <div key={name}>
                      <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#aaa', marginBottom: 8 }}>{label}{req ? ' *' : ''}</label>
                      <textarea id={`checkout-${name}`} name={name} value={form[name]} onChange={onChange} required={req} rows={name === 'notes' ? 2 : 3}
                        style={{ ...inputStyle, resize: 'none' }}
                        onFocus={e => e.target.style.borderColor = '#c9a227'}
                        onBlur={e => e.target.style.borderColor = '#e8e4dd'}
                      />
                    </div>
                  ) : (
                    <div key={name}>
                      <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#aaa', marginBottom: 8 }}>{label}{req ? ' *' : ''}</label>
                      <input id={`checkout-${name}`} name={name} value={form[name]} onChange={onChange} required={req}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#c9a227'}
                        onBlur={e => e.target.style.borderColor = '#e8e4dd'}
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Payment */}
            <div style={{ background: '#fff', border: '1px solid #f0ede8', padding: '24px 32px', marginBottom: 24 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid #c9a227', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#c9a227' }} />
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a' }}>Cash on Delivery</p>
                  <p style={{ fontSize: 11, color: '#aaa', marginTop: 2 }}>Pay when your order arrives</p>
                </div>
              </div>
            </div>

            {error && <p style={{ color: '#e53935', fontSize: 12, marginBottom: 16, textAlign: 'center' }}>{error}</p>}

            <motion.button
              type="submit"
              id="place-order-btn"
              disabled={submitting}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%', padding: '16px', background: '#1a1a1a', color: '#fff', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer',
                fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                opacity: submitting ? 0.7 : 1, transition: 'background 0.3s',
              }}
              onMouseEnter={e => { if (!submitting) e.currentTarget.style.background = '#c9a227'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#1a1a1a'; }}
            >
              {submitting
                ? <><Loader2 size={14} strokeWidth={1.5} style={{ animation: 'spin 0.8s linear infinite' }} /> Placing Order...</>
                : <><CheckCircle2 size={14} strokeWidth={1.5} /> Place Order — Rs. {grandTotal.toLocaleString()}</>
              }
            </motion.button>
          </form>
        </div>

        {/* ── Order Summary ── */}
        <div style={{ background: '#fff', border: '1px solid #f0ede8', padding: '28px', position: 'sticky', top: 88 }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 400, marginBottom: 24 }}>Order Summary</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
            {cart.map((item) => (
              <div key={item.cartKey} style={{ display: 'flex', gap: 14 }}>
                <div style={{ width: 56, height: 64, background: '#f7f5f2', flexShrink: 0, overflow: 'hidden' }}>
                  <img src={item.image_url} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 15 }}>{item.name}</p>
                  {item.selectedSize && <p style={{ fontSize: 10, color: '#aaa', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>{item.selectedSize}</p>}
                  <p style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Qty: {item.quantity}</p>
                </div>
                <p style={{ fontSize: 13, color: '#1a1a1a', whiteSpace: 'nowrap', paddingTop: 2 }}>Rs. {(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #f0ede8', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#888' }}>
              <span>Subtotal</span><span>Rs. {total.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#888' }}>
              <span>Delivery</span>
              <span style={{ color: delivery === 0 ? '#4caf50' : '#1a1a1a' }}>{delivery === 0 ? 'Free' : `Rs. ${delivery}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Cormorant Garamond, serif', fontSize: 20, borderTop: '1px solid #f0ede8', paddingTop: 12, marginTop: 4 }}>
              <span>Total</span><span>Rs. {grandTotal.toLocaleString()}</span>
            </div>
          </div>

          {delivery > 0 && (
            <p style={{ fontSize: 11, color: '#bbb', marginTop: 12 }}>
              Add Rs. {(5000 - total).toLocaleString()} more for free delivery
            </p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media(max-width: 900px) {
          #checkout-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
