const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  orderId: { type: String, required: true, unique: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    qty: { type: Number, default: 1 },
    price: Number,
  }],
  shipping: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
  },
  paymentMethod: { type: String, enum: ['lago_invoice', 'upi', 'cod'], default: 'lago_invoice' },
  subtotal: Number,
  shippingCost: Number,
  grandTotal: Number,
  lagoInvoiceId: { type: String },
  lagoPaymentUrl: { type: String },
  status: { type: String, enum: ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)
