import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import UserInfo from '../components/UserInfo';
import AdminSideBar from '../components/admin/AdminSideBar';
import AdminContent from '../components/admin/AdminContent';
import Loader from '../components/Loader';

const AdminPage = () => {
    const { loading } = useSelector((state) => state.user);
 
    
  return (
    <div>

{loading ? (
          <Loader />
        ) : (
          <>
            <div className={` flex `}>
              <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
                <AdminSideBar active='1' />
              </div>
              <div className="flex flex-col w-full">
              <UserInfo />
              <AdminContent  />
              </div>
           
            </div>
          </>
        )}
      
    </div>
  )
}

export default AdminPage
