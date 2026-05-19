const express = require('express')
const router = express.Router()
const Booking = require('../models/Booking')
const Service = require('../models/Service')
const Product = require('../models/Product')
const auth = require('../middleware/authMiddleware')

// All booking routes require auth
router.use(auth)

// POST /api/bookings — Create booking
router.post('/', async (req, res) => {
  try {
    const { itemId, itemType, startDate, endDate } = req.body

    if (!itemId || !itemType || !startDate || !endDate) {
      return res.status(400).json({ message: 'itemId, itemType, startDate, endDate are required' })
    }

    const start = new Date(startDate)
    const end = new Date(endDate)
    if (end <= start) return res.status(400).json({ message: 'End date must be after start date' })

    // Calculate cost
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    let totalCost = 0
    if (itemType === 'service') {
      const svc = await Service.findById(itemId)
      if (!svc) return res.status(404).json({ message: 'Service not found' })
      totalCost = svc.rate * days
    } else if (itemType === 'product') {
      const prod = await Product.findById(itemId)
      if (!prod) return res.status(404).json({ message: 'Product not found' })
      totalCost = prod.rentalRate * days
    }

    const booking = await Booking.create({
      user: req.user.id,
      itemId, itemType, startDate: start, endDate: end,
      totalCost,
      status: 'pending',
    })

    res.status(201).json(booking)
  } catch (err) {
    console.error('Booking error:', err)
    res.status(500).json({ message: 'Server error' })
  }
})

// GET /api/bookings/my — Get user's own bookings
router.get('/my', async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 })
    res.json(bookings)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// PATCH /api/bookings/:id/cancel
router.patch('/:id/cancel', async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user.id })
    if (!booking) return res.status(404).json({ message: 'Booking not found' })
    if (booking.status === 'completed') return res.status(400).json({ message: 'Cannot cancel completed booking' })

    booking.status = 'cancelled'
    await booking.save()
    res.json(booking)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// GET /api/bookings/:id
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user.id })
    if (!booking) return res.status(404).json({ message: 'Booking not found' })
    res.json(booking)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
