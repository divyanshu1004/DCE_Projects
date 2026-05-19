import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Star, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

export default function ServiceCard({ service }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  const [imgErr, setImgErr] = useState(false)

  const imgUrl = imgErr
    ? 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop'
    : (service.imageUrl || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop')

  function handleBook() {
    if (!user) {
      navigate('/login', { state: { from: `/services/${service._id}` } })
    } else {
      navigate(`/services/${service._id}`)
    }
  }

  const typeColors = { labour: '#1D592C', engineer: '#4FC3F7', mistri: '#FFB300' }
  const typeColor = typeColors[service.type] || '#1D592C'

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#E5E3D8',
        border: `1px solid ${hovered ? '#1D592C' : '#CCCCCC'}`,
        borderRadius: 0,
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        cursor: 'pointer',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
        <img
          src={imgUrl}
          alt={service.title}
          onError={() => setImgErr(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: hovered ? 'rgba(200,241,53,0.06)' : 'rgba(240, 237, 225,0.2)',
          transition: 'background 0.3s',
        }} />
        <span style={{
          position: 'absolute', top: 12, left: 12,
          background: typeColor, color: '#F0EDE1',
          fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '3px 10px', borderRadius: 0,
        }}>{service.type}</span>
        {!service.available && (
          <span style={{
            position: 'absolute', top: 12, right: 12,
            background: '#FF5C2B', color: '#fff',
            fontSize: 10, fontWeight: 600, padding: '3px 10px', borderRadius: 0,
          }}>Unavailable</span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px 20px 24px' }}>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: '#0A0A0A', marginBottom: 6, lineHeight: 1.3 }}>{service.title}</h3>
        <p style={{ fontSize: 13, color: '#4A4A4A', lineHeight: 1.6, marginBottom: 16, minHeight: 40 }}>
          {service.description?.slice(0, 90)}{service.description?.length > 90 ? '…' : ''}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <span style={{ fontSize: 22, fontWeight: 700, color: '#1D592C' }}>₹{service.rate?.toLocaleString()}</span>
            <span style={{ fontSize: 12, color: '#4A4A4A', marginLeft: 4 }}>/ {service.rateUnit || 'day'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Star size={13} fill="#1D592C" color="#1D592C" />
            <span style={{ fontSize: 13, color: '#0A0A0A', fontWeight: 500 }}>{service.rating || '4.8'}</span>
          </div>
        </div>

        <button onClick={handleBook} style={{
          width: '100%', padding: '10px 0',
          background: hovered ? '#1D592C' : 'transparent',
          color: hovered ? '#F0EDE1' : '#1D592C',
          border: '1px solid #1D592C',
          borderRadius: 0, fontWeight: 600, fontSize: 13,
          cursor: 'pointer', transition: 'all 0.2s',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          Book Now <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}
