import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag, CreditCard, Truck, Shield, ChevronRight, Loader, CheckCircle, Zap } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import api from '../api/axios.js'
import toast from 'react-hot-toast'

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState(1) // 1: Shipping, 2: Payment, 3: Confirm
  const [placing, setPlacing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('lago_invoice') // lago_invoice | upi | cod

  const [shipping, setShipping] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })

  const shipping_cost = total >= 2000 ? 0 : 150
  const grandTotal = total + shipping_cost

  function setField(k) { return e => setShipping(s => ({ ...s, [k]: e.target.value })) }

  async function handlePlaceOrder() {
    if (!shipping.name || !shipping.phone || !shipping.address || !shipping.pincode) {
      toast.error('Please fill all required shipping fields')
      return
    }
    setPlacing(true)
    try {
      const { data } = await api.post('/orders', {
        items: items.map(i => ({ productId: i._id, name: i.name, qty: i.qty, price: i.price })),
        shipping,
        paymentMethod,
        subtotal: total,
        shippingCost: shipping_cost,
        grandTotal,
      })

      clearCart()
      navigate('/order-success', { state: { orderId: data.orderId, paymentRef: data.paymentRef, invoiceUrl: data.invoiceUrl } })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order failed. Please try again.')
    } finally {
      setPlacing(false)
    }
  }

  if (items.length === 0) {
    navigate('/products')
    return null
  }

  return (
    <div style={{ background: '#F0EDE1', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '84px 24px 64px' }}>

        <h1 style={{ fontSize: 28, fontWeight:  400, fontFamily: 'DM Serif Display', color: '#0A0A0A', letterSpacing: '-0.02em', marginBottom: 8 }}>Checkout</h1>
        <p style={{ fontSize: 14, color: '#4A4A4A', marginBottom: 40 }}>DCE Projects — MEP Consultant & Supplier · Haldwani, Uttarakhand</p>

        {/* Steps */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 40 }}>
          {[['1', 'Shipping'], ['2', 'Payment'], ['3', 'Review']].map(([n, label], i) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: step >= Number(n) ? '#1D592C' : '#FFFFFF', border: `2px solid ${step >= Number(n) ? '#1D592C' : '#CCCCCC'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
                  {step > Number(n) ? <CheckCircle size={16} color="#fff" /> : <span style={{ fontSize: 13, fontWeight: 700, color: step >= Number(n) ? '#fff' : '#4A4A4A' }}>{n}</span>}
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: step >= Number(n) ? '#0A0A0A' : '#4A4A4A' }}>{label}</span>
              </div>
              {i < 2 && <div style={{ width: 40, height: 2, background: step > Number(n) ? '#1D592C' : '#CCCCCC', margin: '0 12px', transition: 'all 0.3s' }} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-8 items-start">
          {/* Left panel */}
          <div>
            {/* Step 1: Shipping */}
            {step === 1 && (
              <div style={{ background: '#E5E3D8', border: '1px solid #CCCCCC', borderRadius: 0, padding: 32 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0A0A0A', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Truck size={18} color="#1D592C" /> Shipping Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Full Name *', key: 'name', span: 1 },
                    { label: 'Email Address', key: 'email', span: 1 },
                    { label: 'Phone Number *', key: 'phone', span: 2 },
                    { label: 'Delivery Address *', key: 'address', span: 2 },
                    { label: 'City *', key: 'city', span: 1 },
                    { label: 'State', key: 'state', span: 1 },
                    { label: 'PIN Code *', key: 'pincode', span: 1 },
                  ].map(f => (
                    <div key={f.key} style={{ gridColumn: f.span === 2 ? '1/-1' : 'auto' }}>
                      <label style={labelSt}>{f.label}</label>
                      <input value={shipping[f.key]} onChange={setField(f.key)} placeholder={f.label.replace(' *', '')}
                        style={inputSt}
                        onFocus={e => e.target.style.borderColor = '#1D592C'}
                        onBlur={e => e.target.style.borderColor = '#CCCCCC'}
                      />
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep(2)} style={{ ...nextBtn, marginTop: 28 }}>
                  Continue to Payment <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div style={{ background: '#E5E3D8', border: '1px solid #CCCCCC', borderRadius: 0, padding: 32 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0A0A0A', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CreditCard size={18} color="#1D592C" /> Payment Method
                </h2>

                {/* Payment options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
                  {[
                    {
                      id: 'lago_invoice',
                      label: 'Pay via Lago Invoice',
                      sub: "Receive a digital invoice via email. Pay online through Lago's secure payment link.",
                      badge: 'Recommended',
                      icon: <Zap size={20} color="#1D592C" />,
                    },
                    {
                      id: 'upi',
                      label: 'UPI / Net Banking',
                      sub: 'Pay directly via UPI: dce.projects@okaxis',
                      badge: null,
                      icon: <span style={{ fontSize: 18 }}>📱</span>,
                    },
                    {
                      id: 'cod',
                      label: 'Cash on Delivery',
                      sub: 'Available for orders under ₹10,000 in serviceable areas.',
                      badge: null,
                      icon: <span style={{ fontSize: 18 }}>💵</span>,
                    },
                  ].map(opt => (
                    <div key={opt.id} onClick={() => setPaymentMethod(opt.id)}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: 16, padding: '18px 20px',
                        background: paymentMethod === opt.id ? 'rgba(200,241,53,0.06)' : '#F0EDE1',
                        border: `2px solid ${paymentMethod === opt.id ? '#1D592C' : '#CCCCCC'}`,
                        borderRadius: 0, cursor: 'pointer', transition: 'all 0.2s',
                      }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${paymentMethod === opt.id ? '#1D592C' : '#CCCCCC'}`, background: paymentMethod === opt.id ? '#1D592C' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                        {paymentMethod === opt.id && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, background: 'rgba(200,241,53,0.1)', borderRadius: 0, flexShrink: 0 }}>{opt.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 15, fontWeight: 600, color: '#0A0A0A' }}>{opt.label}</span>
                          {opt.badge && <span style={{ fontSize: 10, fontWeight: 700, background: '#1D592C', color: '#F0EDE1', padding: '2px 8px', borderRadius: 0 }}>{opt.badge}</span>}
                        </div>
                        <p style={{ fontSize: 13, color: '#4A4A4A', marginTop: 4 }}>{opt.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Lago info */}
                {paymentMethod === 'lago_invoice' && (
                  <div style={{ background: 'rgba(200,241,53,0.05)', border: '1px solid rgba(200,241,53,0.2)', borderRadius: 0, padding: 16, marginBottom: 20 }}>
                    <p style={{ fontSize: 13, color: '#4A4A4A', lineHeight: 1.6 }}>
                      <strong style={{ color: '#1D592C' }}>How it works:</strong> After placing your order, Lago will generate a GST-ready invoice and send a secure payment link to <strong style={{ color: '#0A0A0A' }}>{shipping.email}</strong>. You can pay online via card, UPI, or net banking.
                    </p>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div style={{ background: '#F0EDE1', border: '1px solid #CCCCCC', borderRadius: 0, padding: 20, marginBottom: 20, textAlign: 'center' }}>
                    <p style={{ fontSize: 13, color: '#4A4A4A', marginBottom: 12 }}>UPI ID for manual payment:</p>
                    <p style={{ fontSize: 20, fontWeight: 800, color: '#1D592C' }}>dce.projects@okaxis</p>
                    <p style={{ fontSize: 12, color: '#4A4A4A', marginTop: 8 }}>Transfer ₹{grandTotal.toLocaleString()} and share screenshot to services.dce@gmail.com</p>
                  </div>
                )}

                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => setStep(1)} style={{ padding: '12px 24px', background: 'transparent', border: '1px solid #CCCCCC', borderRadius: 0, color: '#4A4A4A', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>← Back</button>
                  <button onClick={() => setStep(3)} style={{ ...nextBtn, flex: 1 }}>
                    Review Order <ChevronRight size={16} />
                  </button>
                </div>

                <p style={{ fontSize: 11, color: '#4A4A4A', textAlign: 'center', marginTop: 16 }}>
                  🔒 Secured by Lago Billing · 256-bit SSL encrypted
                </p>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div style={{ background: '#E5E3D8', border: '1px solid #CCCCCC', borderRadius: 0, padding: 32 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0A0A0A', marginBottom: 24 }}>Review Your Order</h2>

                {/* Items */}
                <div style={{ marginBottom: 28 }}>
                  {items.map(item => (
                    <div key={item._id} style={{ display: 'flex', gap: 14, padding: '14px 0', borderBottom: '1px solid #CCCCCC' }}>
                      <div style={{ width: 56, height: 56, borderRadius: 0, overflow: 'hidden', background: '#F0EDE1', flexShrink: 0 }}>
                        <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 14, fontWeight: 600, color: '#0A0A0A' }}>{item.name}</p>
                        <p style={{ fontSize: 12, color: '#4A4A4A', marginTop: 2 }}>Qty: {item.qty} × ₹{item.price?.toLocaleString()}</p>
                      </div>
                      <span style={{ fontSize: 15, fontWeight: 700, color: '#1D592C' }}>₹{(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {/* Shipping info summary */}
                <div style={{ background: '#F0EDE1', border: '1px solid #CCCCCC', borderRadius: 0, padding: 16, marginBottom: 24 }}>
                  <p style={{ fontSize: 12, color: '#4A4A4A', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Delivering to</p>
                  <p style={{ fontSize: 14, color: '#0A0A0A', fontWeight: 600 }}>{shipping.name}</p>
                  <p style={{ fontSize: 13, color: '#4A4A4A', marginTop: 4 }}>{shipping.address}, {shipping.city} — {shipping.pincode}</p>
                  <p style={{ fontSize: 13, color: '#4A4A4A' }}>📞 {shipping.phone}</p>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => setStep(2)} style={{ padding: '12px 24px', background: 'transparent', border: '1px solid #CCCCCC', borderRadius: 0, color: '#4A4A4A', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>← Back</button>
                  <button onClick={handlePlaceOrder} disabled={placing}
                    style={{ flex: 1, padding: '14px 0', background: placing ? '#888' : '#1D592C', color: '#F0EDE1', border: 'none', borderRadius: 0, fontWeight: 800, fontSize: 16, cursor: placing ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    {placing ? <><Loader size={18} style={{ animation: 'spin 0.8s linear infinite' }} /> Processing…</> : <>Place Order · ₹{grandTotal.toLocaleString()}</>}
                    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div style={{ background: '#E5E3D8', border: '1px solid #CCCCCC', borderRadius: 0, padding: 24, position: 'sticky', top: 80 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0A0A0A', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <ShoppingBag size={16} color="#1D592C" /> Order Summary
            </h3>

            {items.map(item => (
              <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 13 }}>
                <span style={{ color: '#4A4A4A', flex: 1, marginRight: 8 }}>{item.name.slice(0, 30)}{item.name.length > 30 ? '…' : ''} × {item.qty}</span>
                <span style={{ color: '#0A0A0A', fontWeight: 600 }}>₹{(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}

            <div style={{ borderTop: '1px solid #CCCCCC', marginTop: 16, paddingTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
                <span style={{ color: '#4A4A4A' }}>Subtotal</span>
                <span style={{ color: '#0A0A0A' }}>₹{total.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
                <span style={{ color: '#4A4A4A' }}>Shipping</span>
                <span style={{ color: shipping_cost === 0 ? '#22C55E' : '#0A0A0A' }}>{shipping_cost === 0 ? 'FREE' : `₹${shipping_cost}`}</span>
              </div>
              {shipping_cost === 0 && <p style={{ fontSize: 11, color: '#22C55E', marginBottom: 8 }}>✓ Free delivery applied</p>}
            </div>

            <div style={{ borderTop: '1px solid #CCCCCC', marginTop: 8, paddingTop: 16, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#0A0A0A' }}>Total</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: '#1D592C' }}>₹{grandTotal.toLocaleString()}</span>
            </div>

            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                [<Shield size={12} />, 'Secured by Lago Billing'],
                [<Truck size={12} />, 'Dispatched from Haldwani'],
                [<ShoppingBag size={12} />, 'GST Invoice included'],
              ].map(([icon, text], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#4A4A4A' }}>
                  <span style={{ color: '#1D592C' }}>{icon}</span>{text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const labelSt = { display: 'block', fontSize: 12, color: '#4A4A4A', marginBottom: 6, fontWeight: 500 }
const inputSt = { display: 'block', width: '100%', background: '#F0EDE1', border: '1px solid #CCCCCC', borderRadius: 0, padding: '11px 14px', color: '#0A0A0A', fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none', transition: 'border-color 0.2s' }
const nextBtn = { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '13px 0', background: '#1D592C', color: '#F0EDE1', border: 'none', borderRadius: 0, fontWeight: 700, fontSize: 15, cursor: 'pointer' }
