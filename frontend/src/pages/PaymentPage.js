import React from 'react'



import Payment from "../components/checkout/Payment";
import UserInfo from '../components/UserInfo';
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import Footer from '../components/Footer';

const PaymentPage = () => {
  return (
    <div className='w-full min-h-screen bg-[#f6f9fc]'>
       <UserInfo />
      
       {/* <CheckoutSteps active={2} /> */}
       <Payment />
    
       <Footer />
    </div>
  )
}

export default PaymentPage