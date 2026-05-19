const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const auth = require('../middleware/authMiddleware')

// GET /api/products — Public
router.get('/', async (req, res) => {
  try {
    const { category, available } = req.query
    const filter = {}
    if (category) filter.category = category
    if (available === 'true') filter.available = true
    const products = await Product.find(filter).sort({ createdAt: -1 })
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// GET /api/products/:id — Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// POST /api/products — Admin only
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' })
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
