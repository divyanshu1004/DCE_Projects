import { useState } from 'react'
import { Mail, MapPin, Send } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import toast from 'react-hot-toast'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)

  function set(k) { return e => setForm(f => ({ ...f, [k]: e.target.value })) }

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    await new Promise(r => setTimeout(r, 1200))
    toast.success('Message sent! We\'ll get back to you within 24 hours.')
    setForm({ name: '', email: '', message: '' })
    setSending(false)
  }

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar />

      {/* Header */}
      <section style={{ padding: '160px 24px 80px', textAlign: 'center' }}>
        <span style={{ fontSize: 11, fontWeight: 500, color: '#666', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Inquiries</span>
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', letterSpacing: '-0.02em', marginTop: 16, marginBottom: 24 }}>Contact Us</h1>
        <p style={{ fontSize: 16, color: '#666', maxWidth: 500, margin: '0 auto', lineHeight: 1.8 }}>To discuss purchasing requirements or request a customized quote, please reach out to our team.</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-12 items-start" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 120px' }}>
        {/* Form */}
        <div style={{ background: '#F9F9F9', border: '1px solid #CCCCCC', borderRadius: 0, padding: '48px 40px' }}>
          <h2 style={{ fontSize: 24, fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', marginBottom: 32 }}>Send us a Message</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { label: 'Full Name', id: 'contact-name', key: 'name', type: 'text', placeholder: 'Rajesh Sharma' },
              { label: 'Email Address', id: 'contact-email', key: 'email', type: 'email', placeholder: 'rajesh@example.com' },
            ].map(f => (
              <div key={f.key}>
                <label style={labelSt}>{f.label}</label>
                <input id={f.id} type={f.type} placeholder={f.placeholder} value={form[f.key]} onChange={set(f.key)} required
                  style={inputSt}
                  onFocus={e => e.target.style.borderColor = '#111'}
                  onBlur={e => e.target.style.borderColor = '#CCCCCC'}
                />
              </div>
            ))}
            <div>
              <label style={labelSt}>Message</label>
              <textarea id="contact-message" placeholder="Tell us about your project or question…" value={form.message} onChange={set('message')} required rows={5}
                style={{ ...inputSt, height: 'auto', resize: 'vertical', paddingTop: 16, paddingBottom: 16 }}
                onFocus={e => e.target.style.borderColor = '#111'}
                onBlur={e => e.target.style.borderColor = '#CCCCCC'}
              />
            </div>
            <button id="contact-submit" type="submit" disabled={sending} style={{
              padding: '16px 0', background: sending ? '#999' : '#111', color: '#fff',
              border: 'none', borderRadius: 0, fontWeight: 500, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', cursor: sending ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 8
            }}>
              {sending ? 'Sending…' : <><Send size={16} /> Send Message</>}
            </button>
          </form>
        </div>

        {/* Info Panel */}
        <div>
          <div style={{ background: '#F9F9F9', border: '1px solid #CCCCCC', borderRadius: 0, padding: 32, marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', marginBottom: 28 }}>Contact Information</h3>
            {[
              [<Mail size={16} color="#111" />, 'Email', 'services.dce@gmail.com', ''],
              [<MapPin size={16} color="#111" />, 'Office', 'RTO Road, Haldwani', 'Uttarakhand — 262402'],
            ].map(([icon, label, line1, line2], i) => (
              <div key={i} style={{ display: 'flex', gap: 16, marginBottom: i < 1 ? 28 : 0 }}>
                <div style={{ width: 40, height: 40, background: '#fff', border: '1px solid #CCCCCC', borderRadius: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontSize: 11, color: '#666', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
                  <div style={{ fontSize: 14, color: '#111' }}>{line1}</div>
                  {line2 && <div style={{ fontSize: 13, color: '#666', marginTop: 2 }}>{line2}</div>}
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div style={{ borderRadius: 0, overflow: 'hidden', height: 240, background: '#F9F9F9', border: '1px solid #CCCCCC', position: 'relative' }}>
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&auto=format&fit=crop" alt="Map" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, filter: 'grayscale(1)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
              <MapPin size={24} color="#111" />
              <span style={{ fontSize: 13, color: '#111', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>RTO Road, Haldwani</span>
            </div>
          </div>

          {/* Hours */}
          <div style={{ background: '#F9F9F9', border: '1px solid #CCCCCC', borderRadius: 0, padding: 32, marginTop: 24 }}>
            <h4 style={{ fontSize: 16, fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', marginBottom: 20 }}>Business Hours</h4>
            {[
              ['Mon – Fri', '9:00 AM – 7:00 PM'],
              ['Saturday', '10:00 AM – 5:00 PM'],
              ['Sunday', 'Closed'],
            ].map(([day, hrs]) => (
              <div key={day} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 12, borderBottom: day !== 'Sunday' ? '1px solid #CCCCCC' : 'none', paddingBottom: day !== 'Sunday' ? 12 : 0 }}>
                <span style={{ color: '#666' }}>{day}</span>
                <span style={{ color: hrs === 'Closed' ? '#999' : '#111', fontWeight: hrs === 'Closed' ? 400 : 500 }}>{hrs}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

const labelSt = { display: 'block', fontSize: 11, fontWeight: 500, color: '#666', marginBottom: 10, letterSpacing: '0.05em', textTransform: 'uppercase' }
const inputSt = { display: 'block', width: '100%', background: '#fff', border: '1px solid #CCCCCC', borderRadius: 0, padding: '14px 16px', color: '#111', fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none', transition: 'border-color 0.3s', height: 50 }
