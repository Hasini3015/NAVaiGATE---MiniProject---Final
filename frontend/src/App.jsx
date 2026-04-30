import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ChatBot from './pages/ChatBot'
import TripPlanner from './pages/TripPlanner'
import Tours from './pages/Tours'
import BudgetTracker from './pages/BudgetTracker'
import Community from './pages/Community'
import Blogs from './pages/Blogs'
import GroupTravel from './pages/GroupTravel'
import About from './pages/About'
import Contact from './pages/Contact'

function Layout({ children, noFooter }) {
  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar />
      {children}
      {!noFooter && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Auth pages - no navbar/footer */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Public pages */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/tours" element={<Layout><Tours /></Layout>} />
          <Route path="/blogs" element={<Layout><Blogs /></Layout>} />
          <Route path="/group-travel" element={<Layout><GroupTravel /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />

          {/* Protected pages - require login */}
          <Route path="/planner" element={
            <Layout>
              <ProtectedRoute><TripPlanner /></ProtectedRoute>
            </Layout>
          } />
          <Route path="/chat" element={
            <Layout noFooter>
              <ProtectedRoute><ChatBot /></ProtectedRoute>
            </Layout>
          } />
          <Route path="/budget" element={
            <Layout>
              <ProtectedRoute><BudgetTracker /></ProtectedRoute>
            </Layout>
          } />
          <Route path="/community" element={
            <Layout noFooter>
              <ProtectedRoute><Community /></ProtectedRoute>
            </Layout>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  )
}
