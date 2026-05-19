const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const serviceRoutes = require('./routes/services')
const productRoutes = require('./routes/products')
const bookingRoutes = require('./routes/bookings')
const orderRoutes = require('./routes/orders')

const app = express()

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL,
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    callback(new Error(`CORS blocked: ${origin}`))
  },
  credentials: true,
}))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/products', productRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req, res) => res.json({ status: 'ok', message: 'DCE Projects API is live', company: 'DCE Projects — MEP Consultants & Suppliers' }))
app.get('/api/health', (req, res) => res.json({ status: 'ok', company: 'DCE Projects', timestamp: new Date() }))

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected')
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log(`🚀 DCE Projects API running on port ${PORT}`))
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message)
    process.exit(1)
  })
