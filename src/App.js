import React from "react";
import {
  Navbar,
  SideNav,
  Home,
  About,
  Profile,
  Feed,
  RestaurantPublic,
  RestaurantPortal
} from "./components/"; // export from components/index.js

import { ThemeProvider } from "styled-components"; // used styled components to create components :navbar and sidenav
import { GlobalStyles } from "./global"; // global styles for the application
import { theme } from "./theme"; // theme colors set up for the application - copy values in css files - call variables in style.js files

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import axios from "axios";

const { REACT_APP_SERVER_URL } = process.env;

const PrivateRoute = ({ component: Component, ...rest }) => {
  let token = localStorage.getItem("jwtToken");
  console.log("===> Hitting a Private Route");
  return (
    <Route
      {...rest}
      render={(props) => {
        return token ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

function App() {
  // Set state values
  const [currentUser, setCurrentUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    let token;

    if (!localStorage.getItem("jwtToken")) {
      setIsAuthenticated(false);
      console.log("====> Authenticated is now FALSE");
    } else {
      token = jwt_decode(localStorage.getItem("jwtToken"));

      // Check if over time limit
      if (Date.now() >= token.exp * 1000) {
        alert("Session Expired, Please Login Again");
        handleLogout();
      } else {
        setAuthToken(localStorage.getItem("jwtToken"));
        getUserData(token);
      }
    }
  }, []);

  const getUserData = token => {
    let url = `${REACT_APP_SERVER_URL}/users/${token.id}/private`;
    axios
      .get(url)
      .then((response) => {
        const { user } = response.data;
        user.type = token.type;
        setCurrentUser(user);
      })
      .catch((error) => {
        console.log("===> Error When Getting User Data", error);
        alert("Could Not Get User!");
        setCurrentUser(token);
      });
  }

  const nowCurrentUser = (userData) => {
    console.log("===> nowCurrent is here.");
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    if (localStorage.getItem("jwtToken")) {
      // remove token for localStorage
      localStorage.removeItem("jwtToken");
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <>
      <Router>
        <>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <div>
              <Navbar open={open} setOpen={setOpen} />
              <SideNav 
                open={open}
                setOpen={setOpen}
                user={currentUser}
                nowCurrentUser={nowCurrentUser}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            </div>
          </ThemeProvider>
        </>
        <Switch>
          <Route exact path="/restaurants/portal" render={(props) => {
            return <RestaurantPortal {...props} />
          }}/>
          <Route exact path="/restaurants/:id" render={(props) => {
            return <RestaurantPublic {...props} />
          }} />
          <Route path="/" exact component={Home} />
          <Route
            path="/feed"
            exact
            render={(props) => (
              <Feed
                {...props} 
                user={currentUser}
                isAuth={isAuthenticated}
              />
            )}
          />
          <PrivateRoute
            path="/profile"
            component={Profile}
            user={currentUser}
            handleLogout={handleLogout}
          />
          <Route path="/aboutus" exact component={About} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
