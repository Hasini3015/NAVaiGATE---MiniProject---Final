import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles, Map, Wallet, MessageSquare, CloudSun, Users,
  ArrowRight, Star, ChevronRight, Zap, Globe, Shield, TrendingUp,
  Compass, Navigation, Mountain, Camera
} from 'lucide-react'

const features = [
  { icon: Sparkles, title: 'AI Itinerary Generator', desc: 'Get 4 personalized travel plans — Budget, Deluxe, Luxury & Jackpot — generated instantly by AI.', color: 'from-teal-500 to-cyan-400' },
  { icon: Zap, title: 'Dynamic Plan Modification', desc: 'Tell the AI "make it cheaper" or "add adventure sports" and watch your plan update instantly.', color: 'from-blue-500 to-indigo-400' },
  { icon: Wallet, title: 'Budget Tracker', desc: 'Real-time cost calculations with smart alerts when you approach your budget limit.', color: 'from-amber-500 to-orange-400' },
  { icon: Navigation, title: 'Google Maps Navigation', desc: 'One-tap directions to every location in your itinerary — directly from your plan.', color: 'from-green-500 to-emerald-400' },
  { icon: CloudSun, title: 'Weather-Based Adjustment', desc: 'AI automatically adjusts your itinerary based on live weather data for your travel dates.', color: 'from-purple-500 to-violet-400' },
  { icon: Users, title: 'Community Connect', desc: 'Join destination-based groups, share tips, and find travel buddies who share your interests.', color: 'from-pink-500 to-rose-400' },
]

const destinations = [
  { name: 'Goa', tagline: 'Sun, Sand & Serenity', tags: ['Adventure', 'Romantic'], price: '₹6,000+', img: 'https://voiceofadventure.com/wp-content/uploads/2022/06/60d0813807aff-Baga_Beach_In_Goa.jpg', gradient: 'from-cyan-500/60 to-blue-500/30' },
  { name: 'Ladakh', tagline: 'Land of High Passes', tags: ['Adventure', 'Solo'], price: '₹12,000+', img: 'https://t3.ftcdn.net/jpg/02/64/31/46/360_F_264314658_bMWblZcsJj9XTTwkOo1l4Z3eOIx9T3Qv.jpg', gradient: 'from-slate-700/60 to-blue-900/30' },
  { name: 'Manali', tagline: 'Valley of the Gods', tags: ['Adventure', 'Romantic'], price: '₹5,000+', img: 'https://images.pexels.com/photos/28680808/pexels-photo-28680808.jpeg?cs=srgb&dl=pexels-ansh-kumar-3935136-28680808.jpg&fm=jpg', gradient: 'from-green-700/60 to-emerald-900/30' },
  { name: 'Pondicherry', tagline: 'French Riviera of India', tags: ['Romantic', 'Solo'], price: '₹5,000+', img: 'https://www.holidify.com/images/bgImages/PONDICHERRY.jpg', gradient: 'from-yellow-600/60 to-amber-900/30' },
  { name: 'Shimla', tagline: 'Queen of Hills', tags: ['Family', 'Romantic'], price: '₹4,000+', img: 'https://tse4.mm.bing.net/th/id/OIP.hSNLQv20D4cu1d74OsgMIgHaEO?rs=1&pid=ImgDetMain&o=7&rm=3', gradient: 'from-indigo-700/60 to-purple-900/30' },
  { name: 'Munnar', tagline: 'Tea Garden Paradise', tags: ['Romantic', 'Family'], price: '₹5,000+', img: 'https://www.revv.co.in/blogs/wp-content/uploads/2021/02/Munnar-HD-Image.jpg', gradient: 'from-green-600/60 to-teal-900/30' },
  { name: 'Darjeeling', tagline: 'Land of Thunder Bolt', tags: ['Romantic', 'Solo'], price: '₹4,500+', img: 'https://wallpapercave.com/wp/wp6191685.jpg', gradient: 'from-orange-600/60 to-amber-900/30' },
  { name: 'Varanasi', tagline: 'City of Light', tags: ['Spiritual', 'Solo'], price: '₹3,500+', img: 'https://tse2.mm.bing.net/th/id/OIP.4vczHYikRKBhf8YZrmZHpwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3', gradient: 'from-orange-800/60 to-red-900/30' },
]

const testimonials = [
  { name: 'Priya Sharma', role: 'Solo Traveler', quote: 'NavAIgate planned my entire Ladakh trip in 2 minutes. The AI suggestions were spot-on and I saved ₹8,000!', stars: 5, avatar: 'PS' },
  { name: 'Rahul Mehta', role: 'Family Vacationer', quote: 'Booked a Goa trip for 6 people. Budget tracker kept us on track. Best travel app I\'ve used in years.', stars: 5, avatar: 'RM' },
  { name: 'Ananya Nair', role: 'Adventure Seeker', quote: 'The weather integration is genius. It switched my Shimla itinerary when it snowed. Saved our trip!', stars: 5, avatar: 'AN' },
]

const stats = [
  { value: '20+', label: 'Destinations' },
  { value: '4', label: 'Plan Types' },
  { value: '10K+', label: 'Happy Travelers' },
  { value: 'AI', label: 'Powered Planning' },
]

