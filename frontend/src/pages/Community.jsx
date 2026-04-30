import { useState, useRef, useEffect } from 'react'
import { MessageSquare, Send, Users, MapPin, Lightbulb, UserPlus, Map, Hotel } from 'lucide-react'

const ROOMS = [
  { id: 'goa', name: 'Goa', emoji: '🏖️', members: 142 },
  { id: 'andaman', name: 'Andaman & Nicobar', emoji: '🌊', members: 89 },
  { id: 'pondicherry', name: 'Pondicherry', emoji: '🇫🇷', members: 56 },
  { id: 'manali', name: 'Manali', emoji: '⛰️', members: 213 },
  { id: 'shimla', name: 'Shimla', emoji: '❄️', members: 97 },
  { id: 'munnar', name: 'Munnar', emoji: '🍃', members: 74 },
  { id: 'darjeeling', name: 'Darjeeling', emoji: '☕', members: 61 },
  { id: 'ladakh', name: 'Ladakh', emoji: '🏔️', members: 178 },
  { id: 'jaipur', name: 'Jaipur', emoji: '🏰', members: 134 },
]

const SAMPLE_MESSAGES = {
  goa: [
    { id: 1, user: 'Priya S.', avatar: 'PS', text: 'Just arrived at Palolem! The water is absolutely crystal clear 😍', time: '10:24 AM', isBot: false },
    { id: 2, user: 'Rahul M.', avatar: 'RM', text: 'Pro tip: Avoid Baga beach on weekends. Agonda is far more peaceful and cleaner.', time: '10:31 AM', isBot: false },
    { id: 3, user: 'Ananya K.', avatar: 'AK', text: 'Anyone know a good budget place near Anjuna? Looking for ₹800-1000/night stays?', time: '10:45 AM', isBot: false },
    { id: 4, user: 'Vikram T.', avatar: 'VT', text: '@Ananya try "Sunray Guest House" — I stayed there last week, ₹850/night, clean rooms, great location!', time: '10:52 AM', isBot: false },
    { id: 5, user: 'Meera J.', avatar: 'MJ', text: 'The Anjuna flea market on Wednesdays is a must-visit. Got some amazing boho jewelry!', time: '11:05 AM', isBot: false },
  ],
  manali: [
    { id: 1, user: 'Arjun B.', avatar: 'AB', text: 'Rohtang Pass road is open! Just came back from there. Snow is amazing!', time: '9:15 AM', isBot: false },
    { id: 2, user: 'Sneha P.', avatar: 'SP', text: 'How\'s the weather in Manali right now? Planning a trip next week.', time: '9:30 AM', isBot: false },
    { id: 3, user: 'Karthik N.', avatar: 'KN', text: '@Sneha it\'s around 8°C during day, 2°C at night. Carry thermals!', time: '9:45 AM', isBot: false },
  ],
  ladakh: [
    { id: 1, user: 'Dev R.', avatar: 'DR', text: 'Pangong Lake sunrise is unlike anything I\'ve ever seen. 10/10 recommend waking up early!', time: '7:30 AM', isBot: false },
    { id: 2, user: 'Isha V.', avatar: 'IV', text: 'Acclimatization is key. Spend at least 2 days in Leh before heading higher.', time: '8:00 AM', isBot: false },
  ],
}

const TIPS = [
  { icon: Lightbulb, label: 'Share travel tips & experiences' },
  { icon: UserPlus, label: 'Find travel buddies' },
  { icon: Map, label: 'Coordinate group trips' },
  { icon: Hotel, label: 'Get hotel recommendations' },
]

