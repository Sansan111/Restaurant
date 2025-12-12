import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Restaurant from './pages/Restaurant'
import CreateRestaurant from './pages/CreateRestaurant'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/restaurants" element={<Restaurant />} />
        <Route path="/restaurants/create" element={<CreateRestaurant />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

