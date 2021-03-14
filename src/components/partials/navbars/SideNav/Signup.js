import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../../../utils/setAuthToken";

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
  return ["Account", "Information", "Wallet"];
}

export default function CustomizedSteppers(props) {
  // first step states
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleUserName = (e) => {
    setUserName(e.target.value);
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [locState, setLocState] = useState("");
  const [zipcode, setZipcode] = useState("");

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleAddress2 = (e) => {
    setAddress2(e.target.value);
  };
  const handleCity = (e) => {
    setCity(e.target.value);
  };
  const handleLocState = (e) => {
    setLocState(e.target.value);
  };
  const handleZipcode = (e) => {
    setZipcode(e.target.value);
  };

  // thrid step states
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvc, setCvc] = useState("");

  const handleCardHolderName = (e) => {
    setCardHolderName(e.target.value);
  };
  const handleCardNum = (e) => {
    setCardNum(e.target.value);
  };
  const handleExpDate = (e) => {
    setExpDate(e.target.value);
  };
  const handleCvc = (e) => {
    setCvc(e.target.value);
  };

  // stepper states and functions

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    if (userName && email && password && confirmPassword) {
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
    e.preventDefault(); // at the beginning of a submit function
    // make sure password and confirm password are equal
    // password length >= 8 characters
    // console.log(props);

    if (password === confirmPassword && password.length >= 8) {
      const newUser = {
        userName,
        email,
        password,
        firstName,
        lastName,
        address,
        address2,
        city,
        locState,
        zipcode,
        cardHolderName,
        cardNum,
        expDate,
        cvc,
      };
      axios
        .post(`${REACT_APP_SERVER_URL}/users/register`, newUser)
        .then((response) => {
          // console.log("===> Yay, new user");
          // console.log(response);
          const { token } = response.data;

          if (!token) throw new Error('Token Not Returned');

          setRedirect(true);
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
                    label="Username"
                    name="userName"
                    value={userName}
                    onChange={handleUserName}
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
      case 1:
        // ********************* STEP 2 *************************
        return (
          <FormControl className={classes.root} noValidate autoComplete="off">
            <Row>
              <Col>
                <div className="form-group">
                  <TextField
                    required
                    label="First Name"
                    name="firstName"
                    value={firstName}
                    onChange={handleFirstName}
                  />
                </div>
              </Col>
              <Col>
                <div className="form-group">
                  <TextField
                    required
                    label="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={handleLastName}
                  />
                </div>
              </Col>
            </Row>
            <br />
            <Row>
              <div className="form-group addressInput">
                <TextField
                  className="addressInput"
                  label="Address"
                  name="address"
                  value={address}
                  onChange={handleAddress}
                />
              </div>
            </Row>
            <br />
            <Row>
              <Col>
                <div className="form-group">
                  <TextField
                    label="Apt/Unit"
                    name="address2"
                    value={address2}
                    onChange={handleAddress2}
                  />
                </div>
              </Col>

              <br />
              <Col>
                <div className="form-group">
                  <TextField
                    label="City"
                    name="city"
                    value={city}
                    onChange={handleCity}
                  />
                </div>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Select
                  labelId="demo-simple-select-placeholder-label-label"
                  id="demo-simple-select-placeholder-label"
                  value={locState}
                  onChange={handleLocState}
                  displayEmpty
                  className={classes.selectEmpty}
                >
                  {/***************** STATE SELECTOR  ****************************/}
                  <MenuItem value="">State</MenuItem>
                  <MenuItem value={"AL"}>AL</MenuItem>
                  <MenuItem value={"AK"}>AK</MenuItem>
                  <MenuItem value={"AS"}>AS</MenuItem>
                  <MenuItem value={"AZ"}>AZ</MenuItem>
                  <MenuItem value={"AR"}>AR</MenuItem>
                  <MenuItem value={"CA"}>CA</MenuItem>
                  <MenuItem value={"CO"}>CO</MenuItem>
                  <MenuItem value={"CT"}>CT</MenuItem>
                  <MenuItem value={"DE"}>DE</MenuItem>
                  <MenuItem value={"DC"}>DC</MenuItem>
                  <MenuItem value={"FL"}>FL</MenuItem>
                  <MenuItem value={"GA"}>GA</MenuItem>
                  <MenuItem value={"GU"}>GU</MenuItem>
                  <MenuItem value={"HI"}>HI</MenuItem>
                  <MenuItem value={"ID"}>ID</MenuItem>
                  <MenuItem value={"IL"}>IL</MenuItem>
                  <MenuItem value={"IN"}>IN</MenuItem>
                  <MenuItem value={"IA"}>IA</MenuItem>
                  <MenuItem value={"KS"}>KS</MenuItem>
                  <MenuItem value={"LA"}>LA</MenuItem>
                  <MenuItem value={"ME"}>ME</MenuItem>
                  <MenuItem value={"MD"}>MD</MenuItem>
                  <MenuItem value={"MA"}>MA</MenuItem>
                  <MenuItem value={"MI"}>MI</MenuItem>
                  <MenuItem value={"MN"}>MN</MenuItem>
                  <MenuItem value={"MS"}>MS</MenuItem>
                  <MenuItem value={"MO"}>MO</MenuItem>
                  <MenuItem value={"MT"}>MT</MenuItem>
                  <MenuItem value={"NE"}>NE</MenuItem>
                  <MenuItem value={"NV"}>NV</MenuItem>
                  <MenuItem value={"NH"}>NH</MenuItem>
                  <MenuItem value={"NJ"}>NJ</MenuItem>
                  <MenuItem value={"NM"}>NM</MenuItem>
                  <MenuItem value={"NY"}>NY</MenuItem>
                  <MenuItem value={"NC"}>NC</MenuItem>
                  <MenuItem value={"ND"}>ND</MenuItem>
                  <MenuItem value={"MP"}>MP</MenuItem>
                  <MenuItem value={"OH"}>OH</MenuItem>
                  <MenuItem value={"OK"}>OK</MenuItem>
                  <MenuItem value={"OR"}>OR</MenuItem>
                  <MenuItem value={"PA"}>PA</MenuItem>
                  <MenuItem value={"PR"}>PR</MenuItem>
                  <MenuItem value={"RI"}>RI</MenuItem>
                  <MenuItem value={"SC"}>SC</MenuItem>
                  <MenuItem value={"SD"}>SD</MenuItem>
                  <MenuItem value={"TN"}>TN</MenuItem>
                  <MenuItem value={"TX"}>TX</MenuItem>
                  <MenuItem value={"UT"}>UT</MenuItem>
                  <MenuItem value={"VT"}>VT</MenuItem>
                  <MenuItem value={"VA"}>VA</MenuItem>
                  <MenuItem value={"VI"}>VI</MenuItem>
                  <MenuItem value={"WA"}>WA</MenuItem>
                  <MenuItem value={"WV"}>WV</MenuItem>
                  <MenuItem value={"WI"}>WI</MenuItem>
                  <MenuItem value={"WY"}>WY</MenuItem>
                  {/***************************************************/}
                </Select>
              </Col>
              <Col>
                <div className="form-group">
                  <TextField
                    label="Zipcode"
                    name="zipcode"
                    value={zipcode}
                    onChange={handleZipcode}
                  />
                </div>
              </Col>
            </Row>
          </FormControl>
        );
      default:
          // **************************** STEP 3 *************************
        return (
          <FormControl className={classes.root} noValidate autoComplete="off">
            <Row>
              <div className="form-group cardHolderInput">
                <TextField
                  className="cardHolderInput"
                  label="CardHolder's Name"
                  name="cardHolderName"
                  value={cardHolderName}
                  onChange={handleCardHolderName}
                />
              </div>
            </Row>
            <br />
            <Row>
              <div className="form-group cardNumInput">
                <TextField
                  className="cardNumInput"
                  label="Card Number"
                  name="cardNum"
                  value={cardNum}
                  onChange={handleCardNum}
                />
              </div>
            </Row>
            <br />
            <Row>
              <Col>
                <div className="form-group">
                  <TextField
                    label="Exp YY/MM"
                    name="exp"
                    value={expDate}
                    onChange={handleExpDate}
                  />
                </div>
              </Col>
              <Col>
                <div className="form-group">
                  <TextField
                    label="CVC"
                    name="cvc"
                    value={cvc}
                    onChange={handleCvc}
                  />
                </div>
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
