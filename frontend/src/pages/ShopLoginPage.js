import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ShopLoginPageComponent from '../components/shop/ShopLoginPageComponent';

const ShopLoginPage = () => {
  const navigate = useNavigate();
  const { isSeller,isLoading } = useSelector((state) => state.seller);

  useEffect(() => {
    if(isSeller === true){
      navigate(`/dashboard`);
    }
  }, [isLoading,isSeller])
  return (
    <div>
        <ShopLoginPageComponent />
    </div>
  )
}

export default ShopLoginPage