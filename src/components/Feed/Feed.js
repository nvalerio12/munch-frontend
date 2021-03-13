import { useEffect, useState } from "react";
import axios from "axios";
import "./Feed.css";
import { AiTwotoneStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import CategoryRow from "../partials/CategoryRow";


const { REACT_APP_SERVER_URL } = process.env;

const Feed = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [didSearch, setdidSearch] = useState(false);
  const [currentUserFavorites, setCurrentUserFavorites] = useState([]);

  useEffect(() => {
    let localState = didSearch;
    if (didSearch) {
      // I have to do this because setDidSearch lags behind
      setdidSearch(false);
      localState = false;
    }

    if (props.location.search && !localState) {
      getRestaurants(props.location.search);
    } else if (!localState) {
      getRestaurants();
    }

    if (props.isAuth && props.user.type === 'user') {
      getFavoriteRestaurants();
    }

  }, [props.location.search]);

  const getRestaurants = (query) => {
    let url = query
      ? `${REACT_APP_SERVER_URL}/restaurants/all${query}`
      : `${REACT_APP_SERVER_URL}/restaurants/all`;
    axios
      .get(url)
      .then((response) => {
        const { results } = response.data;
        setRestaurants(results);
      })
      .catch((error) => {
        console.log("===> Error When Getting Restaurants", error);
        alert("Could Not Display Restaurants!");
      });
    setdidSearch(true);
  };

  const getFavoriteRestaurants = () => {
    console.log(props.user);
    let url = `${REACT_APP_SERVER_URL}/users/${props.user.id}/public`;

    axios
      .get(url)
      .then((response) => {
        const { user } = response.data;
        setCurrentUserFavorites(user.favorites);
      })
      .catch((error) => {
        console.log("===> Error When Getting User Favorites", error);
      });
  }

  const handleFavorite = e => {

    if (props.isAuth) {
      const restaurantId = e.target.dataset.restaurant;
      let url = `${REACT_APP_SERVER_URL}/users/addFavorite/${restaurantId}`;

      axios
        .put(url)
        .then((response) => {
          setCurrentUserFavorites(currentUserFavorites.concat([restaurantId]));
        })
        .catch((error) => {
          console.log("===> Error When", error);
          alert("Could Not Add Favorite!");
        });

    } else {
      alert("Please Sign In To Favorite Restaurants");
    }
  }

  let restaurantArray = restaurants.map((result) => {
    // A result is either in a category group or not

    if (!result) {
      return (
        <>
          <></>
        </>
      );
    }

    if (result.isGroup) {
      const subResults = result.results.map((restaurant) => {
        return (
          <>
            <div key={restaurant._id} className="restaurant-div card bg-transparent text-white col-xs col-md-3 m-3 p-0 shadow-lg rounded">
              <img
                src={
                  result.profileUrl
                    ? result.profileUrl
                    : "https://picsum.photos/200"
                }
                className="card-img img-fluid"
                alt={`Profile Img for ${result.name}`}
              />
              <AiTwotoneStar
                onClick={handleFavorite}
                data-restaurant={restaurant._id}
                className={
                  props.isAuth &&
                  currentUserFavorites.includes(restaurant._id)
                    ? "favorite-btn active-btn position-absolute end-0 me-4 mt-2"
                    : "favorite-btn position-absolute end-0 me-4 mt-2"
                }
              />
              <Link
                to={{
                  pathname: `/restaurants/${restaurant._id}`,
                  state: { restaurant },
                }}
              >
                <div className="card-img-overlay">
                  <div className="container restaurant-info position-absolute bottom-0 start-50 translate-middle w-100 h-25 text-center">
                    <h5 className="card-title text-capitalize fw-bold mt-2">
                      {result.name}
                    </h5>
                  </div>
                </div>
              </Link>
            </div>
          </>
        );
      });

      const query = props.location.search;
      const searchIndex = query.indexOf("search=");
      let endSearch = query.indexOf("&", searchIndex);
      endSearch = endSearch === -1 ? undefined : endSearch;
      // plus 7 because thats the string "search="
      const search = query.slice(searchIndex + 7, endSearch);

      if (subResults.length < 1) {
        return (
          <>
            <Link to="/feed">
              <button className="btn btn-primary">Clear Search</button>
            </Link>
            <h2>Showing Results From Category: {result.name}</h2>
            <p>None Found!</p>
            <hr></hr>
            <h2>Showing All Results For Search: {search}</h2>
          </>
        );
      }

      return (
        <>
          <div>
            <Link to="/feed">
              <button className="btn btn-primary">Clear Search</button>
            </Link>
          </div>
          <h2>
            Showing Results From Category:{" "}
            <span className="text-capitalize">{result.name}</span>
          </h2>
          {subResults}
          <hr></hr>
          <h2>Showing All Results For Search: {search}</h2>
        </>
      );
    }
    // If it's not a group, it's just the results of the search
    return (
      <div
        key={result._id}
        className="restaurant-div card bg-transparent text-white col-xs col-md-3 m-3 p-0 shadow-lg rounded"
      >
        <img
          src={
            result.profileUrl ? result.profileUrl : "https://picsum.photos/200"
          }
          className="card-img img-fluid"
          alt={`Profile Img for ${result.name}`}
        />
        <AiTwotoneStar
          onClick={handleFavorite}
          data-restaurant={result._id}
          className={
            props.isAuth && currentUserFavorites.includes(result._id)
            ? "favorite-btn active-btn position-absolute end-0 me-4 mt-2"
            : "favorite-btn position-absolute end-0 me-4 mt-2"
          }
        />
        <Link
          to={{
            pathname: `/restaurants/${result._id}`,
            state: { restaurant: result },
          }}
        >
          <div className="card-img-overlay">
            <div className="container restaurant-info position-absolute bottom-0 start-50 translate-middle w-100 h-25 text-center">
              <h5 className="card-title text-capitalize fw-bold mt-2">
                {result.name}
              </h5>
            </div>
          </div>
        </Link>
      </div>
    );

  });

  if (restaurantArray.length < 1) {
    restaurantArray = <h2>No Restaurants Found!</h2>;
  }

  return (
    <>
      <div className="container mt-5">
        <h2 className="mt-5">Categories</h2>
        <CategoryRow />
        <div className="row mt-5">{restaurantArray}</div>
      </div>
    </>
  );
};

export default Feed;
