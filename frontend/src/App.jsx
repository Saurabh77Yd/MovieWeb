import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AddMovie from './pages/AddMovie'
import EditMovie from './pages/EditMovie'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/admin/add-movie" element={
            <ProtectedRoute adminOnly>
              <AddMovie />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/edit-movie/:id" element={
            <ProtectedRoute adminOnly>
              <EditMovie />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App;