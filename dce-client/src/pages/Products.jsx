import { useState, useEffect } from 'react'
import { Search, X, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import ProductCard from '../components/ProductCard.jsx'
import api from '../api/axios.js'
import toast from 'react-hot-toast'

import { FALLBACK_PRODUCTS } from '../data/fallbackProducts.js'

const CATEGORIES = [
  { value: 'all', label: 'All Products' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'mechanical', label: 'Mechanical / HVAC' },
  { value: 'plumbing', label: 'Plumbing' },
]

const SORT_OPTIONS = [
  { value: 'default', label: 'Sort: Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'discount', label: 'Best Discount' },
]

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [availOnly, setAvailOnly] = useState(false)
  const [mobileFilters, setMobileFilters] = useState(false)

  const cat = searchParams.get('category') || 'all'

  useEffect(() => {
    api.get('/products')
      .then(r => setProducts(r.data?.length ? r.data : FALLBACK_PRODUCTS))
      .catch(() => {
        toast.error('Using local fallback products due to backend offline')
        setProducts(FALLBACK_PRODUCTS)
      })
      .finally(() => setLoading(false))
  }, [])

  const filtered = products
    .filter(p => cat === 'all' || p.category === cat)
    .filter(p => !search || p.name?.toLowerCase().includes(search.toLowerCase()) || p.brand?.toLowerCase().includes(search.toLowerCase()))
    .filter(p => !minPrice || p.price >= Number(minPrice))
    .filter(p => !maxPrice || p.price <= Number(maxPrice))
    .filter(p => !availOnly || p.available)
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'rating') return (b.rating || 0) - (a.rating || 0)
      if (sort === 'discount') {
        const dA = a.mrp ? (a.mrp - a.price) / a.mrp : 0
        const dB = b.mrp ? (b.mrp - b.price) / b.mrp : 0
        return dB - dA
      }
      return 0
    })

  function resetFilters() { setMinPrice(''); setMaxPrice(''); setAvailOnly(false); setSearch('') }

  const FilterSidebar = () => (
    <div style={{ background: '#FFFFFF', border: '1px solid #CCCCCC', borderRadius: 0, padding: 32, position: 'sticky', top: 100 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111' }}>Filters</h3>
        <button onClick={resetFilters} style={{ fontSize: 12, color: '#666', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer' }}>Reset</button>
      </div>

      {/* Category */}
      <div style={{ marginBottom: 32 }}>
        <label style={labelSt}>Category</label>
        {CATEGORIES.map(c => (
          <div key={c.value} onClick={() => setSearchParams(c.value === 'all' ? {} : { category: c.value })}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', cursor: 'pointer' }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', border: `1px solid ${cat === c.value ? '#111' : '#ccc'}`, background: cat === c.value ? '#111' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
              {cat === c.value && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />}
            </div>
            <span style={{ fontSize: 14, color: cat === c.value ? '#111' : '#666', fontWeight: cat === c.value ? 500 : 400 }}>{c.label}</span>
          </div>
        ))}
      </div>

      {/* Price */}
      <div style={{ marginBottom: 28 }}>
        <label style={labelSt}>Price Range (₹)</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <input type="number" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)} style={filterInput} />
          <input type="number" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} style={filterInput} />
        </div>
      </div>

      {/* Availability */}
      <div onClick={() => setAvailOnly(v => !v)} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', marginTop: 12 }}>
        <div style={{ width: 16, height: 16, borderRadius: 0, border: `1px solid ${availOnly ? '#111' : '#ccc'}`, background: availOnly ? '#111' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
          {availOnly && <span style={{ fontSize: 10, color: '#fff', fontWeight: 500 }}>✓</span>}
        </div>
        <span style={{ fontSize: 14, color: '#111' }}>In Stock Only</span>
      </div>
    </div>
  )

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh', overflowX: 'hidden', width: '100%' }}>
      <Navbar />
      <div style={{ paddingTop: 80 }}>
        {/* Top bar */}
        <div style={{ background: '#FFFFFF', borderBottom: '1px solid #CCCCCC', padding: '24px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Search */}
            <div style={{ flex: 1, minWidth: 260, display: 'flex', alignItems: 'center', background: '#F9F9F9', border: '1px solid #CCCCCC', borderRadius: 0, padding: '0 16px', gap: 12, height: 48 }}>
              <Search size={16} color="#999" />
              <input placeholder="Search MEP products…" value={search} onChange={e => setSearch(e.target.value)}
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#111', fontSize: 14, fontFamily: 'Inter, sans-serif' }} />
              {search && <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}><X size={16} /></button>}
            </div>

            {/* Sort */}
            <select value={sort} onChange={e => setSort(e.target.value)}
              style={{ background: '#F9F9F9', border: '1px solid #CCCCCC', borderRadius: 0, color: '#111', padding: '0 16px', height: 48, fontSize: 14, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>

            <span style={{ fontSize: 13, color: '#666', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Main layout */}
        <div className="flex flex-col md:flex-row gap-7 items-start" style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 24px' }}>
          {/* Sidebar */}
          <div className="w-full md:w-[220px] shrink-0"><FilterSidebar /></div>

          {/* Grid */}
          <div className="w-full md:w-auto flex-1 min-w-0">
            {/* Category tabs */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 32, overflowX: 'auto', paddingBottom: 4, WebkitOverflowScrolling: 'touch' }}>
              {CATEGORIES.map(c => (
                <button key={c.value} onClick={() => setSearchParams(c.value === 'all' ? {} : { category: c.value })}
                  style={{
                    padding: '8px 20px', borderRadius: 0, fontSize: 13, fontWeight: 500, cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase',
                    background: cat === c.value ? '#111' : '#F9F9F9',
                    color: cat === c.value ? '#fff' : '#666',
                    border: `1px solid ${cat === c.value ? '#111' : '#CCCCCC'}`,
                    whiteSpace: 'nowrap', transition: 'all 0.3s',
                  }}>{c.label}</button>
              ))}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(12)].map((_, i) => (
                  <div key={i} style={{ background: '#FFFFFF', border: '1px solid #CCCCCC', borderRadius: 0, overflow: 'hidden' }}>
                    <div style={{ aspectRatio: '1/1', background: '#F9F9F9', animation: 'pulse 1.5s ease-in-out infinite' }} />
                    <div style={{ padding: 20 }}>
                      <div style={{ height: 14, background: '#F9F9F9', borderRadius: 0, marginBottom: 12 }} />
                      <div style={{ height: 20, background: '#F9F9F9', borderRadius: 0, width: '60%' }} />
                    </div>
                    <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '100px 0' }}>
                <p style={{ fontSize: 48, marginBottom: 24, fontFamily: 'DM Serif Display' }}>No Results</p>
                <p style={{ color: '#666', fontSize: 16 }}>We couldn't find any products matching your criteria.</p>
                <button onClick={resetFilters} style={{ marginTop: 24, background: '#111', color: '#fff', border: 'none', borderRadius: 0, padding: '12px 32px', cursor: 'pointer', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Clear Filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map(p => <ProductCard key={p._id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

const labelSt = { display: 'block', fontSize: 11, fontWeight: 500, color: '#666', marginBottom: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }
const filterInput = { width: '100%', background: '#F9F9F9', border: '1px solid #CCCCCC', borderRadius: 0, padding: '10px 12px', color: '#111', fontSize: 13, fontFamily: 'Inter, sans-serif', outline: 'none' }
