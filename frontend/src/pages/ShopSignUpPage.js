import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShopCreatePageComponent from '../components/shop/ShopCreatePageComponent';


const ShopSignUpPage = () => {
  const navigate = useNavigate();
  const { isSeller,seller } = useSelector((state) => state.seller);

  useEffect(() => {
    if(isSeller === true){
      navigate(`/shop/${seller._id}`);
    }
  }, [])
  return (
    <div>
        <ShopCreatePageComponent />
    </div>
  )
}

export default ShopSignUpPage