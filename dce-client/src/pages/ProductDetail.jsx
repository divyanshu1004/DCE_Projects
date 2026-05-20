import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star, ChevronLeft, Truck, RefreshCw, Shield } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import ProductCard from '../components/ProductCard.jsx'
import api from '../api/axios.js'
import toast from 'react-hot-toast'

import { FALLBACK_PRODUCTS } from '../data/fallbackProducts.js'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [imgIdx, setImgIdx] = useState(0)

  useEffect(() => {
    Promise.all([
      api.get(`/products/${id}`),
      api.get('/products'),
    ]).then(([pRes, allRes]) => {
      setProduct(pRes.data)
      setRelated(allRes.data.filter(p => p._id !== id && p.category === pRes.data.category).slice(0, 4))
    }).catch(() => {
      const prod = FALLBACK_PRODUCTS.find(p => p._id === id)
      if (prod) {
        setProduct(prod)
        setRelated(FALLBACK_PRODUCTS.filter(p => p._id !== id && p.category === prod.category).slice(0, 4))
      } else {
        navigate('/products')
      }
    }).finally(() => setLoading(false))
  }, [id])



  if (loading) return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Navbar />
      <div style={{ width: 48, height: 48, border: '1px solid #CCCCCC', borderTop: '1px solid #111', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  const discount = product?.mrp && product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : null

  const images = [
    product?.imageUrl,
    product?.imageUrl?.replace('?w=', '?sig=1&w='),
    product?.imageUrl?.replace('?w=', '?sig=2&w='),
  ].filter(Boolean)

  const specs = product?.specs || {}

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '120px 24px 64px' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40, fontSize: 12, color: '#666', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          <button onClick={() => navigate('/products')} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}>
            <ChevronLeft size={14} /> Products
          </button>
          <span>/</span>
          <span style={{ color: '#111' }}>{product?.category}</span>
          <span>/</span>
          <span style={{ color: '#999', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product?.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-8 md:gap-12 items-start">
          {/* Left — Images */}
          <div>
            <div style={{ background: '#F9F9F9', border: '1px solid #CCCCCC', borderRadius: 0, padding: 48, marginBottom: 16, aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <img src={images[imgIdx] || images[0]} alt={product?.name}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                onError={e => e.target.src = 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600'}
              />
              {discount && (
                <div style={{ position: 'absolute', top: 24, left: 24, background: '#111', color: '#fff', fontSize: 11, fontWeight: 500, padding: '4px 12px', borderRadius: 0, letterSpacing: '0.05em' }}>
                  -{discount}% OFF
                </div>
              )}
            </div>
            {/* Thumb nav */}
            <div style={{ display: 'flex', gap: 12 }}>
              {images.map((img, i) => (
                <button key={i} onClick={() => setImgIdx(i)}
                  style={{ width: 80, height: 80, borderRadius: 0, border: `1px solid ${imgIdx === i ? '#111' : '#CCCCCC'}`, overflow: 'hidden', cursor: 'pointer', padding: 8, background: '#F9F9F9', transition: 'border-color 0.3s' }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Right — Product Info */}
          <div style={{ paddingLeft: '4%' }}>
            {product?.brand && <p style={{ fontSize: 11, fontWeight: 500, color: '#666', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{product.brand}</p>}
            <h1 style={{ fontSize: 42, fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', lineHeight: 1.1, marginBottom: 24 }}>{product?.name}</h1>

            {/* Price Block */}
            <div style={{ borderBottom: '1px solid #CCCCCC', paddingBottom: 24, marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                <span style={{ fontSize: 24, fontWeight: 400, color: '#111' }}>₹{product?.price?.toLocaleString()}</span>
                {product?.mrp && product.mrp > product.price && (
                  <span style={{ fontSize: 16, color: '#999', textDecoration: 'line-through' }}>₹{product.mrp.toLocaleString()}</span>
                )}
              </div>
            </div>

            {/* Contact to Purchase */}
            <div style={{ background: '#F9F9F9', border: '1px solid #CCCCCC', padding: '32px', marginBottom: 40 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#111', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>To purchase this product</h3>
              <p style={{ fontSize: 15, color: '#666', lineHeight: 1.6, marginBottom: 20 }}>
                Please contact our sales team directly. We will provide you with a customized quote and assist with your order.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href="mailto:services.dce@gmail.com" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111', color: '#fff', textDecoration: 'none', padding: '14px 24px', fontSize: 14, fontWeight: 500, letterSpacing: '0.05em', transition: 'background 0.3s' }}>
                  Email services.dce@gmail.com
                </a>
              </div>
            </div>

            {/* Perks */}
            <div style={{ borderTop: '1px solid #CCCCCC', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                [<Truck size={16} strokeWidth={1.5} />, 'Worldwide shipping available'],
                [<Shield size={16} strokeWidth={1.5} />, 'Genuine products with warranty'],
                [<RefreshCw size={16} strokeWidth={1.5} />, 'Expert support & installation'],
              ].map(([icon, text], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: '#111' }}>{icon}</span>
                  <span style={{ fontSize: 13, color: '#666' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginTop: 80, borderTop: '1px solid #CCCCCC', paddingTop: 48, maxWidth: 800 }}>
          <h2 style={{ fontSize: 24, fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', marginBottom: 24 }}>Details</h2>
          <p style={{ fontSize: 16, color: '#666', lineHeight: 1.8 }}>{product?.description}</p>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: 100 }}>
            <h2 style={{ fontSize: 28, fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', marginBottom: 40 }}>Related Hardware</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
              {related.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
