const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const authMiddleware = require('../middleware/auth')

function generateToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please fill in all fields' })
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' })
    }

    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' })
    }

    const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    const user = new User({ name, email, password, avatar: initials })
    await user.save()

    const token = generateToken(user._id)
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar }
    })
  } catch (err) {
    console.error('Signup error:', err)
    res.status(500).json({ error: 'Server error during signup' })
  }
})

// POST /api/auth/signin
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Please fill in all fields' })
    }

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    user.lastLogin = new Date()
    await user.save()

    const token = generateToken(user._id)
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar }
    })
  } catch (err) {
    console.error('Signin error:', err)
    res.status(500).json({ error: 'Server error during signin' })
  }
})

// GET /api/auth/me
router.get('/me', authMiddleware, async (req, res) => {
  res.json({ user: { id: req.user._id, name: req.user.name, email: req.user.email, avatar: req.user.avatar } })
})

module.exports = router
