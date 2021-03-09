import React from 'react';
import './App.css';
import NavbarMunch from './components/NavbarMunch';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home'
import Signup from './components/Signup';
import Login from './components/Login';
import About from './components/About';
import Profile from './components/Profile';


function App() {
  return (
    <>
    <Router>
    <NavbarMunch />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/signup' exact component={Signup} />
        <Route path='/Login' exact component={Login} />
        <Route path='/About' exact component={About} />
        <Route path='/Profile' exact component={Profile} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
