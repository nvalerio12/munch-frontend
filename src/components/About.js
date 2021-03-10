import React from "react";
import { button } from 'react-router-dom';
import Signup from "./Signup";
function About() {
   
  return (
    <div>
      <container>
        <h1>About Munch?</h1>
        <p>
          {" "}
          Connecting #foodies from all over the world, Plaid by Munch is
          designed to create one large picnic table so you can explore and share
          your foodie adventures.{" "}
        </p>
      </container>
      <button href='/Signup'>Sign Up Now</button>
    </div>
  );
}

export default About;
