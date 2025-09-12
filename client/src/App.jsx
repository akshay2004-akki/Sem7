import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

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
import Courses from './components/Courses'
import Notifications from './components/Notifications';
import UserProfile from './components/Profile';


function App() {
   useEffect(() => {
    const lenis = new Lenis({
      duration: 2, // scroll smoothing factor
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

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
          <Route path='/courses' element={<Courses/>}/>
          <Route path='/notifications' element={<Notifications/>} />
          <Route path='/profile' element={<UserProfile/>}></Route>
        </Routes>
        <Footer/>
       </Router>
    </>
  )
}

export default App
