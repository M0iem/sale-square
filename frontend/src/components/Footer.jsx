import React from 'react'
import {AiFillFacebook, AiFillGithub, AiFillLinkedin, AiFillTwitterCircle,} from 'react-icons/ai'


const Footer = () => {
 
  return (
    <footer className='bg-gray-900 text-white '>
      <div className='md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] py-7'>
        <h1 className='lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5'>
          <span className='text-[#de5cec] '>Free </span> until you're ready to launch
        </h1>
        <div>
          <button className="bg-[#de5cec]  hover:bg-[#95389f] duration-300 px-5 py-2.5 rounded-md text-white md:w-auto w-full ">
            Become a seller
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-8">
        <span>© 2023. All rights reserved</span>
        <span>Terms.Privacy Policy</span>
        <div className='text-[#95389f] '>

          <span className='p-2 cursor-pointer inline-flex items-center rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-[#95389f] duration-300'>
            <AiFillFacebook/>
          </span>
          <span className='p-2 cursor-pointer inline-flex items-center rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-[#95389f] duration-300'>
            <AiFillGithub/>
          </span>
          <span className='p-2 cursor-pointer inline-flex items-center rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-[#95389f] duration-300'>
            <AiFillLinkedin/>
          </span>
          <span className='p-2 cursor-pointer inline-flex items-center rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-[#95389f] duration-300'>
            <AiFillTwitterCircle/>
          </span>

        </div>
      </div>
    </footer>
  )
}

export default Footer