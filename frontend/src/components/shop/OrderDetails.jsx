import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { backend_url, server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  const orderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Order updated!");
        navigate("/dashboard-orders");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const refundOrderUpdateHandler = async (e) => {
    await axios
    .put(
      `${server}/order/order-refund-success/${id}`,
      {
        status,
      },
      { withCredentials: true }
    )
    .then((res) => {
      toast.success("Order updated!");
      dispatch(getAllOrdersOfShop(seller._id));
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
  }

  console.log(data?.status);


  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
       
        <Link to="/dashboard-orders">
          <div
            className={`${styles.button} hover:scale-95 duration-300 !bg-[#bf9b3c] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
          >
            Back
          </div>
        </Link>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
      
        <h5 className="text-[#00000084]">
           Order date: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      {/* order items */}
      <br />
      <br />
      {data &&
        data?.cart.map((item, index) => (
          <div className="w-full flex items-start mb-5">
            <img
              src={`${backend_url}/${item.images[0]}`}
              alt=""
              className="w-[80x] h-[80px]"
            />
            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item.name}</h5>
              <h5 className="pl-3 text-[20px] text-[#00000091]">
                US${item.discountPrice} x {item.qty}
              </h5>
            </div>

          </div>
        ))}
        
      <div className="border-t w-full flex justify-between">
        <div classNamw='flex '>
        <h4 className="pt-3 text-[20px] font-[600]">Order Status:</h4>
      {data?.status !== "Processing refund" && data?.status !== "Refund Success" && (
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
        >
          {[
            "Processing",
            "Transferred to delivery partner",
            "Shipping",
            "Received",
            "On the way",
            "Delivered",
          ]
            .slice(
              [
                "Processing",
                "Transferred to delivery partner",
                "Shipping",
                "Received",
                "On the way",
                "Delivered",
              ].indexOf(data?.status)
            )
            .map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
        </select>
      )}
      {
        data?.status === "Processing refund" || data?.status === "Refund Success" ? (
          <select value={status} 
       onChange={(e) => setStatus(e.target.value)}
       className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
      >
        {[
            "Processing refund",
            "Refund Success",
          ]
            .slice(
              [
                "Processing refund",
                "Refund Success",
              ].indexOf(data?.status)
            )
            .map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
      </select>
        ) : null
      }
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px]">Payment Info:</h4>
          <h4>
            Status:{" "}
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
          </h4>
        </div>
        <h5 className="pt-3 text-[18px]">
          Total Price: <strong>US${data?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Address and tel:</h4>
              <h4 className=" pt-3text-[16px]">Name  :  {data?.user?.name}</h4>
          <h4 className=" text-[16px]">
            {data?.shippingAddress.address1 +
              " " +
              data?.shippingAddress.address2}
          </h4>

          <h4 className=" text-[16px] ">Country : {data?.shippingAddress.country}</h4>
          <h4 className=" text-[16px]">City :  {data?.shippingAddress.city}</h4>
          <h4 className=" text-[16px]">Tel :  {data?.user?.phoneNumber}</h4>
        </div>
      
      </div>
      <br />
      <br />
  

      <div
        className={`${styles.button} hover:scale-95 duration-300 !bg-[#bf9b3c] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
        onClick={data?.status !== "Processing refund" ? orderUpdateHandler : refundOrderUpdateHandler}
      >
        Update Status
      </div>
    </div>
  );
};

export default OrderDetails;
