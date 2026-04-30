const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  destination: { type: String, required: true },
  duration: Number,
  budget: Number,
  travelType: String,
  groupSize: Number,
  preferences: [String],
  itinerary: { type: mongoose.Schema.Types.Mixed },
  planType: String,
  status: { type: String, enum: ['planned', 'ongoing', 'completed'], default: 'planned' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Trip', tripSchema)
