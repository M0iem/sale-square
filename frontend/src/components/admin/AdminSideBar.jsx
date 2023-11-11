import React, { useState } from "react";
import {
 
  AiFillGift,
  AiFillMessage,
  AiOutlineLogout,
  AiTwotoneSetting,
} from "react-icons/ai";
import {
  FaClipboardList, FaMoneyBill, FaUsers,FaUsersLine
 
} from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import {
  MdAddBusiness,
  MdOutlineDashboard,
  MdOutlineShopTwo,
  
} from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";
import { BsShop } from "react-icons/bs";

const AdminSideBar = ({ active}) => {
  const menus = [
    { name: "Admin dashbord", number:'1', icon: MdOutlineDashboard,link:"/admin/dashboard" },
    { name: "All Users", number: '2', icon: FaUsers,link:"/admin-all-users" },
    { name: "All Products", number: '3', icon: MdOutlineShopTwo,link:"/admin-all-products" },
    { name: "All Sellers", number: '4', icon: BsShop,link:"/admin-all-sellers"  },
    { name: "All Orders", number: '5', icon: FaClipboardList , link:"/admin-all-orders"},
    { name: "Logout", number: 8, icon: AiOutlineLogout },
    // { name: "Withdraw Money", number: 5, icon: FaMoneyBill },

   
    
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
      } text-[#C4AA4F] px-4 z-10`}
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
          <Link
           to={item?.link}
            onClick={() => {
              
            if(item.number===8){logoutHandler()}}}
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminSideBar;

