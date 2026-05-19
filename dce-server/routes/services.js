const express = require('express')
const router = express.Router()
const Service = require('../models/Service')
const auth = require('../middleware/authMiddleware')

// GET /api/services — Public
router.get('/', async (req, res) => {
  try {
    const { type, available } = req.query
    const filter = {}
    if (type) filter.type = type
    if (available === 'true') filter.available = true
    const services = await Service.find(filter).sort({ createdAt: -1 })
    res.json(services)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// GET /api/services/:id — Public
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
    if (!service) return res.status(404).json({ message: 'Service not found' })
    res.json(service)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// POST /api/services — Admin only (protected for future use)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' })
    const service = await Service.create(req.body)
    res.status(201).json(service)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
