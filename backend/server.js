require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const app = express()

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:4173', 'http://localhost:5000'],
  credentials: true
}))
app.use(express.json())

// API Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/chat', require('./routes/chat'))
app.use('/api/trips', require('./routes/trips'))
app.use('/api/budget', require('./routes/budget'))

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'NavAIgate backend running',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    groq: process.env.GROQ_API_KEY ? 'configured' : 'missing'
  })
})

// Serve frontend build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
  })
}

const PORT = process.env.PORT || 5000

const mongoURI = process.env.MONGO_URI

console.log('🔗 Connecting to MongoDB Atlas...')

mongoose.connect(mongoURI, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
})
  .then(() => {
    console.log('✅ MongoDB connected to navaigate database')
    console.log('✅ Groq API key:', process.env.GROQ_API_KEY ? 'Configured' : 'MISSING')
    app.listen(PORT, () => {
      console.log('\n🚀 NavAIgate backend running on http://localhost:' + PORT)
      console.log('   Health check: http://localhost:' + PORT + '/api/health\n')
    })
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message)
    console.error('\nTROUBLESHOOTING:')
    console.error('  1. Go to https://cloud.mongodb.com')
    console.error('  2. Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)')
    console.error('  3. Restart this server\n')
    process.exit(1)
  })

module.exports = app