export default function Community() {
  const [activeRoom, setActiveRoom] = useState(null)
  const [joined, setJoined] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [username] = useState('You')
  const bottomRef = useRef(null)

  useEffect(() => {
    if (activeRoom && joined) {
      setMessages(SAMPLE_MESSAGES[activeRoom] || [])
    }
  }, [activeRoom, joined])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, {
      id: Date.now(),
      user: username,
      avatar: 'YO',
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    }])
    setInput('')
  }

  const room = ROOMS.find(r => r.id === activeRoom)

  return (
    <div className="min-h-screen pt-16 flex flex-col">
      {/* Header */}
      <div className="glass border-b border-teal-500/10 px-4 py-4 mt-0 flex-shrink-0">
        <div className="max-w-7xl mx-auto">
          <div className="section-tag w-fit"><MessageSquare className="w-3.5 h-3.5" /> Community</div>
          <h1 className="font-display text-3xl font-bold text-white">
            Community <span className="gradient-text">Chat</span>
          </h1>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden max-w-7xl mx-auto w-full px-0 sm:px-4">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0 border-r border-slate-800/50 overflow-y-auto py-4">
          <div className="px-4 mb-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500">Destination Rooms</h3>
          </div>
          {ROOMS.map(r => (
            <button
              key={r.id}
              onClick={() => { setActiveRoom(r.id); setJoined(false) }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                activeRoom === r.id ? 'bg-teal-500/10 text-teal-400' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-lg">{r.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{r.name}</div>
                <div className="text-xs text-slate-600 flex items-center gap-1">
                  <Users className="w-3 h-3" /> {r.members}
                </div>
              </div>
              {activeRoom === r.id && <div className="w-2 h-2 bg-teal-400 rounded-full" />}
            </button>
          ))}
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Room Header */}
          <div className="glass border-b border-teal-500/10 px-6 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{room?.emoji || '💬'}</span>
              <div>
                <h2 className="font-display font-semibold text-white">{room?.name || 'Select a Room'}</h2>
                <p className="text-xs text-slate-500">
                  {joined && room ? `${room.members} members · Active now` : 'Click a room to join'}
                </p>
              </div>
            </div>
            {activeRoom && !joined && (
              <button onClick={() => setJoined(true)} className="btn-primary text-sm px-4 py-2">
                Join Room
              </button>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {!activeRoom && (
              <div className="text-center py-16 text-slate-500">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="text-lg font-medium text-slate-400 mb-2">Select a destination room to start chatting</p>
                <p className="text-sm">Connect with travelers heading to the same destination</p>
              </div>
            )}

            {activeRoom && !joined && (
              <div className="text-center py-16">
                <span className="text-5xl mb-4 block">{room?.emoji}</span>
                <h3 className="font-display text-xl font-bold text-white mb-2">Join the {room?.name} Room</h3>
                <p className="text-slate-400 text-sm mb-6">{room?.members} travelers are already chatting</p>
                <button onClick={() => setJoined(true)} className="btn-primary px-8 py-3">
                  Join {room?.name} Room
                </button>
              </div>
            )}

            {activeRoom && joined && messages.map(msg => (
              <div key={msg.id} className={`flex gap-3 message-enter ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  msg.isMe ? 'bg-teal-500' : 'bg-gradient-to-br from-blue-500 to-purple-500'
                } text-white`}>
                  {msg.avatar}
                </div>
                <div className={`max-w-[70%] ${msg.isMe ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                  {!msg.isMe && <span className="text-xs text-slate-500 px-1">{msg.user}</span>}
                  <div className={`px-4 py-2.5 rounded-2xl text-sm ${
                    msg.isMe
                      ? 'bg-teal-500/80 text-white rounded-tr-sm'
                      : 'glass text-slate-200 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-xs text-slate-600 px-1">{msg.time}</span>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          {activeRoom && joined && (
            <div className="glass border-t border-teal-500/10 p-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder={`Chat in ${room?.name} room...`}
                  className="input-field flex-1"
                />
                <button onClick={sendMessage} disabled={!input.trim()} className="w-12 h-12 bg-teal-500 hover:bg-teal-400 disabled:opacity-40 rounded-xl flex items-center justify-center transition-all">
                  <Send className="w-5 h-5 text-navy-950" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tips Bar */}
      <div className="glass border-t border-slate-800/50 px-4 py-3 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 justify-center">
          {TIPS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-xs text-slate-500">
              <Icon className="w-3.5 h-3.5 text-teal-400" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
