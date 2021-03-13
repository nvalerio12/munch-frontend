import React, { useState } from "react";
import { bool } from "prop-types";
import { Modal, Form } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import HorizontalLinearStepper from './Signup'
import About from '../About';

import jwt_decode from "jwt-decode";
import { Redirect, Link} from "react-router-dom";
import setAuthToken from "../../utils/setAuthToken";
import profilePicture from "../../images/profile-image-placeholder.png";

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
  
    // SignUp Specific States - we will use email and password from the login states ^
    const [userName, setUserName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
  
    // Functions to Handle Sign Up States
  
    const handleLoginSubmit = (e) => {
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
          // console.log(props.nowCurrentUser);
        })
        .catch((error) => {
          console.log("===> Error on login", error);
          alert("Either email or password is incorrect. Please try again");
        });
    };
  
    const handleLogout = () => {
      if (localStorage.getItem("jwtToken")) {
        // remove token for localStorage
        localStorage.removeItem("jwtToken");
        props.setOpen(!props.open);
        props.setCurrentUser(null);
        props.setIsAuthenticated(false);
      }
    };
  
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
      <Button onClick={handleLoginShow} className="login-btn">
            #Login
          </Button>
          <Button onClick={handleSignUpShow} className="signup-btn">
            #Sign Up
          </Button>
      </div>
    </>
  );
}

export default RestaurantPortal;