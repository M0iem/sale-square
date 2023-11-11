
import React, { useEffect } from "react";
import { AiFillDelete, AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { deleteProduct } from "../../redux/actions/product";
import Loader from "../Loader";


const AllProduct = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload(true);
  };

 

  const row = [];

  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        Stock: item.stock,
        sold: item?.sold_out,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
              <table className='w-[90%]'>
                    <thead className='bg-[#ebe1ed] border-b-2 border-gray-200 '>
                      <tr>
                        
                        <td className='p-3 text-sm font-semibold tracking-wide text-left ' >Product Id</td>
                        <td className='p-3 text-sm font-semibold tracking-wide text-left' >Name</td>
                        <td className='p-3 text-sm font-semibold tracking-wide text-left' >Price</td>
                        <td className='p-3 text-sm font-semibold tracking-wide text-left' >Stock</td>
                        <td className='p-3 text-sm font-semibold tracking-wide text-left' >Sold</td>
                        <td className='p-3 text-sm font-semibold tracking-wide text-left' >Preview</td>
                        <td className='p-3 text-sm font-semibold tracking-wide text-left' >Delete</td>
                      </tr>
                    </thead>
                    <tbody>
                      {products && products.map((item,index) => (
                    
                        <tr className='bg-gray-50' key={index}>
                            <td className="p-3 text-sm text-[#149bc2] cursor-pointer hover:text-black duration-300" >
                                <Link to={`/product/${item._id}`}>
                              {item._id} 
            
                        </Link>
                              </td>
                            <td className={`p-3 text-sm text-gray-700 `} >{item.name} </td>
                            <td className="p-3 text-sm text-gray-700 font-semibold" >{item.discountPrice}$ </td>
                            <td className="p-3 text-sm text-gray-700" >{item.stock} </td>
                            <td className="p-3 text-sm text-gray-700" >{item?.sold_out}</td>
                            <td className="p-3 text-sm text-gray-700 cursor-pointer hover:text-yellow-300  " >
                                <Link to={`/product/${item._id}`}>
                                    Preview

                                </Link>
                            </td>
                            <td className="p-3 text-sm text-gray-700 cursor-pointer  " >
                                <Link to={`/product/${item._id}`}>
                                    <AiFillDelete fill="#8c2a8e" size={24} onClick={() => handleDelete(item?._id)}/>

                                </Link>
                            </td>
                          
                         
                        </tr>
                      ))
                       
                      }
            
                    </tbody>
                    </table>
       
        </div>
      )}
    </>
  );
};

export default AllProduct;
