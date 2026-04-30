const mongoose = require('mongoose')

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tripName: { type: String, default: 'My Trip' },
  totalBudget: { type: Number, default: 0 },
  expenses: [{
    desc: String,
    amount: Number,
    category: String,
    date: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Budget', budgetSchema)
