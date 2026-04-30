const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const User = require('../models/User')
const { callGroq, TRAVEL_SYSTEM_PROMPT } = require('../services/groq')

// POST /api/chat/message - Send message and get LLM response
router.post('/message', authMiddleware, async (req, res) => {
  try {
    const { message, history = [] } = req.body
    if (!message) return res.status(400).json({ error: 'Message is required' })

    // Build conversation history for context (last 10 messages)
    const conversationMessages = history.slice(-10).map(msg => ({
      role: msg.role === 'bot' ? 'assistant' : 'user',
      content: msg.content
    }))
    conversationMessages.push({ role: 'user', content: message })

    const response = await callGroq(conversationMessages, TRAVEL_SYSTEM_PROMPT, 1500)

    // Save to user's chat history in MongoDB
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        chatHistory: {
          $each: [
            { role: 'user', content: message, timestamp: new Date() },
            { role: 'assistant', content: response, timestamp: new Date() }
          ]
        }
      }
    })

    res.json({ response })
  } catch (err) {
    console.error('Chat error:', err)
    res.status(500).json({ error: 'Failed to get AI response. Please try again.' })
  }
})

// GET /api/chat/history - Get user's chat history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('chatHistory')
    // Return last 50 messages
    const history = (user.chatHistory || []).slice(-50)
    res.json({ history })
  } catch (err) {
    res.status(500).json({ error: 'Failed to get chat history' })
  }
})

// DELETE /api/chat/history - Clear chat history
router.delete('/history', authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { $set: { chatHistory: [] } })
    res.json({ message: 'Chat history cleared' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear history' })
  }
})

module.exports = router
