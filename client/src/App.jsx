import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Hero from './components/Hero'
import { ThemeProvider } from 'next-themes'
import Featured from './components/Featured'

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
          </>} />
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
       </Router>
    </>
  )
}

export default App
