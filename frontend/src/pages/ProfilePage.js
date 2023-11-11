import React, { useEffect, useState } from "react";

import styles from "../styles/styles";
import Loader from "../components/Loader";

import { useSelector } from "react-redux";
import UserInfo from "../components/UserInfo";
import ProfileSideBar from "../components/ProfileSideBar";
import ProfileContent from "../components/ProfileContent";

const ProfilePage = () => {
    const { loading } = useSelector((state) => state.user);
    const [active, setActive] = useState(2);
    
  
    return (
      <div>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className={` flex `}>
              <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
                <ProfileSideBar active={active} setActive={setActive} />
              </div>
              <div className="flex flex-col w-full">
              <UserInfo />
              <ProfileContent active={active} />
              </div>
           
            </div>
          </>
        )}
      </div>
    );
  };
export default ProfilePage;
