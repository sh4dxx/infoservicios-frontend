import './App.css'
import { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import UserProvider, { UserContext } from './context/UserContext'
import CartServiceProvider from './context/CartContext'
import LoadingProvider from './context/LoadingContext'

import Navigation from './components/navbar/Navigation'
import LoadingOverlay from './components/LoadingOverlay'
import CustomerProfile from './pages/customer/ProfileCustomer'
import Footer from './components/footer/Footer'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import CartPage from './pages/CartPage'

const App = () => {
  const { userToken } = useContext(UserContext)

  return (
    <>
      <div className='d-flex flex-column min-vh-100'>
        <LoadingProvider>
          <LoadingOverlay />
          <main className='flex-fill'>
            <UserProvider>
              <CartServiceProvider>
                <Navigation />

                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/profile' element={<CustomerProfile />} />
                  <Route path='/login' element={!userToken ? <Login /> : <Navigate to='/' />} />
                  <Route path='/cart' element={<CartPage />} />
                  <Route path='/404' element={<NotFound />} />
                  <Route path='*' element={<NotFound />} />
                </Routes>
              </CartServiceProvider>
            </UserProvider>
          </main>
        </LoadingProvider>
        <Footer />
      </div>
    </>
  )
}

export default App
