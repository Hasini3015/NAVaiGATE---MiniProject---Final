import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Compass, Wallet, MessageSquare, Map, LogOut, User, ChevronDown } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/tours', label: 'Tours' },
  { to: '/blogs', label: 'Blogs' },
  { to: '/group-travel', label: 'Group Travel' },
  { to: '/community', label: 'Community' },
  { to: '/contact', label: 'Contact Us' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const dropRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropdownOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = () => {
    logout()
    setDropdownOpen(false)
    navigate('/')
  }

  // Hide navbar on auth pages
  const authPages = ['/signin', '/signup']
  if (authPages.includes(location.pathname)) return null

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass border-b border-teal-500/10 shadow-lg shadow-navy-950/50' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-all duration-300">
              <Compass className="w-4 h-4 text-navy-950" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-white text-lg tracking-tight">
              Nav<span className="gradient-text">AI</span>gate
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to}
                className={`nav-link px-3 py-2 rounded-lg ${location.pathname === link.to ? 'text-teal-400 bg-teal-500/10' : ''}`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <Link to="/budget" className="btn-ghost flex items-center gap-1.5 text-sm">
              <Wallet className="w-4 h-4 text-amber-400" /> Budget
            </Link>
            <Link to="/chat" className="btn-ghost flex items-center gap-1.5 text-sm">
              <MessageSquare className="w-4 h-4 text-teal-400" /> AI Chat
            </Link>

            {user ? (
              /* User Avatar Dropdown */
              <div className="relative" ref={dropRef}>
                <button onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 glass border border-teal-500/20 hover:border-teal-500/40 px-3 py-1.5 rounded-xl transition-all">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-navy-950 font-bold text-xs">
                    {user.avatar}
                  </div>
                  <span className="text-white text-sm font-medium">{user.name.split(' ')[0]}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 glass rounded-xl border border-teal-500/10 shadow-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-800">
                      <p className="text-white text-sm font-semibold">{user.name}</p>
                      <p className="text-slate-500 text-xs truncate">{user.email}</p>
                    </div>
                    <div className="p-1">
                      <Link to="/planner" onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                        <Map className="w-4 h-4 text-teal-400" /> My Plan
                      </Link>
                      <Link to="/budget" onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                        <Wallet className="w-4 h-4 text-amber-400" /> Budget Tracker
                      </Link>
                      <button onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/signin" className="btn-ghost text-sm">Sign In</Link>
                <Link to="/planner" className="btn-primary text-sm flex items-center gap-2">
                  <Map className="w-4 h-4" /> My Plan
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden glass border-t border-teal-500/10 px-4 py-4">
          {user && (
            <div className="flex items-center gap-3 px-4 py-3 mb-2 glass-light rounded-xl">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-navy-950 font-bold text-sm">{user.avatar}</div>
              <div>
                <p className="text-white text-sm font-semibold">{user.name}</p>
                <p className="text-slate-500 text-xs">{user.email}</p>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-1">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  location.pathname === link.to ? 'text-teal-400 bg-teal-500/10' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}>
                {link.label}
              </Link>
            ))}
            <div className="border-t border-slate-800 mt-2 pt-2 flex flex-col gap-1">
              <Link to="/budget" className="px-4 py-3 rounded-xl text-sm font-medium text-amber-400 hover:bg-amber-500/10 transition-colors flex items-center gap-2">
                <Wallet className="w-4 h-4" /> Budget Tracker
              </Link>
              <Link to="/chat" className="px-4 py-3 rounded-xl text-sm font-medium text-teal-400 hover:bg-teal-500/10 transition-colors flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> AI Chat
              </Link>
              {user ? (
                <button onClick={handleLogout}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2 text-left">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              ) : (
                <>
                  <Link to="/signin" className="px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2">
                    <User className="w-4 h-4" /> Sign In
                  </Link>
                  <Link to="/planner" className="btn-primary text-sm text-center mt-1">Plan My Trip</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
