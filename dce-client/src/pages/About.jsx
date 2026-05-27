import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Cpu, Monitor, Code2, PenTool, Building2, Package,
  Layers, Thermometer, Sun, Wind, Wrench, ArrowRight,
  CheckCircle, Globe, Users, Award, Zap, Shield, Target
} from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function useInView(threshold = 0.1) {
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
  const transforms = {
    up: 'translateY(28px)',
    left: 'translateX(-28px)',
    right: 'translateX(28px)',
  }
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? 'none' : transforms[direction] || transforms.up,
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.19,1,0.22,1) ${delay}ms`
    }}>
      {children}
    </div>
  )
}

const BRAND = '#106683'
const BRAND_DARK = '#07485c'
const BRAND_LIGHT = '#e8f4f8'

const services = [
  {
    icon: <Cpu size={28} strokeWidth={1.4} />,
    title: 'Industrial Automation',
    desc: 'End-to-end automation solutions for manufacturing, process control, and industrial facilities — streamlining operations and maximising uptime.',
    tag: 'AUTOMATION',
  },
  {
    icon: <Monitor size={28} strokeWidth={1.4} />,
    title: 'PLC & SCADA Systems',
    desc: 'Design, programming, and commissioning of Programmable Logic Controllers and Supervisory Control & Data Acquisition systems for seamless process visibility.',
    tag: 'CONTROLS',
  },
  {
    icon: <Code2 size={28} strokeWidth={1.4} />,
    title: 'PLC / SCADA Programming',
    desc: 'Custom ladder logic, function block, and HMI programming tailored to client specifications — from simple relay replacement to complex multi-loop control.',
    tag: 'PROGRAMMING',
  },
  {
    icon: <PenTool size={28} strokeWidth={1.4} />,
    title: 'CAD Services',
    desc: 'Precision mechanical, electrical, and plumbing drafting using AutoCAD and industry-standard BIM tools for compliant, construction-ready documentation.',
    tag: 'DESIGN',
  },
  {
    icon: <Building2 size={28} strokeWidth={1.4} />,
    title: 'High-Rise HPN Service & Consultancy',
    desc: 'Specialised high-pressure network (HPN) consulting for high-rise and commercial buildings — design, compliance, installation, and ongoing AMC.',
    tag: 'HPN',
  },
  {
    icon: <Package size={28} strokeWidth={1.4} />,
    title: 'Imported Machine Spares',
    desc: 'Genuine OEM and compatible spare parts for imported industrial machinery — fast-tracked sourcing, quality verification, and on-site delivery.',
    tag: 'SPARES',
  },
  {
    icon: <Layers size={28} strokeWidth={1.4} />,
    title: 'Turnkey Projects',
    desc: 'Complete project delivery from concept to commissioning — single-point responsibility across civil, MEP, automation, and fit-out scopes.',
    tag: 'TURNKEY',
  },
  {
    icon: <Thermometer size={28} strokeWidth={1.4} />,
    title: 'Chiller Plant Setup',
    desc: 'Design and installation of central chilled-water plants including chillers, cooling towers, pumps, AHUs, and associated controls for commercial facilities.',
    tag: 'CHILLER',
  },
  {
    icon: <Zap size={28} strokeWidth={1.4} />,
    title: 'Radiant Surface Heating',
    desc: 'Energy-efficient hydronic and electric radiant floor / ceiling heating systems for residential, hospitality, and healthcare environments.',
    tag: 'HEATING',
  },
  {
    icon: <Wind size={28} strokeWidth={1.4} />,
    title: 'HVAC Contract & AMC',
    desc: 'Comprehensive HVAC installation contracts and Annual Maintenance Contracts ensuring peak equipment performance, energy savings, and regulatory compliance.',
    tag: 'HVAC',
  },
  {
    icon: <Sun size={28} strokeWidth={1.4} />,
    title: 'Solar Energy Solutions',
    desc: 'Grid-tied and off-grid solar PV system design, supply, and installation — engineering clean energy transitions for industrial and commercial clients.',
    tag: 'SOLAR',
  },
  {
    icon: <Wrench size={28} strokeWidth={1.4} />,
    title: 'Chiller & Equipment Supply',
    desc: 'Authorised supply of water-cooled and air-cooled chillers, VRF systems, AHUs, FCUs, and ancillary MEP equipment from leading global manufacturers.',
    tag: 'SUPPLY',
  },
]



const milestones = [
  { year: '2021', event: 'DCE Projects founded in Haldwani, Uttarakhand — starting with MEP consultancy, product supply, and HVAC services.' },
  { year: '2022', event: 'Expanded service portfolio to include Industrial Automation, PLC/SCADA programming, and CAD drafting services.' },
  { year: '2023', event: 'Launched Chiller Plant Setup, Radiant Surface Heating, and Solar Energy solutions for commercial and industrial clients.' },
  { year: 'Today', event: 'Growing into a full-spectrum engineering organisation — Turnkey Projects, HVAC AMC, HPN Consultancy, and Imported Machine Spares across Uttarakhand and beyond.' },
]

const whyUs = [
  { icon: <Target size={22} strokeWidth={1.4} />, title: 'One-Stop Engineering', body: 'From design and programming to supply and AMC — DCE Projects handles the complete engineering lifecycle under one roof.' },
  { icon: <Shield size={22} strokeWidth={1.4} />, title: 'Uncompromising Quality', body: 'Every product, drawing, and installation is subject to rigorous quality assurance aligned with national and international standards.' },
  { icon: <Globe size={22} strokeWidth={1.4} />, title: 'Pan-India Reach', body: 'Project execution and supply capabilities across Uttarakhand and neighbouring states, with remote consultancy available nationwide.' },
  { icon: <Users size={22} strokeWidth={1.4} />, title: 'Expert Team', body: 'Qualified engineers and technicians with hands-on experience across industrial automation, HVAC, solar, and MEP disciplines.' },
  { icon: <Award size={22} strokeWidth={1.4} />, title: 'Turnkey Capability', body: 'Single-point accountability from concept to commissioning eliminates coordination gaps and accelerates project delivery.' },
  { icon: <CheckCircle size={22} strokeWidth={1.4} />, title: 'Client-First Approach', body: 'Dedicated project managers ensure transparent communication, on-time delivery, and proactive after-sales support.' },
]

export default function About() {
  const [heroLoaded, setHeroLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setHeroLoaded(true), 80) }, [])

  return (
    <div style={{ background: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1800&auto=format&fit=crop&q=80"
            alt="DCE Projects Engineering"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(7,72,92,0.88) 40%, rgba(7,72,92,0.55) 100%)' }} />
        </div>

        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '140px 32px 100px', width: '100%' }}>
          <div style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'none' : 'translateY(32px)', transition: 'all 0.9s cubic-bezier(0.19,1,0.22,1)', maxWidth: 780 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: 20 }}>
              About DCE Projects
            </span>
            <h1 style={{ fontSize: 'clamp(40px, 6vw, 76px)', fontWeight: 400, fontFamily: 'DM Serif Display', color: '#fff', lineHeight: 1.06, marginBottom: 32, letterSpacing: '-0.02em' }}>
              Engineering Excellence.<br />
              <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.8)' }}>Every Discipline.</em>
            </h1>
            <p style={{ fontSize: 'clamp(15px, 1.8vw, 19px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.85, maxWidth: 620, marginBottom: 44 }}>
              DCE Projects is a full-spectrum MEP engineering organisation headquartered in Haldwani, Uttarakhand — delivering Industrial Automation, HVAC, Solar, Chiller Plants, PLC/SCADA, and Turnkey Projects with uncompromising quality.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary" style={{ fontSize: 13, padding: '14px 36px' }}>Get In Touch</Link>
              <Link to="/services" className="btn-ghost" style={{ fontSize: 13, padding: '13px 36px', color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }}>Our Services</Link>
            </div>
          </div>
        </div>

        {/* discipline strip */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <div style={{ background: '#fff', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['MEP Engineering', 'Industrial Automation', 'HVAC & Chiller', 'Solar Energy', 'Turnkey Projects', 'PLC / SCADA'].map((d, i) => (
              <div key={i} style={{ padding: '20px 32px', fontSize: 11, fontWeight: 600, color: BRAND, textTransform: 'uppercase', letterSpacing: '0.12em', borderLeft: i > 0 ? '1px solid #e5e5e5' : 'none', whiteSpace: 'nowrap' }}>
                {d}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section style={{ padding: '120px 32px', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 80, alignItems: 'center' }}>
          <FadeIn direction="left">
            <span style={{ fontSize: 11, fontWeight: 600, color: BRAND, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Our Story</span>
            <h2 style={{ fontSize: 'clamp(32px,4vw,54px)', fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', marginTop: 16, marginBottom: 28, lineHeight: 1.1 }}>
              Built to Engineer.<br />Every Discipline, Day One.
            </h2>
            <p style={{ fontSize: 16, color: '#555', lineHeight: 1.9, marginBottom: 20 }}>
              Founded in 2021 in Haldwani, Uttarakhand, DCE Projects was established as a full-spectrum engineering organisation from the very start — not just a consultancy or supplier, but a complete partner capable of handling Industrial Automation, PLC/SCADA, HVAC, Solar, Chiller Plants, and Turnkey Projects under one roof.
            </p>
            <p style={{ fontSize: 16, color: '#555', lineHeight: 1.9, marginBottom: 36 }}>
              DCE Projects works with commercial buildings, industrial facilities, and infrastructure projects — offering end-to-end engineering solutions, from a single chiller installation to a fully automated facility.
            </p>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: BRAND, fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none', borderBottom: `2px solid ${BRAND}`, paddingBottom: 4 }}>
              Discuss Your Project <ArrowRight size={14} />
            </Link>
          </FadeIn>
          <FadeIn direction="right" delay={150}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {milestones.map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: 24, paddingBottom: i < milestones.length - 1 ? 36 : 0, borderBottom: i < milestones.length - 1 ? '1px solid #eee' : 'none', marginBottom: i < milestones.length - 1 ? 36 : 0 }}>
                  <div style={{ width: 80, flexShrink: 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: BRAND, textTransform: 'uppercase', letterSpacing: '0.1em', background: BRAND_LIGHT, padding: '4px 10px', borderRadius: 2 }}>{m.year}</span>
                  </div>
                  <p style={{ fontSize: 14, color: '#555', lineHeight: 1.75 }}>{m.event}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FULL-WIDTH IMAGE BANNER ── */}
      <section style={{ position: 'relative', height: 480, overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&auto=format&fit=crop&q=80"
          alt="DCE Projects Team"
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55)' }}
        />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
          <FadeIn>
            <h2 style={{ fontSize: 'clamp(32px,5vw,64px)', fontWeight: 400, fontFamily: 'DM Serif Display', color: '#fff', letterSpacing: '-0.02em', textShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
              Our work speaks for us.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, marginTop: 20, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 500 }}>
              Automation • HVAC • Solar • Turnkey • MEP
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section style={{ padding: '120px 32px', background: '#f8fafb' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 72 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: BRAND, letterSpacing: '0.2em', textTransform: 'uppercase' }}>What We Do</span>
              <h2 style={{ fontSize: 'clamp(32px,4vw,54px)', fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', marginTop: 16, marginBottom: 20 }}>
                Our Services & Capabilities
              </h2>
              <p style={{ fontSize: 16, color: '#666', maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>
                From industrial control systems to sustainable energy — DCE Projects delivers engineering solutions across every MEP and automation discipline.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 1, background: '#e0e9ed' }}>
            {services.map((s, i) => (
              <FadeIn key={i} delay={i * 40}>
                <div
                  style={{ background: '#fff', padding: '44px 36px', height: '100%', cursor: 'default', transition: 'background 0.3s, transform 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = BRAND; e.currentTarget.querySelector('.svc-tag').style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.querySelector('.svc-icon').style.color = '#fff'; e.currentTarget.querySelector('.svc-title').style.color = '#fff'; e.currentTarget.querySelector('.svc-desc').style.color = 'rgba(255,255,255,0.82)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.querySelector('.svc-tag').style.color = BRAND; e.currentTarget.querySelector('.svc-icon').style.color = BRAND; e.currentTarget.querySelector('.svc-title').style.color = '#111'; e.currentTarget.querySelector('.svc-desc').style.color = '#666' }}
                >
                  <span className="svc-tag" style={{ fontSize: 10, fontWeight: 700, color: BRAND, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: 20, transition: 'color 0.3s' }}>{s.tag}</span>
                  <div className="svc-icon" style={{ color: BRAND, marginBottom: 16, transition: 'color 0.3s' }}>{s.icon}</div>
                  <h3 className="svc-title" style={{ fontSize: 20, fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', marginBottom: 14, lineHeight: 1.3, transition: 'color 0.3s' }}>{s.title}</h3>
                  <p className="svc-desc" style={{ fontSize: 14, color: '#666', lineHeight: 1.8, transition: 'color 0.3s' }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY DCE ── */}
      <section style={{ padding: '120px 32px', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px,1fr))', gap: 64, alignItems: 'start' }}>
            <FadeIn direction="left">
              <span style={{ fontSize: 11, fontWeight: 600, color: BRAND, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Why Choose Us</span>
              <h2 style={{ fontSize: 'clamp(32px,4vw,54px)', fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', marginTop: 16, marginBottom: 28, lineHeight: 1.1 }}>
                The DCE Projects Difference
              </h2>
              <p style={{ fontSize: 16, color: '#555', lineHeight: 1.9, marginBottom: 32 }}>
                We combine deep domain expertise with a genuine commitment to client success — delivering reliable, cost-effective, and sustainable engineering solutions.
              </p>
              <div style={{ padding: '32px', background: BRAND_LIGHT, borderLeft: `4px solid ${BRAND}` }}>
                <p style={{ fontSize: 15, color: BRAND_DARK, lineHeight: 1.75, fontStyle: 'italic' }}>
                  "Engineering is not just about systems and machines — it's about creating environments where people and processes thrive."
                </p>
                <p style={{ fontSize: 12, color: BRAND, fontWeight: 600, marginTop: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>— DCE Projects</p>
              </div>
            </FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {whyUs.map((w, i) => (
                <FadeIn key={i} delay={i * 80}>
                  <div style={{ padding: '28px', border: '1px solid #e8e8e8', borderRadius: 2, transition: 'border-color 0.3s, box-shadow 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = BRAND; e.currentTarget.style.boxShadow = `0 4px 20px rgba(16,102,131,0.1)` }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8e8e8'; e.currentTarget.style.boxShadow = 'none' }}
                  >
                    <div style={{ color: BRAND, marginBottom: 12 }}>{w.icon}</div>
                    <h4 style={{ fontSize: 15, fontWeight: 600, color: '#111', marginBottom: 8, lineHeight: 1.3 }}>{w.title}</h4>
                    <p style={{ fontSize: 13, color: '#666', lineHeight: 1.7 }}>{w.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTOR TAGS ── */}
      <section style={{ background: BRAND_DARK, padding: '80px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
          <FadeIn>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Industries We Serve</span>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 400, fontFamily: 'DM Serif Display', color: '#fff', marginTop: 16, marginBottom: 48 }}>
              Across Every Sector
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
              {[
                'Manufacturing', 'Commercial Buildings', 'Hospitals & Healthcare',
                'Hospitality', 'Data Centres', 'Industrial Plants',
                'High-Rise Residential', 'Infrastructure', 'Cold Storage',
                'Pharmaceuticals', 'Education', 'Government Projects'
              ].map((sec, i) => (
                <span key={i} style={{
                  padding: '10px 22px', border: '1px solid rgba(255,255,255,0.2)',
                  color: 'rgba(255,255,255,0.82)', fontSize: 13, fontWeight: 500,
                  letterSpacing: '0.04em', cursor: 'default',
                  transition: 'background 0.25s, border-color 0.25s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
                >{sec}</span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '120px 32px', background: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <FadeIn>
            <span style={{ fontSize: 11, fontWeight: 600, color: BRAND, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Get Started</span>
            <h2 style={{ fontSize: 'clamp(32px,4vw,54px)', fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', marginTop: 16, marginBottom: 24, lineHeight: 1.1 }}>
              Ready to Engineer Your Next Project?
            </h2>
            <p style={{ fontSize: 16, color: '#666', lineHeight: 1.8, marginBottom: 44, maxWidth: 520, margin: '0 auto 44px' }}>
              Whether you need a full turnkey solution or specialised consultancy, our team is ready to deliver. Let's talk about your requirements.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary" style={{ fontSize: 13, padding: '15px 40px' }}>Contact Us Today</Link>
              <Link to="/services" className="btn-ghost" style={{ fontSize: 13, padding: '14px 40px' }}>Explore Services</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  )
}
