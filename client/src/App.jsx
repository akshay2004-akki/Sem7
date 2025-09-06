import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Hero from './components/Hero'
import { ThemeProvider } from 'next-themes'
import Featured from './components/Featured'
import PopularCategories from './components/PopularCategories'
import Instructors from './components/Instructors'
import ReviewsSection from './components/ReviewSection'
import Connect from './components/Connect'
import TrendingTech from './components/TrendingTech'
import Community from './components/Community'
import JoinUs from './components/JoinUs'
import Footer from './components/Footer'

function App() {


  return (
    <>
       <Router>
        <ThemeProvider>        
          <Navbar/>
          </ThemeProvider>

        <Routes>
          <Route path='/' element={<>
          <Hero/>
          <Featured/>
          <PopularCategories/>
          <Instructors/>
          <ReviewsSection/>
          <Connect/>
          <TrendingTech/>
          <Community/>
          <JoinUs/>
          </>} />
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
        <Footer/>
       </Router>
    </>
  )
}

export default App
