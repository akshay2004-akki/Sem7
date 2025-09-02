import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Hero from './components/Hero'

function App() {


  return (
    <>
       <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<>
          <Hero/>
          </>} />
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
       </Router>
    </>
  )
}

export default App
