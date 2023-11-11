import React, { useEffect } from 'react'
import Loader from '../Loader';
import { getAllOrdersOfAdmin } from '../../redux/actions/order';
import { getAllSellers } from "../../redux/actions/sellers";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaClipboardList } from 'react-icons/fa';
import { GiBodyBalance } from 'react-icons/gi';
import { BsShop } from 'react-icons/bs';
import moment from 'moment';
import styles from '../../styles/styles';

const AdminContent = () => {
    const dispatch = useDispatch();

    const { adminOrders,adminOrderLoading } = useSelector((state) => state.order);
    const { sellers } = useSelector((state) => state.seller);
  
    useEffect(() => {
      dispatch(getAllOrdersOfAdmin());
      dispatch(getAllSellers());
    }, []);

    const adminEarning = adminOrders && adminOrders.reduce((acc,item) => acc + item.totalPrice * .10, 0);


    const adminBalance = adminEarning?.toFixed(2);
    console.log('admin earning '+adminEarning)
 
  return (
<>
{
        adminOrderLoading ? (
          <Loader />
        ) : (
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
                    Total Earning{" "}
                    <span className="text-[16px]"></span>
                  </h3>
                </div>
                <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">${adminBalance}</h5>
              
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
                    All Sellers
                  </h3>
                </div>
                <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{sellers && sellers.length}</h5>
                <Link to="/admin-all-sellers">
                  <h5 className="pt-4 pl-2 text-[#077f9c]">View Sellers</h5>
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
                    All Orders
                  </h3>
                </div>
                <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{adminOrders && adminOrders.length}</h5>
                <Link to="/admin-all-orders">
                  <h5 className="pt-4 pl-2 text-[#077f9c]">View orders</h5>
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
                {adminOrders && adminOrders.slice(0,5).map((item,index) => (
              
                  <tr className='bg-gray-50' key={index}>
                      <td className="p-3 text-sm text-[#149bc2] cursor-pointer hover:text-black duration-300" >
                         
                        {item._id} 
        
                  
                        </td>
                      <td className={`p-3 text-sm text-gray-700 `} ><span className={`p-2 rounded-lg ${ item.status === 'Delivered'? 'bg-green-200  text-green-800': item.status === 'Processing' ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800' }`}> {item.status}</span>  </td>
                      <td className="p-3 text-sm text-gray-700 font-semibold" >{item?.cart?.reduce((acc, item) => acc + item.qty, 0)} </td>
                      <td className="p-3 text-sm text-gray-700" >{item.totalPrice}$ </td>
                      <td className="p-3 text-sm text-gray-700" >{moment(item.createdAt).format('YYYY-mm-dd')}</td>
                    
                   
                  </tr>
        
                ))
                 
                }
        
              </tbody>
              </table>
            </div>
          </div>
        )}</>

   
  )
}

export default AdminContent
