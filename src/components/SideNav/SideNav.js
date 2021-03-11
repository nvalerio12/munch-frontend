import React, { useState } from "react";
import { bool } from "prop-types";
import { StyledSideNav } from "./SideNav.styled";
import { Modal, Button } from "react-bootstrap";

const SideNav = ({ open, ...props }) => {
  const [loginShow, setLoginShow] = useState(false);
  const [signUpShow, setSignUpShow] = useState(false);

  const handleLoginClose = () => setLoginShow(false);
  const handleLoginShow = () => setLoginShow(true);
  
  const handleSignUpClose = () => setSignUpShow(false);
  const handleSignUpShow = () => setSignUpShow(true);

  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  return (
    <>
      <StyledSideNav open={open} aria-hidden={!isHidden} {...props}>
        <button onClick={handleLoginShow} className="login-btn">
          Login
        </button>
        <button onClick={handleSignUpShow} className="login-btn">
          Sign Up
        </button>
        <a href="/" tabIndex={tabIndex}>
          Home
        </a>
        <a href="/" tabIndex={tabIndex}>
          <span aria-hidden="true">💁🏻‍♂️</span>
          About us
        </a>
        <a href="/" tabIndex={tabIndex}>
          <span aria-hidden="true">💸</span>
          Pricing
        </a>
        <a href="/" tabIndex={tabIndex}>
          <span aria-hidden="true">📩</span>
          Contact
        </a>
      </StyledSideNav>

      {/************************** Login Modal  **************************/}

      <Modal show={loginShow} onHide={handleLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login Now</Modal.Title>
        </Modal.Header>
        <Modal.Body>This is where the log in form will go</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleLoginClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLoginClose}>
            Sign Up 
          </Button>
        </Modal.Footer>
      </Modal>

      {/************************** Signup Modal  **************************/}

      <Modal show={signUpShow} onHide={handleSignUpClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>This is where the sign up form will go</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSignUpClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSignUpClose}>
            Sign Up 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

SideNav.propTypes = {
  open: bool.isRequired,
};

export default SideNav;
