const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const Trip = require('../models/Trip')
const { callGroq, TRAVEL_SYSTEM_PROMPT } = require('../services/groq')

// POST /api/trips/generate - Generate AI itinerary
router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const { destination, duration, budget, travelType, groupSize, preferences, planType } = req.body
    if (!destination) return res.status(400).json({ error: 'Destination is required' })

    const prompt = `Generate a detailed ${duration || 5}-day travel itinerary for:
- Destination: ${destination}
- Duration: ${duration || 5} days
- Total Budget: ₹${budget || 10000}
- Travel Type: ${travelType || 'leisure'}
- Group Size: ${groupSize || 2} people
- Preferences: ${preferences?.join(', ') || 'general sightseeing'}
- Plan Level: ${planType || 'budget'} (budget/deluxe/luxury/jackpot)

Please provide:
1. A day-by-day itinerary with specific timings (Morning/Afternoon/Evening)
2. Specific restaurant recommendations with estimated costs in ₹
3. Transportation details between places
4. Accommodation suggestions matching the plan level
5. Total cost breakdown by category
6. 3 pro tips specific to this destination
7. Best time to visit and weather note
8. Why you chose these specific activities (explain your decisions)

Format the response clearly with day headers and bullet points.`

    const itineraryText = await callGroq(
      [{ role: 'user', content: prompt }],
      TRAVEL_SYSTEM_PROMPT,
      2000
    )

    // Save trip to MongoDB
    const trip = new Trip({
      userId: req.user._id,
      destination,
      duration: parseInt(duration) || 5,
      budget: parseInt(budget) || 10000,
      travelType,
      groupSize: parseInt(groupSize) || 2,
      preferences: preferences || [],
      itinerary: { text: itineraryText, generatedAt: new Date() },
      planType: planType || 'budget'
    })
    await trip.save()

    res.json({ itinerary: itineraryText, tripId: trip._id })
  } catch (err) {
    console.error('Trip generation error:', err)
    res.status(500).json({ error: 'Failed to generate itinerary. Please try again.' })
  }
})

// POST /api/trips/weather-reschedule - Weather-based rescheduling
router.post('/weather-reschedule', authMiddleware, async (req, res) => {
  try {
    const { destination, originalActivity, weatherCondition, dayNumber } = req.body

    const prompt = `The weather in ${destination} has changed to: ${weatherCondition}.
The originally planned activity for Day ${dayNumber || 1} was: "${originalActivity}"

Please suggest 3 alternative indoor/weather-appropriate activities that:
1. Fit the weather condition
2. Are specific to ${destination}
3. Include estimated cost in ₹
4. Explain why each alternative is a good choice given the weather

Keep it concise and practical.`

    const suggestion = await callGroq(
      [{ role: 'user', content: prompt }],
      TRAVEL_SYSTEM_PROMPT,
      800
    )

    res.json({ suggestion })
  } catch (err) {
    res.status(500).json({ error: 'Failed to get weather suggestions' })
  }
})

// POST /api/trips/alternative - Get alternative activity suggestion
router.post('/alternative', authMiddleware, async (req, res) => {
  try {
    const { destination, dislikedActivity, reason, travelType, budget } = req.body

    const prompt = `A traveler in ${destination} doesn't want to do: "${dislikedActivity}"
Their reason: "${reason || 'Just want something different'}"
Travel style: ${travelType || 'general'}
Budget per activity: ₹${budget || 500}

Suggest 3 better alternatives with:
- Why this alternative is better for them
- Specific location/name in ${destination}
- Estimated cost in ₹
- Best time to go`

    const alternatives = await callGroq(
      [{ role: 'user', content: prompt }],
      TRAVEL_SYSTEM_PROMPT,
      800
    )

    res.json({ alternatives })
  } catch (err) {
    res.status(500).json({ error: 'Failed to get alternatives' })
  }
})

// POST /api/trips/recommend - Destination recommendation
router.post('/recommend', authMiddleware, async (req, res) => {
  try {
    const { preferences, budget, duration, travelType, month } = req.body

    const prompt = `Recommend the top 5 Indian travel destinations for:
- Preferences: ${preferences?.join(', ') || 'general tourism'}
- Budget: ₹${budget || 15000} total
- Duration: ${duration || 5} days
- Travel Type: ${travelType || 'leisure'}
- Travel Month: ${month || 'any time'}

For each destination provide:
1. Why it matches their preferences
2. Estimated total cost for their budget
3. Top 3 must-do activities
4. Best accommodation option in their budget`

    const recommendations = await callGroq(
      [{ role: 'user', content: prompt }],
      TRAVEL_SYSTEM_PROMPT,
      1200
    )

    res.json({ recommendations })
  } catch (err) {
    res.status(500).json({ error: 'Failed to get recommendations' })
  }
})

// GET /api/trips - Get user's trips
router.get('/', authMiddleware, async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user._id }).sort({ createdAt: -1 }).limit(20)
    res.json({ trips })
  } catch (err) {
    res.status(500).json({ error: 'Failed to get trips' })
  }
})

// DELETE /api/trips/:id - Delete a trip
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Trip.findOneAndDelete({ _id: req.params.id, userId: req.user._id })
    res.json({ message: 'Trip deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete trip' })
  }
})

module.exports = router
