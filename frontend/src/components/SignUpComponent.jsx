import React, { useState } from "react";
import { AiFillLeftCircle, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link,useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios"; 
import {server}from "../server"
import { toast } from "react-toastify";
import '../styles/signUp.css';

const SignUpComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const navigate=useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();

    const config={
      headers:{"Content-Type":"multipart/form-data"}
    };
    const newForm=new FormData();
    newForm.append("file",avatar);
    newForm.append("name",name);
    newForm.append("email",email);
    newForm.append("password",password);
    axios.post(`${server}/user/create-user`,newForm,config).then((res)=>{
      
      toast.success(res.data.message)
      setEmail('');
      setName('');
      setPassword('');
      setAvatar()


      if(res.data.success === true){
        navigate('/login')
      }
    }).catch((err)=>{
      toast.error(err.response.data.message)
     
    })

  };
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    console.log("handleFileInput", file);
  };

  return (
    <div className="signUpContainer">
      {/* <Link to="/login">
      <AiFillLeftCircle color="white" size="30px" cursor="pointer"/>
      </Link> */}


      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <div  className="group">
          <label htmlFor="name">Full Name :</label>
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
            <input type="file" name="avatar" id="file-input" accept=".jpg, .jpeg, .png" onChange={(e)=>handleFileInput(e)} />
          </label>
          </div>
        
        </div>
        <div className="group">
          <button type="submit">
            sign up
          </button>
        </div>
      </form>
      <div className="more">
        <h4>
          have already an account? <Link className="link" to="/login">Login.</Link>
        </h4>
      </div>
    </div>
  );
};

export default SignUpComponent;
