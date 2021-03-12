import React from "react";
import "./RestaurantPublic.css";
import { Form, FormControl, Button, Row, Col } from "react-bootstrap";
import { Restaurant } from "@material-ui/icons";
import Menu from "./Menu"


function RestaurantPublic(props) {

if (props.location.state) {
    
}
else {

}
  console.log(props.location.state.restaurant.menu);
  return (
    <div className="testing">
    <div className="restaurant-img-container" style={{'background-image':` url('https://picsum.photos/200')`}}>
        <div className="restaurant-details">
          <div className="restaurant-details-text">
            <h2>{props.location.state.restaurant.name}</h2>
          </div>
        </div>
      </div>
    <Menu menu={props}/>
    </div>
  );
}

export default RestaurantPublic;
