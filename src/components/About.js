import React from "react";
import { button } from 'react-router-dom';

import './About.css'

function About() {
   
  return (
    <div className='container'>
      <container>
        <h1>About Munch?</h1>
        <p>
          {" "}
          Connecting #foodies from all over the world, Plaid by Munch is
          designed to create one large picnic table so you can explore and share
          your foodie adventures.{" "}
        </p>
      </container>
      <button className='btn' href='/Signup' >Sign Up Now</button>
    </div>
  );
}

export default About;
