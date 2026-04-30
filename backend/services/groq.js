const https = require('https')

const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_MODEL = 'llama-3.3-70b-versatile'

async function callGroq(messages, systemPrompt, maxTokens = 1500) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: GROQ_MODEL,
      max_tokens: maxTokens,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ]
    })

    const options = {
      hostname: 'api.groq.com',
      path: '/openai/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Length': Buffer.byteLength(body)
      }
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data)
          if (parsed.error) {
            reject(new Error(parsed.error.message || 'Groq API error'))
          } else {
            resolve(parsed.choices[0].message.content)
          }
        } catch (e) {
          reject(new Error('Failed to parse Groq response'))
        }
      })
    })

    req.on('error', reject)
    req.write(body)
    req.end()
  })
}

const TRAVEL_SYSTEM_PROMPT = `You are NavAI, an expert Indian travel assistant for the NavAIgate platform. You specialize in travel planning across India.

Your capabilities:
- Generate personalized day-by-day itineraries with specific timings
- Provide weather-based rescheduling suggestions
- Recommend destinations based on user preferences  
- Optimize budgets in INR (₹) with specific cost breakdowns
- Answer travel questions conversationally
- Suggest alternatives when users dislike activities
- Explain WHY you chose specific activities
- Give budget optimization tips when users are over budget

Guidelines:
- Always use Indian rupees (₹) for costs
- Be specific with real place names, restaurants, and activities in India
- Format responses with clear sections using **bold** for headers
- Keep responses helpful, friendly and conversational
- Include practical tips (best time to visit, what to pack, local customs)
- When generating itineraries, be very specific with timings and activities
- For budget advice, give concrete numbers and alternatives`

module.exports = { callGroq, TRAVEL_SYSTEM_PROMPT }
