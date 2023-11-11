import React from 'react'
import ShopDashboardSidebar from '../components/shop/ShopDashboardSidebar'
import ShopHeaderInfo from '../components/shop/ShopHeaderInfo'
import ShopSettingComponent from '../components/shop/ShopSettingComponent'

const ShopSettingPage = () => {
  return (
    <div>
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px] " >
          <ShopDashboardSidebar active={7} />
        </div>
        <div className="flex flex-col w-full ">
        <ShopHeaderInfo />
        <ShopSettingComponent />
        </div>

      </div>
    </div>
  )
}

export default ShopSettingPage