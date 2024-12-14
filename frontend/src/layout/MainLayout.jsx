import Navbar from '@/components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen bg-gray-900 text-white'>
        <Navbar />
        <div className='flex-1 mt-16'>
            <Outlet />
        </div>
    </div>
  )
}

export default MainLayout
