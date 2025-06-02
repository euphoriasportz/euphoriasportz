import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [sports, setSports] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('users')
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitStatus, setSubmitStatus] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [usersResponse, sportsResponse] = await Promise.all([
        fetch('http://localhost:3001/api/users'),
        fetch('http://localhost:3001/api/sports')
      ])
      
      const usersData = await usersResponse.json()
      const sportsData = await sportsResponse.json()
      
      setUsers(usersData)
      setSports(sportsData)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setSubmitStatus('submitting')
    
    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm)
      })
      
      await response.json()
      
      if (response.ok) {
        setSubmitStatus('success')
        setContactForm({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    }
  }

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    })
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🏆 EuphoriaSportz</h1>
        <p>Your ultimate sports community platform</p>
      </header>

      <nav className="nav">
        <button 
          className={activeTab === 'users' ? 'active' : ''} 
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button 
          className={activeTab === 'sports' ? 'active' : ''} 
          onClick={() => setActiveTab('sports')}
        >
          Sports
        </button>
        <button 
          className={activeTab === 'contact' ? 'active' : ''} 
          onClick={() => setActiveTab('contact')}
        >
          Contact
        </button>
      </nav>

      <main className="main">
        {activeTab === 'users' && (
          <section className="section">
            <h2>Community Members</h2>
            <div className="cards">
              {users.map(user => (
                <div key={user.id} className="card">
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'sports' && (
          <section className="section">
            <h2>Available Sports</h2>
            <div className="cards">
              {sports.map(sport => (
                <div key={sport.id} className="card">
                  <h3>{sport.name}</h3>
                  <p>{sport.category}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'contact' && (
          <section className="section">
            <h2>Contact Us</h2>
            <form onSubmit={handleContactSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleInputChange}
                  rows="4"
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={submitStatus === 'submitting'}
                className="submit-btn"
              >
                {submitStatus === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
              {submitStatus === 'success' && (
                <p className="success">Message sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="error">Error sending message. Please try again.</p>
              )}
            </form>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
