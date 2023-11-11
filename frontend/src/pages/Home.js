import React from "react";
import Banner from "../components/Banner";
import BestDeals from "../components/BestDeals";
import Footer from "../components/Footer";
import UserInfo from "../components/UserInfo";
import TestimonialPart from "../components/TestimonialPart";


const Home = () => {
 
  return (
   <>
    <div>
     
    
      
        <UserInfo/>
        <Banner/>
       
        <BestDeals/>
      <TestimonialPart/>
        <Footer/>
    
    </div></>
  );
};

export default Home;
