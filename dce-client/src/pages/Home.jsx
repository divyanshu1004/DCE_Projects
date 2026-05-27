import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Cpu, Wind, Sun, Layers,
} from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

/* ─── helpers ─── */
function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true) }, { threshold })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])
  return [ref, v]
}
function FadeIn({ children, delay = 0, direction = 'up' }) {
  const [ref, v] = useInView()
  const t = { up: 'translateY(26px)', left: 'translateX(-26px)', right: 'translateX(26px)' }
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? 'none' : (t[direction] || t.up), transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.19,1,0.22,1) ${delay}ms` }}>
      {children}
    </div>
  )
}

const BRAND = '#106683'
const BRAND_DARK = '#07485c'
const BRAND_LIGHT = '#e8f4f8'

/* ticker items */
const tickers = [
  'Industrial Automation', 'PLC & SCADA', 'CAD Services', 'Turnkey Projects',
  'Chiller Plant Setup', 'Radiant Heating', 'HVAC Contract & AMC',
  'Solar Energy', 'HPN Consultancy', 'Imported Machine Spares',
]

/* core service cards */
const coreServices = [
  { icon: <Cpu size={30} strokeWidth={1.3} />, title: 'Industrial Automation', desc: 'PLC/SCADA programming, control panel design, and full automation for manufacturing and process plants.' },
  { icon: <Wind size={30} strokeWidth={1.3} />, title: 'HVAC & MEP', desc: 'Design, supply, installation, and AMC of HVAC systems — from split units to central chilled-water plants.' },
  { icon: <Sun size={30} strokeWidth={1.3} />, title: 'Solar Energy', desc: 'Grid-tied and off-grid solar PV solutions for commercial and industrial facilities — clean and cost-effective.' },
  { icon: <Layers size={30} strokeWidth={1.3} />, title: 'Turnkey Projects', desc: 'Single-point responsibility from concept to commissioning across civil, MEP, automation, and fit-out scopes.' },
]





export default function Home() {
  const [heroLoaded, setHeroLoaded] = useState(false)
  const marqueeRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => { setTimeout(() => setHeroLoaded(true), 80) }, [])

  useEffect(() => {
    if (marqueeRef.current) {
      animRef.current = marqueeRef.current.animate(
        [{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }],
        { duration: 36000, iterations: Infinity }
      )
    }
  }, [])

  return (
    <div style={{ background: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&auto=format&fit=crop&q=80"
            alt="DCE Projects — MEP Engineering"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(7,72,92,0.82) 35%, rgba(7,72,92,0.48) 100%)' }} />
        </div>

        <div style={{ position: 'relative', width: '100%', padding: '0 32px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ maxWidth: 820, width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src="/dce-logo.png"
              alt="DCE Projects"
              style={{ maxWidth: 320, marginBottom: 36, display: 'block' }}
            />
            <h1 style={{ fontSize: 'clamp(36px,5.5vw,70px)', fontWeight: 400, fontFamily: 'DM Serif Display', color: '#fff', lineHeight: 1.07, marginBottom: 28, letterSpacing: '-0.02em' }}>
              Engineering the Future.<br />
              <em style={{ color: 'rgba(255,255,255,0.75)' }}>One Project at a Time.</em>
            </h1>
            <p style={{ fontSize: 'clamp(15px,1.8vw,19px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.85, maxWidth: 640, marginBottom: 44 }}>
              DCE Projects is a full-spectrum MEP engineering organisation — delivering Industrial Automation, PLC/SCADA, HVAC, Solar, Chiller Plants, Turnkey Projects, and specialist consultancy across India.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/contact" className="btn-primary" style={{ fontSize: 13, padding: '14px 36px' }}>Start a Project</Link>
              <Link to="/about" className="btn-ghost" style={{ fontSize: 13, padding: '13px 36px', color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }}>Who We Are</Link>
            </div>
          </div>
        </div>

      </section>

      {/* ── TICKER MARQUEE ── */}
      <section
        style={{ background: BRAND, color: '#fff', padding: '18px 0', overflow: 'hidden', cursor: 'default' }}
        onMouseEnter={() => animRef.current && (animRef.current.playbackRate = 0.25)}
        onMouseLeave={() => animRef.current && (animRef.current.playbackRate = 1)}
      >
        <div ref={marqueeRef} style={{ display: 'flex', width: 'max-content' }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              {tickers.map((t, j) => (
                <span key={j} style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', whiteSpace: 'nowrap', padding: '0 28px' }}>{t}</span>
                  <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 8 }}>◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>



      {/* ── INTRO —*/}
      <section style={{ padding: '120px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px,1fr))', gap: 80, alignItems: 'center' }}>
          <FadeIn direction="left">
            <span style={{ fontSize: 11, fontWeight: 600, color: BRAND, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Who We Are</span>
            <h2 style={{ fontSize: 'clamp(32px,4vw,54px)', fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', marginTop: 16, marginBottom: 28, lineHeight: 1.1 }}>
              A Full-Spectrum Engineering Organisation.
            </h2>
            <p style={{ fontSize: 16, color: '#555', lineHeight: 1.9, marginBottom: 20 }}>
              Founded in 2021 in Haldwani, Uttarakhand, DCE Projects is a full-spectrum MEP and automation engineering organisation — built from day one to handle every discipline, from Industrial Automation and PLC/SCADA to HVAC, Solar, Chiller Plants, and Turnkey Projects.
            </p>
            <p style={{ fontSize: 16, color: '#555', lineHeight: 1.9, marginBottom: 36 }}>
              Today, our capabilities span <strong>Industrial Automation, PLC &amp; SCADA programming, CAD services, Chiller Plant setup, Radiant Heating, HPN Consultancy</strong> for high-rise buildings, <strong>Imported Machine Spares</strong>, and full <strong>Turnkey Projects</strong> — all under one roof.
            </p>
            <Link to="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: BRAND, fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none', borderBottom: `2px solid ${BRAND}`, paddingBottom: 4 }}>
              Our Full Story <ArrowRight size={14} />
            </Link>
          </FadeIn>
          <FadeIn direction="right" delay={120}>
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80"
                alt="DCE Engineering"
                style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', filter: 'brightness(0.95)' }}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section style={{ padding: '0 32px 120px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 72 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: BRAND, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Our Capabilities</span>
              <h2 style={{ fontSize: 'clamp(32px,4vw,54px)', fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', marginTop: 16, marginBottom: 16 }}>
                Engineered for Every Need
              </h2>
              <p style={{ fontSize: 16, color: '#666', maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>
                Four core practice areas — each backed by qualified engineers, certified equipment, and a track record of delivery.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2, background: '#e0e0e0' }}>
            {coreServices.map((s, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div
                  style={{ background: '#fff', padding: '48px 36px', transition: 'background 0.3s', cursor: 'default', height: '100%' }}
                  onMouseEnter={e => { e.currentTarget.style.background = BRAND_LIGHT }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#fff' }}
                >
                  <div style={{ color: BRAND, marginBottom: 20 }}>{s.icon}</div>
                  <h3 style={{ fontSize: 22, fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', marginBottom: 16, lineHeight: 1.3 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: '#666', lineHeight: 1.8 }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 52 }}>
            <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: BRAND, fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none', borderBottom: `2px solid ${BRAND}`, paddingBottom: 4 }}>
              View All Services <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FULL-WIDTH CALLOUT ── */}
      <section style={{ position: 'relative', overflow: 'hidden', background: BRAND_DARK }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&auto=format&fit=crop&q=80"
            alt="DCE Projects team"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2, filter: 'grayscale(1)' }}
          />
        </div>
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '120px 32px', maxWidth: 860 }}>
          <FadeIn>
            <h2 style={{ fontSize: 'clamp(36px,5vw,64px)', fontWeight: 400, fontFamily: 'DM Serif Display', color: '#fff', lineHeight: 1.08, marginBottom: 28 }}>
              Our work speaks for us.
            </h2>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.78)', lineHeight: 1.9, maxWidth: 700, marginBottom: 40 }}>
              Since 2021, DCE Projects has delivered industrial automation systems, HVAC contracts, solar installations, chiller plant setups, and full turnkey projects — all under one roof, without compromise on quality or timelines.
            </p>
            <Link to="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#fff', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none', borderBottom: '2px solid rgba(255,255,255,0.5)', paddingBottom: 4 }}>
              About DCE Projects <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>


      {/* ── ABOUT TEASER ── */}
      <section style={{ padding: '120px 32px', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', overflow: 'hidden', border: '1px solid #e5e5e5' }}>
              <div style={{ padding: '80px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: BRAND, letterSpacing: '0.2em', textTransform: 'uppercase' }}>About DCE Projects</span>
                <h2 style={{ fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', marginTop: 16, marginBottom: 24, lineHeight: 1.1 }}>
                  The dream lives on.
                </h2>
                <p style={{ fontSize: 15, color: '#555', lineHeight: 1.9, marginBottom: 36, maxWidth: 460 }}>
                  Built on a foundation of engineering excellence and client-first values, DCE Projects continues to grow — expanding into new service verticals while staying true to the principles that built our reputation.
                </p>
                <Link to="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: BRAND, fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none', borderBottom: `2px solid ${BRAND}`, paddingBottom: 4, alignSelf: 'flex-start' }}>
                  Discover Our Story <ArrowRight size={14} />
                </Link>
              </div>
              <div style={{ position: 'relative', overflow: 'hidden', minHeight: 380 }}>
                <img
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop&q=80"
                  alt="DCE Projects"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: '0 32px 120px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ background: BRAND, padding: '80px 56px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 32, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
              <div style={{ position: 'absolute', bottom: -80, left: -40, width: 240, height: 240, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Project Inquiries</span>
              <h2 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 400, fontFamily: 'DM Serif Display', color: '#fff', lineHeight: 1.1, maxWidth: 600 }}>
                Have a project in mind? Let's engineer it together.
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.72)', maxWidth: 500, lineHeight: 1.8 }}>
                From a single chiller to a complete industrial automation turnkey — our team is ready to scope, design, and deliver.
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href="mailto:services.dce@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: BRAND_DARK, fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '15px 36px', textDecoration: 'none', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = BRAND_DARK; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = BRAND_DARK }}
                >
                  Email Us
                </a>
                <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: '#fff', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '14px 36px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.4)', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)' }}
                >
                  Contact Form <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  )
}
