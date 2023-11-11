import React from 'react'
import { useSelector } from 'react-redux';
import AdminSideBar from '../components/admin/AdminSideBar';
import UserInfo from '../components/UserInfo';

import Loader from '../components/Loader';
import AdminAllSellers from '../components/admin/AdminAllSellers';

const AdminSellerPage = () => {
    const { loading } = useSelector((state) => state.user);
   
    
    return (
      <div>
  
  {loading ? (
            <Loader />
          ) : (
            <>
              <div className={` flex `}>
                <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
                  <AdminSideBar active="4" />
                </div>
                <div className="flex flex-col w-full">
                <UserInfo />
                <AdminAllSellers/>
                </div>
             
              </div>
            </>
          )}
        
      </div>
    )
}

export default AdminSellerPage
