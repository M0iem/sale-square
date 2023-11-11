import React from 'react'
import { useSelector } from 'react-redux';
import AdminSideBar from '../components/admin/AdminSideBar';
import UserInfo from '../components/UserInfo';
import AdminAllOrders from '../components/admin/AdminAllOrders';
import AdminAllProduts from '../components/admin/AdminAllProduts';
import Loader from '../components/Loader';

const AdminProductsPage = () => {
    const { loading } = useSelector((state) => state.user);
   
    
    return (
      <div>
  
  {loading ? (
            <Loader />
          ) : (
            <>
              <div className={` flex `}>
                <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
                  <AdminSideBar active="3" />
                </div>
                <div className="flex flex-col w-full">
                <UserInfo />
                <AdminAllProduts/>
                </div>
             
              </div>
            </>
          )}
        
      </div>
    )
}

export default AdminProductsPage
