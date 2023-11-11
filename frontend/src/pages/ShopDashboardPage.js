import React from "react";
import ShopDashboardSidebar from "../components/shop/ShopDashboardSidebar";
import ShopInfoSection from "../components/shop/ShopInfoSection";
import ShopHeaderInfo from "../components/shop/ShopHeaderInfo";


const ShopDashboardPage = () => {
  return (
    <div>
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px] " >
          <ShopDashboardSidebar active={1} />
        </div>
        <div className="flex flex-col w-full ">
        <ShopHeaderInfo />
        <ShopInfoSection />
        </div>

      </div>
    </div>
  );
};

export default ShopDashboardPage;
