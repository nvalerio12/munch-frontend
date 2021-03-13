import React, { useState, useEffect } from "react";
import axios from 'axios';

import "./RestaurantPublic.css";
import {
  Form,
  FormControl,
  Button,
  Row,
  Col,
  Tab,
  Tabs,
} from "react-bootstrap";

const { REACT_APP_SERVER_URL } = process.env;

function RestaurantPublic(props) {
  const [restaurant, setRestaurant] = useState(props.location.state.restaurant);
  const [category, setCategory] = useState('')
  const [query, setQuery] = useState(props.location.pathname)

  useEffect(() => {
    if(!restaurant) {
      getRestaurant(query)
    }
  }, [])

  const getRestaurant = (query) => {
    let url = query
      ? `${REACT_APP_SERVER_URL}/${query}`
      : `${REACT_APP_SERVER_URL}/${props.location.pathname}`;
    axios
      .get(url)
      .then((response) => {
        const { results } = response.data;
        setRestaurant(results);
      })
      .catch((error) => {
        console.log("===> Error When Getting Restaurant", error);
        alert("Could Not Display Restaurants!");
      });
  };

  useEffect(() => {
    if(!category) {
      getCat()
    }
  }, [category])

  const getCat = () => {
    axios
    .get(`${REACT_APP_SERVER_URL}/categories/${restaurant.category}`)
    .then((response) => {
      const { results } = response.data;
      setCategory(results[0].name);
    })
    .catch((error) => {
      console.log("===> Error When Getting Categories", error);
      alert("Could Not Display Category");
    });
  }

  const menuItems = restaurant.menu.map((menuItem) => {
    console.log(menuItem)
    return (
      <>
        <div key={menuItem._id} className="restaurant-div card bg-transparent text-white col-xs col-md-3 m-3 p-0 shadow-lg rounded">
          <div>
          {menuItem.name}
          </div>
        </div>
      </>
    );
  });
  
  return (
    <>
        <div
          className="restaurant-img-container"
          style={{ "background-image": `url(${restaurant.profileUrl})`}}
        >
          <div className="restaurant-details">
            <div className="restaurant-details-text">
              <h2> {restaurant.name}</h2>
              <h3>{category}</h3>
            </div>
          </div>
        </div>
        {menuItems}
    </>
  );
}

export default RestaurantPublic;
