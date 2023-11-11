import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from '../styles/styles';
import { backend_url } from '../server';
import { RxAvatar } from "react-icons/rx";
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import Cart from './Cart';
import Wishlist from './Wishlist';




const UserInfo = () => {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const { isSeller } = useSelector((state) => state.seller);
    const { wishlist } = useSelector((state) => state.wishlist);
    const { cart } = useSelector((state) => state.cart);
    const { allProducts } = useSelector((state) => state.products);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState(null);
    const [active, setActive] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [openWishlist, setOpenWishlist] = useState(false);
    const [open, setOpen] = useState(false);
  return (
    <div>
        <hr />
 <div className="flex px-3 justify-end gap-3 mb-2 mt-2">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]  hover:scale-95 duration-300"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="black" />
                <span className="absolute right-0 top-0 rounded-full bg-[#72257A] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
              <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px] hover:scale-95 duration-300"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="black"
                  
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#72257A] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>
            </div>

           

            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                     <span className='flex justify-center items-center gap-2'>Hi, {user?.name} <img
                      src={`${backend_url}${user?.avatar}`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    /></span>
                  </Link>
                ) : (
                  <Link to="/login">
                    <RxAvatar size={30} color="#72257A" /> 
                  </Link>
                )}
              </div>
            </div>
               {/* cart popup */}
               {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

{/* wishlist popup */}
{openWishlist ? (
  <Wishlist setOpenWishlist={setOpenWishlist} />
) : null}

      
          </div>
    </div>
  )
}

export default UserInfo
