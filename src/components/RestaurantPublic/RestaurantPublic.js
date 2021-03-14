import React, { useState, useEffect } from "react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

import "./RestaurantPublic.css";
import {
  Form,
  FormControl,
  Button,
  Row,
  Col,
  Nav,
  Tab,
  Tabs,
  Modal,
} from "react-bootstrap";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const { REACT_APP_SERVER_URL } = process.env;

function RestaurantPublic(props) {
  const [restaurant, setRestaurant] = useState(props.location.state.restaurant);
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState(props.location.pathname);
  const [currentBag, setCurrentBag] = useState(props.currentBag);
  const [itemModalShow, setItemModalShow] = useState(false);

  // Snack bar states and functions //
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  //*************************************//

  // Item Modal
  const handleItemModalClose = () => {
    setItemModalShow(false); // closing the modal
  };
  const handleItemModalShow = () => setItemModalShow(true); // opening modal

  useEffect(() => {
    if (!props) {
      getRestaurant(query);
    }
  }, []);

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
    if (!category) {
      getCat();
    }
  }, [category]);

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
  };

  const addItemToBag = async (menuItem) => {
    handleClick()
    
    console.log(menuItem.target.value, typeof menuItem.target.value)
    const itemDetails = menuItem.target.value.split(',')
    console.log(itemDetails)
    const updatedBag = await props.setCurrentBag([
      ...props.currentBag,
      [Number(itemDetails[0]), itemDetails[1]]
    ]);
    if (updatedBag !== undefined) {
      handleClick();
    }
  };

  const menuItems = restaurant.menu.map((menuItem) => {
    return (
      <>
        <div key={menuItem._id} className="menu-item-card">
          <Row className="pd-0 mg-0">
            <img
              src={
                menuItem.profileUrl
                  ? menuItem.profileUrl
                  : "https://picsum.photos/200"
              }
              className="menu-item-img"
              alt={`Delicious ${menuItem.name} img`}
            />
            <Col>
              <div className="text-col">
                <h4>{menuItem.name}</h4>
                <p>{menuItem.description}</p>
                <p>
                  ${menuItem.price}
                  <button
                    onClick={(menuItem) => addItemToBag(menuItem)}
                    value={[menuItem.price,menuItem.name]}
                    className="add-to-bag-btn"
                  >
                    Add to Bag
                  </button>{" "}
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  });

  return (
    <>
      <div
        className="restaurant-img-container"
        style={{ backgroundImage: `url(${restaurant.profileUrl})` }}
      >
        <div className="restaurant-details">
          <div className="restaurant-details-text">
            <h2> {restaurant.name}</h2>
            <h3>{category}</h3>
          </div>
        </div>
      </div>
      <Nav className="menu-nav-container" activeKey="Most Popular">
        <Nav.Item>
          <Nav.Link className="menu-nav-item" eventKey="Most Popular">
            Most Popular
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="menu-nav-item" eventKey="Appetizers" disabled>
            Appetizers
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="menu-nav-item" eventKey="Entrees" disabled>
            Entrees
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="menu-nav-item" eventKey="Drinks" disabled>
            Drinks
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="menu-items-container">{menuItems}</div>
      <div className="testing"></div>

      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Item was added to cart!
        </Alert>
      </Snackbar>
    </>
  );
}

export default RestaurantPublic;
