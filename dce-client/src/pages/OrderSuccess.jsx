import { useLocation, Link } from 'react-router-dom'
import { CheckCircle, Package, Mail, ArrowRight, Home } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'

export default function OrderSuccess() {
  const { state } = useLocation()
  const orderId = state?.orderId || 'DCE-' + Math.random().toString(36).substr(2, 8).toUpperCase()
  const invoiceUrl = state?.invoiceUrl

  return (
    <div style={{ background: '#F0EDE1', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '120px 24px 80px', textAlign: 'center' }}>

        {/* Success Icon */}
        <div style={{ width: 96, height: 96, background: 'rgba(34,197,94,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
          <CheckCircle size={48} color="#22C55E" />
        </div>

        <h1 style={{ fontSize: 32, fontWeight:  400, fontFamily: 'DM Serif Display', color: '#0A0A0A', letterSpacing: '-0.02em', marginBottom: 12 }}>Order Placed!</h1>
        <p style={{ fontSize: 16, color: '#4A4A4A', lineHeight: 1.7, marginBottom: 8 }}>
          Thank you for shopping with <strong style={{ color: '#1D592C' }}>DCE Projects</strong>. Your order has been received and is being processed.
        </p>

        <div style={{ background: '#E5E3D8', border: '1px solid #CCCCCC', borderRadius: 0, padding: 28, margin: '32px 0' }}>
          <div style={{ fontSize: 13, color: '#4A4A4A', marginBottom: 8 }}>Order Reference</div>
          <div style={{ fontSize: 24, fontWeight:  400, fontFamily: 'DM Serif Display', color: '#1D592C', letterSpacing: '0.04em' }}>{orderId}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
          {[
            [<Mail size={16} />, 'Invoice sent', 'A Lago invoice with payment link has been emailed to you'],
            [<Package size={16} />, 'Processing', 'Your order is being prepared for dispatch from Haldwani'],
          ].map(([icon, title, text], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, background: '#E5E3D8', border: '1px solid #CCCCCC', borderRadius: 0, padding: 18, textAlign: 'left' }}>
              <div style={{ width: 36, height: 36, background: 'rgba(200,241,53,0.1)', borderRadius: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: '#1D592C' }}>{icon}</span>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#0A0A0A' }}>{title}</div>
                <div style={{ fontSize: 13, color: '#4A4A4A', marginTop: 3 }}>{text}</div>
              </div>
            </div>
          ))}
        </div>

        {invoiceUrl && (
          <a href={invoiceUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1D592C', color: '#F0EDE1', fontWeight: 700, fontSize: 15, padding: '13px 28px', borderRadius: 0, textDecoration: 'none', marginBottom: 16, marginRight: 12 }}>
            Pay Invoice <ArrowRight size={16} />
          </a>
        )}

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: '#4A4A4A', fontWeight: 600, fontSize: 14, padding: '12px 24px', borderRadius: 0, textDecoration: 'none', border: '1px solid #CCCCCC' }}>
            <Home size={15} /> Go Home
          </Link>
          <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#E5E3D8', color: '#1D592C', fontWeight: 600, fontSize: 14, padding: '12px 24px', borderRadius: 0, textDecoration: 'none', border: '1px solid #1D592C' }}>
            Continue Shopping <ArrowRight size={15} />
          </Link>
        </div>

        <p style={{ fontSize: 13, color: '#4A4A4A', marginTop: 32 }}>
          Questions? Email us at <a href="mailto:services.dce@gmail.com" style={{ color: '#1D592C', textDecoration: 'none' }}>services.dce@gmail.com</a>
        </p>
      </div>
    </div>
  )
}
