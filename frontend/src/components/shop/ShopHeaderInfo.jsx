import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from '../../styles/styles';
import { backend_url } from '../../server';
import { RxAvatar } from "react-icons/rx";






const ShopHeaderInfo = () => {
   
    const { isSeller,seller } = useSelector((state) => state.seller);


  return (
    <div className='-z-10'>
        <hr />
 <div className="flex px-3 justify-end gap-3 mb-2 mt-2">
           

           

            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isSeller ? (
                  <Link to="/profile">
                     <span className='flex justify-center items-center gap-2'>welcome, {seller?.name} <img
                      src={`${backend_url}${seller?.avatar}`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    /></span>
                  </Link>
                ) : (
                  <Link to="/login">
                    <RxAvatar size={30} color="#72257A" /> 
                  </Link>
                )}
              </div>
            </div>
     
      
          </div>
    </div>
  )
}

export default ShopHeaderInfo
