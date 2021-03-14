import React from "react";
import "./Home.css";
import SearchBar from './partials/SearchBar';
import CategoryRow from "./partials/CategoryRow";


function Home(props) {
  return (
    <div>
      <div className="home-main">
        <SearchBar />
      </div>
      <CategoryRow />
    </div>
  );
}

export default Home;
