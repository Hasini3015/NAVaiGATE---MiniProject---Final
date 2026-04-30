# NavAIgate — AI-Powered Travel App

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account with IP Whitelist configured

---

## ⚠️ IMPORTANT: MongoDB Atlas IP Whitelist

Before starting, add your IP to MongoDB Atlas:
1. Go to **https://cloud.mongodb.com**
2. Click **Network Access** → **Add IP Address**
3. Select **Allow Access from Anywhere** (0.0.0.0/0) or add your specific IP
4. Click **Confirm**

---

## 📦 Setup

### Terminal 1 — Backend (Express + MongoDB + Groq)
```bash
cd navaigate-backend
npm install
npm start
```
Backend runs at: http://localhost:5000
Health check: http://localhost:5000/api/health

### Terminal 2 — Frontend (React + Vite)
```bash
cd navaigate
npm install
npm run dev
```
Frontend runs at: http://localhost:5173

---

## 🔧 Configuration

All config is in `navaigate-backend/.env`:
```


---

## ✅ Features

### Authentication (MongoDB)
- Sign Up / Sign In → saved to MongoDB `users` collection
- JWT token-based sessions
- Password hashed with bcrypt

### AI Chatbot (Groq LLM)
- Real-time travel Q&A powered by `llama-3.3-70b-versatile`
- Conversation history saved to MongoDB per user
- Personalized to Indian travel

### Trip Planner (Groq LLM)
- Generates 4 plan tiers: Budget / Deluxe / Luxury / Jackpot
- Day-by-day itineraries with real places and costs in ₹
- Weather-based rescheduling suggestions
- Alternative activity suggester
- All trips saved to MongoDB `trips` collection

### Budget Tracker (MongoDB)
- Expenses synced to MongoDB in real-time
- Category breakdown charts
- AI budget optimization suggestions via Groq
- Over-budget alerts

---

## 🗄️ MongoDB Collections

- **users** — user accounts, hashed passwords, chat history
- **trips** — generated itineraries per user
- **budgets** — expense tracking per user

---

## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/signup | No | Create account |
| POST | /api/auth/signin | No | Sign in |
| GET | /api/auth/me | Yes | Get current user |
| POST | /api/chat/message | Yes | Send message to Groq LLM |
| GET | /api/chat/history | Yes | Get chat history |
| DELETE | /api/chat/history | Yes | Clear chat history |
| POST | /api/trips/generate | Yes | Generate AI itinerary |
| POST | /api/trips/weather-reschedule | Yes | Get weather alternatives |
| POST | /api/trips/alternative | Yes | Get activity alternatives |
| POST | /api/trips/recommend | Yes | Get destination recommendations |
| GET | /api/trips | Yes | Get user's trips |
| GET | /api/budget | Yes | Get budget data |
| POST | /api/budget/setup | Yes | Set total budget |
| POST | /api/budget/expense | Yes | Add expense |
| DELETE | /api/budget/expense/:id | Yes | Remove expense |
| POST | /api/budget/optimize | Yes | Get AI optimization tips |
