import { useState } from "react";

const { REACT_APP_SERVER_URL } = process.env;

const EditAccount = (props) => {
  const [nameField, setnameField] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (props.user.type === 'user') {
  
    const handleUserName = (e) => {
      setnameField(e.target.value);
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
  
    return (
      <div className="col-xs col-md row mb-5">
        <div className="col-xs col-md mt-3 mt-md-0 column">
          <h2>Edit Profile</h2>
          <hr></hr>
          <h3>Login</h3>
          <div className="form-floating mb-3">
            <input onChange={handleEmail} name="email" type="email" value={props.user.email} className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label for="floatingInput">Email address</label>
          </div>
          <h3>Security</h3>
          <div className="form-floating mb-3">
            <input type="password" name="oldPassword" className="form-control" id="floatingOld" placeholder="Password" />
            <label for="floatingPassword">Old Password</label>
          </div>
          <div className="form-floating mb-3">
            <input onChange={handlePassword} type="password" handlePassword className="form-control" id="floatingNewPassword" placeholder="New Password" />
            <label for="floatingNewPassword">New Password</label>
          </div>
          <div className="form-floating mb-3">
            <input onChange={handleConfirmPassword} type="password" className="form-control" id="floatingConfirmPassword" placeholder="Confirm Password" />
            <label for="floatingConfirmPassword">Confirm Password</label>
          </div>
  
          <h3>Identity</h3>
          <div className="row">
            <div className="form-floating mb-3 col-md">
              <input type="text" value={props.user.firstName} className="form-control" id="firstName" placeholder="First Name" />
              <label for="firstName">First Name</label>
            </div>
            <div className="form-floating mb-3 col-md">
              <input type="text" value={props.user.lastName} className="form-control" id="name" placeholder="First Name" />
              <label for="lastName">Last Name</label>
            </div>
          </div>
          <div className="form-floating mb-3">
            <input onChange={handleUserName} type="text" value={props.user.userName} className="form-control" id="floatingUserName" placeholder="Username" />
            <label for="floatingUserName">User Name</label>
          </div>
          
  
          <button className="btn btn-success my-4">Confirm Changes</button>
        </div>
  
        <div className="col-xs col-md w-100 d-flex justify-content-center">
          <img className="profile-picture-edit" src={props.user.profileUrl} alt="Your profile-img" />
        </div>
      </div>
    );
  } else if (props.user.type === 'restaurant') {
    return (
      <>
      </>
    );
  } else {
    return (
      <>
        An Error Occured!
      </>
    );
  }

}

export default EditAccount;