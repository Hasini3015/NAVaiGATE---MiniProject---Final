const API_BASE = '/api'

function getToken() {
  return localStorage.getItem('nav_token')
}

async function apiCall(endpoint, options = {}) {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong')
  }

  return data
}

export const authAPI = {
  signup: (name, email, password) =>
    apiCall('/auth/signup', { method: 'POST', body: JSON.stringify({ name, email, password }) }),

  signin: (email, password) =>
    apiCall('/auth/signin', { method: 'POST', body: JSON.stringify({ email, password }) }),

  me: () => apiCall('/auth/me')
}

export const chatAPI = {
  sendMessage: (message, history) =>
    apiCall('/chat/message', { method: 'POST', body: JSON.stringify({ message, history }) }),

  getHistory: () => apiCall('/chat/history'),

  clearHistory: () => apiCall('/chat/history', { method: 'DELETE' })
}

export const tripsAPI = {
  generate: (data) =>
    apiCall('/trips/generate', { method: 'POST', body: JSON.stringify(data) }),

  weatherReschedule: (data) =>
    apiCall('/trips/weather-reschedule', { method: 'POST', body: JSON.stringify(data) }),

  getAlternative: (data) =>
    apiCall('/trips/alternative', { method: 'POST', body: JSON.stringify(data) }),

  recommend: (data) =>
    apiCall('/trips/recommend', { method: 'POST', body: JSON.stringify(data) }),

  getAll: () => apiCall('/trips'),

  delete: (id) => apiCall(`/trips/${id}`, { method: 'DELETE' })
}

export const budgetAPI = {
  get: () => apiCall('/budget'),

  setup: (totalBudget, tripName) =>
    apiCall('/budget/setup', { method: 'POST', body: JSON.stringify({ totalBudget, tripName }) }),

  addExpense: (desc, amount, category) =>
    apiCall('/budget/expense', { method: 'POST', body: JSON.stringify({ desc, amount, category }) }),

  removeExpense: (expenseId) =>
    apiCall(`/budget/expense/${expenseId}`, { method: 'DELETE' }),

  optimize: (data) =>
    apiCall('/budget/optimize', { method: 'POST', body: JSON.stringify(data) })
}
