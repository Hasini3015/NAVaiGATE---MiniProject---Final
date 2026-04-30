import { useState, useEffect } from 'react'
import { Wallet, Plus, Trash2, AlertTriangle, TrendingUp, Zap, ShoppingBag, Car, Hotel, Utensils, Ticket, Gift, Heart, RefreshCw, Sparkles, Bot } from 'lucide-react'
import { budgetAPI } from '../services/api'

const CATEGORIES = [
  { id: 'hotel', label: 'Hotel', icon: Hotel, color: 'text-blue-400' },
  { id: 'food', label: 'Food', icon: Utensils, color: 'text-amber-400' },
  { id: 'transport', label: 'Transport', icon: Car, color: 'text-green-400' },
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag, color: 'text-pink-400' },
  { id: 'activities', label: 'Activities', icon: Ticket, color: 'text-purple-400' },
  { id: 'souvenir', label: 'Souvenir', icon: Gift, color: 'text-orange-400' },
  { id: 'other', label: 'Other', icon: Zap, color: 'text-slate-400' },
]

const QUICK_ADD = [
  { label: 'Auto-rickshaw', amount: 150, category: 'transport' },
  { label: 'Street food', amount: 200, category: 'food' },
  { label: 'Hotel 1 night', amount: 2500, category: 'hotel' },
  { label: 'Entry ticket', amount: 500, category: 'activities' },
  { label: 'Souvenir', amount: 300, category: 'souvenir' },
  { label: 'Tip', amount: 100, category: 'other' },
]

const CAT_ICONS = Object.fromEntries(CATEGORIES.map(c => [c.id, c]))

