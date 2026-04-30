import { useState } from 'react'
import { Sparkles, MapPin, Calendar, Wallet, Users, Heart, Mountain, Waves, Check, Download, RefreshCw, AlertCircle, Bot, CloudRain, ThumbsDown, Lightbulb, Star } from 'lucide-react'
import { tripsAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const DESTINATIONS = [
  'Goa', 'Ladakh', 'Manali', 'Pondicherry', 'Shimla', 'Munnar',
  'Darjeeling', 'Jaipur', 'Udaipur', 'Varanasi', 'Agra', 'Hampi',
  'Rishikesh', 'Coorg', 'Gangtok', 'Delhi', 'Mumbai', 'Hyderabad',
  'Andaman & Nicobar', 'Kerala Backwaters', 'Ooty', 'Kodaikanal',
  'Mysuru', 'Alleppey', 'Varkala', 'Kasol', 'Spiti Valley'
]

const TRAVEL_TYPES = [
  { value: 'adventure', label: 'Adventure', icon: Mountain },
  { value: 'romantic', label: 'Romantic', icon: Heart },
  { value: 'family', label: 'Family', icon: Users },
  { value: 'solo', label: 'Solo', icon: Star },
  { value: 'spiritual', label: 'Spiritual', icon: Sparkles },
  { value: 'beach', label: 'Beach', icon: Waves },
]

const PREFERENCES = ['Trekking', 'Food Tours', 'Nightlife', 'Museums', 'Shopping', 'Yoga', 'Wildlife', 'Photography', 'Local Culture', 'Backpacking']

const PLAN_TYPES = [
  { value: 'budget', label: 'Budget', color: 'from-green-500 to-emerald-400', border: 'border-green-500/40', text: 'text-green-400', badge: 'Most Popular', desc: 'Hostels, local buses, street food' },
  { value: 'deluxe', label: 'Deluxe', color: 'from-blue-500 to-indigo-400', border: 'border-blue-500/40', text: 'text-blue-400', badge: 'Best Value', desc: '3-star stays, AC transport, restaurants' },
  { value: 'luxury', label: 'Luxury', color: 'from-purple-500 to-violet-400', border: 'border-purple-500/40', text: 'text-purple-400', badge: 'Premium', desc: '5-star resorts, private cars, fine dining' },
  { value: 'jackpot', label: 'Jackpot', color: 'from-amber-500 to-orange-400', border: 'border-amber-500/40', text: 'text-amber-400', badge: 'Ultimate', desc: 'Palace hotels, charters, exclusive experiences' },
]

const WEATHER_CONDITIONS = ['Heavy Rain', 'Extreme Heat', 'Fog/Low Visibility', 'Strong Winds', 'Cold Wave', 'Thunderstorms']

function ItineraryDisplay({ text, planType, form, tripId }) {
  const [showWeather, setShowWeather] = useState(false)
  const [showAlternative, setShowAlternative] = useState(false)
  const [weatherCondition, setWeatherCondition] = useState('')
  const [weatherResult, setWeatherResult] = useState('')
  const [altActivity, setAltActivity] = useState('')
  const [altReason, setAltReason] = useState('')
  const [altResult, setAltResult] = useState('')
  const [loading, setLoading] = useState(false)

  const plan = PLAN_TYPES.find(p => p.value === planType) || PLAN_TYPES[0]

  const handleWeatherReschedule = async () => {
    if (!weatherCondition) return
    setLoading(true)
    try {
      const data = await tripsAPI.weatherReschedule({
        destination: form.destination,
        originalActivity: 'sightseeing tour',
        weatherCondition,
        dayNumber: 1
      })
      setWeatherResult(data.suggestion)
    } catch (err) {
      setWeatherResult('Failed to get suggestions. Please try again.')
    }
    setLoading(false)
  }

  const handleAlternative = async () => {
    if (!altActivity) return
    setLoading(true)
    try {
      const data = await tripsAPI.getAlternative({
        destination: form.destination,
        dislikedActivity: altActivity,
        reason: altReason,
        travelType: form.travelType,
        budget: Math.round(parseInt(form.budget) / parseInt(form.duration))
      })
      setAltResult(data.alternatives)
    } catch (err) {
      setAltResult('Failed to get alternatives. Please try again.')
    }
    setLoading(false)
  }

  const handleDownload = () => {
    const content = `NavAIgate Trip Itinerary\n========================\nDestination: ${form.destination}\nDuration: ${form.duration} days\nBudget: ₹${parseInt(form.budget).toLocaleString()}\nTravel Type: ${form.travelType}\nPlan: ${planType}\n\n${text}`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `navaigate-${form.destination.toLowerCase().replace(/\s+/g, '-')}-itinerary.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const renderText = (t) => {
    if (!t) return null
    return t.split('\n').map((line, i) => (
      <span key={i}>
        {line.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>
            : part
        )}
        {i < t.split('\n').length - 1 && <br />}
      </span>
    ))
  }

  return (
    <div className="space-y-6">
      {/* Itinerary */}
      <div className={`glass rounded-2xl border ${plan.border} overflow-hidden`}>
        <div className={`bg-gradient-to-r ${plan.color} px-6 py-4 flex items-center justify-between`}>
          <div>
            <h3 className="font-display font-bold text-white text-xl">{plan.label} Plan — {form.destination}</h3>
            <p className="text-white/80 text-sm">{form.duration} days · {form.groupSize} person(s) · ₹{parseInt(form.budget).toLocaleString()} budget</p>
          </div>
          <button onClick={handleDownload}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all">
            <Download className="w-4 h-4" /> Download
          </button>
        </div>
        <div className="p-6 text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
          {renderText(text)}
        </div>
      </div>

      {/* AI Tools Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Weather Rescheduling */}
        <div className="glass rounded-2xl border border-blue-500/20 p-5">
          <button onClick={() => setShowWeather(!showWeather)}
            className="flex items-center gap-2 text-blue-400 font-semibold mb-3 w-full text-left hover:text-blue-300 transition-colors">
            <CloudRain className="w-4 h-4" />
            Weather-Based Rescheduling
            <span className="ml-auto text-xs text-slate-500">{showWeather ? 'Hide ▲' : 'Show ▼'}</span>
          </button>
          {showWeather && (
            <div className="space-y-3">
              <p className="text-slate-400 text-xs">Select weather condition to get alternative activities</p>
              <select value={weatherCondition} onChange={e => setWeatherCondition(e.target.value)} className="input-field text-sm">
                <option value="">Select weather condition...</option>
                {WEATHER_CONDITIONS.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
              <button onClick={handleWeatherReschedule} disabled={!weatherCondition || loading}
                className="btn-primary w-full py-2 text-sm flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Getting suggestions...</> : <><Sparkles className="w-4 h-4" /> Get Alternatives</>}
              </button>
              {weatherResult && (
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 text-slate-300 text-xs leading-relaxed whitespace-pre-wrap">
                  {renderText(weatherResult)}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Alternative Activity Suggester */}
        <div className="glass rounded-2xl border border-amber-500/20 p-5">
          <button onClick={() => setShowAlternative(!showAlternative)}
            className="flex items-center gap-2 text-amber-400 font-semibold mb-3 w-full text-left hover:text-amber-300 transition-colors">
            <ThumbsDown className="w-4 h-4" />
            Don't Like an Activity?
            <span className="ml-auto text-xs text-slate-500">{showAlternative ? 'Hide ▲' : 'Show ▼'}</span>
          </button>
          {showAlternative && (
            <div className="space-y-3">
              <input value={altActivity} onChange={e => setAltActivity(e.target.value)}
                placeholder="Activity you want to skip (e.g. Beach walk)" className="input-field text-sm" />
              <input value={altReason} onChange={e => setAltReason(e.target.value)}
                placeholder="Why? (optional)" className="input-field text-sm" />
              <button onClick={handleAlternative} disabled={!altActivity || loading}
                className="w-full py-2 text-sm flex items-center justify-center gap-2 disabled:opacity-50 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-xl border border-amber-500/30 transition-all">
                {loading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Finding alternatives...</> : <><Lightbulb className="w-4 h-4" /> Suggest Alternatives</>}
              </button>
              {altResult && (
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 text-slate-300 text-xs leading-relaxed whitespace-pre-wrap">
                  {renderText(altResult)}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function TripPlanner() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ destination: '', budget: '', duration: '5', groupSize: '2', travelType: 'adventure', preferences: [] })
  const [selectedPlan, setSelectedPlan] = useState('budget')
  const [isGenerating, setIsGenerating] = useState(false)
  const [itineraries, setItineraries] = useState({})
  const [activeItinerary, setActiveItinerary] = useState(null)
  const [tripIds, setTripIds] = useState({})
  const [error, setError] = useState('')

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const togglePref = (p) => setForm(prev => ({
    ...prev,
    preferences: prev.preferences.includes(p) ? prev.preferences.filter(x => x !== p) : [...prev.preferences, p]
  }))

  const handleGenerate = async () => {
    if (!form.destination || !form.budget || !form.duration) return
    setIsGenerating(true)
    setError('')
    setItineraries({})
    setActiveItinerary(null)

    // Generate all 4 plan types
    const planTypes = ['budget', 'deluxe', 'luxury', 'jackpot']
    const results = {}
    const ids = {}

    // Generate in parallel
    await Promise.allSettled(
      planTypes.map(async (planType) => {
        try {
          const data = await tripsAPI.generate({ ...form, planType })
          results[planType] = data.itinerary
          ids[planType] = data.tripId
        } catch (err) {
          results[planType] = `Failed to generate ${planType} plan. Please try regenerating.`
        }
      })
    )

    setItineraries(results)
    setTripIds(ids)
    setSelectedPlan('budget')
    setActiveItinerary('budget')
    setIsGenerating(false)
    setStep(2)
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-tag mx-auto w-fit"><Sparkles className="w-3.5 h-3.5" /> AI Trip Planner</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Plan Your Perfect <span className="gradient-text">India Trip</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Tell us your preferences and get 4 AI-personalized plans instantly — from budget backpacking to luxury splurge.
          </p>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {[{ n: 1, label: 'Your Preferences' }, { n: 2, label: 'AI Generated Plans' }].map(({ n, label }) => (
            <div key={n} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step >= n ? 'bg-teal-500 text-navy-950' : 'bg-navy-800 text-slate-500 border border-slate-700'
              }`}>
                {step > n ? <Check className="w-4 h-4" /> : n}
              </div>
              <span className={`text-sm ${step >= n ? 'text-white' : 'text-slate-500'}`}>{label}</span>
              {n < 2 && <div className={`w-16 h-px ${step > n ? 'bg-teal-500' : 'bg-slate-700'}`} />}
            </div>
          ))}
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-6 flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
          </div>
        )}

        {/* Step 1: Form */}
        {step === 1 && (
          <div className="max-w-2xl mx-auto">
            <div className="card space-y-6">
              <div>
                <label className="label flex items-center gap-2"><MapPin className="w-4 h-4 text-teal-400" /> Destination</label>
                <select value={form.destination} onChange={e => update('destination', e.target.value)} className="input-field">
                  <option value="">Select a destination...</option>
                  {DESTINATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label flex items-center gap-2"><Wallet className="w-4 h-4 text-amber-400" /> Budget (₹)</label>
                  <input type="number" value={form.budget} onChange={e => update('budget', e.target.value)}
                    placeholder="e.g. 15000" className="input-field" />
                </div>
                <div>
                  <label className="label flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-400" /> Duration (days)</label>
                  <input type="number" min="1" max="30" value={form.duration} onChange={e => update('duration', e.target.value)}
                    placeholder="e.g. 5" className="input-field" />
                </div>
              </div>

              <div>
                <label className="label flex items-center gap-2"><Users className="w-4 h-4 text-purple-400" /> Group Size</label>
                <input type="number" min="1" max="20" value={form.groupSize} onChange={e => update('groupSize', e.target.value)} className="input-field" />
              </div>

              <div>
                <label className="label">Travel Style</label>
                <div className="grid grid-cols-3 gap-2">
                  {TRAVEL_TYPES.map(({ value, label, icon: Icon }) => (
                    <button key={value} onClick={() => update('travelType', value)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all text-sm font-medium ${
                        form.travelType === value
                          ? 'border-teal-500/50 bg-teal-500/10 text-teal-400'
                          : 'border-slate-700/50 bg-navy-800/50 text-slate-400 hover:border-slate-600 hover:text-slate-300'
                      }`}>
                      <Icon className="w-5 h-5" />{label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="label">Interests (select any)</label>
                <div className="flex flex-wrap gap-2">
                  {PREFERENCES.map(pref => (
                    <button key={pref} onClick={() => togglePref(pref)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        form.preferences.includes(pref)
                          ? 'border-teal-500/50 bg-teal-500/10 text-teal-400'
                          : 'border-slate-700/50 text-slate-400 hover:border-slate-600'
                      }`}>
                      {pref}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={handleGenerate}
                disabled={!form.destination || !form.budget || !form.duration || isGenerating}
                className="w-full btn-primary py-4 text-base flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed glow-teal">
                {isGenerating ? (
                  <><RefreshCw className="w-5 h-5 animate-spin" /> Generating AI Plans (takes ~15 seconds)...</>
                ) : (
                  <><Sparkles className="w-5 h-5" /> Generate 4 AI Plans with Groq</>
                )}
              </button>

              <div className="flex items-center gap-2 text-slate-500 text-xs text-center justify-center">
                <Bot className="w-3.5 h-3.5" /> Powered by Groq LLM · Plans saved to your account
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Generated Plans */}
        {step === 2 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl font-bold text-white mb-2">
                Your AI Plans for <span className="gradient-text">{form.destination}</span>
              </h2>
              <p className="text-slate-400 text-sm">{form.duration} days · {form.groupSize} person(s) · ₹{parseInt(form.budget).toLocaleString()} budget</p>
              <button onClick={() => { setStep(1); setItineraries({}) }} className="btn-ghost text-sm mt-3">← Modify Preferences</button>
            </div>

            {/* Plan Type Tabs */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {PLAN_TYPES.map(plan => (
                <button key={plan.value} onClick={() => { setSelectedPlan(plan.value); setActiveItinerary(plan.value) }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all font-medium text-sm ${
                    selectedPlan === plan.value
                      ? `bg-gradient-to-r ${plan.color} text-white border-transparent shadow-lg`
                      : `${plan.border} ${plan.text} hover:bg-white/5`
                  }`}>
                  {plan.label}
                  <span className="text-xs opacity-70">{plan.badge}</span>
                </button>
              ))}
            </div>

            {/* Active Itinerary */}
            {activeItinerary && itineraries[activeItinerary] ? (
              <ItineraryDisplay
                text={itineraries[activeItinerary]}
                planType={activeItinerary}
                form={form}
                tripId={tripIds[activeItinerary]}
              />
            ) : (
              <div className="glass rounded-2xl p-12 text-center">
                <RefreshCw className="w-8 h-8 text-teal-400 animate-spin mx-auto mb-4" />
                <p className="text-slate-400">Generating your personalized itinerary...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
