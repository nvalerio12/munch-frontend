import { Link } from 'react-router-dom';
import { Redirect, Route, Switch } from 'react-router';
import './AccountSettings.css';
import EditAccount from './EditAccount';
import FavoriteRestaurants from './FavoriteRestaurants';
import axios from "axios";
import { useState } from 'react';

const { REACT_APP_SERVER_URL } = process.env;

const AccountServices = (props) => {

  // Note, There is going to be two sets of return statements
  // One for users one for restaurants.
  const [triggeredDelete, setTriggeredDelete] = useState(false);

  
  if (props.user.type === 'user' && !triggeredDelete) {
    const handleDelete = () => {
      const url = `${REACT_APP_SERVER_URL}/users/${props.user._id}/delete`;
      axios
        .delete(url)
        .then(response => {
          console.log(response);
          console.log("OK");
          setTriggeredDelete(true);
          props.handleLogout();
        })
        .catch(error => {
          console.error(error);
          console.log("Fail");
          alert("An Error Occured When Deleting Your Account, Please Try Again.");
        });
    }

    return (
      <div className="account-services container">
        <div className="card-intro row d-flex justify-content-start">
          <div className="col">
            <img
              className="profile-picture"
              src={props.user.profileUrl}
              alt="Your profile-img"
            />
          </div>
          <div className="col column">
            <p className="text-capitalize m-0 mt-4">
              {props.user.firstName} {props.user.lastName}
            </p>
            <p>Your Account</p>
          </div>
        </div>
        <hr></hr>
        <div className="main-account-data row">
          <div className="col-xs col-md-3 column account-nav">
            <ul className="list-group">
              <Link to="/account/edit">
                <li className="list-group-item">Edit Account</li>
              </Link>
              <Link to="/account/favorites">
                <li className="list-group-item">Favorite Restaurants</li>
              </Link>
              <li className="list-group-item">Manage Payments</li>
              <li className="list-group-item">Past Orders</li>
              <li className="list-group-item">Followers</li>
              <li className="list-group-item">Following</li>
              <li onClick={handleDelete} className="btn btn-danger">Delete Account</li>
            </ul>
          </div>
          <Switch>
            <Route
              path="/account/edit"
              render={(routeProps) => (
                <EditAccount
                  {...routeProps}
                  user={props.user} 
                />
              )}
            />
            <Route path="/account/favorites" component={FavoriteRestaurants} />
          </Switch>
        </div>
      </div>
    );
  } else if (props.user.type === 'restaurant' && !triggeredDelete) {
    return (
      <div className="account-services container">
      </div>
    );
  } else if (triggeredDelete) {
    return (
      <Redirect to="/" />
    );
  } else {
    return (
      <div>
        An Error Occured
      </div>
    );
  }

}

export default AccountServices;