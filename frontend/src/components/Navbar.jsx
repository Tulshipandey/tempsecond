import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full h-16  bg-white  flex shadow-xs items-center justify-between px-10 text-white'>
      <div className='flex items-center gap-15'>
        <div className='text-2xl font-bold text-black '>ParkAndRide</div>
        <div className='flex space-x-4 gap-10 font-semibold text-gray-700'>
            <Link href='/'>Home</Link>
            <Link href='/parking'>Parking</Link>
        </div>
        </div>
        <div className='flex space-x-4'>
        <Link className='border-2 border-[#56DCC5] text-[#56DCC5] hover:bg-[#56DCC5] hover:text-white px-7 py-2 rounded-xl transition-all duration-300 font-semibold' >Log out</Link>
        <Link className='border-2 border-[#56DCC5] text-[#56DCC5] hover:bg-[#56DCC5] hover:text-white px-7 py-2 rounded-xl transition-all duration-300 font-semibold' >Profile</Link>
    </div>

    </div>

  )
}

export default Navbar