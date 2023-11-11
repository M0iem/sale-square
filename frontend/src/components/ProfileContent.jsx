import React, { useEffect, useState } from 'react'
import { AiOutlineArrowRight, AiOutlineCamera } from 'react-icons/ai'
import { backend_url, server } from '../server'
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment"

import styles from '../styles/styles';
import { toast } from 'react-toastify';
import axios from 'axios';
import {
  deleteUserAddress,
  loadUser,
  updatUserAddress,
  updateUserInformation,
} from "../redux/actions/user";
import { getAllOrdersOfUser } from "../redux/actions/order";
import { Link } from "react-router-dom";
import { MdTrackChanges } from 'react-icons/md';


const ProfileContent = ({active}) => {
    const { user, error, successMessage } = useSelector((state) => state.user);
    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch({ type: "clearErrors" });
      }
      if (successMessage) {
        toast.success(successMessage);
        dispatch({ type: "clearMessages" });
      }
    }, [error, successMessage]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(updateUserInformation(name, email, phoneNumber, password));
    };
  
    const handleImage = async (e) => {
      const file = e.target.files[0];
      setAvatar(file);
  
      const formData = new FormData();
  
      formData.append("image", e.target.files[0]);
  
      await axios
        .put(`${server}/user/update-avatar`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })
        .then((response) => {
           dispatch(loadUser());
           toast.success("avatar updated successfully!");
        })
        .catch((error) => {
          toast.error(error);
        });
    };
  
  return (
    <div className='w-full pt-5 '>
      {active===1 && (
        <>
        <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${backend_url}${user?.avatar}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#8C2A8E] "
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                 onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>

          <div className="w-full px-5 mt-10">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 px-3 `}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0 px-3`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 px-3`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Enter your password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 px-3`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={` w-[250px] h-[40px] border border-[#8C2A8E] text-center text-[#8C2A8E] rounded-md mt-8 cursor-pointer hover:bg-[#8C2A8E] hover:text-white duration-300 `}
                required
                value="Save Changes"
                type="submit"
              />
            </form>
          </div>
        </>
      )}
   
      {/* orders */}
         {active === 3 && (
        <div>
          <AllOrders/>
        </div>
      )}
      {/* dahboard*/}
         {active === 2 && (
        <div>
          <Dashboard/>
        </div>
      )}
     
      {/* My Inbox*/}
         {active ===4 && (
        <div>
          hi 
        </div>
      )}
      {/* track ordeer*/}
         {active ===5 && (
        <div>
          <TrackOrder/>
        </div>
      )}
    </div>
  )

  
}
const AllOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);






  return (
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
                    <Link to={`/user/order/${item.id}`}>
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
  );
};
const TrackOrder = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);






  return (
    <div className="pl-8 pt-1">
        <div className='text-center'>
        <h5 className='text-gray-500 '> Tracking</h5>
        <h1 className='text-4xl w-96 mx-auto leading-normal font-bold mb-12 whitespace-pre align-middle '>Track all the Orders</h1>
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
                    <Link to={`/user/track/order/${item.id}`}>
                  {item._id} 

            </Link>
                  </td>
                <td className={`p-3 text-sm text-gray-700 `} ><span className={`p-2 rounded-lg ${ item.status === 'Delivered'? 'bg-green-200  text-green-800': item.status === 'Processing' ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800' }`}> {item.status}</span>  </td>
                <td className="p-3 text-sm text-gray-700 font-semibold" >{item.cart.length} </td>
                <td className="p-3 text-sm text-gray-700 font-bold" >{item.totalPrice}$ </td>
                <td className="p-3 text-sm text-gray-700" >{moment(item.createdAt).format('YYYY-mm-dd')} </td>
              
             
            </tr>
          

            
            
               



          ))
           
          }

        </tbody>
        </table>
    </div>
  );
};

const Dashboard=()=>{
  const { user } = useSelector((state) => state.user);

  return (
    <div className='flex px-10 flex-col justify-left gap-10'>
          <div className='flex items-center gap-5'>
      <img
                src={`${backend_url}${user?.avatar}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#8C2A8E] "
                alt=""
              />
              <h3 className='text-4xl font-semibold'>{user?.name}</h3>
    </div>
    <div>
      <h4 ><span className='font-bold mr-5'>Email : </span> {user?.email} </h4>
      <h4 ><span className='font-bold mr-5'>Phone :</span> +212 {user?.phoneNumber} </h4>
      

    </div>
    </div>

  )

}




export default ProfileContent
