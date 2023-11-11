import React, { useEffect, useState } from 'react'
import UserInfo from '../components/UserInfo'
import Footer from '../components/Footer'
import ProductDetail from '../components/product/ProductDetail'
import { useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import SuggestedProduct from '../components/product/SuggestedProduct'

const ProductDetailsPage = () => {
    const { allProducts } = useSelector((state) => state.products);
    const { allEvents } = useSelector((state) => state.events);
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [searchParams] = useSearchParams();
    const eventData = searchParams.get("isEvent");
  
    useEffect(() => {
      if (eventData !== null) {
        const data = allEvents && allEvents.find((i) => i._id === id);
        setData(data);
      } else {
        const data = allProducts && allProducts.find((i) => i._id === id);
        setData(data);
      }
    }, [allProducts, allEvents]);
  return (
    <div>
        <UserInfo/>
        <ProductDetail data={data}/>

        {data && <SuggestedProduct data={data} />}
        <Footer/>
      
    </div>
  )
}

export default ProductDetailsPage
