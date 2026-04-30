import { Link } from 'react-router-dom'
import { Compass, Mail, Phone, MapPin, Heart, Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/50 bg-navy-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
                <Compass className="w-4 h-4 text-navy-950" strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold text-white text-lg">
                Nav<span className="gradient-text">AI</span>gate
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              Your AI-powered travel companion. Discover India's most incredible destinations, plan smarter, and travel better.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4">Explore</h4>
            <div className="flex flex-col gap-2">
              {[['Tours', '/tours'], ['Gallery', '/'], ['Group Travel', '/group-travel'], ['Blogs', '/blogs']].map(([label, to]) => (
                <Link key={to+label} to={to} className="text-slate-500 hover:text-teal-400 text-sm transition-colors">{label}</Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4">Company</h4>
            <div className="flex flex-col gap-2">
              {[['About Us', '/about'], ['Contact', '/contact'], ['Privacy Policy', '/'], ['Terms of Service', '/']].map(([label, to]) => (
                <Link key={label} to={to} className="text-slate-500 hover:text-teal-400 text-sm transition-colors">{label}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4">Get in Touch</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:hello@navaigate.in" className="flex items-center gap-2 text-slate-500 hover:text-teal-400 text-sm transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" /> hello@navaigate.in
              </a>
              <a href="tel:+911234567890" className="flex items-center gap-2 text-slate-500 hover:text-teal-400 text-sm transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" /> +91 123 456 7890
              </a>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0" /> Hyderabad, India
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/50 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-sm">© 2026 NavAIgate India. All rights reserved.</p>
          <p className="text-slate-600 text-sm flex items-center gap-1.5">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> and <Sparkles className="w-3.5 h-3.5 text-teal-400" /> AI
          </p>
        </div>
      </div>
    </footer>
  )
}
