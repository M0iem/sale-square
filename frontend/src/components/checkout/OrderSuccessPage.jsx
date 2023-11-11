import React from 'react'
import ReactConfetti from 'react-confetti'
import { Link } from 'react-router-dom'

const OrderSuccessPage = () => {
  return (
    <div>
      <ReactConfetti/>
      <div className='w-full h-screen flex justify-center items-center '>
        <h2 className='text-2xl '> 
        Your Order is Successful !!  <Link to='/'><span className='cursor-pointer text-[#169CC2]'>Back to home </span></Link> </h2>


      </div>
    </div>
  )
}

export default OrderSuccessPage
