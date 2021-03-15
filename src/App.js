import React from "react";
import {
  Navbar,
  SideNav,
  Home,
  About,
  Profile,
  Feed,
  RestaurantPublic,
  RestaurantPortal,
  AccountServices,
  Footer
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

// Global SnackBar Use
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

// For SnackBars 
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

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
          <Redirect to="/" />
        );
      }}
    />
  );
};

function App() {
  // Set state values
  const [currentUser, setCurrentUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentBag, setCurrentBag] = useState([]);
  const [open, setOpen] = useState(false);
  
  // Snack Bar stuff
  
  const classes = useStyles();
  const [notifications, setNotifications] = useState([]);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [hasNotified, setHasNotified] = useState(false);

  const handleClick = () => {
    setOpenSnackBar(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };

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

  useEffect(() => {
    if (notifications.length >= 1 && !hasNotified) {
      handleClick();
      setHasNotified(true);
    }
  }, [notifications])

  const getUserData = token => {
    let url = '';
    if (token.type === 'user') {
      url = `${REACT_APP_SERVER_URL}/users/${token.id}/private`;
    } else if (token.type === 'restaurant') {
      url = `${REACT_APP_SERVER_URL}/restaurants/${token.id}/private`;
    }

    axios
      .get(url)
      .then((response) => {
        let data = response.data;
        if (token.type === 'user') {
          data.user.type = token.type;
          data = data.user;
        } else if (token.type === 'restaurant') {
          data.restaurant.type = token.type;
          data = data.restaurant;
        }
        setCurrentUser(data);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.log("===> Error When Getting User Data", error);
        createNotification("error", "Could Not Get User!");
        setCurrentUser(token);
        setIsAuthenticated(true);
      });
  }

  const nowCurrentUser = (userData) => {
    console.log("===> nowCurrent is here.");
    getUserData(userData);
  };

  const handleLogout = () => {
    if (localStorage.getItem("jwtToken")) {
      // remove token for localStorage
      localStorage.removeItem("jwtToken");
      setIsAuthenticated(false);
      setCurrentUser(null);
      createNotification("info", "You Are Now Logged Out.");
    }
  };

  const createNotification = (severity, message) => {
    setHasNotified(false);
    setNotifications(notifications.concat([{ severity, message }]));
  }

  const onMobile = () => {
    return window.innerWidth < 1000;
  }
  const alertEl = () => {
    if (notifications.length < 1) {
      return <></>
    }
    const info = notifications[notifications.length - 1];
    const severity = info.severity;
    let vertical = 'top';
    let horizontal = 'right';

    if (onMobile()) {
      vertical = 'bottom';
      horizontal = 'center';
    }

    return (
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={openSnackBar} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={severity}>
          {info.message}
        </Alert>
      </Snackbar>
    );
  }

  return (
    <>
      <Router>
        <>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <div>
              <Navbar
                open={open}
                setOpen={setOpen}
                user={currentUser}
                isAuth={isAuthenticated}
                currentBag={currentBag}
                setCurrentBag={setCurrentBag}
              />
              <SideNav
                open={open}
                setOpen={setOpen}
                user={currentUser}
                nowCurrentUser={nowCurrentUser}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                createNotification={createNotification}
              />
            </div>
          </ThemeProvider>
        </>
        <Switch>
          <Route
            exact
            path="/restaurants/portal"
            render={(props) => {
              return (
                <RestaurantPortal
                  {...props}
                  nowCurrentUser={nowCurrentUser}
                  createNotification={createNotification}
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                  user={currentUser}
                  setCurrentUser={setCurrentUser}
                  currentUser={currentUser}
                />
              );
            }}
          />
          <Route
            exact
            path="/restaurants/:id"
            render={(props) => {
              console.log("PROPS");
              return (
                <RestaurantPublic
                  {...props}
                  user={currentUser}
                  isAuth={isAuthenticated}
                  currentBag={currentBag}
                  setCurrentBag={setCurrentBag}
                />
              );
            }}
          />
          <Route
            path="/"
            exact
            render={(props) => {
              return (
                <Home {...props} createNotification={createNotification} />
              );
            }}
          />
          <Route
            path="/feed"
            exact
            render={(props) => (
              <Feed
                {...props}
                user={currentUser}
                isAuth={isAuthenticated}
                createNotification={createNotification}
              />
            )}
          />
          <PrivateRoute
            path="/profile"
            component={Profile}
            user={currentUser}
            handleLogout={handleLogout}
          />
          <PrivateRoute
            path="/account"
            component={AccountServices}
            user={currentUser}
            handleLogout={handleLogout}
            createNotification={createNotification}
          />
          <Route path="/aboutus" exact component={About} />
          <Footer path="/" />
        </Switch>
      </Router>
      <Footer />
      {alertEl()}
    </>
  );
}

export default App;
