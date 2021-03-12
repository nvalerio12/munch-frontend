import { useEffect, useState } from "react";
import axios from "axios";
import "./Feed.css";
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom'

const { REACT_APP_SERVER_URL } = process.env;

const Feed = (props) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    if (restaurants.length < 1) {
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

  const restaurantArray = restaurants.map((restaurant) => {

    if (props.isAuth) {
      
    }

    return ( 
      <>
      <Link
      to={{
        pathname: `restaurants/${restaurant._id}`,
        state: {restaurant}
      }}
        
      className="restaurant-div card bg-transparent text-white col-xs col-md-3 m-3 p-0 shadow-lg rounded">
      <div
        key={restaurant._id}
        className=""   
      >
        <img
          src={restaurant.profileUrl ? restaurant.profileUrl : "https://picsum.photos/200"}
          className="card-img img-fluid"
          alt={`Profile Img for ${restaurant.name}`}
        />
        <div className="card-img-overlay"
        >
          
          <AiFillStar className="favorite-btn fs-2 position-absolute end-0 me-4" />
          <div className="container restaurant-info position-absolute bottom-0 start-50 translate-middle w-100 h-25 text-center">
            <h5 className="card-title text-capitalize fw-bold mt-2">{restaurant.name}</h5>
          </div>
        </div>
      </div>
      </Link>
     </>
    )
  });

  return (
    <>
      <div className="container mt-5">
        <div className="row">{}</div>
        <div className="row mt-5">{restaurantArray}</div>
      </div>
    </>
  );
};

export default Feed;
