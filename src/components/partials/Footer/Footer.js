import React from "react";
import "./Footer.css";
import { Container, Row, Col,  } from "react-bootstrap";

function Footer(props) {
  return (
    <>
    <div className="footer-container">
        <div className="about-munch">
            <h3>#MUNCH</h3>
            <p> A responsive react application designed to provide food 
                delivery for customers while also providing a social platform 
                for users to connect.
            </p>

        </div>
        <div className="about-munch">
            <h3>#MEET THE TEAM</h3>
            <p> 
                This application was produced by Joshua Wilson,
                Nelson Navaro, and Andrew Bith as part of General Assembly's Software 
                Engineering Bootcamp. 
            </p>

        </div>
        <div className="follow-munch">
            <h3>#FOLLOW</h3>
            <p> 
                Follow our github for future development!
            </p>
        </div>
    </div>
    <div className="copywrite-container">
        <p>Munch was create for personal use. Images sourced from Freepik.com All rights reserved</p>
    </div>
    </>
  );
}

export default Footer;
