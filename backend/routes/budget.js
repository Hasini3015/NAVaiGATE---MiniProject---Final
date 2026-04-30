const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const Budget = require('../models/Budget')
const { callGroq, TRAVEL_SYSTEM_PROMPT } = require('../services/groq')

// GET /api/budget - Get user's budget data
router.get('/', authMiddleware, async (req, res) => {
  try {
    let budget = await Budget.findOne({ userId: req.user._id }).sort({ updatedAt: -1 })
    if (!budget) {
      budget = new Budget({ userId: req.user._id, totalBudget: 0, expenses: [] })
      await budget.save()
    }
    res.json({ budget })
  } catch (err) {
    res.status(500).json({ error: 'Failed to get budget' })
  }
})

// POST /api/budget/setup - Create or update budget
router.post('/setup', authMiddleware, async (req, res) => {
  try {
    const { totalBudget, tripName } = req.body
    let budget = await Budget.findOne({ userId: req.user._id })
    if (!budget) {
      budget = new Budget({ userId: req.user._id, totalBudget, tripName: tripName || 'My Trip', expenses: [] })
    } else {
      budget.totalBudget = totalBudget
      if (tripName) budget.tripName = tripName
      budget.updatedAt = new Date()
    }
    await budget.save()
    res.json({ budget })
  } catch (err) {
    res.status(500).json({ error: 'Failed to update budget' })
  }
})

// POST /api/budget/expense - Add expense
router.post('/expense', authMiddleware, async (req, res) => {
  try {
    const { desc, amount, category } = req.body
    if (!desc || !amount) return res.status(400).json({ error: 'Description and amount required' })

    let budget = await Budget.findOne({ userId: req.user._id })
    if (!budget) {
      budget = new Budget({ userId: req.user._id, totalBudget: 0, expenses: [] })
    }

    budget.expenses.push({ desc, amount: parseFloat(amount), category: category || 'other', date: new Date() })
    budget.updatedAt = new Date()
    await budget.save()

    res.json({ budget })
  } catch (err) {
    res.status(500).json({ error: 'Failed to add expense' })
  }
})

// DELETE /api/budget/expense/:expenseId - Remove expense
router.delete('/expense/:expenseId', authMiddleware, async (req, res) => {
  try {
    const budget = await Budget.findOne({ userId: req.user._id })
    if (!budget) return res.status(404).json({ error: 'Budget not found' })

    budget.expenses = budget.expenses.filter(e => e._id.toString() !== req.params.expenseId)
    budget.updatedAt = new Date()
    await budget.save()

    res.json({ budget })
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove expense' })
  }
})

// POST /api/budget/optimize - LLM budget optimization suggestions
router.post('/optimize', authMiddleware, async (req, res) => {
  try {
    const { totalBudget, spent, expenses, destination } = req.body

    const expenseSummary = expenses?.map(e => `${e.desc}: ₹${e.amount} (${e.category})`).join(', ') || 'No expenses tracked yet'

    const prompt = `A traveler in ${destination || 'India'} is ${spent > totalBudget ? 'OVER budget' : 'approaching their budget limit'}.
Total Budget: ₹${totalBudget}
Amount Spent: ₹${spent}
Remaining: ₹${totalBudget - spent}
Expenses: ${expenseSummary}

Please provide:
1. Analysis of where they're spending the most
2. 5 specific money-saving tips for their situation
3. Cheaper alternatives for their top expense categories
4. How they can save ₹${Math.abs(totalBudget - spent) > 0 ? Math.min(2000, Math.abs(totalBudget - spent)) : 1000} in the remaining trip
5. A revised daily budget recommendation`

    const suggestion = await callGroq(
      [{ role: 'user', content: prompt }],
      TRAVEL_SYSTEM_PROMPT,
      1000
    )

    res.json({ suggestion })
  } catch (err) {
    res.status(500).json({ error: 'Failed to get budget suggestions' })
  }
})

module.exports = router
