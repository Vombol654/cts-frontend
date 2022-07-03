import { Fragment, useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import HeaderCartButton from "./Cart/HeaderCartButton";
import "../Styles/header.css";
import Icons from "../Images/logo.svg";
const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "35em",
    boxShadow: "10px 10px 10px #ccc",
  },
};
const HeaderCheck = () => {
  // const nameInputRef = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailV, setEmailV] = useState("");
  const [password, setPassword] = useState("");
  const [passwordV, setPasswordV] = useState("");
  const [firstname, setfirstname] = useState("");
  const [firstnameV, setfirstnameV] = useState("");
  const [emailisValid, setemailisValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [firstnameIsValid, setfirstnameIsValid] = useState(true);
  const [firstnameIsNotValid, setfirstnameIsNotValid] = useState(false);
  const [lastname, setlastname] = useState("");
  const [lastnameV, setlastnameV] = useState("");
  const [lastnameIsValid, setlastnameIsValid] = useState(true);
  const [lastnameIsNotValid, setlastnameIsNotValid] = useState(false);
  const loginHandler = () => {
    // setIsLoggedIn((prevState) => !prevState);
    setmodalIsOpen(true);
  };
  const modalCloseHandler = () => {
    setmodalIsOpen(false);
  };
  const handleEmail = (event) => {
    let email = event.target.value;
    setEmail(email);
  };
  const handlefirstname = (event) => {
    let firstname = event.target.value;
    setfirstname(firstname);
    // console.log(firstname)
  };
  const handlelastname = (event) => {
    let lastname = event.target.value;
    setlastname(lastname);
  };
  const handlePassword = (event) => {
    let password = event.target.value;
    setPassword(password);
  };
  const formDataHanler = (event) => {
    // const enteredValue = nameInputRef.current.value;
    // console.log(enteredValue);
    event.preventDefault();
    var regexp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var specials = /[^A-Za-z ]/g;
    var regex = /^[a-zA-Z ]{5,15}$/;
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    setemailisValid(regexp.test(String(email).toLowerCase()));
    // setEmailV(regexp.test(String(email).toLowerCase()))
    if (regexp.test(String(email).toLowerCase())) {
      setEmailV(email);
    }
    if (regex.test(firstname)) {
      setfirstnameV(firstname);
    }
    if (regex.test(lastname)) {
      setlastnameV(lastname);
    }
    if (firstname.trim().length < 5 || firstname.trim().length > 15) {
      setfirstnameIsNotValid(true);
    } else {
      if (specials.test(firstname)) {
        setfirstnameIsNotValid(false);
      }
    }
    if (lastname.trim().length < 5 || lastname.trim().length > 15) {
      setlastnameIsNotValid(true);
    } else {
      if (specials.test(lastname)) {
        setlastnameIsNotValid(false);
      }
    }
    setPasswordIsValid(re.test(password));
    if (re.test(password)) {
      setPasswordV(password);
    }
    if (emailV) {
      console.log(emailV);
    }

    setEmail("");
    setfirstname("");
    setPassword("");
    setlastname("");
  };

  useEffect(() => {
    console.log(emailV);
  }, [emailV, passwordV, firstnameV, lastnameV]);

  return (
    <Fragment>
      <header className="content-top">
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <a className="navbar-brand logo" href="#">
              <img src={Icons} alt="" width="50" height="40" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon">
                <i className="fa-solid fa-bars"></i>
              </span>
            </button>
            <div
              className="collapse navbar-collapse nav-right"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {!isLoggedIn && (
                  <button type="button" className="btn btn-outline-dark">
                    SignUp
                  </button>
                )}
                {!isLoggedIn && (
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => {
                      loginHandler();
                    }}
                  >
                    Login
                  </button>
                )}
                {isLoggedIn && <HeaderCartButton />}
                {isLoggedIn && (
                  <button
                    type="button"
                    className="btn btn-outline-danger nav-right-danger"
                    onClick={loginHandler}
                  >
                    Logout
                  </button>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <Modal isOpen={modalIsOpen}>
        <div>
          <i
            className="fa-solid fa-xmark cross"
            onClick={modalCloseHandler}
          ></i>
          <form onSubmit={formDataHanler}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                // ref={nameInputRef}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={handleEmail}
              />
              {!emailisValid ? (
                <div style={{ color: "red" }}>Please Enter a Valid Email</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
              />
              {!passwordIsValid ? (
                <div style={{ color: "red" }}>
                  Minimum eight characters, at least one uppercase letter, one
                  lowercase letter, one number and one special character
                </div>
              ) : null}
            </div>
            {/* <div className="form-group">
              <label htmlFor="firstname">Firstname</label>
              <input
                type="text"
                className="form-control"
                placeholder="firstname"
                id="firstname"
                value={firstname}
                onChange={handlefirstname}
              />
              {firstnameIsValid && firstnameIsNotValid ? (
                <div style={{ color: "red" }}>Please Enter a Valid Name</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Lastname</label>
              <input
                type="text"
                className="form-control"
                placeholder="lastname"
                id="lastname"
                value={lastname}
                onChange={handlelastname}
              />
              {lastnameIsValid && lastnameIsNotValid ? (
                <div style={{ color: "red" }}>Please Enter a Valid Name</div>
              ) : null}
            </div> */}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </Fragment>
  );
};
export default HeaderCheck;
