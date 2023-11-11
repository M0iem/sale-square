import React from 'react'
import { Link } from 'react-router-dom';
import styles from '../styles/styles';
import { useSelector } from 'react-redux';



const Banner = () => {
  const { isSeller } = useSelector((state) => state.seller);

  
    return (
      <div
        className={`Banner relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      
      >
        <div className={`${styles.section} w-[80%] `}>
          <h1
            className={`text-[25px] leading-[1.2] 1100px:text-[50px] text-[#f4f0f0] font-[600] capitalize`}
          >
          "Discover the Perfect Deals  <br />  at saleSquare!"
          </h1>
          <p className="pt-5 text-[14px] 800px:text-[16px] font-[Poppins] font-[400] text-[#ffffff]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
            assumenda? Quisquam itaque .{" "}
            <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
          </p>
        <div className='flex'>
        <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}className="inline-block">
              <div className={`${styles.button} mt-5  hover:bg-[#1682AE] hover:text-white duration-300 cursor-pointer`}>
                   <span className="text-[#131313] font-[Poppins] text-[14px]">
                   {isSeller ? "Go Dashboard" : "Become Seller"}{" "}
                   </span>
              </div>
          </Link>
          <Link to="/products" className="inline-block">
              <div className={`${styles.button} mt-5 ml-3 hover:bg-black text-[#131313] hover:text-white duration-300 cursor-pointer`}>
                   <span className=" text-[14px]">
                      Discover our products
                   </span>
              </div>
          </Link>
        
        </div>
        </div>
      </div>
    );

  
}

export default Banner