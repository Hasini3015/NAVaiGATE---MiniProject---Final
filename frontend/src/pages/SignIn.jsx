import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Compass, Mail, Lock, Eye, EyeOff, Sparkles, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function SignIn() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) { setError('Please fill in all fields'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 600)) // small UX delay
    const result = await login(form.email, form.password)
    setLoading(false)
    if (result.success) {
      navigate(from, { replace: true })
    } else {
      setError(result.error)
    }
  }

  const fillDemo = () => setForm({ email: 'ramani@navaigate.in', password: 'password123' })

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=80"
          alt="bg"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900/95 to-navy-950" />
        <div className="absolute inset-0 mesh-gradient" />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="particle absolute w-1.5 h-1.5 rounded-full bg-teal-400/30"
            style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 25}%`, animationDuration: `${7 + i * 1.5}s`, animationDelay: `${i * 0.9}s` }} />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2.5 mb-8 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:shadow-teal-500/50 transition-all">
            <Compass className="w-5 h-5 text-navy-950" strokeWidth={2.5} />
          </div>
          <span className="font-display font-bold text-white text-2xl">
            Nav<span className="gradient-text">AI</span>gate
          </span>
        </Link>

        {/* Card */}
        <div className="glass rounded-3xl p-8 border border-teal-500/10 shadow-2xl shadow-navy-950/50">
          <div className="text-center mb-8">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-5 h-5 text-teal-400" />
            </div>
            <h1 className="font-display font-bold text-white text-2xl mb-1">Welcome Back</h1>
            <p className="text-slate-400 text-sm">Sign in to continue your journey</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-5">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="your@email.com"
                  className="input-field pl-10"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  className="input-field pl-10 pr-10"
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 glow-teal disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? (
                <><div className="w-4 h-4 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" /> Signing In...</>
              ) : 'Sign In'}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-4 p-3 rounded-xl bg-teal-500/5 border border-teal-500/10">
            <p className="text-slate-500 text-xs text-center mb-2">🚀 Try the demo account</p>
            <button onClick={fillDemo}
              className="w-full text-xs text-teal-400 hover:text-teal-300 font-mono bg-teal-500/10 hover:bg-teal-500/15 rounded-lg py-2 transition-all">
              ramani@navaigate.in / password123
            </button>
          </div>

          <p className="text-center text-slate-500 text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-teal-400 hover:text-teal-300 font-medium transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
