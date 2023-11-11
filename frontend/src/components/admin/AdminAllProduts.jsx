import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { server } from '../../server';
import Loader from '../Loader';
import { AiFillEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const AdminAllProduts = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      axios.get(`${server}/product/admin-all-products`, {withCredentials: true}).then((res) => {
          setData(res.data.products);
      })
    }, []);
  return (
  
      <div className="w-full pl-8 pt-1 bg-white">
         <div className='text-center'>
                    <h5 className='text-gray-500 '> Products</h5>
                    <h1 className='text-4xl w-96 mx-auto leading-normal font-bold mb-12 whitespace-pre align-middle '>All The Products</h1>
                    </div>
            <table className='w-[90%]'>
                  <thead className='bg-[#ebe1ed] border-b-2 border-gray-200 '>
                    <tr>
                      
                      <td className='p-3 text-sm font-semibold tracking-wide text-left ' >Product Id</td>
                      <td className='p-3 text-sm font-semibold tracking-wide text-left' >Name</td>
                      <td className='p-3 text-sm font-semibold tracking-wide text-left' >Price</td>
                      <td className='p-3 text-sm font-semibold tracking-wide text-left' >Stock</td>
                      <td className='p-3 text-sm font-semibold tracking-wide text-left' >Sold</td>
                      <td className='p-3 text-sm font-semibold tracking-wide text-left' >Preview</td>
                 
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.map((item,index) => (
                  
                      <tr className='bg-gray-50' key={index}>
                          <td className="p-3 text-sm text-[#149bc2] cursor-pointer hover:text-black duration-300" >
                           
                            {item._id} 
          
                    
                            </td>
                          <td className={`p-3 text-sm text-gray-700 `} >{item.name} </td>
                          <td className="p-3 text-sm text-gray-700 font-semibold" >{item.discountPrice}$ </td>
                          <td className="p-3 text-sm text-gray-700" >{item.stock} </td>
                          <td className="p-3 text-sm text-gray-700" >{item?.sold_out}</td>
                        
                          <td className="p-3 text-sm text-gray-700 cursor-pointer  " >
                              <Link to={`/product/${item._id}`}>
                                  <AiFillEye fill="#8c2a8e" size={24}/>

                              </Link>
                          </td>
                        
                       
                      </tr>
                    ))
                     
                    }
          
                  </tbody>
                  </table>
     
      </div>
    
  
  )
}

export default AdminAllProduts
