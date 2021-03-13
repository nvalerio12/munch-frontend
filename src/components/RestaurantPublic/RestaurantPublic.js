import React, { useState } from "react";

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

function RestaurantPublic(props) {
  const [restaurant, setRestaurant] = useState(props);
  console.log(restaurant);

  // const menuArray = restaurant.menu.map((menuItem) => {
  //   if (props.isAuth) {
  //   }

  //   return (
  //     <>
  //       <div className="mb-3">
     
  //           <div className="menu-item-container">
  //             <div className="card-img-container">
  //             <img
  //               src="https://picsum.photos/200"
  //               className="card-img"
  //               alt="..."
  //             />
  //             </div>
  //               <div className="">
  //                 <h5 className="">Card title</h5>
  //                 <p className="">
  //                   This is a wider card with supporting text below as a natural
  //                   lead-in to additional content. This content is a little bit
  //                   longer.
  //                 </p>
  //                 <p className="card-text">
  //                   <small className="text-muted">
  //                     Last updated 3 mins ago
  //                   </small>
  //                 </p>
  //               </div>
  //             </div>
  //           </div>

  //     </>
  //   );
  // });

  return (
    <>
      <div className="navbar-spacer"></div>
      <div className="testing">
        <div
          className="restaurant-img-container"
          style={{ "background-image": ` url('https://picsum.photos/200')` }}
        >
          <div className="restaurant-details">
            <div className="restaurant-details-text">
              {/* <h2> {props.location.state.restaurant.name}</h2>
              <h3>{props.location.state.restaurant.category.name}</h3> */}
            </div>
          </div>
        </div>
        <Tabs defaultActiveKey="full-menu">
          <Tab eventKey="full-menu" title="Full Menu">
            <div className="">
              <div className="">{}</div>
              {/* <div className="">{menuArray}</div> */}
            </div>
          </Tab>
          <Tab eventKey="apetizers" title="Apetizers" disabled>
            <p>Hello World 2</p>
          </Tab>
          <Tab eventKey="main-courses" title="Main Courses" disabled>
            <p>Hello World</p>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default RestaurantPublic;
