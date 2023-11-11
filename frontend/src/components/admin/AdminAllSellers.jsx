import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllSellers } from '../../redux/actions/sellers';
import axios from 'axios';
import { toast } from 'react-toastify';
import { server } from '../../server';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { RxCross1 } from 'react-icons/rx';
import styles from '../../styles/styles';

const AdminAllSellers = () => {
    const dispatch = useDispatch();
    const { sellers } = useSelector((state) => state.seller);
    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState("");
  
    useEffect(() => {
      dispatch(getAllSellers());
    }, [dispatch]);
  
    const handleDelete = async (id) => {
      await axios
      .delete(`${server}/shop/delete-seller/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
      });
  
    dispatch(getAllSellers());
    };
  
  return (
    
             <div className="w-full pl-8 pt-1 bg-white">
                 <div className='text-center'>
                    <h5 className='text-gray-500 '> Sellers</h5>
                    <h1 className='text-4xl w-96 mx-auto leading-normal font-bold mb-12 whitespace-pre align-middle '>All The Sellers</h1>
                    </div>
            <table className='w-[90%]'>
                  <thead className='bg-[#ebe1ed] border-b-2 border-gray-200 '>
                    <tr>
                      
                      <td className='p-3 text-sm font-semibold tracking-wide text-left ' >id</td>
                      <td className='p-3 text-sm font-semibold tracking-wide text-left' >name</td>
                      <td className='p-3 text-sm font-semibold tracking-wide text-left' >email</td>
                      <td className='p-3 text-sm font-semibold tracking-wide text-left' >Address</td>
                      <td className='p-3 text-sm font-semibold tracking-wide text-left' >joinedAt</td>
                      <td className='p-3 text-sm font-semibold tracking-wide text-left' >Delete</td>
                    
                 
                    </tr>
                  </thead>
                  <tbody>
                    {sellers && sellers.map((item,index) => (
                  
                      <tr className='bg-gray-50' key={index}>
                          <td className="p-3 text-sm text-[#149bc2] cursor-pointer hover:text-black duration-300" >
                           
                            {item._id} 
          
                    
                            </td>
                          <td className={`p-3 text-sm text-gray-700 `} >{item.name} </td>
                          <td className="p-3 text-sm text-gray-700 font-semibold" >{item.email}$ </td>
                          <td className="p-3 text-sm text-gray-700" >{item.address} </td>
                          <td className="p-3 text-sm text-gray-700" >{item?.createdAt?.slice(0,10)}</td>
                        
                          <td className="p-3 text-sm text-gray-700 cursor-pointer  " >
                              <Link>
                                  <AiFillDelete fill="#8c2a8e" size={24}  onClick={() => setUserId(item._id) || setOpen(true)}/>

                              </Link>
                          </td>
                        
                       
                      </tr>
                    ))
                     
                    }
          
                  </tbody>
                  </table>

                  {open && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpen(false)} />
              </div>
              <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                you are about to delete this shop 
              </h3>
              <div className="w-full flex items-center justify-center gap-10">
                <div
                  className={`${styles.button} hover:scale-95 duration-300 px-10  !bg-[#bf9b3c] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                  onClick={() => setOpen(false)}
                >
                  cancel
                </div>
                <div
                  className={`${styles.button} hover:scale-95 duration-300 px-10 !bg-[#16171E] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                  onClick={() =>  setOpen(false) || handleDelete(userId)}
                >
                  confirm
                </div>
              </div>
            </div>
          </div>
        )}
     
      </div>
      
    
  )
}

export default AdminAllSellers
