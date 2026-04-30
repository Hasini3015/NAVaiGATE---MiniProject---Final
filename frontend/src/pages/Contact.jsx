import { useState } from 'react'
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return
    setSent(true)
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="section-tag mx-auto w-fit"><MessageSquare className="w-3.5 h-3.5" /> Get In Touch</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-slate-400">We'd love to hear from you. Reach out anytime.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="card">
            {sent ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-teal-400 mx-auto mb-4" />
                <h3 className="font-display font-bold text-white text-xl mb-2">Message Sent!</h3>
                <p className="text-slate-400 text-sm mb-6">We'll get back to you within 24 hours.</p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }) }} className="btn-secondary text-sm">
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-display font-semibold text-white text-xl mb-6">Send Us a Message</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label">Your Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        placeholder="Full name"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="label">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        placeholder="your@email.com"
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label">Message</label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      placeholder="How can we help you?"
                      rows={5}
                      className="input-field resize-none"
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={!form.name || !form.email || !form.message}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            {[
              { icon: Mail, label: 'Email', value: 'hello@navaigate.in', href: 'mailto:hello@navaigate.in' },
              { icon: Phone, label: 'Phone', value: '+91 123 456 7890', href: 'tel:+911234567890' },
              { icon: MapPin, label: 'Location', value: 'Hyderabad, India', href: null },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="card text-center hover:border-teal-500/20 transition-all">
                <Icon className="w-8 h-8 text-teal-400 mx-auto mb-3" />
                <div className="text-slate-400 text-sm mb-1">{label}</div>
                {href ? (
                  <a href={href} className="font-semibold text-white hover:text-teal-400 transition-colors">{value}</a>
                ) : (
                  <span className="font-semibold text-white">{value}</span>
                )}
              </div>
            ))}

            <div className="card">
              <h4 className="font-display font-semibold text-white mb-3">Office Hours</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Monday – Friday</span>
                  <span className="text-white">9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Saturday</span>
                  <span className="text-white">10:00 AM – 4:00 PM</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Sunday</span>
                  <span className="text-slate-500">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
