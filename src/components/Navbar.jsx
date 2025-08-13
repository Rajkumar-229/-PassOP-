import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-gray-700'>
       <nav className='font-bold h-105 myContainer p-3 rounded text-white flex justify-between'>
        <div className='text-2xl'><span>&lt;Pass</span><span className='text-green-400'>OP/&gt;</span></div>
        <ul className="flex flex-col md:flex-row md:pr-0 pr-2 md:gap-4">
             <a href='/' className='hover:underline w-12 hover:font-extrabold text-[17px]'>Home</a>
             <a href='/about' className='hover:underline w-12 hover:font-extrabold text-[17px]'>About</a>
             <a href='/contact' className='hover:underline w-12 hover:font-extrabold text-[17px]'>Contact</a>
        </ul>
         </nav>
    </div>
  )
}

export default Navbar
