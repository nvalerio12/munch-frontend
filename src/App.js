import React from 'react';
import './App.css';
import NavbarMunch from './components/NavbarMunch';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home'
import Signup from './components/Signup';


function App() {
  return (
    <>
    <Router>
    <NavbarMunch />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/signup' exact component={Signup} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
