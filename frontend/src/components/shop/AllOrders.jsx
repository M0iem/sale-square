import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import moment from 'moment';
import Loader from '../Loader';

const AllOrders = () => {
    const { orders, isLoading } = useSelector((state) => state.order);
    const { seller } = useSelector((state) => state.seller);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getAllOrdersOfShop(seller._id));
    }, []);
  
  
  
  
  
  
    return (
        
       <>
        {isLoading ?(
                <Loader/>
                ):(
                    <div className="pl-8 pt-1">
                    <div className='text-center'>
                    <h5 className='text-gray-500 '> Orders</h5>
                    <h1 className='text-4xl w-96 mx-auto leading-normal font-bold mb-12 whitespace-pre align-middle '>All My orders</h1>
                    </div>
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
                )
            }
       </>
    );
  };

export default AllOrders
