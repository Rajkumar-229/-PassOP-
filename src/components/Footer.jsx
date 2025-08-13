import React from 'react'

const Footer = () => {
    return (
        <div className=' w-full '>
            <div className='bg-gray-700 flex flex-col justify-center items-center w-full text-white'>
                <nav className='font-bold pt-2 pb-1 rounded text-white flex'>
                    <div className='text-2xl'><a href="/"><span>&lt;Pass</span><span className='text-green-400'>OP/&gt;</span></a></div>
                </nav>
                <div className='font-bold text-xl pb-2'>Created with<span className='w-10'>❤️</span>by Rajkumar</div>
            </div>

        </div>
    )
}

export default Footer
