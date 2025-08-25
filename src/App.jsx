import './App.css'
import { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import UserProvider, { UserContext } from './context/UserContext'
import Context2Provider from './context/ExampleContext2'
import CartServiceProvider from './context/CartContext'
import LoadingProvider from './context/LoadingContext'

import Navigation from './components/navbar/Navigation'
import LoadingOverlay from './components/LoadingOverlay'
import Footer from './components/footer/Footer'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import CustomerShow from './pages/customer/CustomerShow'
import Home from './pages/Home'
import CartPage from './pages/CartPage'

const App = () => {
  const { userToken, loading } = useContext(UserContext)
  console.log(userToken)

  return (
    <>
      <div className='d-flex flex-column min-vh-100'>
        <Navigation />
        <LoadingProvider>
          <LoadingOverlay />
          <main className='flex-fill'>
            <UserProvider>
              <Context2Provider>
                <CartServiceProvider>

                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/customer/profile' element={<CustomerShow />} />
                    <Route path='/login' element={!userToken ? <Login /> : <Navigate to='/' />} />

                    <Route path='/cart' element={<CartPage />} />

                    <Route path='/404' element={<NotFound />} />
                    <Route path='*' element={<NotFound />} />
                  </Routes>

                </CartServiceProvider>
              </Context2Provider>
            </UserProvider>
          </main>
        </LoadingProvider>
        <Footer />
      </div>
    </>
  )
}

export default App
