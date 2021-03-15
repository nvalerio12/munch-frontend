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
        <div className="img-cell cell-top cell-1 left shadow-right">
        <div  className="text-left">
          <h5>#Sweet Tooth</h5>
            </div>
        </div>
        <div className="img-cell cell-top cell-2 middle shadow-right">
        <div  className="text-middle">
          <h3>#Foodies</h3>
            </div>
        </div>
        <div className="img-cell cell-top cell-3 middle shadow-left">
        <div  className="text-middle">
          <h5>Sharing is caring</h5>
            </div>
        </div>
        <div className="img-cell cell-top cell-4 right shadow-left">
        <div  className="text-right">
          <p>#Icecream Lovers</p>
            </div>
        </div>
        <div className="img-cell cell-bottom cell-5 left shadow-right">
          <div  className="text-left">
          <p>#Breakfast</p>
            </div>
        </div>
        <div className="img-cell cell-bottom cell-6 middle shadow-right">
        <div  className="text-middle">
          <h5>#Drizzle</h5>
            </div>
        </div>
        <div className="img-cell cell-bottom cell-7 middle shadow-left">
        <div  className="text-middle">
          <h3>#Lunch</h3>
            </div>
        </div>
        <div className="img-cell cell-bottom cell-8 right shadow-left">
        <div  className="text-right">
          <h5>#Date Night</h5>
            </div>
        </div>
      </div>
    </>
  );
}

export default Home;
