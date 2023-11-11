import React, { useRef, useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "./ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/actions/wishlist";
import { useEffect } from "react";
import { addTocart } from "../redux/actions/cart";
import { toast } from "react-toastify";
// import Ratings from "../Products/Ratings";
import { backend_url } from "../server";


const ProductCard = ({ data,isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();


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

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };



  return (
    
      <div className="   bg-white text-gray-700 w-72 min-h-[10rem] shadow-lg rounded-md cursor-pointer hover:bg-gray-300 duration-300 ">
       <Link to={`/product/${data._id}`}>
       <img className="w-full rounded-md h-[200px] object-cover  " src={`${backend_url}${data.images && data.images[0]}`} alt=""  />
       </Link>
        <div className="p-5 flex flex-col gap-3 ">
          <div className="flex items-center gap-2 ">
            <span className="badge"> stock ready</span>
            <span className="badge"> official store </span>
          </div>


          {/* product title */}
          <h3 className="product-title " title="best headphone ever"> {data.name.length > 40 ? data.name.slice(0,35) + "..." : data.name}</h3>

          {/* product price */}
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
              {/* {data?.sold_out} sold */}
              save 20%
              </span>

            </div>
          </div>

          {/* product rating  */}
          <span className="flex items-center mt-1 " >
             <AiFillStar fill="#DBB421"/>
             <AiFillStar fill="#DBB421"/>
             <AiFillStar fill="#DBB421"/>
             <AiFillStar fill="#DBB421"/>
             <AiOutlineStar fill="#DBB421"/>

             <span className="text-xs ml-2 text-gray-500 ">
             {data?.sold_out} reviews
             </span>
          </span>

          <div className="mt-5 flex gap-2 ">
            <button className="buttom-primary" onClick={() => addToCartHandler(data._id)}>
              Add to cart
            </button>
            <button className="flex-grow flex justify-center items-center bg-gray-300/60 hove:bg-gray-300/80 transition rounded-md">
            {click ? (
            <AiFillHeart
              size={22}
          
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
          
              onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
            </button>
            <button className="flex-grow flex justify-center items-center bg-gray-300/60 hove:bg-gray-300/80 transition rounded-md">
              <AiOutlineEye size={25} onClick={() => setOpen(!open)}/> 
            </button>

          </div>
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    
  );
};

export default ProductCard;