export default function Home() {
  const observerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center mesh-gradient">
        {/* Background image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=80"
            alt="India travel"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/40 to-navy-950" />
        </div>

        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="particle absolute w-1.5 h-1.5 rounded-full bg-teal-400/40"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 20}%`,
                animationDuration: `${6 + i * 1.5}s`,
                animationDelay: `${i * 0.8}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-20">
          <div className="section-tag animate-slide-up">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Travel Planning
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-none mb-6 animate-slide-up stagger-1">
            NavAI<span className="gradient-text">gate</span>
            <br />
            <span className="text-4xl sm:text-5xl md:text-6xl font-light text-slate-300">India</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up stagger-2">
            Plan Smart. Travel Better. Connect with fellow travelers and explore India's 20 most incredible destinations — powered by AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up stagger-3">
            <Link to="/tours" className="btn-primary flex items-center justify-center gap-2 text-base px-8 py-4 glow-teal">
              <Globe className="w-5 h-5" />
              Explore Tours
            </Link>
            <Link to="/planner" className="btn-secondary flex items-center justify-center gap-2 text-base px-8 py-4">
              Plan My Trip
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Stats bar */}
          <div className="mt-16 glass rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up stagger-4 max-w-2xl mx-auto">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-display font-bold text-2xl gradient-text">{value}</div>
                <div className="text-slate-500 text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 text-xs flex flex-col items-center gap-2 animate-pulse-slow">
          <span>Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-teal-500/50 to-transparent" />
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative">
        <div className="dot-grid absolute inset-0 opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="section-tag animate-on-scroll">
              <Zap className="w-3.5 h-3.5" />
              What We Offer
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 animate-on-scroll">
              Everything You Need to <span className="gradient-text">Travel Smart</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto animate-on-scroll">
              From AI-generated itineraries to real-time budget tracking — all in one platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc, color }, i) => (
              <div key={title} className={`card group cursor-default animate-on-scroll stagger-${(i % 3) + 1}`}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} p-2.5 mb-4 shadow-lg`}>
                  <Icon className="w-full h-full text-white" />
                </div>
                <h3 className="font-display font-semibold text-white text-lg mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-24 bg-navy-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="section-tag animate-on-scroll">
                <Mountain className="w-3.5 h-3.5" />
                Top Picks
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white animate-on-scroll">
                Popular <span className="gradient-text">Destinations</span>
              </h2>
            </div>
            <Link to="/tours" className="hidden md:flex items-center gap-2 text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors animate-on-scroll">
              View All 20 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {destinations.map(({ name, tagline, tags, price, img, gradient }, i) => (
              <Link
                key={name}
                to="/tours"
                className={`relative rounded-2xl overflow-hidden group cursor-pointer animate-on-scroll stagger-${(i % 4) + 1} ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                style={{ aspectRatio: i === 0 ? 'auto' : '4/3', minHeight: i === 0 ? '280px' : '180px' }}
              >
                <img
                  src={img}
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${gradient} via-navy-950/20 to-transparent`} />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />

                {/* Tags */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  {tags.slice(0, 1).map(tag => (
                    <span key={tag} className="text-xs font-mono bg-teal-500/20 border border-teal-500/30 text-teal-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-display font-bold text-white text-lg leading-tight">{name}</h3>
                  <p className="text-slate-300 text-xs mt-0.5">{tagline}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-teal-400 text-sm font-semibold">{price}</span>
                    <span className="text-slate-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Plan now <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link to="/tours" className="btn-secondary inline-flex items-center gap-2">
              View All Tours <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-tag animate-on-scroll">
              <Compass className="w-3.5 h-3.5" />
              Simple Process
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 animate-on-scroll">
              How NavAI<span className="gradient-text">gate</span> Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Choose Destination', desc: 'Pick from 20 curated India destinations — beaches, mountains, heritage, and more.', icon: Globe },
              { step: '02', title: 'Set Preferences', desc: 'Tell us your travel dates, group size, food preferences, and activity level.', icon: Sparkles },
              { step: '03', title: 'Get AI Plans', desc: 'Receive Budget, Deluxe, Luxury, and Jackpot plans tailored just for you.', icon: Zap },
              { step: '04', title: 'Modify & Save', desc: 'Customize with AI chat, save your plan, and download a full itinerary.', icon: Map },
            ].map(({ step, title, desc, icon: Icon }, i) => (
              <div key={step} className={`animate-on-scroll stagger-${i + 1} relative`}>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-teal-500/30 to-transparent z-0" style={{ width: '100%', left: '50%' }} />
                )}
                <div className="card text-center relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500/20 to-blue-500/20 border border-teal-500/20 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-teal-400" />
                  </div>
                  <div className="font-mono text-teal-400/60 text-xs mb-2">{step}</div>
                  <h3 className="font-display font-semibold text-white mb-2">{title}</h3>
                  <p className="text-slate-400 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/planner" className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base glow-teal">
              <Sparkles className="w-5 h-5" />
              Start Planning Now
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-navy-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-tag animate-on-scroll">
              <Star className="w-3.5 h-3.5" />
              Testimonials
            </div>
            <h2 className="font-display text-4xl font-bold text-white animate-on-scroll">
              Loved by <span className="gradient-text">Travelers</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, quote, stars, avatar }, i) => (
              <div key={name} className={`card animate-on-scroll stagger-${i + 1}`}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(stars)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 star fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">"{quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-navy-950 font-display font-bold text-sm">
                    {avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{name}</div>
                    <div className="text-slate-500 text-xs">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="glass rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 mesh-gradient" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/30 animate-float">
                <Compass className="w-8 h-8 text-navy-950" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to Explore <span className="gradient-text">India?</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                Join 10,000+ travelers who plan smarter with NavAIgate. Your next adventure is one click away.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/planner" className="btn-primary flex items-center justify-center gap-2 px-8 py-4 glow-teal">
                  <Sparkles className="w-5 h-5" />
                  Plan My Trip Free
                </Link>
                <Link to="/chat" className="btn-secondary flex items-center justify-center gap-2 px-8 py-4">
                  <MessageSquare className="w-5 h-5" />
                  Chat with AI
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
