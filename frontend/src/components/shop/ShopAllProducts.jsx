import React from 'react'
import ShopDashboardSidebar from './ShopDashboardSidebar'
import ShopHeaderInfo from './ShopHeaderInfo'
import AllProduct from './AllProduct'

const ShopAllProducts = () => {
  return (
    <div>
    <div className="flex items-start justify-between w-full">
      <div className="w-[80px] 800px:w-[330px] " >
        <ShopDashboardSidebar active={3} />
      </div>
      <div className="flex flex-col w-full ">
      <ShopHeaderInfo />
      <AllProduct/>
      </div>

    </div>
  </div>
  )
}

export default ShopAllProducts
