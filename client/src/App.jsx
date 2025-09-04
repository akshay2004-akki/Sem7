import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Hero from './components/Hero'
import { ThemeProvider } from 'next-themes'
import Featured from './components/Featured'
import PopularCategories from './components/PopularCategories'

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
          </>} />
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
       </Router>
    </>
  )
}

export default App
