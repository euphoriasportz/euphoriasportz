import { Routes, Route } from 'react-router-dom'
import './App.css'

// Layout
import Layout from './components/Layout'

// Pages
import Home from './pages/Home'
import Booking from './pages/Booking'
import Confirmation from './pages/Confirmation'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Admin from './pages/Admin'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="book" element={<Booking />} />
        <Route path="confirmation" element={<Confirmation />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="about" element={<About />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
  )
}

export default App
