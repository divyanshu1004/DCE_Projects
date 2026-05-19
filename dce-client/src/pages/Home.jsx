import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Truck, RefreshCw, Shield } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import ProductCard from '../components/ProductCard.jsx'
import api from '../api/axios.js'

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
function FadeIn({ children, delay = 0 }) {
  const [ref, v] = useInView()
  return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(24px)', transition: `all 0.5s ease ${delay}ms` }}>{children}</div>
}

const categories = [
  { label: 'Electrical', sub: 'Switchgear, MCBs, Cables, Panels', bg: '#F9F9F9', q: 'electrical' },
  { label: 'Mechanical / HVAC', sub: 'ACs, Fans, Ducts, Compressors', bg: '#F9F9F9', q: 'mechanical' },
  { label: 'Plumbing', sub: 'Pipes, Valves, Pumps, Fittings', bg: '#F9F9F9', q: 'plumbing' },
]

const perks = [
  { icon: <Truck size={20} color="#111" />, title: 'Worldwide Shipping', sub: 'Available on request' },
  { icon: <Shield size={20} color="#111" />, title: 'Genuine Products', sub: 'Certified brands' },
  { icon: <RefreshCw size={20} color="#111" />, title: 'Expert Support', sub: 'Dedicated project managers' },
]

import { FALLBACK_PRODUCTS } from '../data/fallbackProducts.js'

