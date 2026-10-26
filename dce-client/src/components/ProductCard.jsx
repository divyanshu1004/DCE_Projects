import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingCart, Star, Zap, Eye, Tag } from 'lucide-react'

const CAT_COLORS = {
  electrical: '#ea580c',
  mechanical: '#1e3a8a',
  plumbing: '#0891b2',
  hvac: '#0d9488',
}

const CAT_ICONS = {
  electrical: <Zap size={12} />,
  mechanical: <Tag size={12} />,
  plumbing: <Tag size={12} />,
  hvac: <Tag size={12} />,
}

const FALLBACK_IMAGES = {
  electrical: 'https://images.pexels.com/photos/159305/electrical-switches-circuit-breaker-wiring-159305.jpeg?w=400&auto=format&fit=crop',
  mechanical: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?w=400&auto=format&fit=crop',
  plumbing: 'https://images.pexels.com/photos/277880/pexels-photo-277880.jpeg?w=400&auto=format&fit=crop',
  hvac: 'https://images.pexels.com/photos/6813359/pexels-photo-6813359.jpeg?w=400&auto=format&fit=crop',
}

const DEFAULT_FALLBACK = 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?w=400&auto=format&fit=crop'

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  const [imgErr, setImgErr] = useState(false)
  const [adding, setAdding] = useState(false)

  const catColor = CAT_COLORS[product.category] || '#1e3a8a'
  const catIcon = CAT_ICONS[product.category] || <Tag size={12} />
  const fallbackImg = FALLBACK_IMAGES[product.category] || DEFAULT_FALLBACK
  const imgUrl = imgErr
    ? fallbackImg
    : (product.imageUrl || fallbackImg)

  const discount = product.mrp && product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : null

  const BRAND = '#1e3a8a'
  const BRAND_DARK = '#0f172a'

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#FFFFFF',
        border: '1px solid #e2e8f0',
        borderRadius: 0,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: hovered ? '0 12px 40px rgba(15,23,42,0.08)' : 'none',
        transform: hovered ? 'translateY(-4px)' : 'none',
      }}
      onClick={() => !adding && navigate(`/products/${product._id}`)}
    >
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: '#f8fafb', borderBottom: '1px solid #e2e8f0' }}>
        <img
          src={imgUrl}
          alt={product.name}
          onError={() => setImgErr(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)', transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
        />

        {/* Category Badge */}
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{
            background: catColor,
            color: '#fff',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '4px 10px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
          }}>
            {catIcon}
            {product.category}
          </span>
        </div>

        {/* Discount Badge */}
        {discount && (
          <div style={{ position: 'absolute', top: 12, right: 12 }}>
            <span style={{
              background: '#ea580c',
              color: '#fff',
              fontSize: 11,
              fontWeight: 700,
              padding: '4px 10px',
              letterSpacing: '0.05em',
            }}>
              -{discount}%
            </span>
          </div>
        )}

        {/* Quick view on hover */}
        {hovered && product.available && (
          <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
            <button
              onClick={e => { e.stopPropagation(); navigate(`/products/${product._id}`) }}
              style={{
                background: '#FFFFFF',
                border: '1px solid #e2e8f0',
                borderRadius: 0,
                padding: '8px 14px',
                cursor: 'pointer',
                color: BRAND_DARK,
                fontSize: 11,
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = BRAND; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = BRAND; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.color = BRAND_DARK; e.currentTarget.style.borderColor = '#e2e8f0'; }}
            >
              <Eye size={12} /> View Details
            </button>
          </div>
        )}

        {/* Add to cart on hover - bottom center */}
        {hovered && product.available && (
          <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)' }}>
            <button
              onClick={async e => {
                e.stopPropagation()
                setAdding(true)
                await new Promise(r => setTimeout(r, 800))
                setAdding(false)
              }}
              disabled={adding}
              style={{
                background: BRAND,
                border: 'none',
                borderRadius: 0,
                padding: '10px 22px',
                cursor: adding ? 'not-allowed' : 'pointer',
                color: '#fff',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                opacity: adding ? 0.7 : 1,
                boxShadow: '0 4px 16px rgba(30,58,138,0.3)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if (!adding) { e.currentTarget.style.background = '#1e40af'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(30,58,138,0.4)'; }}}
              onMouseLeave={e => { if (!adding) { e.currentTarget.style.background = BRAND; e.currentTarget.style.boxShadow = '0 4px 16px rgba(30,58,138,0.3)'; }}}
            >
              <ShoppingCart size={13} />
              {adding ? 'Added' : 'Add to Cart'}
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {product.brand && (
          <p style={{ fontSize: 10, color: '#94a3b8', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
            {product.brand}
          </p>
        )}
        <h3 style={{ fontSize: 16, fontWeight: 400, fontFamily: 'DM Serif Display', color: '#0f172a', lineHeight: 1.3, marginBottom: 12, flex: 1 }}>
          {product.name}
        </h3>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 'auto' }}>
          <span style={{ fontSize: 16, fontWeight: 400, color: '#0f172a' }}>₹{product.price?.toLocaleString()}</span>
          {product.mrp && product.mrp > product.price && (
            <span style={{ fontSize: 13, color: '#94a3b8', textDecoration: 'line-through' }}>₹{product.mrp?.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  )
}