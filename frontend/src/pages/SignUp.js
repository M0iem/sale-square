import React, { useEffect } from 'react'
import SignUpComponent from '../components/SignUpComponent'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const {isAuthenticated} = useSelector((state) => state.user);
  const navigate=useNavigate()
  useEffect(() => {
    if(isAuthenticated===true){
      navigate('/')
    }
    console.log(isAuthenticated)
}, [])
  
  return (
    <div className='signupPageMain'>
        <SignUpComponent/>
    </div>
  )
}

export default SignUp