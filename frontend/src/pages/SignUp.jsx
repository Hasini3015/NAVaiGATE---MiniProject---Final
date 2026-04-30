import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Compass, Mail, Lock, Eye, EyeOff, User, Sparkles, AlertCircle, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function PasswordStrength({ password }) {
  const checks = [
    { label: '8+ characters', ok: password.length >= 8 },
    { label: 'Uppercase letter', ok: /[A-Z]/.test(password) },
    { label: 'Number', ok: /[0-9]/.test(password) },
  ]
  const score = checks.filter(c => c.ok).length
  const colors = ['bg-red-500', 'bg-amber-500', 'bg-green-500']
  const labels = ['Weak', 'Fair', 'Strong']

  if (!password) return null

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1.5">
        {[0, 1, 2].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < score ? colors[score - 1] : 'bg-slate-700'}`} />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {checks.map(({ label, ok }) => (
            <span key={label} className={`text-xs flex items-center gap-1 ${ok ? 'text-green-400' : 'text-slate-600'}`}>
              <Check className="w-3 h-3" /> {label}
            </span>
          ))}
        </div>
        {score > 0 && <span className={`text-xs font-medium ${['text-red-400', 'text-amber-400', 'text-green-400'][score - 1]}`}>{labels[score - 1]}</span>}
      </div>
    </div>
  )
}

export default function SignUp() {
  const { signup } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email || !form.password) { setError('Please fill in all fields'); return }
    if (form.password !== form.confirm) { setError('Passwords do not match'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 700))
    const result = await signup(form.name, form.email, form.password)
    setLoading(false)
    if (result.success) {
      navigate('/')
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12">
      {/* Background */}
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1477587458883-47145ed31f4b?w=1600&q=80" alt="bg"
          className="w-full h-full object-cover opacity-12" />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900/95 to-navy-950" />
        <div className="absolute inset-0 mesh-gradient" />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2.5 mb-8 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
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
            <h1 className="font-display font-bold text-white text-2xl mb-1">Create Account</h1>
            <p className="text-slate-400 text-sm">Join 10,000+ travelers on NavAIgate</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-5">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type="text" value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Priya Sharma" className="input-field pl-10" autoComplete="name" />
              </div>
            </div>

            <div>
              <label className="label">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type="email" value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="you@email.com" className="input-field pl-10" autoComplete="email" />
              </div>
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type={showPass ? 'text' : 'password'} value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="Min. 6 characters" className="input-field pl-10 pr-10" autoComplete="new-password" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <PasswordStrength password={form.password} />
            </div>

            <div>
              <label className="label">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type={showPass ? 'text' : 'password'} value={form.confirm}
                  onChange={e => setForm(p => ({ ...p, confirm: e.target.value }))}
                  placeholder="Re-enter password" className="input-field pl-10"
                  style={{ borderColor: form.confirm && form.confirm !== form.password ? 'rgba(239,68,68,0.5)' : '' }} />
              </div>
              {form.confirm && form.confirm !== form.password && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Passwords don't match
                </p>
              )}
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 glow-teal disabled:opacity-60 disabled:cursor-not-allowed mt-2">
              {loading ? (
                <><div className="w-4 h-4 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" /> Creating Account...</>
              ) : (
                <><Sparkles className="w-4 h-4" /> Create Account</>
              )}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/signin" className="text-teal-400 hover:text-teal-300 font-medium transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
