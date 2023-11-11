import React, { useEffect, useState } from 'react';
import '../styles/Navbar.css'
import Hamburger from './Hamburger';
import { Link, useLocation } from 'react-router-dom';

import logo from '../images/logo.png';
const Navbar = () => {
  const [state, setState] = useState({
    initial:false,
    clicked:null,
    menuName: "Menu"
  })
  const [disabeld, setDisabeld] = useState(false)
  const location = useLocation();

useEffect(()=>{
  // listen for page changes
  setState({clicked:false,menuName:"Menu"})
  
   
  console.log(4)

},[location])

  const handleMenu=()=>{
    disableMenu()

    if(state.initial===false){
      setState({initial:null,clicked:true,menuName:"Close"})
      console.log(1)
    }else if(state.clicked===true){
      setState({
        clicked:!state.clicked,
        menuName:"Menu"
      })
      console.log(2)
    
    }else if(state.clicked===false){
      setState({
        clicked:!state.clicked,
        menuName:"Close"
      })
      console.log(3)
    }
  }

  
  // see if the menu button should disabeld

  const disableMenu=()=>{
    setDisabeld(!disabeld);
    setTimeout(()=>{
      setDisabeld(false)
    },1200)
  }
  return (
 <>
    <nav>
      <Link to="/"> <img alt='logo' width="110" src={logo}/></Link>
       

        <button disabled={disabeld} onClick={handleMenu}>
            {state.menuName}
        </button>

    </nav>
    <Hamburger state={state} />
    </>
  )
}

export default Navbar