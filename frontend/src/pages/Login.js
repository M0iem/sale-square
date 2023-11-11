import React, { useEffect } from 'react'
import LoginComponent from '../components/LoginComponent';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const {isAuthenticated} = useSelector((state) => state.user);
  const navigate=useNavigate()
  useEffect(() => {
    if(isAuthenticated===true){
      navigate('/')
    }
    console.log(isAuthenticated)
}, [])
  
  return (
    <div className='loginPageMain'>
        <LoginComponent/>
    </div>
  )
}

export default Login