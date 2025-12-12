import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function Restaurant() {
  const [restaurants, setRestaurants] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function init() {
      try {
        // 1. Validate user is logged in
        const me = await api.get('/api/auth/me')
        setUser(me.data)

        // 2. Fetch restaurants
        const res = await api.get('/api/restaurants')
        setRestaurants(res.data.content)
      } catch (error) {
        console.error(error)
        navigate('/login') // if not authenticated, go to login
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [navigate])

  async function handleLogout() {
    try {
      await api.post('/api/auth/logout')
    } catch (_) {}
    navigate('/login')
  }

  function handleCreateRestaurant() {
    navigate('/restaurants/create')
  }

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading... / กำลังโหลด...</div>
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Restaurant List / รายการร้านอาหาร</h1>
      <p>
        Welcome / ยินดีต้อนรับ, <strong>{user?.username}</strong> 
        {user?.role && ` (${user.role})`}
      </p>
      
      <div style={{ marginBottom: '1rem' }}>
        <button 
          onClick={handleLogout} 
          style={{ 
            marginRight: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#d32f2f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout / ออกจากระบบ
        </button>
        
        {user?.role === 'ROLE_ADMIN' && (
          <button 
            onClick={handleCreateRestaurant}
            style={{ 
              padding: '0.5rem 1rem',
              backgroundColor: '#388e3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Create Restaurant / สร้างร้านอาหาร
          </button>
        )}
      </div>

      <table 
        border="1" 
        cellPadding="8" 
        style={{ 
          marginTop: '1rem', 
          borderCollapse: 'collapse',
          width: '100%'
        }}
      >
        <thead>
          <tr style={{ background: '#eee' }}>
            <th>Name / ชื่อ</th>
            <th>Rating / คะแนน</th>
            <th>Location / สถานที่</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((r, idx) => (
            <tr key={idx}>
              <td>{r.name}</td>
              <td>{r.rating}</td>
              <td>{r.location}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {restaurants.length === 0 && (
        <p style={{ marginTop: '1rem', color: '#666' }}>
          No restaurants found. / ไม่พบร้านอาหาร
        </p>
      )}
    </div>
  )
}

