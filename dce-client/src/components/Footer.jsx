import { Link } from 'react-router-dom'
import { Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: '#FFFFFF', borderTop: '1px solid #CCCCCC', padding: '80px 24px 40px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 400, fontFamily: 'DM Serif Display', color: '#111', lineHeight: 1 }}>DCE Projects</div>
                <div style={{ fontSize: 9, color: '#666', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>MEP Consultants & Suppliers</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: '#666', lineHeight: 1.8, maxWidth: 220 }}>
              Distinct Compliance Engineering. Supplying curated, high-end mechanical, electrical, and plumbing fixtures.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 500, color: '#111', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>Quick Links</h4>
            {[['/', 'Home'], ['/products', 'Catalog'], ['/services', 'Services'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([to, label]) => (
              <Link key={to} to={to} style={{ display: 'block', color: '#666', textDecoration: 'none', fontSize: 13, marginBottom: 12, transition: 'color 0.3s' }}
                onMouseEnter={e => e.target.style.color = '#111'}
                onMouseLeave={e => e.target.style.color = '#666'}
              >{label}</Link>
            ))}
          </div>

          {/* MEP Categories */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 500, color: '#111', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>Collections</h4>
            {[
              ' Electrical',
              ' Mechanical',
              ' Plumbing',
              ' Hardware',
              ' Lighting',
              ' Fixtures',
            ].map(s => (
              <div key={s} style={{ color: '#666', fontSize: 13, marginBottom: 12 }}>{s}</div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 500, color: '#111', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>Contact</h4>
            {[
              [<Mail size={14} />, 'services.dce@gmail.com', 'mailto:services.dce@gmail.com'],
              [<MapPin size={14} />, 'RTO Road, Haldwani, Uttarakhand', null],
            ].map(([icon, text, href], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12, fontSize: 13 }}>
                <span style={{ color: '#111', marginTop: 2, flexShrink: 0 }}>{icon}</span>
                {href
                  ? <a href={href} style={{ color: '#666', textDecoration: 'none', transition: 'color 0.3s' }}
                    onMouseEnter={e => e.target.style.color = '#111'}
                    onMouseLeave={e => e.target.style.color = '#666'}
                  >{text}</a>
                  : <span style={{ color: '#666' }}>{text}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid #CCCCCC', paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <span style={{ fontSize: 12, color: '#999' }}>© 2026 DCE Projects. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service', 'Returns'].map(l => (
              <span key={l} style={{ fontSize: 12, color: '#999', cursor: 'pointer' }}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
