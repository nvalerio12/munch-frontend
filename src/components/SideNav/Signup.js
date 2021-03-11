import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

// Stepper imports //
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import { Form, FormControl, Row, Col } from "react-bootstrap";

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
}));

// title of the steps for our stepper
function getSteps() {
  return [
    "Account",
    "Information",
    "Wallet",
  ];
}

export default function CustomizedSteppers() {
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

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // at the beginning of a submit function
    // make sure password and confirm password are equal
    // password length >= 8 characters
    if (password === confirmPassword && password.length >= 8) {
      const newUser = { userName, email, password };
      axios
        .post(`${REACT_APP_SERVER_URL}/users/register`, newUser)
        .then((response) => {
          console.log("===> Yay, new user");
          console.log(response);
          setRedirect(true);
        })
        .catch((error) => console.log("===> Error in Signup", error));
    } else {
      if (password !== confirmPassword) return alert("Passwords don't match");
      alert("Password needs to be at least 8 characters. Please try again.");
    }
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        // Step 1
        return (
          <Form className={classes.root} noValidate autoComplete="off">
            <Row>
              <Col>
                <div className="form-group">
                  <TextField
                    id="standard-basic"
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
                    id="standard-basic"
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
                    type="password"
                    id="standard-basic"
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
                    type="password"
                    id="standard-basic"
                    label="Confirm Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                  />
                </div>
              </Col>
            </Row>
          </Form>
        );
      case 1:
        return (
            <Form className={classes.root} noValidate autoComplete="off">
              <Row>
                <Col>
                  <div className="form-group">
                    <TextField
                      id="standard-basic"
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
                      id="standard-basic"
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
                      type="password"
                      id="standard-basic"
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
                      type="password"
                      id="standard-basic"
                      label="Confirm Password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleConfirmPassword}
                    />
                  </div>
                </Col>
              </Row>
            </Form>
          );
      case 2:
        return "This is the bit I really care about!";
      case 3:
        return "This is the bit I really care about!";
      default:
        return "Unknown step";
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
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleSubmit} className={classes.button}>
              Finish Sign Up
            </Button>
          </div>
        ) : (
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
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
