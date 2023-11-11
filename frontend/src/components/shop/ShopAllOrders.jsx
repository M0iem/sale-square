import React from 'react'

import ShopHeaderInfo from './ShopHeaderInfo';
import ShopDashboardSidebar from './ShopDashboardSidebar';
import AllOrders from './AllOrders';

const ShopAllOrders = () => {
  return (
    <div>
    <div className="flex items-start justify-between w-full">
      <div className="w-[80px] 800px:w-[330px] " >
        <ShopDashboardSidebar active={4} />
      </div>
      <div className="flex flex-col w-full ">
      <ShopHeaderInfo />
      <AllOrders/>
      </div>

    </div>
  </div>
  )
}

export default ShopAllOrders