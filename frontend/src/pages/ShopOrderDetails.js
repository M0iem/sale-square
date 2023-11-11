import React from 'react'
import OrderDetails from '../components/shop/OrderDetails'
import ShopHeaderInfo from '../components/shop/ShopHeaderInfo'
import ShopDashboardSidebar from '../components/shop/ShopDashboardSidebar'

const ShopOrderDetails = () => {
  return (
    <div>
    <div className="flex items-start justify-between w-full">
      <div className="w-[80px] 800px:w-[330px] " >
        <ShopDashboardSidebar active={4} />
      </div>
      <div className="flex flex-col w-full ">
      <ShopHeaderInfo />
      <OrderDetails />
      </div>

    </div>
  </div>
  )
}

export default ShopOrderDetails
