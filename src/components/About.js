import React from "react";

import './About.css';

function About(props) {
   
  return (
    <div className="main-about w-100">
      <div className="container about-container rounded">
        <h1>
          About Munch
          <img
            className="munch-logo"
            src="https://res.cloudinary.com/dom5vocai/image/upload/v1615689944/possibleLogo_nbghky.svg"
            alt="munch logo"
          />
        </h1>
        <p>
          Munch creates a streamlined relationship between users and
          restaurants. Our website fulfills and delivers customer's orders on
          the website. After the customer finishes their delicious meal, they
          may want to thank the retaurant, or maybe share about their foodie
          experience. This is why Plaid by Munch was designed.
        </p>
        <h2>#PLAID</h2>
        <p>
          Connecting #foodies from all over the world, Plaid by Munch is
          designed to create one large picnic table so you can explore and share
          your foodie adventures.
        </p>
      </div>
    </div>
  );
}

export default About;
