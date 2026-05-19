import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { useNavigate } from 'react-router-dom'

export default function CartDrawer() {
  const { items, open, setOpen, removeItem, updateQty, total, count } = useCart()
  const navigate = useNavigate()

  if (!open) return null

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 200,
          animation: 'fadeIn 0.2s ease',
        }}
      />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: 420,
        background: '#E5E3D8', borderLeft: '1px solid #CCCCCC', zIndex: 201,
        display: 'flex', flexDirection: 'column',
        animation: 'slideIn 0.3s cubic-bezier(0.19,1,0.22,1)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #CCCCCC' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShoppingBag size={20} color="#1D592C" />
            <span style={{ fontSize: 18, fontWeight: 700, color: '#0A0A0A' }}>Your Cart</span>
            {count > 0 && <span style={{ background: '#1D592C', color: '#F0EDE1', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 0 }}>{count} item{count !== 1 ? 's' : ''}</span>}
          </div>
          <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4A4A4A' }}>
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <ShoppingBag size={48} color="#CCCCCC" style={{ margin: '0 auto 16px', display: 'block' }} />
              <p style={{ color: '#4A4A4A', fontSize: 16, marginBottom: 24 }}>Your cart is empty</p>
              <button onClick={() => { setOpen(false); navigate('/products') }} style={{ background: '#1D592C', color: '#F0EDE1', border: 'none', borderRadius: 0, padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Browse MEP Tools
              </button>
            </div>
          ) : (
            <div>
              {items.map(item => (
                <div key={item._id} style={{ display: 'flex', gap: 16, padding: '20px 0', borderBottom: '1px solid #CCCCCC' }}>
                  {/* Image */}
                  <div style={{ width: 72, height: 72, borderRadius: 0, overflow: 'hidden', flexShrink: 0, background: '#F0EDE1' }}>
                    <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => e.target.style.display = 'none'} />
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#0A0A0A', marginBottom: 4, lineHeight: 1.3 }}>{item.name}</p>
                    <p style={{ fontSize: 12, color: '#4A4A4A', marginBottom: 10 }}>{item.brand || item.category}</p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {/* Qty controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1px solid #CCCCCC', borderRadius: 0, overflow: 'hidden' }}>
                        <button onClick={() => updateQty(item._id, item.qty - 1)} style={{ width: 28, height: 28, background: '#FFFFFF', border: 'none', cursor: 'pointer', color: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Minus size={12} />
                        </button>
                        <span style={{ width: 32, textAlign: 'center', fontSize: 14, fontWeight: 600, color: '#0A0A0A' }}>{item.qty}</span>
                        <button onClick={() => updateQty(item._id, item.qty + 1)} style={{ width: 28, height: 28, background: '#FFFFFF', border: 'none', cursor: 'pointer', color: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Plus size={12} />
                        </button>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#1D592C' }}>₹{(item.price * item.qty).toLocaleString()}</div>
                        <div style={{ fontSize: 11, color: '#4A4A4A' }}>₹{item.price?.toLocaleString()} each</div>
                      </div>
                    </div>
                  </div>

                  {/* Remove */}
                  <button onClick={() => removeItem(item._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4A4A4A', flexShrink: 0, alignSelf: 'flex-start', padding: 4 }}>
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid #CCCCCC' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 14, color: '#4A4A4A' }}>Subtotal ({count} items)</span>
              <span style={{ fontSize: 14, color: '#0A0A0A', fontWeight: 600 }}>₹{total.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <span style={{ fontSize: 13, color: '#4A4A4A' }}>Shipping</span>
              <span style={{ fontSize: 13, color: '#22C55E' }}>{total >= 2000 ? 'FREE' : '₹150'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid #CCCCCC', marginBottom: 20 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#0A0A0A' }}>Total</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#1D592C' }}>₹{(total + (total >= 2000 ? 0 : 150)).toLocaleString()}</span>
            </div>
            <button
              onClick={() => { setOpen(false); navigate('/checkout') }}
              style={{
                width: '100%', padding: '14px 0', background: '#1D592C', color: '#F0EDE1',
                border: 'none', borderRadius: 0, fontWeight: 700, fontSize: 15,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              Proceed to Checkout <ArrowRight size={16} />
            </button>
            <p style={{ fontSize: 11, color: '#4A4A4A', textAlign: 'center', marginTop: 12 }}>
              🔒 Secured by Lago Payments · GST included
            </p>
          </div>
        )}
      </div>
    </>
  )
}
