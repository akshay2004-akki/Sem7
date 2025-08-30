// import { useEffect, useState } from 'react'; 
"use client"
import logo from '../assets/Flat Vector Logo with Vibrant Greens (1).png'
import { ExpandedTabs } from './ui/expanded-tabs.jsx'

import {
  Bell,
  FileText,
  HelpCircle,
  Home,
  Lock,
  Mail,
  Settings,
  Shield,
  User,
} from "lucide-react"

export default function Navbar() {
//   const [isProfileOpen, setProfileOpen] = useState(false);

//   useEffect(()=>{
//     const fetchDetails = async()=>{

//     }
//   },[])
const tabs = [
    { title: "Dashboard", icon: Home },
    { title: "Notifications", icon: Bell }, 
    { title: "Settings", icon: Settings },
    { title: "Support", icon: HelpCircle },
    { title: "Security", icon: Shield }, 
  ]

  return (
    <header className="h-14 flex items-center justify-between px-3 bg-black dark:border-gray-700 fixed w-full z-999 ">
      {/* Left side: Hamburger menu and Search */}
        
        <div className='w-auto'>
            <img src={logo} alt="Not Found" className='h-12 rounded' />
        </div>

        <div className='flex items-center justify-center'>
            <ExpandedTabs tabs={tabs} />
        </div>

        <button className='bg-amber-300 rounded-full'>
            <img src="" alt="" className='rounded-full h-[45px] w-[45px] ' />
        </button>

        {/* <div className='w-[240px] bg-amber-300'>

        </div> */}

      
    </header>
  );
}