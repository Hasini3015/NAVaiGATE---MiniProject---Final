import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, User, Bot, Trash2, Copy, Compass, Zap, AlertCircle, RefreshCw } from 'lucide-react'
import { chatAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'

const SUGGESTIONS = [
  'Plan a 5-day trip to Goa for 2 people with ₹20,000 budget',
  'Best time to visit Ladakh and what to pack?',
  'Create a budget itinerary for Manali',
  'Hidden gems in Rajasthan for solo travelers',
  'What are the top beaches in Andaman?',
  'Family-friendly activities in Shimla',
  'Budget tips for Kerala backwaters trip',
  'Suggest alternatives to Taj Mahal in Agra',
]

function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="glass rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
        <div className="typing-dot w-2 h-2 bg-teal-400 rounded-full" />
        <div className="typing-dot w-2 h-2 bg-teal-400 rounded-full" />
        <div className="typing-dot w-2 h-2 bg-teal-400 rounded-full" />
      </div>
    </div>
  )
}

function Message({ msg }) {
  const isUser = msg.role === 'user'
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(msg.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const renderContent = (content) => {
    return content.split('\n').map((line, i) => (
      <span key={i}>
        {line.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>
            : part
        )}
        {i < content.split('\n').length - 1 && <br />}
      </span>
    ))
  }

  return (
    <div className={`flex gap-3 message-enter ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-gradient-to-br from-amber-500 to-orange-500' : 'bg-gradient-to-br from-teal-500 to-blue-500'
      }`}>
        {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
      </div>

      <div className={`group max-w-[80%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-gradient-to-br from-teal-600 to-teal-500 text-white rounded-tr-sm'
            : msg.error
              ? 'bg-red-500/10 border border-red-500/20 text-red-300 rounded-tl-sm'
              : 'glass text-slate-200 rounded-tl-sm'
        }`}>
          {msg.error
            ? <div className="flex items-center gap-2"><AlertCircle className="w-4 h-4 flex-shrink-0" />{msg.content}</div>
            : renderContent(msg.content)
          }
        </div>

        {!isUser && !msg.error && (
          <button onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-slate-600 hover:text-slate-400 text-xs px-2 py-1">
            <Copy className="w-3 h-3" />
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}

        <span className="text-slate-600 text-xs px-1">{msg.time}</span>
      </div>
    </div>
  )
}

export default function ChatBot() {
  const { user } = useAuth()
  const [messages, setMessages] = useState([
    {
      id: 1, role: 'bot',
      content: `Namaste! 🙏 I'm NavAI, your intelligent travel companion for India.\n\nI can help you:\n🗺️ **Plan personalized itineraries** for any Indian destination\n💰 **Budget your trip** with cost breakdowns in ₹\n🌤️ **Weather-based rescheduling** when plans change\n🏨 **Recommend stays** from budget hostels to luxury resorts\n🍛 **Discover local food** and hidden gems\n🔄 **Suggest alternatives** if you dislike an activity\n\nWhat adventure are you planning? Tell me your destination, dates, and budget!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = async (text) => {
    const content = text || input.trim()
    if (!content || isTyping) return

    const userMsg = {
      id: Date.now(), role: 'user', content,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    try {
      // Send to Groq LLM via backend
      const historyForAPI = messages.slice(-8) // last 8 messages for context
      const data = await chatAPI.sendMessage(content, historyForAPI)

      setIsTyping(false)
      setMessages(prev => [...prev, {
        id: Date.now() + 1, role: 'bot', content: data.response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
    } catch (err) {
      setIsTyping(false)
      setMessages(prev => [...prev, {
        id: Date.now() + 1, role: 'bot',
        content: err.message || 'Failed to get response. Please try again.',
        error: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
    }
  }

  const clearChat = async () => {
    try {
      await chatAPI.clearHistory()
    } catch {}
    setMessages([{
      id: Date.now(), role: 'bot',
      content: 'Chat cleared! Ready to plan your next adventure? 🌟 What destination are you thinking of?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }])
  }

  return (
    <div className="min-h-screen pt-16 flex flex-col">
      {/* Header */}
      <div className="glass border-b border-teal-500/10 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-white">NavAI Assistant</h1>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
                  <span className="text-teal-400 text-xs">Powered by Groq</span>
                </div>
              </div>
              <p className="text-slate-500 text-xs">Your AI-powered India travel expert • {user?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={clearChat} className="btn-ghost flex items-center gap-1.5 text-xs">
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-6">
          {messages.map(msg => (
            <Message key={msg.id} msg={msg} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="max-w-4xl mx-auto px-4 pb-4 w-full">
          <p className="text-slate-500 text-xs mb-3 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-teal-500" /> Quick prompts
          </p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => sendMessage(s)}
                className="glass-light text-slate-300 hover:text-teal-400 hover:border-teal-500/30 text-xs px-3 py-2 rounded-xl transition-all duration-200 text-left">
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="glass border-t border-teal-500/10 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
                placeholder="Ask me about any destination in India..."
                rows={1}
                className="input-field resize-none pr-12 max-h-32 overflow-y-auto"
                style={{ height: 'auto', minHeight: '48px' }}
                onInput={e => {
                  e.target.style.height = 'auto'
                  e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px'
                }}
              />
            </div>
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              className="w-12 h-12 bg-teal-500 hover:bg-teal-400 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 flex-shrink-0">
              {isTyping ? <RefreshCw className="w-5 h-5 text-navy-950 animate-spin" /> : <Send className="w-5 h-5 text-navy-950" />}
            </button>
          </div>
          <p className="text-slate-600 text-xs mt-2 text-center">
            Press Enter to send · Shift+Enter for new line · Responses saved to your account
          </p>
        </div>
      </div>
    </div>
  )
}
