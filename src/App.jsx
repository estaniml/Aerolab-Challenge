import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navigate } from "react-router-dom";
import Footer from './components/Footer'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Profile from './pages/Profile'
import { MyProvider } from './context/MyContext'

function App() {
  return (
    <BrowserRouter>
      <MyProvider>

        <Navbar />

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={ <Profile />} />
            <Route path="*" element={ <Navigate to='/' />} />
        </Routes>

        <Footer />

      </MyProvider>
    </BrowserRouter>
  )
}

export default App
