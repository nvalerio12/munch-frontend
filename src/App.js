import React from "react";
import "./App.css";
import NavbarMunch from "./components/partials/navbars/NavbarMunch";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import About from "./components/About";
import Profile from "./components/Profile";
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

const PrivateRoute = ({ component: Component, ...rest}) => {
  let token = localStorage.getItem('jwtToken');
  console.log('===> Hitting a Private Route');
  return <Route {...rest} render={(props) => {
    return token ? <Component {...rest} {...props} /> : <Redirect to="/login"/>
  }} />
}

function App() {
    // Set state values
    const [currentUser, setCurrentUser] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(true);
   
    useEffect(() => {
      let token;
  
      if (!localStorage.getItem('jwtToken')) {
        setIsAuthenticated(false);
        console.log('====> Authenticated is now FALSE');
      } else {
        token = jwt_decode(localStorage.getItem('jwtToken'));
        setAuthToken(localStorage.getItem('jwtToken'));
        setCurrentUser(token);
      }
    }, []);
  
    const nowCurrentUser = (userData) => {
      console.log('===> nowCurrent is here.');
      setCurrentUser(userData);
      setIsAuthenticated(true);
    }
  
    const handleLogout = () => {
      if (localStorage.getItem('jwtToken')) {
        // remove token for localStorage
        localStorage.removeItem('jwtToken');
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
    }

  return (
    <>
      <Router>
        <NavbarMunch currentUser={currentUser} isAuthenticated={isAuthenticated} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signup" component={Signup} />
          <Route
            path="/login"
            render={(props) => (
              <Login
                {...props}
                nowCurrentUser={nowCurrentUser}
                setIsAuthenticated={setIsAuthenticated}
                user={currentUser}
              />
            )}
          />
          <PrivateRoute
            path="/profile"
            component={Profile}
            user={currentUser}
            handleLogout={handleLogout}
          />
          <Route path="/about" component={About} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