export default function BudgetTracker() {
  const [budgetData, setBudgetData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ desc: '', amount: '', category: 'food' })
  const [budgetInput, setBudgetInput] = useState('')
  const [tripName, setTripName] = useState('')
  const [optimizationText, setOptimizationText] = useState('')
  const [optimizing, setOptimizing] = useState('')
  const [savingBudget, setSavingBudget] = useState(false)
  const [destination, setDestination] = useState('')

  useEffect(() => {
    loadBudget()
  }, [])

  const loadBudget = async () => {
    try {
      const data = await budgetAPI.get()
      setBudgetData(data.budget)
      setBudgetInput(data.budget.totalBudget || '')
      setTripName(data.budget.tripName || '')
    } catch (err) {
      console.error('Failed to load budget:', err)
    }
    setLoading(false)
  }

  const handleSetBudget = async () => {
    if (!budgetInput) return
    setSavingBudget(true)
    try {
      const data = await budgetAPI.setup(parseFloat(budgetInput), tripName || 'My Trip')
      setBudgetData(data.budget)
    } catch (err) {
      console.error('Failed to set budget:', err)
    }
    setSavingBudget(false)
  }

  const addExpense = async (desc, amount, category) => {
    const d = desc || form.desc
    const a = amount || form.amount
    const c = category || form.category
    if (!d || !a) return
    try {
      const data = await budgetAPI.addExpense(d, parseFloat(a), c)
      setBudgetData(data.budget)
      if (!desc) setForm({ desc: '', amount: '', category: 'food' })
    } catch (err) {
      console.error('Failed to add expense:', err)
    }
  }

  const removeExpense = async (expenseId) => {
    try {
      const data = await budgetAPI.removeExpense(expenseId)
      setBudgetData(data.budget)
    } catch (err) {
      console.error('Failed to remove expense:', err)
    }
  }

  const handleOptimize = async () => {
    if (!budgetData) return
    setOptimizing(true)
    try {
      const total = (budgetData.expenses || []).reduce((s, e) => s + e.amount, 0)
      const data = await budgetAPI.optimize({
        totalBudget: budgetData.totalBudget,
        spent: total,
        expenses: budgetData.expenses || [],
        destination: destination || 'India'
      })
      setOptimizationText(data.suggestion)
    } catch (err) {
      setOptimizationText('Failed to get suggestions. Please try again.')
    }
    setOptimizing(false)
  }

  if (loading) return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="flex items-center gap-3 text-slate-400">
        <RefreshCw className="w-5 h-5 animate-spin text-teal-400" />
        Loading your budget from MongoDB...
      </div>
    </div>
  )

  const expenses = budgetData?.expenses || []
  const budget = budgetData?.totalBudget || 0
  const total = expenses.reduce((sum, e) => sum + e.amount, 0)
  const remaining = budget - total
  const percentage = budget > 0 ? Math.min((total / budget) * 100, 100) : 0
  const isOverBudget = total > budget

  const byCategory = CATEGORIES.map(cat => ({
    ...cat,
    total: expenses.filter(e => e.category === cat.id).reduce((s, e) => s + e.amount, 0),
    count: expenses.filter(e => e.category === cat.id).length,
  })).filter(c => c.total > 0)

  const renderOptimizationText = (t) => {
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
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="section-tag w-fit"><Wallet className="w-3.5 h-3.5" /> Budget Tracker</div>
          <h1 className="font-display text-4xl font-bold text-white">
            Budget <span className="gradient-text">Tracker</span>
          </h1>
          <p className="text-slate-400 mt-2">Track expenses & get AI optimization tips • Data synced to MongoDB</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Budget Setup */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="card">
                <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-teal-400" /> Set Your Budget
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Trip name (e.g. Goa Trip)"
                    value={tripName}
                    onChange={e => setTripName(e.target.value)}
                    className="input-field text-sm"
                  />
                  <div className="flex gap-3">
                    <input
                      type="number"
                      placeholder="Total budget in ₹"
                      value={budgetInput}
                      onChange={e => setBudgetInput(e.target.value)}
                      className="input-field flex-1"
                    />
                    <button onClick={handleSetBudget} disabled={savingBudget}
                      className="btn-primary px-4 flex-shrink-0 disabled:opacity-50 flex items-center gap-1">
                      {savingBudget ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Set'}
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Destination (for AI tips)"
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                    className="input-field text-sm"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="card">
                <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-teal-400" /> Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Spent</span>
                    <span className={`font-bold ${isOverBudget ? 'text-red-400' : 'text-white'}`}>₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Budget</span>
                    <span className="text-white font-bold">₹{budget.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-navy-800 rounded-full h-2">
                    <div className={`h-2 rounded-full transition-all duration-500 ${isOverBudget ? 'bg-red-500' : percentage > 80 ? 'bg-amber-500' : 'bg-teal-500'}`}
                      style={{ width: `${percentage}%` }} />
                  </div>
                  <div className={`flex items-center gap-2 text-sm font-semibold ${remaining >= 0 ? 'text-teal-400' : 'text-red-400'}`}>
                    {isOverBudget ? <AlertTriangle className="w-4 h-4" /> : null}
                    {remaining >= 0 ? `₹${remaining.toLocaleString()} remaining` : `₹${Math.abs(remaining).toLocaleString()} over budget`}
                  </div>
                </div>
              </div>
            </div>

            {/* Add Expense */}
            <div className="card">
              <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4 text-teal-400" /> Add Expense
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <input type="text" placeholder="Description" value={form.desc}
                  onChange={e => setForm(p => ({ ...p, desc: e.target.value }))} className="input-field" />
                <input type="number" placeholder="Amount (₹)" value={form.amount}
                  onChange={e => setForm(p => ({ ...p, amount: e.target.value }))} className="input-field" />
                <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="input-field">
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <button onClick={() => addExpense()} disabled={!form.desc || !form.amount}
                className="btn-primary flex items-center gap-2 disabled:opacity-50">
                <Plus className="w-4 h-4" /> Add Expense
              </button>

              {/* Quick Add */}
              <div className="mt-4 pt-4 border-t border-slate-700/50">
                <p className="text-slate-500 text-xs mb-3">Quick add</p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_ADD.map(q => (
                    <button key={q.label} onClick={() => addExpense(q.label, q.amount, q.category)}
                      className="glass-light text-slate-300 hover:text-teal-400 text-xs px-3 py-1.5 rounded-lg transition-all">
                      {q.label} · ₹{q.amount}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Expense List */}
            <div className="card">
              <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
                All Expenses <span className="text-slate-500 text-sm font-normal">({expenses.length})</span>
              </h3>
              {expenses.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-8">No expenses yet. Add your first expense above!</p>
              ) : (
                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {[...expenses].reverse().map(expense => {
                    const cat = CAT_ICONS[expense.category] || CAT_ICONS['other']
                    const Icon = cat.icon
                    return (
                      <div key={expense._id} className="flex items-center gap-3 p-3 glass-light rounded-xl group">
                        <div className={`w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-4 h-4 ${cat.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">{expense.desc}</p>
                          <p className="text-slate-500 text-xs">{cat.label} · {new Date(expense.date).toLocaleDateString()}</p>
                        </div>
                        <span className="text-white font-semibold text-sm flex-shrink-0">₹{expense.amount.toLocaleString()}</span>
                        <button onClick={() => removeExpense(expense._id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-600 hover:text-red-400 flex-shrink-0">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Category Breakdown */}
            {byCategory.length > 0 && (
              <div className="card">
                <h3 className="font-display font-semibold text-white mb-4">By Category</h3>
                <div className="space-y-3">
                  {byCategory.sort((a, b) => b.total - a.total).map(cat => {
                    const Icon = cat.icon
                    const pct = total > 0 ? (cat.total / total) * 100 : 0
                    return (
                      <div key={cat.id}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <Icon className={`w-4 h-4 ${cat.color}`} />
                            <span className="text-slate-300 text-sm">{cat.label}</span>
                          </div>
                          <span className="text-white text-sm font-medium">₹{cat.total.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-navy-800 rounded-full h-1.5">
                          <div className="h-1.5 rounded-full bg-teal-500 transition-all duration-500" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* AI Budget Optimizer */}
            <div className="card border border-teal-500/20">
              <h3 className="font-display font-semibold text-white mb-2 flex items-center gap-2">
                <Bot className="w-4 h-4 text-teal-400" /> AI Budget Optimizer
              </h3>
              <p className="text-slate-500 text-xs mb-4">Get personalized money-saving tips powered by Groq AI</p>
              <button onClick={handleOptimize} disabled={!!optimizing || expenses.length === 0}
                className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2 disabled:opacity-50">
                {optimizing ? <><RefreshCw className="w-4 h-4 animate-spin" /> Analyzing...</> : <><Sparkles className="w-4 h-4" /> Get AI Suggestions</>}
              </button>
              {optimizationText && (
                <div className="mt-4 bg-teal-500/5 border border-teal-500/20 rounded-xl p-4 text-slate-300 text-xs leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto">
                  {renderOptimizationText(optimizationText)}
                </div>
              )}
            </div>

            {/* Over Budget Warning */}
            {isOverBudget && (
              <div className="card border border-red-500/30 bg-red-500/5">
                <div className="flex items-center gap-2 text-red-400 font-semibold mb-2">
                  <AlertTriangle className="w-4 h-4" /> Over Budget!
                </div>
                <p className="text-slate-400 text-sm">
                  You've exceeded your budget by <strong className="text-red-400">₹{Math.abs(remaining).toLocaleString()}</strong>.
                  Use the AI optimizer above for money-saving tips.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
