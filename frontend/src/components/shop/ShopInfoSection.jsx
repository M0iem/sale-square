import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import { FaClipboardList } from "react-icons/fa";
import { GiBodyBalance } from "react-icons/gi";
import { BsShop } from "react-icons/bs";
import moment from "moment";

const ShopInfoSection = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
     dispatch(getAllOrdersOfShop(seller._id));
     dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);

  const availableBalance = seller?.availableBalance.toFixed(2);


  return (
    <div className="w-full p-8 z-10">
      <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
      <div className="w-full block 800px:flex items-center justify-between">
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <GiBodyBalance
              size={30}
              className="mr-2"
              fill="#973A7A"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#C4AA4F]`}
            >
              Account Balance{" "}
              <span className="text-[16px]"></span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">${availableBalance}</h5>
          <Link to="/dashboard-withdraw-money">
            <h5 className="pt-4 pl-[2] text-[#077f9c]">Withdraw Money</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <FaClipboardList size={30} className="mr-2" fill="#973A7A" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#C4AA4F]`}
            >
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{orders && orders.length}</h5>
          <Link to="/dashboard-orders">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <BsShop
              size={30}
              className="mr-2"
              fill="#973A7A"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#C4AA4F]`}
            >
              All Products
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{products && products.length}</h5>
          <Link to="/dashboard-products">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
          </Link>
        </div>
      </div>
      <br />
      <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
      <div className="w-full min-h-[45vh] bg-white rounded">
      <table className='w-[90%]'>
        <thead className='bg-[#ebe1ed] border-b-2 border-gray-200 '>
          <tr>
            
            <td className='p-3 text-sm font-semibold tracking-wide text-left ' >OrderId</td>
            <td className='p-3 text-sm font-semibold tracking-wide text-left' >status</td>
            <td className='p-3 text-sm font-semibold tracking-wide text-left' >itemsQty</td>
            <td className='p-3 text-sm font-semibold tracking-wide text-left' >total</td>
            <td className='p-3 text-sm font-semibold tracking-wide text-left' >Created at</td>
          </tr>
        </thead>
        <tbody>
          {orders && orders.map((item,index) => (
        
            <tr className='bg-gray-50' key={index}>
                <td className="p-3 text-sm text-[#149bc2] cursor-pointer hover:text-black duration-300" >
                    <Link to={`/order/${item._id}`}>
                  {item._id} 

            </Link>
                  </td>
                <td className={`p-3 text-sm text-gray-700 `} ><span className={`p-2 rounded-lg ${ item.status === 'Delivered'? 'bg-green-200  text-green-800': item.status === 'Processing' ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800' }`}> {item.status}</span>  </td>
                <td className="p-3 text-sm text-gray-700 font-semibold" >{item.cart.length} </td>
                <td className="p-3 text-sm text-gray-700" >{item.totalPrice}$ </td>
                <td className="p-3 text-sm text-gray-700" >{moment(item.createdAt).format('YYYY-mm-dd')}</td>
              
             
            </tr>

          ))
           
          }

        </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShopInfoSection
