import { Phone, Mail, MapPin, MessageCircle, Clock, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { Link } from 'react-router-dom'

export default function Services() {
  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar />

      {/* Header */}
      <section style={{ paddingTop: 160, paddingBottom: 80, padding: '160px 24px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ width: 64, height: 64, background: '#F9F9F9', border: '1px solid #CCCCCC', borderRadius: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <MessageCircle size={28} color="#111" />
          </div>
          <span style={{ fontSize: 11, fontWeight: 500, color: '#666', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Expertise</span>
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', letterSpacing: '-0.02em', marginTop: 16, marginBottom: 24, lineHeight: 1.05 }}>
            Our Services.
          </h1>
          <p style={{ fontSize: 18, color: '#666', lineHeight: 1.8, marginBottom: 16, maxWidth: 600, margin: '0 auto 16px' }}>
            DCE Projects offers complete Mechanical, Electrical & Plumbing (MEP) consultancy, design, supply, and installation services.
          </p>
          <p style={{ fontSize: 16, color: '#666', lineHeight: 1.7, maxWidth: 600, margin: '0 auto' }}>
            For service enquiries, project quotes, or expert guidance — please reach out to us directly. Our MEP engineers are available Monday to Saturday.
          </p>
        </div>
      </section>

      {/* Service Types */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {[
            { label: 'Electrical', items: ['Electrical System Design', 'Panel & Switchgear Supply', 'Wiring & Cable Installation', 'Energy Audit & Compliance'] },
            { label: 'Mechanical / HVAC', items: ['HVAC System Design', 'AC Supply & Installation', 'Ventilation Planning', 'Equipment Maintenance'] },
            { label: 'Plumbing', items: ['Plumbing System Design', 'Pipe & Fitting Supply', 'Pump Installation', 'Water Treatment Solutions'] },
          ].map(s => (
            <div key={s.label} style={{ background: '#F9F9F9', border: '1px solid #CCCCCC', borderRadius: 0, padding: 40 }}>
              
              <h3 style={{ fontSize: 24, fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', marginBottom: 24 }}>{s.label}</h3>
              {s.items.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#666', marginBottom: 16 }}>
                  <div style={{ width: 6, height: 6, borderRadius: 0, background: '#111', flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section style={{ padding: '0 24px 120px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ background: '#111', border: 'none', borderRadius: 0, padding: '64px 48px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, fontFamily: 'DM Serif Display', color: '#fff', letterSpacing: '-0.02em', marginBottom: 16 }}>Get in Touch for Services</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
              We don't offer online booking for services. Please contact us directly and our team will assist you with pricing, site visits, and project timelines.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
              {/* Phone */}
              <a href="tel:+918171114006" style={{ display: 'flex', alignItems: 'center', gap: 20, background: '#fff', border: '1px solid #fff', borderRadius: 0, padding: '24px 32px', textDecoration: 'none', transition: 'all 0.3s' }}>
                <div style={{ width: 48, height: 48, background: '#F9F9F9', border: '1px solid #CCCCCC', borderRadius: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={20} color="#111" />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 11, color: '#666', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Call Us</div>
                  <div style={{ fontSize: 24, fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111' }}>+91 8171114006</div>
                </div>
                <ArrowRight size={20} color="#111" style={{ marginLeft: 'auto' }} />
              </a>

              {/* Email */}
              <a href="mailto:services.dce@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: 20, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 0, padding: '24px 32px', textDecoration: 'none', transition: 'all 0.3s' }}>
                <div style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={20} color="#fff" />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Email Us</div>
                  <div style={{ fontSize: 20, fontWeight: 400, fontFamily: 'DM Serif Display', color: '#fff' }}>services.dce@gmail.com</div>
                </div>
                <ArrowRight size={20} color="#fff" style={{ marginLeft: 'auto' }} />
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
