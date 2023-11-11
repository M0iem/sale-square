import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllProductsShop } from '../../redux/actions/product';
import axios from 'axios';
import { backend_url, server } from '../../server';
import Loader from '../Loader';
import ProductCard from '../ProductCard';
import { AiOutlineMessage } from 'react-icons/ai';
import { toast } from 'react-toastify';

const ShopPreviewComponent = () => {
    const [data,setData] = useState({});
  const {products} = useSelector((state) => state.products);
  const [isLoading,setIsLoading] = useState(false);
  const {id} = useParams();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigate=useNavigate()
  const dispatch = useDispatch();



  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    setIsLoading(true);
    axios.get(`${server}/shop/get-shop-info/${id}`).then((res) => {
     setData(res.data.shop);
     setIsLoading(false);
    }).catch((error) => {
      console.log(error);
      setIsLoading(false);
    })
  }, [])
  

  return (
<>
{isLoading ? (<Loader/>):(
<div className='flex flex-col'>
    <div className='flex px-10 items-center'>
          <img
            src={`${backend_url}${data.avatar}`}
            alt=""
            className="w-[150px] h-[150px] object-cover rounded-full"
          />
         <div>
         <h1 className=' pl-2 capitalize text-[20px]'>{data?.name}</h1>
        <p className='capitalize text-[16px] pl-2 text-gray-500'>{data?.description}</p>


         </div>
         
    </div>
   <div onClick={handleMessageSubmit}>
   <p className='capitalize text-[16px] ml-10 text-gray-500 flex px-5 py-2 items-center gap-2 bg-gray-100 mt-5 w-[200px] rounded-md cursor-pointer hover:bg-gray-200 duration-200 hover:text-gray-900'> send Message <AiOutlineMessage/></p>
   </div>
    <div className='px-12 mt-10'>
    <div className='text-center'>
                    <h5 className='text-gray-500 '> Products</h5>
                    <h1 className='text-4xl w-96 mx-auto leading-normal font-bold mb-12 whitespace-pre align-middle '>All Products of the Shop</h1>
                    </div>

        <div>
        <div     className="flex flex-grow flex-wrap justify-center gap-5">
           {
            products && products.length !== 0 &&( products && products.map((i, index) => <ProductCard  data={i} key={index} />))
           }
        </div>
        </div>
    </div>
</div>
)}
</>
  )
}

export default ShopPreviewComponent
