import React, { useState } from "react";
import { bool } from "prop-types";
import { StyledSideNav } from "./SideNav.styled";
import { Modal, Button, Form } from "react-bootstrap";

import jwt_decode from "jwt-decode";
import { Redirect } from "react-router-dom";
import setAuthToken from "../../utils/setAuthToken";

import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env;

const SideNav = ({ open, ...props }) => {
  // Modal States
  const [loginShow, setLoginShow] = useState(false);
  const [signUpShow, setSignUpShow] = useState(false);

  // Login States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };

    axios
      .post(`${REACT_APP_SERVER_URL}/users/login`, userData)
      .then((response) => {
        const { token } = response.data;
   
        // save token to localStorage
        localStorage.setItem("jwtToken", token);
        // set token to headers
        setAuthToken(token);
        // decode token to get the user data
        const decoded = jwt_decode(token);
        // set the current user
        props.nowCurrentUser(decoded); // function passed down as props.
        console.log(props.nowCurrentUser)
      })
      .catch((error) => {
        console.log("===> Error on login", error);
        alert("Either email or password is incorrect. Please try again");
      });
  };

  // Login Modal
  const handleLoginClose = () => setLoginShow(false);
  const handleLoginShow = () => setLoginShow(true);

  // Sign Up Modal
  const handleSignUpClose = () => setSignUpShow(false);
  const handleSignUpShow = () => setSignUpShow(true);

  // State of Side Nav
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 1 : 0;

  console.log(props.isAuthenticated);

  return (
    <>
      <StyledSideNav open={open} aria-hidden={!isHidden} {...props}>
        <Button onClick={handleLoginShow} className="login-btn">
          #Login
        </Button>
        <Button onClick={handleSignUpShow} className="login-btn">
          #Sign Up
        </Button>
        <a href="/" tabIndex={tabIndex}>
          #Home
        </a>
        <a href="/" tabIndex={tabIndex}>
          #About us
        </a>
        <a href="/" tabIndex={tabIndex}>
          #Contact us
        </a>
        <a href="/" tabIndex={tabIndex}>
          #Plaid
        </a>
        <Button onClick={handleSignUpShow} className="login-btn">
          #Log Out
        </Button>
      </StyledSideNav>

      {/************************** Login Modal  **************************/}

      <Modal show={loginShow} onHide={handleLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login Now</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmail}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
                className="form-control"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleLoginClose}>
              Close
            </Button>
            <Button type="submit" variant="primary" onClick={handleLoginClose}>
              Login
            </Button>
          </Modal.Footer>
        </Form>
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
