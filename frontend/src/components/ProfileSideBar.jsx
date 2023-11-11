import React, { useState } from "react";
import {
  AiFillDashboard,
  AiFillMessage,
  AiOutlineLogout,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiTwotoneHeart,
} from "react-icons/ai";
import {
  FaClipboardList
 
} from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import {
  MdAdminPanelSettings,
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges,
} from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../server";

const ProfileSideBar = ({ active, setActive }) => {
  const menus = [
    { name: "dahboard", number: 2, icon: AiFillDashboard },
    { name: "Update My Infos", number: 1, icon: AiOutlineUser },
    { name: "My orders", number: 3, icon: FaClipboardList },
  

    { name: "Inbox", number: 4, icon: AiFillMessage },
    {name:'track Order',number:5 ,icon:MdOutlineTrackChanges},
    { name: "Logout", number: 8, icon: AiOutlineLogout },
  ];
  const [open, setOpen] = useState(true);
  const navigate=useNavigate()

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  return (
    <div onClick={() => setOpen(!open)}
      className={`bg-[#16171F] min-h-screen ${
        open ? "w-72" : "w-16"
      } text-[#C4AA4F] px-4`}
    >
      <div className="py-3 flex justify-end ">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="mt-4 flex flex-col  gap-4 realtive ">
        {menus?.map((item, i) => (
          <span
            onClick={() => {
              setActive(item.number)
            if(item.number===8){logoutHandler()}
             if(item.number===4){navigate("/inbox")} 
          }}
            key={i}
            className={`pl-3 ${
              active === item.number ? "text-[#f3efef]" : ""
            }  cursor-pointer group flex item-center  text-sm gap-3.5 font-medium  p-2 hover:bg-gray-800 rounded-md `}
          >
            <div>{React.createElement(item?.icon, { size: "20" })}</div>

            <h2
              style={{
                transitionDelay: `${i + 3}00ms`,
              }}
              className={`text-gray-400 whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              {item?.name}
            </h2>

            <h2 className={`${open && 'hidden' } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0  py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}>{item?.name}</h2>
          </span>
        ))}
           <Link to='/admin/dashboard'>

           <span
       
        
            className={`pl-3   cursor-pointer group flex item-center  text-sm gap-3.5 font-medium  p-2 hover:bg-gray-800 rounded-md `}
          >
            <div> <MdOutlineAdminPanelSettings  size= "20"/> </div>

            <h2
            
              className={`text-gray-400 whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Admin
            </h2>

            <h2 className={`${open && 'hidden' } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0  py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}>Admin</h2>
          </span>
      
      
      </Link>
      </div>
   
    </div>
  );
};

export default ProfileSideBar;
