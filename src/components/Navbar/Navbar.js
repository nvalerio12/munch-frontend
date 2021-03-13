import React, { useEffect } from "react";
import { bool, func } from "prop-types";
import { StyledNavbar } from "./Navbar.styled";

import "./Navbar.css";

const Navbar = ({ open, setOpen }) => {
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        console.log(
          (document.querySelector(".navbar").className = "navbar scroll")
        );
      } else {
        console.log((document.querySelector(".navbar").className = "navbar"));
      }
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  console.log(window.scrollY);

  return (
    <>
     <div className="spacer"></div>
      <StyledNavbar open={open} onClick={() => setOpen(!open)}>
        <div className="threeLines" />
        <div className="threeLines" />
        <div className="threeLines" />
      </StyledNavbar>
      <div className="navbar"></div>
      <div className="nav-bar-spacer"></div>
     
    </>
  );
};
Navbar.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
};
export default Navbar;
