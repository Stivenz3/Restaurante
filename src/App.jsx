import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ReservationProvider } from './context/ReservationContext'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Events from './pages/Events'
import Reservations from './pages/Reservations'
import './App.css'

function App() {
  return (
    <ReservationProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Header />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/events" element={<Events />} />
              <Route path="/reservations" element={<Reservations />} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </div>
      </Router>
    </ReservationProvider>
  )
}

export default App
