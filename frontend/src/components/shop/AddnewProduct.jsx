import React from 'react'
import ShopDashboardSidebar from './ShopDashboardSidebar'
import ShopHeaderInfo from './ShopHeaderInfo'
import CreateProduct from './CreateProduct'

const AddnewProduct = () => {
  return (
    <div>
    <div className="flex items-start justify-between w-full">
      <div className="w-[80px] 800px:w-[330px]">
        <ShopDashboardSidebar active={2} />
      </div>
      <div className="flex flex-col w-full">
      <ShopHeaderInfo />
      <CreateProduct />
      </div>

    </div>
  </div>
  )
}

export default AddnewProduct
