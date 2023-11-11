import React from 'react'
import Loader from '../components/Loader';
import AdminSideBar from '../components/admin/AdminSideBar';
import UserInfo from '../components/UserInfo';
import AdminContent from '../components/admin/AdminContent';
import AdminAllOrders from '../components/admin/AdminAllOrders';
import { useSelector } from 'react-redux';

const AdminOrderPage = () => {
    const { loading } = useSelector((state) => state.user);
   
    
  return (
    <div>

{loading ? (
          <Loader />
        ) : (
          <>
            <div className={` flex `}>
              <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
                <AdminSideBar active="5" />
              </div>
              <div className="flex flex-col w-full">
              <UserInfo />
              <AdminAllOrders/>
              </div>
           
            </div>
          </>
        )}
      
    </div>
  )
}

export default AdminOrderPage
