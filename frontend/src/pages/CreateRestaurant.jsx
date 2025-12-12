import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function CreateRestaurant() {
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: 5.0,
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    async function checkAuth() {
      try {
        const me = await api.get('/api/auth/me')
        setUser(me.data)
        
        // Check if user is admin
        if (me.data.role !== 'ROLE_ADMIN') {
          navigate('/restaurants')
        }
      } catch (error) {
        console.error(error)
        navigate('/login')
      }
    }
    checkAuth()
  }, [navigate])

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseFloat(value) : value
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    try {
      await api.post('/api/restaurants', formData)
      setSuccess('Restaurant created successfully! / สร้างร้านอาหารสำเร็จ!')
      
      // Reset form
      setFormData({
        name: '',
        location: '',
        rating: 5.0,
      })
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/restaurants')
      }, 2000)
    } catch (err) {
      setError(err.response?.data || 'Failed to create restaurant / ไม่สามารถสร้างร้านอาหารได้')
      console.error(err)
    }
  }

  function handleCancel() {
    navigate('/restaurants')
  }

  if (!user) {
    return <div style={{ padding: '2rem' }}>Loading... / กำลังโหลด...</div>
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Create Restaurant / สร้างร้านอาหาร</h1>
      <p style={{ color: '#666', marginBottom: '1.5rem' }}>
        Logged in as / เข้าสู่ระบบในฐานะ: <strong>{user.username}</strong> ({user.role})
      </p>

      {error && (
        <div style={{ 
          padding: '1rem', 
          marginBottom: '1rem', 
          backgroundColor: '#ffebee', 
          color: '#c62828',
          borderRadius: '4px' 
        }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{ 
          padding: '1rem', 
          marginBottom: '1rem', 
          backgroundColor: '#e8f5e9', 
          color: '#2e7d32',
          borderRadius: '4px' 
        }}>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Restaurant Name / ชื่อร้านอาหาร: *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter restaurant name / กรอกชื่อร้านอาหาร"
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              fontSize: '1rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Location / สถานที่: *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Enter location / กรอกสถานที่"
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              fontSize: '1rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Rating / คะแนน: *
          </label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
            min="0"
            max="5"
            step="0.1"
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              fontSize: '1rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <small style={{ color: '#666' }}>
            Rating should be between 0 and 5 / คะแนนควรอยู่ระหว่าง 0 ถึง 5
          </small>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            type="submit"
            style={{ 
              flex: 1,
              padding: '0.75rem', 
              fontSize: '1rem',
              backgroundColor: '#388e3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Create / สร้าง
          </button>

          <button 
            type="button"
            onClick={handleCancel}
            style={{ 
              flex: 1,
              padding: '0.75rem', 
              fontSize: '1rem',
              backgroundColor: '#757575',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Cancel / ยกเลิก
          </button>
        </div>
      </form>
    </div>
  )
}

