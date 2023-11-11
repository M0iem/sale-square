import React from 'react'
import UserInfo from '../components/UserInfo'
import Footer from '../components/Footer'
import CheckoutSteps from '../components/checkout/CheckoutSteps'
import Checkout from '../components/checkout/Checkout'

const CheckoutPage = () => {
  return (
    <div>
      <UserInfo/>
      {/* <CheckoutSteps/> */}
      <Checkout/>

      <Footer/>
    </div>
  )
}

export default CheckoutPage