export default function Home() {
  const [heroLoaded, setHeroLoaded] = useState(false)
  const [featured, setFeatured] = useState([])
  const navigate = useNavigate()
  const marqueeRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => { setTimeout(() => setHeroLoaded(true), 80) }, [])

  useEffect(() => {
    if (marqueeRef.current) {
      animationRef.current = marqueeRef.current.animate(
        [
          { transform: 'translateX(0)' },
          { transform: 'translateX(-50%)' }
        ],
        {
          duration: 40000,
          iterations: Infinity
        }
      )
    }
  }, [])

  useEffect(() => {
    api.get('/products')
      .then(r => setFeatured(r.data?.length ? r.data.slice(0, 8) : FALLBACK_PRODUCTS.slice(0, 8)))
      .catch(() => setFeatured(FALLBACK_PRODUCTS.slice(0, 8)))
  }, [])

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh', overflowX: 'hidden', width: '100%' }}>
      <Navbar />

      {/* Hero Banner */}
      <section className="relative flex items-center justify-center text-center pt-20" style={{ minHeight: '100svh' }}>
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&auto=format&fit=crop&q=80"
            alt="MEP Consultants and Suppliers"
            className="w-full h-full object-cover object-center"
            style={{ filter: 'brightness(0.8) grayscale(0.5)' }}
          />
          <div className="absolute inset-0 bg-white/70" />
        </div>

        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 24px', width: '100%' }}>
          <div style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'none' : 'translateY(32px)', transition: 'all 0.9s cubic-bezier(0.19, 1, 0.22, 1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            <img 
              src="/dce-logo.png" 
              alt="DCE Projects Logo" 
              className="w-full max-w-[320px] sm:max-w-[550px] md:max-w-[750px] lg:max-w-[900px] mx-auto mb-8 sm:mb-12"
              style={{ display: 'block' }} 
            />

            <p className="text-[15px] sm:text-[18px] md:text-[24px] lg:text-[24px] text-[#333] leading-[1.8] max-w-[850px] mx-auto mb-10 sm:mb-14 font-normal px-4 sm:px-0 text-center">
              Curated, high-end mechanical, electrical, and plumbing fixtures sourced from premium manufacturers for distinguished projects.
            </p>

            <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '30px 0', justifyContent: 'center' }}>
              <Link to="/contact" className="btn-primary">Contact Us</Link>
              <Link to="/products" className="btn-ghost">View Catalog</Link>
            </div>

          </div>
        </div>
      </section>

      {/* Perks Marquee */}
      <section 
        className="marquee-section" 
        style={{ background: '#106683ff', color: '#fff', padding: '20px 0', overflow: 'hidden', borderBottom: '1px solid #007399' }}
        onMouseEnter={() => { if (animationRef.current) animationRef.current.playbackRate = 0.3 }}
        onMouseLeave={() => { if (animationRef.current) animationRef.current.playbackRate = 1 }}
      >
        <div ref={marqueeRef} className="marquee-container" style={{ display: 'flex', width: 'max-content' }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              {perks.map((p, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 40px', whiteSpace: 'nowrap' }}>
                    {p.title} <span style={{ color: '#ff7f00', fontWeight: 400, textTransform: 'none', letterSpacing: '0' }}>— {p.sub}</span>
                  </span>
                  <span style={{ color: '#fff', opacity: 0.2, fontSize: 10 }}>✦</span>
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 40px', whiteSpace: 'nowrap' }}>
                  Have a project? <Link to="/contact" style={{ color: '#fff', textDecoration: 'underline' }}>Get in touch with us today</Link>
                </span>
                <span style={{ color: '#fff', opacity: 0.2, fontSize: 10 }}>✦</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by Category */}
      <section style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
          <FadeIn>
            <div style={{ marginBottom: 64 }}>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', marginTop: 16 }}>Collections</h2>
            </div>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {categories.map((c, i) => (
              <FadeIn key={i} delay={i * 100}>
                <Link to={`/products?category=${c.q}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: '#F9F9F9', border: '1px solid #D4D4D4', borderRadius: 0, padding: '48px 32px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.background = '#fff' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#D4D4D4'; e.currentTarget.style.background = '#F9F9F9' }}
                  >
                    <h3 style={{ fontSize: 24, fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', marginBottom: 12 }}>{c.label}</h3>
                    <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>{c.sub}</p>
                    <div style={{ marginTop: 24, fontSize: 11, fontWeight: 500, color: '#111', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      Explore
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
          
          <div style={{ marginTop: 64 }}>
            <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: '#111', fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #111', paddingBottom: 4 }}>
              View Complete Catalog <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ borderTop: '1px solid #D4D4D4', borderBottom: '1px solid #D4D4D4', padding: '120px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 64 }}>
              <span style={{ fontSize: 11, fontWeight: 500, color: '#666', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Curated Selection</span>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', marginTop: 16 }}>Featured Products</h2>
            </div>
          </FadeIn>

          {featured.length === 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
              {[...Array(8)].map((_, i) => (
                <div key={i} style={{ background: '#FFFFFF', border: '1px solid #D4D4D4', borderRadius: 0, overflow: 'hidden' }}>
                  <div style={{ aspectRatio: '1/1', background: '#F9F9F9', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  <div style={{ padding: 20 }}>
                    <div style={{ height: 14, background: '#F9F9F9', borderRadius: 0, marginBottom: 12, animation: 'pulse 1.5s ease-in-out infinite' }} />
                    <div style={{ height: 20, background: '#F9F9F9', borderRadius: 0, width: '60%', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  </div>
                  <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
              {featured.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* About DCE Banner */}
      <section style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2" style={{ background: '#FFFFFF', border: '1px solid #D4D4D4', borderRadius: 0, overflow: 'hidden' }}>
              <div style={{ padding: '80px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: 11, fontWeight: 500, color: '#666', letterSpacing: '0.15em', textTransform: 'uppercase' }}>About Us</span>
                <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', marginTop: 16, marginBottom: 24, lineHeight: 1.1 }}>
                  DCE<br />MEP Consultants & Suppliers
                </h2>
                <p style={{ fontSize: 16, color: '#666', lineHeight: 1.8, marginBottom: 40, maxWidth: 500 }}>
                  A premier supplier based in Haldwani, Uttarakhand. Providing everyone—from businesses to individual clients—with sophisticated machines, plumbing tools, and comprehensive MEP products for industrial and residential excellence.
                </p>
                <Link to="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#111', fontWeight: 500, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #111', paddingBottom: 4, textDecoration: 'none', alignSelf: 'flex-start' }}>
                  Discover Our Story <ArrowRight size={14} />
                </Link>
              </div>
              <div style={{ position: 'relative', overflow: 'hidden', minHeight: 400 }}>
                <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop" alt="DCE Projects" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.3)' }} />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact CTA */}
      <section style={{ padding: '0 24px 120px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ background: '#106683ff', borderRadius: 0, padding: '80px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 32 }}>
              <div>
                <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, fontFamily: 'DM Serif Display', color: '#fff', marginBottom: 16 }}>Project Inquiries</h2>
                <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', maxWidth: 500, margin: '0 auto' }}>To discuss purchasing requirements or request a customized quote, please reach out to our team.</p>
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href="tel:+918171114006" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#111', fontWeight: 500, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '15px 32px', borderRadius: 0, textDecoration: 'none' }}>
                  Call +91 8171114006
                </a>
                <a href="mailto:services.dce@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: '#fff', fontWeight: 500, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '14px 32px', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 0, textDecoration: 'none' }}>
                  Email Us
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  )
}
