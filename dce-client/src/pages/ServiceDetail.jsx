import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star, Calendar, ChevronLeft, ArrowRight, Heart } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import api from '../api/axios.js'
import toast from 'react-hot-toast'

export default function ServiceDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [service, setService] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [imgIdx, setImgIdx] = useState(0)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [booking, setBooking] = useState(false)

  useEffect(() => {
    Promise.all([
      api.get(`/services/${id}`),
      api.get('/services'),
    ]).then(([sRes, allRes]) => {
      setService(sRes.data)
      setRelated(allRes.data.filter(s => s._id !== id && s.type === sRes.data.type).slice(0, 3))
    }).catch(() => navigate('/services'))
      .finally(() => setLoading(false))
  }, [id])

  async function handleBook() {
    if (!user) { navigate('/login', { state: { from: `/services/${id}` } }); return }
    if (!startDate || !endDate) { toast.error('Please select start and end dates'); return }
    if (new Date(endDate) <= new Date(startDate)) { toast.error('End date must be after start date'); return }
    setBooking(true)
    try {
      await api.post('/bookings', { itemId: id, itemType: 'service', startDate, endDate })
      toast.success('Booking confirmed! Check your dashboard.')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed')
    } finally { setBooking(false) }
  }

  if (loading) return (
    <div style={{ background: '#F0EDE1', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Navbar />
      <div style={{ width: 48, height: 48, border: '3px solid #CCCCCC', borderTop: '3px solid #1D592C', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  const typeColors = { labour: '#1D592C', engineer: '#4FC3F7', mistri: '#FFB300' }
  const typeColor = typeColors[service?.type] || '#1D592C'

  const images = [
    service?.imageUrl || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop',
  ]

  return (
    <div style={{ background: '#F0EDE1', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: 64, maxWidth: 1200, margin: '0 auto', padding: '80px 24px 48px' }}>
        <button onClick={() => navigate('/services')} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: '#4A4A4A', fontSize: 14, marginBottom: 32 }}>
          <ChevronLeft size={16} /> Back to Services
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-8 md:gap-12 items-start">
          {/* Image Carousel */}
          <div>
            <div style={{ position: 'relative', borderRadius: 0, overflow: 'hidden', aspectRatio: '16/9', background: '#E5E3D8', marginBottom: 12 }}>
              <img src={images[imgIdx]} alt={service?.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <span style={{ position: 'absolute', top: 16, left: 16, background: typeColor, color: '#F0EDE1', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 0, textTransform: 'uppercase' }}>
                {service?.type}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {images.map((img, i) => (
                <button key={i} onClick={() => setImgIdx(i)} style={{ width: 64, height: 48, borderRadius: 0, overflow: 'hidden', border: `2px solid ${imgIdx === i ? '#1D592C' : '#CCCCCC'}`, cursor: 'pointer', padding: 0 }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 style={{ fontSize: 32, fontWeight:  400, fontFamily: 'DM Serif Display', color: '#0A0A0A', letterSpacing: '-0.02em', marginBottom: 12, lineHeight: 1.2 }}>{service?.title}</h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < Math.round(service?.rating || 5) ? '#1D592C' : '#CCCCCC'} color={i < Math.round(service?.rating || 5) ? '#1D592C' : '#CCCCCC'} />)}
              </div>
              <span style={{ fontSize: 14, color: '#4A4A4A' }}>{service?.rating || '5.0'} rating</span>
            </div>

            <div style={{ fontSize: 28, fontWeight:  400, fontFamily: 'DM Serif Display', color: '#1D592C', marginBottom: 16 }}>
              ₹{service?.rate?.toLocaleString()} <span style={{ fontSize: 14, color: '#4A4A4A', fontWeight: 400 }}>/ {service?.rateUnit || 'day'}</span>
            </div>

            <p style={{ fontSize: 15, color: '#4A4A4A', lineHeight: 1.7, marginBottom: 28 }}>{service?.description}</p>

            {/* Date Picker */}
            <div style={{ background: '#E5E3D8', border: '1px solid #CCCCCC', borderRadius: 0, padding: 20, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Calendar size={16} color="#1D592C" />
                <span style={{ fontSize: 14, fontWeight: 600, color: '#0A0A0A' }}>Select Work Period</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, color: '#4A4A4A', display: 'block', marginBottom: 6 }}>Start Date</label>
                  <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} min={new Date().toISOString().split('T')[0]}
                    style={{ width: '100%', background: '#F0EDE1', border: '1px solid #CCCCCC', borderRadius: 0, padding: '10px 12px', color: '#0A0A0A', fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none', colorScheme: 'dark' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: '#4A4A4A', display: 'block', marginBottom: 6 }}>End Date</label>
                  <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} min={startDate || new Date().toISOString().split('T')[0]}
                    style={{ width: '100%', background: '#F0EDE1', border: '1px solid #CCCCCC', borderRadius: 0, padding: '10px 12px', color: '#0A0A0A', fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none', colorScheme: 'dark' }}
                  />
                </div>
              </div>
              {startDate && endDate && new Date(endDate) > new Date(startDate) && (
                <div style={{ marginTop: 12, fontSize: 13, color: '#1D592C' }}>
                  {Math.ceil((new Date(endDate) - new Date(startDate)) / 86400000)} day(s)
                  — ₹{(Math.ceil((new Date(endDate) - new Date(startDate)) / 86400000) * (service?.rate || 0)).toLocaleString()} estimated
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={handleBook} disabled={booking || !service?.available} style={{
                flex: 1, padding: '13px 0',
                background: service?.available ? '#1D592C' : '#CCCCCC',
                color: service?.available ? '#F0EDE1' : '#4A4A4A',
                border: 'none', borderRadius: 0, fontWeight: 700, fontSize: 15,
                cursor: service?.available ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                {booking ? 'Booking…' : service?.available ? <><span>Book Now</span><ArrowRight size={16} /></> : 'Not Available'}
              </button>
              <button style={{ padding: '13px 16px', background: 'transparent', border: '1px solid #CCCCCC', borderRadius: 0, cursor: 'pointer', color: '#4A4A4A' }}>
                <Heart size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: 72 }}>
            <h2 style={{ fontSize: 24, fontWeight:  400, fontFamily: 'DM Serif Display', color: '#0A0A0A', letterSpacing: '-0.02em', marginBottom: 24 }}>Similar Services</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {related.map(s => <ServiceCard key={s._id} service={s} />)}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
