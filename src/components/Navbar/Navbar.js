import React, { useEffect } from "react";
import { bool, func } from "prop-types";
import { StyledNavbar } from "./Navbar.styled";
import Cart from "./Cart"



import "./Navbar.css";

const Navbar = ({ open, setOpen }) => {
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        
          (document.querySelector(".navbar").className = "navbar scroll"
        );
      } else {
        (document.querySelector(".navbar").className = "navbar");
      }
    };
    window.addEventListener("scroll", handleScroll);
  }, []);


  return (
    <>

      <StyledNavbar open={open} onClick={() => setOpen(!open)}>
        <div className="threeLines" />
        <div className="threeLines" />
        <div className="threeLines" />
      </StyledNavbar>
      <div className="navbar">
        <div className="cart-btn">
      <Cart />
        </div>
      </div>
      <div className="nav-bar-spacer"></div>
      
     
    </>
  );
};
Navbar.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
};
export default Navbar;
