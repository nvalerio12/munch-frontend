import { useEffect, useState } from "react";
import axios from "axios";
import "./Feed.css";
import { AiTwotoneStar } from 'react-icons/ai';

const { REACT_APP_SERVER_URL } = process.env;

const Feed = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (categories.length < 1) {
      getCategories();
    }

    if (props.location.search) {

    } else if (restaurants.length < 1)  {
      getRestaurants();
    }
    
  }, []);

  const getRestaurants = () => {
    axios
      .get(`${REACT_APP_SERVER_URL}/restaurants/all`)
      .then((response) => {
        const { results } = response.data;
        setRestaurants(results);
      })
      .catch((error) => {
        console.log("===> Error When Getting Restaurants", error);
        alert("Could Not Display Restaurants!");
      });
  };

  const getCategories = () => {
    axios
      .get(`${REACT_APP_SERVER_URL}/categories/all`)
      .then((response) => {
        const { results } = response.data;
        setCategories(results);
      })
      .catch((error) => {
        console.log("===> Error When Getting Categories", error);
        alert("Could Not Display Categories");
      });
  }

  const restaurantArray = restaurants.map(restaurant => {

    return ( 
      <div
        key={restaurant._id}
        className="restaurant-div card bg-transparent text-white col-xs col-md-3 m-3 p-0 shadow-lg rounded"
      >
        <img
          src={restaurant.profileUrl ? restaurant.profileUrl : "https://picsum.photos/200"}
          className="card-img img-fluid"
          alt={`Profile Img for ${restaurant.name}`}
        />
        <div className="card-img-overlay">
          <AiTwotoneStar className="favorite-btn position-absolute end-0 me-4" />
          <div className="container restaurant-info position-absolute bottom-0 start-50 translate-middle w-100 h-25 text-center">
            <h5 className="card-title text-capitalize fw-bold mt-2">{restaurant.name}</h5>
          </div>
        </div>
      </div>
    )
  });

  const categoryArray = categories.map((category) => {
    return (
      <li className="categoryListItem col-md-1 m-3 p-0" key={category._id}>
        <div className="categoryDiv card bg-transparent rounded-circle">
          <img
            src={category.picture}
            className="card-img img-fluid"
            alt={`Profile Img for ${category.name}`}
          />
          <div className="container position-absolute top-100 start-50 translate-middle h-25 mt-1 text-center p-0">
            <h5 className="card-title text-capitalize fw-bold mt-2">
              {category.name}
            </h5>
          </div>
        </div>
      </li>
    );
  });

  return (
    <>
      <div className="container mt-5">
        <h2 className="mt-5">Categories</h2>
        <nav className="categoryNav">
          <ul className="row categoryContainer">{categoryArray}</ul>
        </nav>
        <div className="row mt-5">{restaurantArray}</div>
      </div>
    </>
  );
};

export default Feed;
