import { BackgroundImage } from "./userProfileImage";
import Modal from "react-modal";
import "../Styles/userDropdown.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "60em",
  },
};
const UserDropdown = ({ user, name, Logout }) => {
  const [dropdown, setDropDown] = useState(false);
  const [profilemodalIsOpen, setprofilemodalIsOpen] = useState(false);
  const [formIsOpen, setformIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fileUrl, setfileUrl] = useState(
    "http://localhost:8085/file/1656783714748-MentorOnDemand-Balakumar_A_N...."
  );
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const {
    imageUrl = new URL("../Images/default-profile.png", import.meta.url),
  } = user;
  const profilemodalCloseHandler = () => {
    setprofilemodalIsOpen(false);
  };
  const viewProfileHandler = () => {
    setprofilemodalIsOpen(true);
  };
  const formIsOpenHandler = () => {
    setformIsOpen((prevState) => !prevState);
  };
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const firstnameHandler = (event) => {
    setfirstname(event.target.value);
  };
  const lastnameHandler = (event) => {
    setlastname(event.target.value);
  };
  const handlingFormData = (event) => {
    event.preventDefault();
    // console.log(email, firstname, lastname, password);
    let profileObj = {
      _id:"", // fill this id from login state
      email,
      password,
      imageUrl: fileUrl, // if possible please change the url
      firstname,
      lastname,
    };
    if(profileObj){
      axios({
        url: "http://localhost:8085/updateusers",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        data: profileObj,
      }).then(response=>console.log(response.data)).catch(err=>console.log(err))
    }
  };
  return (
    <div
      className={`user-dropdown ${dropdown ? "active" : ""}`}
      onMouseEnter={() => setDropDown(true)}
      onMouseLeave={() => setDropDown(false)}
    >
      <button className="dropdown-btn">
        <BackgroundImage imageUrl={imageUrl} />
        <span className="user-name">{name}</span>
      </button>
      <div
        className="dropdown-container"
        // onMouseEnter={() => setDropDown(true)}
        // onMouseLeave={() => setDropDown(false)}
      >
        {/* <Link to="/Profile">View Profile</Link>*/}
        <a onClick={viewProfileHandler}>View Profile</a>
        <Link to="/Cart">Cart</Link>
        <a onClick={Logout}>Logout</a>
      </div>
      <Modal isOpen={profilemodalIsOpen} style={customStyles}>
        <div>
          <i
            className="fa-solid fa-xmark cross"
            onClick={profilemodalCloseHandler}
          ></i>
          <div
            class="card"
            style={{
              width: "40em",
              margin: "2em",
            }}
          >
            <img class="card-img-top" src="..." alt="Card image cap" />
            {/* user data render */}
            <div class="card-body">
              <h5 style={{ margin: ".5em 0" }} class="card-title">
                Email:User Email
              </h5>
              <h5 style={{ margin: ".5em 0" }}>Name:FirstName+lastName</h5>
              <h5 style={{ margin: ".5em 0" }}>userType:mentee</h5>
              <a
                class="btn btn-primary"
                style={{ height: "2em", fontSize: "18px", margin: ".5em" }}
                onClick={formIsOpenHandler}
              >
                Do you Want to Update?
              </a>
            </div>
          </div>
          {/* form */}
          {formIsOpen && (
            <form onSubmit={handlingFormData}>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={email}
                  onChange={emailHandler}
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  value={password}
                  onChange={passwordHandler}
                />
              </div>
              <div class="form-group">
                <label for="exampleFormControlFile1">Example file input</label>
                <input
                  type="file"
                  class="form-control-file"
                  id="exampleFormControlFile1"
                />
              </div>
              <div class="form-group">
                <label for="firstname">FirstName</label>
                <input
                  type="text"
                  class="form-control"
                  id="firstname"
                  placeholder="FirstName"
                  value={firstname}
                  onChange={firstnameHandler}
                />
              </div>
              <div class="form-group">
                <label for="lastname">LastName</label>
                <input
                  type="text"
                  class="form-control"
                  id="lastname"
                  placeholder="LastName"
                  value={lastname}
                  onChange={lastnameHandler}
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </form>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default UserDropdown;
