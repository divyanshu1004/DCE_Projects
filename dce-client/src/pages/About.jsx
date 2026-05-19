import { useRef, useEffect, useState } from 'react'
import { Target, Zap, Shield, Globe, Users, Award } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function useInView() {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true) }, { threshold: 0.1 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])
  return [ref, v]
}

function FadeIn({ children, delay = 0 }) {
  const [ref, v] = useInView()
  return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(20px)', transition: `all 0.5s ease ${delay}ms` }}>{children}</div>
}

const values = [
  { icon: <Target size={24} color="#111" />, title: 'Curated Excellence', body: 'We partner with premium manufacturers to bring the highest quality mechanical, electrical, and plumbing hardware to your projects.' },
  { icon: <Zap size={24} color="#111" />, title: 'Architectural Vision', body: 'Our products are designed to complement and elevate modern architectural aesthetics while delivering uncompromising performance.' },
  { icon: <Shield size={24} color="#111" />, title: 'Unwavering Reliability', body: 'Every product in our catalog undergoes rigorous quality control to ensure long-lasting durability and compliance with industry standards.' },
]

const offerings = [
  { icon: <Globe size={32} color="#111" strokeWidth={1} />, title: 'Mechanical & HVAC', desc: 'Precision climate control, ventilation systems, cooling towers, and advanced ducting solutions engineered for efficiency.' },
  { icon: <Zap size={32} color="#111" strokeWidth={1} />, title: 'Electrical Systems', desc: 'High-grade switchgear, lighting controls, transformers, and distribution boards ensuring reliable power delivery.' },
  { icon: <Target size={32} color="#111" strokeWidth={1} />, title: 'Plumbing & Fire Safety', desc: 'Premium fluid transport solutions, luxury fixtures, industrial pumps, and comprehensive fire suppression systems.' },
  { icon: <Users size={32} color="#111" strokeWidth={1} />, title: 'Consultancy Services', desc: 'End-to-end project management, system design, energy optimization, and strategic procurement for distinguished projects.' }
]

export default function About() {
  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ position: 'relative', paddingTop: 180, paddingBottom: 120, padding: '180px 24px 120px', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: '#F9F9F9' }} />
        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
          <span style={{ fontSize: 11, fontWeight: 500, color: '#666', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Our Heritage</span>
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', letterSpacing: '-0.02em', marginTop: 24, marginBottom: 32, lineHeight: 1.05 }}>
            Defining Excellence as<br />MEP Consultants & Suppliers.
          </h1>
          <p style={{ fontSize: 16, color: '#666', lineHeight: 1.8, maxWidth: 600, margin: '0 auto' }}>
            DCE Projects is a specialized consultancy and supplier based in Haldwani, Uttarakhand. We provide everyone—from businesses and contractors to individual clients—with sophisticated machines, plumbing tools, and comprehensive MEP products that merge exceptional functionality with industrial reliability.
          </p>
        </div>
      </section>

      {/* Team Photo Banner */}
      <section style={{ maxWidth: 1280, margin: '0 auto 120px', padding: '0 24px' }}>
        <FadeIn>
          <div style={{ borderRadius: 0, overflow: 'hidden', aspectRatio: '21/9', position: 'relative' }}>
            <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1400&auto=format&fit=crop" alt="Team at work" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6) grayscale(0.5)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' }}>
              <div style={{ textAlign: 'center', padding: '0 24px' }}>
                <h2 style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, fontFamily: 'DM Serif Display', color: '#fff', letterSpacing: '-0.02em', textShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>Elevating Spaces.</h2>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14, marginTop: 16, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500 }}>Uncompromising Quality • Exquisite Details</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Values */}
      <section style={{ padding: '0 24px 120px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 80 }}>
              <span style={{ fontSize: 11, fontWeight: 500, color: '#666', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Our Values</span>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', marginTop: 16 }}>The DCE Standard</h2>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
            {values.map((v, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div style={{ background: '#F9F9F9', border: '1px solid #CCCCCC', borderRadius: 0, padding: 48, height: '100%' }}>
                  <div style={{ width: 48, height: 48, background: '#fff', border: '1px solid #CCCCCC', borderRadius: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>{v.icon}</div>
                  <h3 style={{ fontSize: 24, fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', marginBottom: 16 }}>{v.title}</h3>
                  <p style={{ fontSize: 15, color: '#666', lineHeight: 1.8 }}>{v.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: '#F9F9F9', borderTop: '1px solid #CCCCCC', borderBottom: '1px solid #CCCCCC', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, textAlign: 'center' }}>
            {[
              { val: '10+', label: 'Years Heritage' },
              { val: '500+', label: 'Curated Projects' },
              { val: '1000+', label: 'Premium Products' },
              { val: '100%', label: 'Quality Assured' },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div style={{ fontSize: 48, fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', letterSpacing: '-0.02em', marginBottom: 12 }}>{s.val}</div>
                <div style={{ fontSize: 12, color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500 }}>{s.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Products & Services */}
      <section style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 80 }}>
              <span style={{ fontSize: 11, fontWeight: 500, color: '#666', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Our Capabilities</span>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', marginTop: 16 }}>Products & Services</h2>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
            {offerings.map((o, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div style={{ background: '#FFFFFF', border: '1px solid #CCCCCC', padding: 40, height: '100%', transition: 'border-color 0.3s' }}
                     onMouseEnter={e => e.currentTarget.style.borderColor = '#111'}
                     onMouseLeave={e => e.currentTarget.style.borderColor = '#CCCCCC'}>
                  <div style={{ marginBottom: 24 }}>{o.icon}</div>
                  <div style={{ fontSize: 24, fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', marginBottom: 16 }}>{o.title}</div>
                  <div style={{ fontSize: 15, color: '#666', lineHeight: 1.8 }}>{o.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
