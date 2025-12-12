import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import GoogleLoginButton from '../components/GoogleLoginButton'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    
    try {
      const response = await api.post('/api/auth/login', {
        username,
        password,
      })
      
      console.log(response.data.message)
      // Cookie is automatically saved by browser
      navigate('/restaurants')
    } catch (err) {
      setError(err.response?.data || 'Login failed')
      console.error(err)
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Login / เข้าสู่ระบบ</h1>
      
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
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Username / ชื่อผู้ใช้:
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '0.5rem', 
              fontSize: '1rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Password / รหัสผ่าน:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '0.5rem', 
              fontSize: '1rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>
        
        <button 
          type="submit"
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            fontSize: '1rem',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Login / เข้าสู่ระบบ
        </button>
      </form>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #ccc' }} />
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
          Google Login / เข้าสู่ระบบด้วย Google
        </h2>
        <GoogleLoginButton />
      </div>
    </div>
  )
}

