import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { backend_url, server } from "../server";
import styles from "../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/actions/wishlist";
import axios from "axios";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const navigate=useNavigate()
  //   const [select, setSelect] = useState(false);

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data.shop._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
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


  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < count) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  return (
    <div className="bg-[#fff] p-10">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />

            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${backend_url}${data.images && data.images[0]}`}
                  alt=""
                />
             
                <div
                  className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#020202] flex items-center bg-gray-300 rounded-md py-2 px-1">
                    Send Message to {data.shop.name} <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
               
              </div>

              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px] ml-10">
                
              <h2 className="font-semibold text-3xl overflow-ellipsis  whitespace-nowrap capitalize "> {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}</h2>
              <div className="flex mb-5 mt-5">
                  <Link to={`/shop/preview/${data.shop._id}`} className="flex">
                    <img
                      src={`${backend_url}${data?.shop?.avatar}`}
                      alt=""
                      className="w-[40px] h-[40px] rounded-full mr-2"
                    />
                    <div>
                      <h3 className={`pt-3 text-[15px] text-gray-500`}>
                        {data.shop.name} (4.5 Ratings)
                      </h3>
                     
                    </div>
                  </Link>
                </div>
                <p>{data.description}</p>

           
                <div>
            <span className="text-xl font-bold ">
            {data.originalPrice === 0
                  ? data.originalPrice
                  : data.discountPrice}$
            </span>
            <div className="flex items-center gap-2 mt-1 ">
              <span className="text-sm line-through opacity-50"> 
              {data.originalPrice ? data.originalPrice + " $" : null}
              </span>
              <span className="discount-percent">
              {data?.sold_out} sold
              </span>

            </div>
          </div>
                <div className="flex items-center mt-12 justify-around pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-[#8169CE] to-[#8169CE] text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-[#8169CE] to-[#8169CE] text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler(data)}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                  onClick={() => addToCartHandler(data._id)}
                >
                   <button className="buttom-primary" onClick={() => addToCartHandler(data._id)}>
              Add to cart
            </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
