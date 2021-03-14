import React, { useState } from "react";
import { bool } from "prop-types";
import { StyledSideNav } from "./SideNav.styled";
import { Modal, Form } from "react-bootstrap";
import { Button, TextField } from '@material-ui/core/';
import HorizontalLinearStepper from './Signup'

import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
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
      props.setOpen(!open);
      props.setCurrentUser(null);
      props.setIsAuthenticated(false);
    }
  };

  // Profile Picture Click
  const handlePictureClick = (e) => {
    const eventCapture = e.target;
    
    let inputTag = null;
    // Verify what was clicked
    if (eventCapture.classList.contains("profile-pic-capture")) {
      inputTag = eventCapture.lastChild;
    } else if (eventCapture.classList.contains("profile-picture")) {
      inputTag = eventCapture.parentNode.lastChild;
    } else {
      // We don't want to do anything in this case
      return
    }
    
    // click the input tag
    inputTag.click();
  }

  const changeProfilePicture = e => {
    const inputTag = e.target;

    // if they submit an imgage, show a preview
    if (inputTag.files.length > 0) {
      const imgEl = document.querySelector('.profile-picture');
      const oldImg = imgEl.src;
      imgEl.src = URL.createObjectURL(inputTag.files[0]);

      setTimeout(() => {
        // Confirm Changes
        if (window.confirm("Confirm Changes?")) {

          // Prepare the file
          let formData = new FormData();
          formData.append("profileImg", inputTag.files[0]);

          // Get user data
          const currentID = props.currentUser._id;
          let url = `${REACT_APP_SERVER_URL}/users/${currentID}/profileImg`;

          // send PUT
          axios
          .put(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((response) => {
            // It was successful
            console.log("Profile Changed Successfuly.");
          })
          .catch((error) => {
            console.log("===> Error When Changing Profile Picture", error);
            alert("Could Not Change Profile Picture!");
          });

        } else {
          imgEl.src = oldImg;
        }
      }, 500);

    }
  }

  // Login Modal
  const handleLoginClose = () => {
    setLoginShow(false); // closing the modal
    props.setOpen(!open); // closing the sidenav
  };
  const handleLoginShow = () => setLoginShow(true); // opening modal

  // Sign Up Modal
  const handleSignUpClose = () => {
    setSignUpShow(false); // closing the modal
    props.setOpen(!open); // closing the sidenav
  };
  const handleSignUpShow = () => setSignUpShow(true); // opening modal

  // State of Side Nav
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 1 : 0;

  // console.log(props.isAuthenticated);
  // **************************** USER IS NOT IN ********************************
  if (!props.isAuthenticated) {
    return (
      <>
        <StyledSideNav open={open} aria-hidden={!isHidden} {...props}>
          <Button onClick={handleLoginShow} className="login-btn">
            #Login
          </Button>
          <Button onClick={handleSignUpShow} className="login-btn">
            #Sign Up
          </Button>
          <Link to="/" tabIndex={tabIndex}>
            #Home
          </Link>
          <Link to="/aboutus" tabIndex={tabIndex}>
            #About us
          </Link>
          <Link to="/feed" tabIndex={tabIndex}>
            #Feed
          </Link>
          <Link to="/restaurants/portal" className="sm" tabIndex={tabIndex}>
            #Service
          </Link>
          <Link to="/" tabIndex={tabIndex}>
            #Plaid
          </Link>
        </StyledSideNav>

        {/************************** Login Modal  **************************/}

        <Modal show={loginShow} onHide={handleLoginClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login Now</Modal.Title>
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
              <br/>
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
              <Button
                type="submit"
                variant="primary"
                onClick={handleLoginClose}
              >
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
          <Modal.Body>
            <HorizontalLinearStepper 
                open={open}
                setOpen={props.setOpen}
                setSignUpShow={setSignUpShow}
                user={props.currentUser}
                nowCurrentUser={props.nowCurrentUser}
                currentUser={props.currentUser}
                setCurrentUser={props.setCurrentUser}
                isAuthenticated={props.isAuthenticated}
                setIsAuthenticated={props.setIsAuthenticated} />
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </>
    );
    // **************************** USER IS LOGGED IN ********************************
  } else {
    return (
      <>
        <StyledSideNav open={open} aria-hidden={!isHidden} {...props}>
          <div className="profile-picture-container">
            <Link to="/">#{props.user.userName}</Link>
            <div className="profile-pic-capture" onClick={handlePictureClick}>
              <img
                className="profile-picture"
                src={
                  props.user.profileUrl ||
                  "https://res.cloudinary.com/dom5vocai/image/upload/v1615610157/profile-image-placeholder_sbz3vl.png"
                }
                alt="profile-pic"
              />
              <input
                onChange={changeProfilePicture}
                type="file"
                name="profileUrl"
                id="profilePicInput"
                accept="image/*"
              />
            </div>
          </div>
          <Link to="/" tabIndex={tabIndex}>
            #Home
          </Link>
          <Link to="/aboutus" tabIndex={tabIndex}>
            #About us
          </Link>
          <Link to="/feed" tabIndex={tabIndex}>
            #Feed
          </Link>
          <Link to="/" tabIndex={tabIndex}>
            #Plaid
          </Link>
          <Button onClick={handleLogout} className="login-btn">
            #Log Out
          </Button>
        </StyledSideNav>
      </>
    );
  }
};

SideNav.propTypes = {
  open: bool.isRequired,
};

export default SideNav;


