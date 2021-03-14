import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../../utils/setAuthToken";

// Stepper imports //
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import clsx from "clsx";

import Check from "@material-ui/icons/Check";
import { Row, Col } from "react-bootstrap";
import "./Signup.css";

const { REACT_APP_SERVER_URL } = process.env;

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: "#ffa62b",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#ffa62b",
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#ffa62b",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: "#ffa62b",
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// title of the steps for our stepper
function getSteps() {
  return ["Account", "Website"];
}

export default function CustomizedSteppers(props) {
  // first step states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  // second step states
  const [profileUrl, setProfileUrl] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [category, setCategory] = useState("")
 

  const handleProfileUrl = (e) => {
    setProfileUrl(e.target.value);
  };
  const handleCoverUrl = (e) => {
    setCoverUrl(e.target.value)
  }
  const handleCategory = (e) => {
    setCategory(e.target.value)
  }

  // stepper states and functions

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    if (name && email && password && confirmPassword) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

//   const handleReset = () => {
//     setActiveStep(0);
//   };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    // at the beginning of a submit function
    // make sure password and confirm password are equal
    // password length >= 8 characters
    // console.log(props);

    if (password === confirmPassword && password.length >= 8) {
      console.log(category)
      const newRestaurant = {
        name,
        email,
        password,
        profileUrl,
        coverUrl,
        category,
      };
      axios
        .post(`${REACT_APP_SERVER_URL}/restaurants/register`, newRestaurant)
        .then((response) => {
          console.log("===> Yay, new restaurant");
          console.log(response);
          const { token } = response.data;

          if (!token) throw new Error('Token Not Returned');

          setRedirect(true);
          props.setIsAuthenticated(true);
          props.setSignUpShow(false)
          // save token to localStorage
          localStorage.setItem("jwtToken", token);
          // set token to headers
          setAuthToken(token);
          // decode token to get the user data
          const decoded = jwt_decode(token);
          // set the current user
          props.nowCurrentUser(decoded); // function passed down as props.
        })
        .catch((error) => {
          try {
            const list = Object.keys(error.response.data.needToChange).map((item) => {
              if (item === 'userName') {
                return 'Username Is Taken. \n';
              } else if (item === 'email') {
                return 'Email Already In Use. \n';
              } else if (item === 'password') {
                return 'Password Has To Be At Least 8 Charaters. \n';
              } else {
                return item;
              }
            });
            alert(`An Error Occured: \n ${list}`);
          } catch (error) {
            alert(`An Error Occured, Please Try Again`);
          }
          console.log("===> Error in Signup", error);
        });
    } else {
      if (password !== confirmPassword) return alert("Passwords don't match");
      alert("Password needs to be at least 8 characters. Please try again.");
    }
  };

  if (redirect) return <Redirect to="/" />;

  function getStepContent(step) {
    // This is the content for our steps
    switch (step) {
      case 0:
        // ********************* STEP 1 *************************
        return (
          <FormControl className={classes.root} noValidate autoComplete="off">
            <Row>
              <Col>
                <div className="form-group">
                  <TextField
                    required
                    label="Restaurant Name"
                    name="name"
                    value={name}
                    onChange={handleName}
                  />
                </div>
              </Col>
              <Col>
                <div className="form-group">
                  <TextField
                    required
                    type="Email"
                    label="Email"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                  />
                </div>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <div className="form-group">
                  <TextField
                    required
                    type="password"
                    label="Password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                  />
                </div>
              </Col>
              <Col>
                <div className="form-group">
                  <TextField
                    required
                    type="password"
                    label="Confirm Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                  />
                </div>
              </Col>
            </Row>
          </FormControl>
        );
      default:
        return (
          <FormControl className={classes.root} noValidate autoComplete="off">
            <Row>
                <div className="form-group">
                  <TextField
                    label="Profile Url"
                    name="profileUrl"
                    value={profileUrl}
                    onChange={handleProfileUrl}
                  />
                </div>
            </Row>
            <br />
            <Row>
              <div className="form-group addressInput">
                <TextField
                  className="Cover Url"
                  label="Cover Url"
                  name="coverUrl"
                  value={coverUrl}
                  onChange={handleCoverUrl}
                />
              </div>
            </Row>
            <br />
            <Row>
              <Col>
                <Select
                  labelId="demo-simple-select-placeholder-label-label"
                  id="demo-simple-select-placeholder-label"
                  value={category}
                  required
                  onChange={handleCategory}
                  displayEmpty
                  className={classes.selectEmpty}
                >
                  {/***************** CATEGORY SELECTOR  ****************************/}
                  <MenuItem value="">Category</MenuItem>
                  <MenuItem value={"breakfast"}>Breakfast</MenuItem>
                  <MenuItem value={"brunch"}>Brunch</MenuItem>
                  <MenuItem value={"lunch"}>Lunch</MenuItem>
                  <MenuItem value={"dinner"}>Dinner</MenuItem>
                  <MenuItem value={"ramen"}>Ramen</MenuItem>
                  <MenuItem value={"japanese"}>Japanese</MenuItem>
                  <MenuItem value={"thai"}>Thai</MenuItem>
                  <MenuItem value={"mexican"}>Mexican</MenuItem>
                  <MenuItem value={"vegetarian"}>Vegetarian</MenuItem>
                  <MenuItem value={"vegan"}>Vegan</MenuItem>
                  <MenuItem value={"halal"}>Halal</MenuItem>
                  <MenuItem value={"mediterranean"}>Mediterranean</MenuItem>
                  <MenuItem value={"itlaian"}>Italian</MenuItem>
                  <MenuItem value={"chinese"}>Chinese</MenuItem>
                
                  {/***************************************************/}
                </Select>
              </Col>
            </Row>
          </FormControl>
        );
    }
  }

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <div>
          <Typography className={classes.instructions}>
            {getStepContent(activeStep)}
          </Typography>
          <div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.button}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="primary"
              onClick={
                activeStep === steps.length - 1 ? handleSubmit : handleNext
              }
              className={classes.button}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
