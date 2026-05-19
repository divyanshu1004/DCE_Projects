const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['electrical', 'mechanical', 'plumbing'], required: true },
  brand: { type: String },
  description: { type: String },
  price: { type: Number, required: true },    // selling price
  mrp: { type: Number },                       // MRP for discount display
  rentalRate: { type: Number, default: 0 },    // kept for backwards compat
  rateUnit: { type: String, default: 'unit' },
  imageUrl: { type: String },
  rating: { type: Number, default: 4.5, min: 1, max: 5 },
  reviewCount: { type: Number, default: 0 },
  available: { type: Boolean, default: true },
  stock: { type: Number, default: 100 },
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)
