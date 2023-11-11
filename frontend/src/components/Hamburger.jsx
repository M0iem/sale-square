import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import gsap from "gsap";
import kech from '../images/ban1.jpg';
import essawira from '../images/ban2.jpg';
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";

const cities=[
  {
    name:'Easy',image:kech
  },
  {
    name:'Quality',image:essawira
  },
]


const Hamburger = ({ state }) => {

  const { isAuthenticated} = useSelector((state) => state.user);
  const { isSeller} = useSelector((state) => state.seller);
  const navigate=useNavigate();
  
  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
       
        window.location.reload(true);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  // variable for animate dom nodes

  let menu = useRef(null);
  let revealMenu = useRef(null);
  let revealMenubg = useRef(null);
  let citybg = useRef(null);
  let line1 = useRef(null);
  let line2 = useRef(null);
  let line3 = useRef(null);
  let line4 = useRef(null);
  let info = useRef(null);

  useEffect(() => {
    if (state.clicked === false) {
      // close Menu
       gsap.to([revealMenu,revealMenubg],{
        duration:0.8,
        height:0,
        ease:'power3.inOut',
        stagger:{
          amount:0.07
        }
       });
       gsap.to(menu,{
        duration: 1,
        css:{display:'none'}
       })

    } else if (
      state.clicked === true ||
      (state.clicked === true && state.initial === null)
    ) {
      //open the menu
      gsap.to(menu,{
        duration: 0,
        css:{display:'block'}
       });
       gsap.to([revealMenu,revealMenubg],{
        duration:0,
        opacity:1,
        height:"100%"
       });

       staggerReveal(revealMenubg,revealMenu);
       fadInUP(info)
       staggerText(line1,line2,line3,line4)




    }
  },[state]);

  const staggerReveal=(node1,node2)=>{
    gsap.from([node1,node2],{
      duration:.8,
      height:0,
      transformOrigin:'right top',
      skewY:2,
      ease:'power3.inOut',
      stagger:{
        amount:.1
      }
    })

  }
  const staggerText=(node1,node2,node3,node4)=>{
    gsap.from([node1,node2,node3,node4],{
      duration:.8,
      y:100,
      delay:.1,
      ease:'power3.inOut',
      stagger: {
        amount:.3
      }
  
    })

  }
  const fadInUP=(node)=>{
    gsap.from(node,{
      y:60,
      duration:1,
      delay:.2,
      opacity:0,
      ease:"power3.inOut"

    
    })

  }


  const handleCity=city=>{
    gsap.to(citybg,{
      duration:0,
      background: `url(${city}) center center`
    })
    gsap.to(citybg,{
      duration:.4,
      opacity:1,
      ease:'power3.inOut'
    })
    gsap.from(citybg,{
      duration:.4,
      skewY:2,
     transformOrigin:"right top"
    })
  }

  const handleCityReturn=()=>{
    gsap.to(citybg,{
      duration:.4,
      opacity:0
    })
  }

  const handleHover=(e)=>{
    gsap.to(e.target,{
      duration:.3,
      y:3,
      skewX:4,
      ease: 'power3.inOut'
    })
    
  }
  const handleHoverExit=(e)=>{
    gsap.to(e.target,{
      duration:.3,
      y:-3,
      skewX:0,
      ease: 'power3.inOut'
    })


  }

  return (
    <div ref={(el) => (menu = el)} className="hamburger-menu ">
      <div
        ref={(el) => (revealMenubg = el)}
        className="menu-second-bg-cl"
      ></div>
      <div ref={(el) => (revealMenu = el)} className="menu-layer">
        <div ref={(el) => (citybg = el)}  className="menu-categ-bg"></div>
        <div className="hamb-container">
          <div className="wrapper">
            <div className="menu-links">
              <nav>
                <ul>
                  <li onMouseEnter={(e)=>handleHover(e)} onMouseOut={e=>handleHoverExit(e)} >
                    <Link ref={(el) => (line1 = el)} to="/">
                      Home
                    </Link>
                  </li>
                  <li onMouseEnter={(e)=>handleHover(e)} onMouseOut={e=>handleHoverExit(e)} >

                    {isSeller?( <Link ref={(el) => (line2 = el)} to="/dashboard">
                      Seller Dashboard
                    </Link>):( <Link ref={(el) => (line2 = el)} to="/dashboard">
                      Become Seller
                    </Link>)}
                   
                  </li>
                  <li onMouseEnter={(e)=>handleHover(e)} onMouseOut={e=>handleHoverExit(e)}>
                    <Link ref={(el) => (line3 = el)} to="/products">
                      Products
                    </Link>
                  </li>
                  <li onMouseEnter={(e)=>handleHover(e)} onMouseOut={e=>handleHoverExit(e)}>
                    
                   {isAuthenticated?( <Link onClick={logoutHandler} ref={(el) => (line4 = el)}>
                      Logout
                    </Link>):( <Link ref={(el) => (line4 = el)} to="/login">
                      LogIn
                    </Link>)}
                  </li>
                </ul>
              </nav>
              <div ref={(el) => (info = el)} className="info">
                {/* <h3>Our Promise</h3>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Repellendus impedit, quasi voluptas corporis nulla similique
                  ipsam aspernatur eveniet tempore earum
                </p> */}
                  <div className="locations">
                Shopping:
             {cities.map(el=>(
              <span key={el.name} onMouseEnter={()=>handleCity(el.image)} onMouseOut={handleCityReturn} >{el.name}</span>
             ))}
              </div>
              </div>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
