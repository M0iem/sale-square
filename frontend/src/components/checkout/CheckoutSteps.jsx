import React from 'react'
import styles from '../../styles/styles'

const CheckoutSteps = ({active}) => {
    console.log(active);
  return (
    <div className='w-full flex justify-center'>
        <div className="w-[90%] 800px:w-[50%] flex items-center flex-wrap">
               <div className={`${styles.noramlFlex}`}>
                <div className={`${styles.cart_button}`}>
                       <span className={`${styles.cart_button_text}`}>Step 1</span>
                </div>
                <div className={`${
                    active > 1 ? "w-[30px] 800px:w-[70px] h-[4px] !bg-[#169CC2]"
                    : "w-[30px] 800px:w-[70px] h-[4px] !bg-gray-100"
                }`} />
               </div>

               <div className={`${styles.noramlFlex}`}>
                <div className={`${active > 1 ? `${styles.cart_button}` : `${styles.cart_button} !bg-gray-100`}`}>
                    <span className={`${active > 1 ? `${styles.cart_button_text}` : `${styles.cart_button_text} !text-[#169CC2]`}`}>
                       Step 2
                    </span>
                </div>
               </div>

               <div className={`${styles.noramlFlex}`}>
               <div className={`${
                    active > 3 ? "w-[30px] 800px:w-[70px] h-[4px] !bg-[#169CC2]"
                    : "w-[30px] 800px:w-[70px] h-[4px] !bg-gray-100"
                }`} />
                <div className={`${active > 2 ? `${styles.cart_button}` : `${styles.cart_button} !bg-gray-100`}`}>
                    <span className={`${active > 2 ? `${styles.cart_button_text}` : `${styles.cart_button_text} !text-[#169CC2]`}`}>
                        3.Success
                    </span>
                </div>
               </div>
        </div>
    </div>
  )
}

export default CheckoutSteps