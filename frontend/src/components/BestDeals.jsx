import React, { useState,useEffect} from 'react'

import ProductCard from './ProductCard'
import { useSelector } from 'react-redux';



const BestDeals = () => {


    const [data, setData] = useState([]);
    const { allProducts } = useSelector((state) => state.products);
   
   
    

 
    useEffect(() => {
      const allProductsData = allProducts ? [...allProducts] : [];
      const sortedData = allProductsData?.sort((a,b) => b.sold_out - a.sold_out); 
      const firstFive = sortedData && sortedData.slice(0,4);
      setData(firstFive);
      

    }, [allProducts]);
   
    
  

  return (
    <div className='bestDealSection  mt-10'>
        <div className='text-center'>
        <h5 className='text-gray-500 ' > our products</h5>
        <h1 className=' sm:text-2xl md:text-3xl mx-auto leading-normal font-bold mb-12 whitespace-pre align-middle '>Best Selling Products</h1>
        </div>
        <div     className="flex flex-grow flex-wrap justify-center gap-5">
           {
            data && data.length !== 0 &&( data && data.map((i, index) => <ProductCard  data={i} key={index} />))
           }
        </div>


    </div>
  )
}

export default BestDeals