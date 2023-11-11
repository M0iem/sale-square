import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { server } from '../../server';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import "../../styles/login.css";
import bgShop from '../../images/bg2.jpg'
import UserInfo from '../UserInfo';

const ShopLoginPageComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate=useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/shop/login-shop`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Login Success!");
        navigate("/dashboard");
        window.location.reload(true); 
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };


  return (
    <div className='py-10'>
       <UserInfo/>
          <div className="loginContainer m-auto"  style={{backgroundImage:`url(${bgShop})`,backgroundSize:"cover", backgroundRepeat:"no-repeat"}}>
    {/* <Link to="/">
   <AiFillLeftCircle color="white" size="30px" cursor="pointer"/>
   </Link> */}
   <h2>Login To Your Store </h2>
   <form onSubmit={handleSubmit}>
     <div className="group">
       <label htmlFor="email">Email :</label>
       <input
         type="email"
         name="email"
         autoComplete="email"
         required
         value={email}
         onChange={(e) => setEmail(e.target.value)}
       />
     </div>
     <div className="group">
       <label htmlFor="password">Password :</label>
       <input
         type={visible ? "text" : "password"}
         name="password"
         autoComplete="current-password"
         required
         value={password}
         onChange={(e) => setPassword(e.target.value)}
       />
       {visible ? (
         <AiOutlineEye style={{ position:"absolute", right:"50px",marginTop:"30px",color:"black",fontSize:"20px",cursor:"pointer"}}  onClick={() => setVisible(false)} />
       ) : (
         <AiOutlineEyeInvisible style={{ position:"absolute", right:"50px",marginTop:"30px",color:"black",fontSize:"20px",cursor:"pointer"}} onClick={() => setVisible(true)} />
       )}
     </div>
     <div className=" groupforgot">
         <div className="checkgroup">
         <input className="check" type="checkbox" name="remember-me" id="remember-me" />
         <label htmlFor="remember-me"> Remember me</label>
         </div>
         <a className="fgp" href="#">Forgot yout password?</a>
     </div>
     <div className="group">
         <button className="btnLogin" type="submit">
             Login
         </button>
     </div>
   </form>
   <div className="more">
     <h4>Dont have a store?  <Link className="link" to='/shop-create'>become a seller.</Link></h4>
    
   </div>
 </div>
    </div>
  )
}

export default ShopLoginPageComponent
