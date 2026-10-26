import { Mail, MapPin, MessageCircle, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { Link } from 'react-router-dom'

const BRAND = '#1e3a8a'
const BRAND_DARK = '#0f172a'
const BRAND_LIGHT = '#e0eefa'

export default function Services() {
  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar />

      {/* Header */}
      <section style={{ paddingTop: 160, paddingBottom: 80, padding: '160px 24px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ width: 64, height: 64, background: '#f8fafb', border: '1px solid #e2e8f0', borderRadius: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <MessageCircle size={28} color={BRAND_DARK} />
          </div>
          <span style={{ fontSize: 11, fontWeight: 500, color: '#94a3b8', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Expertise</span>
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 400, fontFamily: 'DM Serif Display', color: '#0f172a', letterSpacing: '-0.02em', marginTop: 16, marginBottom: 24, lineHeight: 1.05 }}>
            Our Services.
          </h1>
          <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.8, marginBottom: 16, maxWidth: 600, margin: '0 auto 16px' }}>
            DCE Projects offers complete Mechanical, Electrical & Plumbing (MEP) consultancy, design, supply, and installation services.
          </p>
          <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.7, maxWidth: 600, margin: '0 auto' }}>
            For service enquiries, project quotes, or expert guidance — please reach out to us directly. Our MEP engineers are available Monday to Saturday.
          </p>
        </div>
      </section>

      {/* Service Types */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {
            [
              {
                label: 'Electrical',
                image: 'https://images.pexels.com/photos/159305/electrical-switches-circuit-breaker-wiring-159305.jpeg',
                items: ['Electrical System Design', 'Panel & Switchgear Supply', 'Wiring & Cable Installation', 'Energy Audit & Compliance']
              },
              {
                label: 'Mechanical / HVAC',
                image: 'https://images.pexels.com/photos/6813359/pexels-photo-6813359.jpeg',
                items: ['HVAC System Design', 'AC Supply & Installation', 'Ventilation Planning', 'Equipment Maintenance']
              },
              {
                label: 'Plumbing',
                image: 'https://images.pexels.com/photos/277880/pexels-photo-277880.jpeg',
                items: ['Plumbing System Design', 'Pipe & Fitting Supply', 'Pump Installation', 'Water Treatment Solutions']
              },
            ].map(s => (
              <div key={s.label} style={{ background: '#FFFFFF', border: '1px solid #e2e8f0', borderRadius: 0, padding: 0, overflow: 'hidden', transition: 'all 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(15,23,42,0.08)'; e.currentTarget.querySelector('.svc-img').style.transform = 'scale(1.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.querySelector('.svc-img').style.transform = 'scale(1)'; }}
              >
                <div style={{ position: 'relative', height: 200, overflow: 'hidden', background: '#f8fafb' }}>
                  <img
                    src={s.image}
                    alt={s.label}
                    className="svc-img"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent, rgba(15,23,42,0.3))` }}></div>
                  <div style={{ position: 'absolute', bottom: 20, left: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ background: BRAND, color: '#fff', padding: '6px 12px', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {s.label}
                    </div>
                  </div>
                </div>
                <div style={{ padding: 32 }}>
                  <h3 style={{ fontSize: 24, fontWeight: 400, fontFamily: 'DM Serif Display', color: '#0f172a', marginBottom: 24 }}>{s.label}</h3>
                  {s.items.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#64748b', marginBottom: 16 }}>
                      <div style={{ width: 6, height: 6, borderRadius: 0, background: BRAND, flexShrink: 0 }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))
          }
        </div>
      </section>

      {/* Contact CTA */}
      <section style={{ padding: '0 24px 120px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ background: BRAND_DARK, border: 'none', borderRadius: 0, padding: '64px 48px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, fontFamily: 'DM Serif Display', color: '#fff', letterSpacing: '-0.02em', marginBottom: 16 }}>Get in Touch for Services</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
              We don't offer online booking for services. Please contact us directly and our team will assist you with pricing, site visits, and project timelines.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
              {/* Email */}
              <a href="mailto:services.dce@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: 20, background: '#fff', border: '1px solid #fff', borderRadius: 0, padding: '24px 32px', textDecoration: 'none', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.background = BRAND; e.currentTarget.querySelectorAll('*').forEach(el => { if (el.style.color) el.style.color = '#fff'; if (el.tagName === 'DIV' && el.className && el.className.includes('badge')) el.style.background = 'rgba(255,255,255,0.2)'; }) }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.querySelectorAll('*').forEach(el => { if (el.style.color) { if (el.textContent.includes('Email Us')) el.style.color = BRAND; else if (el.textContent.includes('services.dce@gmail.com')) el.style.color = BRAND_DARK; } }) }}
              >
                <div style={{ width: 48, height: 48, background: '#f8fafb', border: '1px solid #e2e8f0', borderRadius: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={20} color={BRAND_DARK} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Email Us</div>
                  <div style={{ fontSize: 24, fontWeight: 400, fontFamily: 'DM Serif Display', color: BRAND_DARK }}>services.dce@gmail.com</div>
                </div>
                <ArrowRight size={20} color={BRAND_DARK} style={{ marginLeft: 'auto' }} />
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 32 }}>
              <MapPin size={18} color="rgba(255,255,255,0.6)" />
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>RTO Road, Haldwani, Uttarakhand — 262402</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
