import { Target, Eye, Zap, Compass } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="section-tag mx-auto w-fit"><Compass className="w-3.5 h-3.5" /> About Us</div>
          <h1 className="font-display text-5xl font-bold text-white mb-6">
            About <span className="gradient-text">NavAIgate</span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto mb-4">
            NavAIgate is an intelligent, full-stack travel platform that simplifies trip planning through Artificial Intelligence. We believe travel should be effortless, personalized, and memorable.
          </p>
          <p className="text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Our mission is to eliminate the need to juggle multiple apps — itinerary tools, booking platforms, budget trackers, and navigation apps. NavAIgate brings it all together.
          </p>
        </div>

        {/* Mission / Vision / Innovation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: Target, title: 'Our Mission', desc: 'Make AI-powered travel planning accessible to every Indian traveler.', color: 'from-teal-500 to-cyan-400' },
            { icon: Eye, title: 'Our Vision', desc: "Become India's #1 intelligent travel companion by 2027.", color: 'from-blue-500 to-indigo-400' },
            { icon: Zap, title: 'Innovation', desc: 'Combining LLMs, real-time data, and smart UX for the best travel experience.', color: 'from-purple-500 to-violet-400' },
          ].map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="card text-center">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <h2 className="font-display text-3xl font-bold text-white text-center mb-8">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Ramani Ala', role: 'Founder & CEO', emoji: '👨‍💼', bio: 'Serial entrepreneur with 10+ years in travel tech.' },
            { name: 'Hasini Adapala', role: 'Head of AI', emoji: '👩‍💻', bio: 'Former ML engineer at Google, passionate about AI travel.' },
            
          ].map(({ name, role, emoji, bio }) => (
            <div key={name} className="card text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500/20 to-blue-500/20 border border-teal-500/20 flex items-center justify-center mx-auto mb-4 text-4xl">
                {emoji}
              </div>
              <h3 className="font-display font-bold text-white text-lg">{name}</h3>
              <p className="text-teal-400 text-sm mt-1 mb-3">{role}</p>
              <p className="text-slate-500 text-xs">{bio}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '20+', label: 'Destinations' },
            { value: '10K+', label: 'Happy Travelers' },
            { value: '4', label: 'Plan Types' },
            { value: '2026', label: 'Founded' },
          ].map(({ value, label }) => (
            <div key={label} className="card text-center">
              <div className="font-display font-bold text-3xl gradient-text mb-1">{value}</div>
              <div className="text-slate-500 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
