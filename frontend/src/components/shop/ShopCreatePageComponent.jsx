import React, { useState } from "react";
import { AiFillLeftCircle, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import UserInfo from '../UserInfo.jsx'
import { Link,useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios"; 
import {server}from "../../server.js"
import { toast } from "react-toastify";
import bgShop from '../../images/bg2.jpg'
import '../../styles/signUp.css';

const ShopCreatePageComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber,setPhoneNumber] = useState();
    const [address,setAddress] = useState("");
    const [zipCode,setZipCode] = useState();
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState(null);
    const navigate=useNavigate()
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const config = { headers: { "Content-Type": "multipart/form-data" } };
  
      const newForm = new FormData();
  
      newForm.append("file", avatar);
      newForm.append("name", name);
      newForm.append("email", email);
      newForm.append("password", password);
      newForm.append("zipCode", zipCode);
      newForm.append("address", address);
      newForm.append("phoneNumber", phoneNumber);
      axios
        .post(`${server}/shop/create-shop`, newForm, config)
        .then((res) => {
          toast.success(res.data.message);
          setName("");
          setEmail("");
          setPassword("");
          setAvatar();
          setZipCode();
          setAddress("");
          setPhoneNumber();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
  
    const handleFileInputChange = (e) => {
      const file = e.target.files[0];
      setAvatar(file);
    };
  return (
    <div className="bgShop py-10" >
      <UserInfo/>
      
         <div className="signUpContainer m-auto " style={{backgroundImage:`url(${bgShop})`,backgroundSize:"cover", backgroundRepeat:"no-repeat"}}>
      {/* <Link to="/login">
      <AiFillLeftCircle color="white" size="30px" cursor="pointer"/>
      </Link> */}


      <h2>Create a shop </h2>
      <form onSubmit={handleSubmit}>
        <div  className="group">
          <label htmlFor="name">Store Name :</label>
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="group">
          <label htmlFor="email">Email Adress :</label>
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
          <label htmlFor="address">Adress :</label>
          <input
            type="address"
            name="address"
            autoComplete="adress"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="group">
          <label htmlFor="phone Number">Phone Number :</label>
          <input
            type="number"
            name="phoneNumber"
            autoComplete="phone"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="group">
          <label htmlFor="address">Zip Code :</label>
          <input
            type="number"
            name="zipCode"
            autoComplete="zip"
            required
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
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
            <AiOutlineEye style={{ position:"absolute", right:"50px",marginTop:"30px",color:"black",fontSize:"20px",cursor:"pointer"}} onClick={() => setVisible(false)} />
          ) : (
            <AiOutlineEyeInvisible style={{ position:"absolute", right:"50px",marginTop:"30px",color:"black",fontSize:"20px",cursor:"pointer"}} onClick={() => setVisible(true)} />
          )}
        </div>
        <div className=" group ">
          <label htmlFor="avatar">Avatar : </label>
          <div className="groupAvatar">
          <span>
            {avatar ? (
              <img className="imgAvatar" src={URL.createObjectURL(avatar)} alt="avatar" />
            ) : (
              <RxAvatar style={{fontSize:"50px"}}/>
            )}
          </span>
          <label htmlFor="file-input">
            <span>UploadFile</span>
            <input type="file" name="avatar" id="file-input" accept=".jpg, .jpeg, .png" onChange={(e)=>handleFileInputChange(e)} />
          </label>
          </div>
        
        </div>
        <div className="group">
          <button type="submit">
            Create
          </button>
        </div>
      </form>
      <div className="more">
        <h4>
          have already a shop? <Link className="link" to="/shop-login">Login.</Link>
        </h4>
      </div>
    </div>
      
    </div>
  )
}

export default ShopCreatePageComponent
