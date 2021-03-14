import React, { useState } from "react";

import { Modal, Form } from "react-bootstrap";
import { Button, TextField } from "@material-ui/core/";
import HorizontalLinearStepper from "./Signup";


import jwt_decode from "jwt-decode";
// import { Redirect, Link } from "react-router-dom";
import setAuthToken from "../../utils/setAuthToken";


import axios from "axios";
import "./RestaurantPortal.css";

const { REACT_APP_SERVER_URL } = process.env;

function RestaurantPortal(props) {
  // Modal States
  const [loginShow, setLoginShow] = useState(false);
  const [signUpShow, setSignUpShow] = useState(false);

  // Login States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Functions to Handle Login States
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // Functions to Handle Sign Up States

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };

    axios
      .post(`${REACT_APP_SERVER_URL}/restaurants/login`, userData)
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
        // console.log(props.nowCurrentUser);
      })
      .catch((error) => {
        console.log("===> Error on login", error);
        alert("Either email or password is incorrect. Please try again");
      });
  };

  // const handleLogout = () => {
  //   if (localStorage.getItem("jwtToken")) {
  //     // remove token for localStorage
  //     localStorage.removeItem("jwtToken");
  //     props.setOpen(!props.open);
  //     props.setCurrentUser(null);
  //     props.setIsAuthenticated(false);
  //   }
  // };

  // Login Modal
  const handleLoginClose = () => {
    setLoginShow(false); // closing the modal
  };
  const handleLoginShow = () => setLoginShow(true); // opening modal

  // Sign Up Modal
  const handleSignUpClose = () => {
    setSignUpShow(false); // closing the modal
  };
  const handleSignUpShow = () => setSignUpShow(true); // opening modal

  return (
    <>
      <div className="munch-billboard-bg">
        <div className="billboard">
          <div className="login-btn-container">
            <button onClick={handleLoginShow} className="login-btn-billboard">
              <span className="strikethrough">
                <span className="strike-text">#Login</span>
              </span>
            </button>
            <div className="seperator"></div>
          </div>
          <div className="signup-btn-container">
            <button onClick={handleSignUpShow} className="signup-btn-billboard">
            <span className="strikethrough">
                <span className="strike-text">#Sign Up</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/************************** Login Modal  **************************/}

      <Modal show={loginShow} onHide={handleLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>Restaurant Login Now</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleLoginSubmit}>
          <Modal.Body>
            <div className="form-group">
              <TextField
                type="email"
                name="email"
                label="Email"
                value={email}
                onChange={handleEmail}
                className="form-control"
              />
            </div>
            <br />
            <div className="form-group">
              <TextField
                type="password"
                name="password"
                label="Password"
                value={password}
                onChange={handlePassword}
                className="form-control"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary" onClick={handleLoginClose}>
              Login
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/************************** Signup Modal  **************************/}

      <Modal show={signUpShow} onHide={handleSignUpClose}>
        <Modal.Header closeButton>
          <Modal.Title>Restaurant Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <HorizontalLinearStepper
            setSignUpShow={setSignUpShow}
            user={props.currentUser}
            nowCurrentUser={props.nowCurrentUser}
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
            isAuthenticated={props.isAuthenticated}
            setIsAuthenticated={props.setIsAuthenticated}
          />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default RestaurantPortal;
