import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { server } from '../server';
import '../styles/activationMsg.css'

const ActivationPage = () => {
  const  {activationToken}=useParams();
  const [error,setError]=useState(false);
  useEffect(()=>{
    if (activationToken) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/user/activation`, {
            activationToken,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setError(true);
          });
      };
      sendRequest();
      console.log('twice')
    


    }
  },[]);
  return (
    <div className='activationContainer'>
      { error?(
        <p>
          Your token is expired. Please try again <button><Link to="/sign-up">Sign-up</Link></button>
        </p>

      ):(
        <p>
          Your account has been created successfully. <button><Link to="/login">Login</Link></button>

        </p>
      ) }
    </div>
  )
}

export default ActivationPage