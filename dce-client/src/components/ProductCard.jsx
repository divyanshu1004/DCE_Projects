import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingCart, Star, Zap, Eye } from 'lucide-react'

const CAT_COLORS = {
  electrical: '#000000',
  mechanical: '#000000',
  plumbing: '#000000',
  hvac: '#000000',
}

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  const [imgErr, setImgErr] = useState(false)
  const [adding, setAdding] = useState(false)

  const catColor = CAT_COLORS[product.category] || '#1D592C'
  const imgUrl = imgErr
    ? 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&auto=format&fit=crop'
    : (product.imageUrl || 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&auto=format&fit=crop')

  const discount = product.mrp && product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : null



  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#FFFFFF',
        border: '1px solid #CCCCCC',
        borderRadius: 0,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={() => navigate(`/products/${product._id}`)}
    >
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: '#F9F9F9', borderBottom: '1px solid #CCCCCC' }}>
        <img
          src={imgUrl}
          alt={product.name}
          onError={() => setImgErr(true)}
          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 24, transition: 'transform 0.6s ease', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />

        {/* Badges */}
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ color: '#666', fontSize: 10, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {product.category}
          </span>
        </div>

        {/* Quick view on hover */}
        {hovered && product.available && (
          <div style={{ position: 'absolute', bottom: 8, right: 8 }}>
            <button
              onClick={e => { e.stopPropagation(); navigate(`/products/${product._id}`) }}
              style={{ background: '#FFFFFF', border: '1px solid #CCCCCC', borderRadius: 0, padding: '6px 10px', cursor: 'pointer', color: '#0A0A0A', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}
            >
              <Eye size={12} /> View
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {product.brand && <p style={{ fontSize: 11, color: '#666', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>{product.brand}</p>}
        <h3 style={{ fontSize: 16, fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', lineHeight: 1.3, marginBottom: 12, flex: 1 }}>
          {product.name}
        </h3>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 'auto' }}>
          <span style={{ fontSize: 16, fontWeight: 400, color: '#111' }}>₹{product.price?.toLocaleString()}</span>
          {product.mrp && product.mrp > product.price && (
            <span style={{ fontSize: 13, color: '#999', textDecoration: 'line-through' }}>₹{product.mrp?.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  )
}
