import React from "react";
import { bool, func } from "prop-types";
import { StyledNavbar } from "./Navbar.styled";
import './Navbar.css'

const Navbar = ({ open, setOpen }) => {
  return (
    <>
        <StyledNavbar open={open} onClick={() => setOpen(!open)}>
          <div className="threeLines"/>
          <div className="threeLines"/>
          <div className="threeLines"/>
        </StyledNavbar>
      <div className="navbar">
        <div className="spacer">

        </div>
        
        </div>
    
       
      
    </>
  );
};
Navbar.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
};
export default Navbar;
