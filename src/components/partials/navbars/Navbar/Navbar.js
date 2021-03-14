import React, { useEffect } from "react";
import { bool, func } from "prop-types";
import { StyledNavbar } from "./Navbar.styled";
import Cart from "./Cart"
import SearchBar from '../../SearchBar';
import "./Navbar.css";
import { Link } from 'react-router-dom';

const Navbar = ({ open, setOpen, currentBag, setCurrentBag }) => {
  
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

  useEffect(() => {
    const handleHide = () => {
      if (open === true) {
          (document.querySelector(".hider").className = "hider hidden"
        );
      } else if (open !== true){
        (document.querySelector(".hider").className = "hider");
      }
    };
    handleHide();
  }, [open]);

  return (
    <>
      <div className="hider"></div>

      <StyledNavbar open={open} onClick={() => setOpen(!open)}>
        <div className="threeLines" />
        <div className="threeLines" />
        <div className="threeLines" />
      </StyledNavbar>
      <div className="navbar">
        <div className="cart-btn">
          <Cart currentBag={currentBag} setCurrentBag={setCurrentBag} />
        </div>
        <div className="row nav-search end-50">
          <div className="col-2">
            <Link to="/">
              <img
                className="munch-logo"
                src="https://res.cloudinary.com/dom5vocai/image/upload/v1615689944/possibleLogo_nbghky.svg"
                alt="munch logo"
              />
            </Link>
          </div>
          <div className="col-10">
            <SearchBar />
          </div>
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
