import React from "react";
import { bool, func } from "prop-types";
import { StyledNavbar } from "./Navbar.styled";
import './Navbar.css'

const Navbar = ({ open, setOpen }) => {
  return (
    <>
      <div className="navBar">
        <StyledNavbar open={open} onClick={() => setOpen(!open)}>
          <div className="threeLines"/>
          <div className="threeLines"/>
          <div className="threeLines"/>
        </StyledNavbar>
        
      </div>
      
    </>
  );
};
Navbar.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
};
export default Navbar;
