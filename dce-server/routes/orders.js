const express = require('express')
const router = express.Router()
const axios = require('axios')
const Order = require('../models/Order')
const auth = require('../middleware/authMiddleware')

const lago = axios.create({
  baseURL: process.env.LAGO_API_URL || 'https://api.getlago.com/api/v1',
  headers: {
    Authorization: `Bearer ${process.env.LAGO_API_KEY}`,
    'Content-Type': 'application/json',
  },
})

function genOrderId() {
  const ts = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).substr(2, 4).toUpperCase()
  return `DCE-${ts}-${rand}`
}

// POST /api/orders — Create order + Lago invoice
router.post('/', auth, async (req, res) => {
  try {
    const { items, shipping, paymentMethod, subtotal, shippingCost, grandTotal } = req.body

    if (!items?.length || !shipping?.name || !shipping?.phone) {
      return res.status(400).json({ message: 'Order items and shipping details are required' })
    }

    const orderId = genOrderId()
    let lagoInvoiceId = null
    let lagoPaymentUrl = null

    // Lago invoice creation (only for lago_invoice payment method)
    if (paymentMethod === 'lago_invoice' && process.env.LAGO_API_KEY) {
      try {
        // Step 1: Ensure customer exists in Lago
        await lago.post('/customers', {
          customer: {
            external_id: `dce_${req.user.id}`,
            name: shipping.name,
            email: shipping.email || req.user.email,
            phone: shipping.phone,
            address_line1: shipping.address,
            city: shipping.city,
            state: shipping.state,
            zipcode: shipping.pincode,
            country: 'IN',
            currency: 'INR',
          }
        }).catch(() => {}) // ignore duplicate customer error

        // Step 2: Create one-time invoice
        const invoiceRes = await lago.post('/invoices', {
          invoice: {
            external_customer_id: `dce_${req.user.id}`,
            currency: 'INR',
            fees: items.map(item => ({
              add_on_code: 'mep_product',
              invoice_display_name: item.name,
              unit_amount_cents: Math.round(item.price * 100),
              units: item.qty,
              description: `MEP Tool - ${item.name}`,
            }))
          }
        })

        lagoInvoiceId = invoiceRes.data?.invoice?.lago_id
        lagoPaymentUrl = invoiceRes.data?.invoice?.payment_url || null
      } catch (lagoErr) {
        console.warn('⚠️ Lago invoice creation failed:', lagoErr.response?.data?.message || lagoErr.message)
        // Non-blocking — order still proceeds
      }
    }

    // Save order to DB
    const order = await Order.create({
      user: req.user.id,
      orderId,
      items,
      shipping,
      paymentMethod,
      subtotal,
      shippingCost,
      grandTotal,
      lagoInvoiceId,
      lagoPaymentUrl,
      status: 'pending',
    })

    res.status(201).json({
      orderId,
      invoiceUrl: lagoPaymentUrl,
      paymentRef: lagoInvoiceId,
      status: 'pending',
    })
  } catch (err) {
    console.error('Order creation error:', err)
    res.status(500).json({ message: 'Failed to create order' })
  }
})

// GET /api/orders/my
router.get('/my', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// GET /api/orders/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id, user: req.user.id })
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
