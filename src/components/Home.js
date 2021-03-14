import React from "react";
import "./Home.css";
import SearchBar from "./partials/SearchBar";
import CategoryRow from "./partials/CategoryRow";

function Home(props) {
  return (
    <>
      <div className="home-main">
        <SearchBar />
      </div>
      <div className="container mt-5">
        <div className="home-cat-stick">
          <CategoryRow />
        </div>
      </div>
      <div className="img-box-desc-container">
        <div className="img-cell cell cell-1">
          <p>Cell 1</p>
        </div>
        <div className="img-cell cell cell-2">
          <p>Cell 2</p>
        </div>
        <div className="img-cell cell cell-3">
          <p>Cell 3</p>
        </div>
        <div className="img-cell cell cell-4">
          <p>Cell 4</p>
        </div>
        <div className="img-cell cell cell-5">
          <p>Cell 5</p>
        </div>
        <div className="img-cell cell cell-6">
          <p>Cell 6</p>
        </div>
        <div className="img-cell cell cell-7">
          <p>Cell 7</p>
        </div>
        <div className="img-cell cell cell-8">
          <p>Cell 8</p>
        </div>
      </div>
    </>
  );
}

export default Home;
