import React from "react";
import "./Home.css";

function Home(props) {
  return (
    <div>
      <div className="home-main">
        <form className="d-flex justify-content-center">
          <div className="form-group m-0">
            <input
              type="text"
              className="form-control search-form-control"
              placeholder="Enter ZipCode"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;