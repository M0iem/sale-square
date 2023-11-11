import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import '../../styles/activationMsg.css'
import UserInfo from '../UserInfo';
import { server } from '../../server';

const ShopActivation = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  useEffect(()=>{
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/shop/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setError(true);
          });
      };
      sendRequest();
    }
  }, []);
  return (
    
    <>
        <UserInfo/>
    <div className='flex justify-center items-center h-[50vh]'>
      { error?(
        <p className='text-xl'>
          Your token is expired. Please try again , <button className='text-[#149BC2] text-3xl'><Link to="/shop-create"> Sign-up</Link></button>
        </p>

      ):(
        <p className='text-xl'>
          Your account has been created successfully. <button className='text-[#149BC2] text-3xl'><Link to="/shop-login"> Login</Link></button>

        </p>
      ) }
    </div>
    </>
  )
}

export default ShopActivation