import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Login from './pages/Login'
import Home from './pages/Home'
import Cart from './pages/CartPage'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  return (
    <>
      <AuthProvider>
        <Router>
          <div className='d-flex flex-column min-vh-100'>
            <Navbar />
            <main className='flex-fill'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/cart' element={<Cart />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
