import React from 'react'
import UserInfo from '../UserInfo'
import ShopPreviewComponent from './ShopPreviewComponent'
import Footer from '../Footer'

const ShopPreviewPage = () => {
  return (
    <div>
   <UserInfo/>
   <div className='my-10'>
    <ShopPreviewComponent/>
   </div>
   <Footer/>
    </div>
  )
}

export default ShopPreviewPage
