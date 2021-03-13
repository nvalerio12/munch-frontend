import React from "react";
import "./Home.css";
import { Form, Button, Row, Col } from "react-bootstrap";
import CategoryRow from "./partials/CategoryRow";

function Home(props) {
  return (
    <div>
      <div className="home-main">
        <div className="hp-search-container">
          <Form>
            <Row>
              <Col className="pd-r-0 pd-l-0">
            <input type="text" placeholder="Zipcode" className="hp-search" />
              </Col>
              <Col className="pd-r-0 pd-l-0">
            <Button variant="outline-success hp-search-btn">Let's Find Food</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <CategoryRow />
    </div>
  );
}

export default Home;
