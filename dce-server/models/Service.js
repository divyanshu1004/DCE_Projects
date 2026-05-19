const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['labour', 'engineer', 'mistri'], required: true },
  description: { type: String },
  rate: { type: Number, required: true },
  rateUnit: { type: String, default: 'day' },
  imageUrl: { type: String },
  rating: { type: Number, default: 4.8, min: 1, max: 5 },
  available: { type: Boolean, default: true },
  location: { type: String },
}, { timestamps: true })

module.exports = mongoose.model('Service', serviceSchema)
