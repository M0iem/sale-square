import React from 'react'
import ShopDashboardSidebar from './ShopDashboardSidebar'
import ShopHeaderInfo from './ShopHeaderInfo'
import ShopMessages from './ShopMessages'

const ShopInboxPage = () => {
  return (
    <div>
    <div className="flex items-start justify-between w-full">
      <div className="w-[80px] 800px:w-[330px] " >
        <ShopDashboardSidebar active={6} />
      </div>
      <div className="flex flex-col w-full ">
      <ShopHeaderInfo />
      <ShopMessages/>
      </div>

    </div>
  </div>
  )
}

export default ShopInboxPage
