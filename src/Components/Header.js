import { Fragment, useState, useRef, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import HeaderCartButton from "./Cart/HeaderCartButton";
import "../Styles/header.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
const Header = () => {
  // const nameInputRef = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredFirstNameVal, setEnteredFirstNameVal] = useState("");
  const [enteredFirstNameValid, setEnteredFirstNameValid] = useState(true);
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredLastNameVal, setEnteredLastNameVal] = useState("");
  const [enteredLastNameValid, setEnteredLastNameValid] = useState(true);
  const [email, setEmail] = useState("");
  const [emailV, setEmailV] = useState("");
  const [emailisValid, setemailisValid] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordV, setPasswordV] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [loginemail, setloginEmail] = useState("");
  const [loginemailV, setloginEmailV] = useState("");
  const [loginemailisValid, setloginemailisValid] = useState(true);
  const [loginpassword, setloginPassword] = useState("");
  const [loginpasswordV, setloginPasswordV] = useState("");
  const [loginpasswordIsValid, setloginPasswordIsValid] = useState(true);
  const [LoginmodalIsOpen, setLoginModalIsOpen] = useState(false);
  const [formIsValid, setformIsValid] = useState(false);
  const [signInMessage, setSignInMessage] = useState("");
  const [loginInMessage, setloginInMessage] = useState("");
  const loginHandler = () => {
    // setIsLoggedIn((prevState) => !prevState);
    setmodalIsOpen(true);
  };
  const modalCloseHandler = () => {
    setmodalIsOpen(false);
  };
  const handleFirstName = (event) => {
    setEnteredFirstName(event.target.value);
  };
  const handleLastName = (event) => {
    setEnteredLastName(event.target.value);
  };
  const handleEmail = (event) => {
    let email = event.target.value;
    setEmail(email);
  };
  const handlePassword = (event) => {
    let password = event.target.value;
    setPassword(password);
  };
  useEffect(() => {
    if (enteredFirstNameVal && enteredLastNameVal && emailV && passwordV) {   
      toast.success(`${signInMessage} Kindly Login to Proceed`);
      
      setformIsValid(true);
      const req = {
        email: emailV,
        password: passwordV,
        firstname: enteredFirstNameVal,
        lastname: enteredLastNameVal,
      };

      axios({
        url: "http://localhost:8085/signup",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: req,
      })
        .then((res) => {
         setSignInMessage(res.data.message);
        })
        .catch((err) => {
          setSignInMessage("You have an account with us");
        });
    }
  }, [enteredFirstNameVal, enteredLastNameVal, emailV, passwordV,signInMessage]);
  const formDataHanler = (event) => {
    event.preventDefault();
    var regexp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (
      enteredFirstName.trim().length < 5 ||
      enteredFirstName.trim().length > 15
    ) {
      setEnteredFirstNameValid(false);
    } else {
      let res = /^[a-zA-Z ]+$/.test(enteredFirstName);
      if (!res) {
        setEnteredFirstNameValid(false);
      } else {
        setEnteredFirstNameVal(enteredFirstName);
      }
    }

    if (
      enteredLastName.trim().length < 5 ||
      enteredLastName.trim().length > 15
    ) {
      setEnteredLastNameValid(false);
    } else {
      let res = /^[a-zA-Z ]+$/.test(enteredLastName);
      if (!res) {
        setEnteredLastNameValid(false);
      } else {
        setEnteredLastNameVal(enteredLastName);
      }
    }
    setemailisValid(regexp.test(String(email).toLowerCase()));
    if (regexp.test(String(email).toLowerCase())) {
      setEmailV(email);
    }
    setPasswordIsValid(re.test(password));
    if (re.test(password)) {
      setPasswordV(password);
    }
    setEmail("");
    setPassword("");
    setEnteredFirstName("");
    setEnteredLastName("");
  };
  const handleLoginModal = () => {
    setmodalIsOpen(false);
    setLoginModalIsOpen(true);
  };
  const LoginmodalCloseHandler = () => {
    setLoginModalIsOpen(false);
  };
  const loginModalHandler = () => {
    setLoginModalIsOpen(true);
  };
  const handleloginEmail = (event) => {
    let email = event.target.value;
    setloginEmail(email);
  };
  const handleloginPassword = (event) => {
    let password = event.target.value;
    setloginPassword(password);
  };
  useEffect(() => {
    if(loginemailV && loginpasswordV){
      toast(`${loginInMessage}`)
      const req={
        email:loginemailV,
        password:loginpasswordV
      }
      axios({
        url: "http://localhost:8085/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: req,
      // }).then(res=>console.log(res.data))
      }).then(res=>{
        console.log(res.data)
          setloginInMessage(res.data.message)
          setLoginModalIsOpen(false)
      
      }).catch(err=>setloginInMessage("You don't have account with us"))
    }  
  }, [loginemailV,loginpasswordV]);
  const handleLoginData = (event) => {
    event.preventDefault();
    var regexp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    setloginemailisValid(regexp.test(String(loginemail).toLowerCase()));
    if (regexp.test(String(loginemail).toLowerCase())) {
      setloginEmailV(loginemail);
    }
    setloginPasswordIsValid(re.test(loginpassword));
    if (re.test(loginpassword)) {
      setloginPasswordV(loginpassword);
    }

    // if(loginemailV && loginpasswordV){
    //   console.log("Hi Logger")
    // }
    setloginEmail("");
    setloginPassword("");
  };

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
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={() => {
                      loginHandler();
                    }}
                  >
                    SignUp
                  </button>
                )}
                {!isLoggedIn && (
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={loginModalHandler}
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
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <div>
          {/* {formIsValid && <p> User Registered Successfully!!</p>} */}
          <i
            className="fa-solid fa-xmark cross"
            onClick={modalCloseHandler}
          ></i>
          <form onSubmit={formDataHanler}>
            <div class="form-group">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                class="form-control"
                id="firstname"
                placeholder="Enter First Name"
                value={enteredFirstName}
                onChange={handleFirstName}
              />
              {!enteredFirstNameValid && (
                <p style={{ color: "red" }}>
                  {" "}
                  Enter a Valid Name between 5-15 letters
                </p>
              )}
            </div>
            <div class="form-group">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                class="form-control"
                id="lastname"
                value={enteredLastName}
                placeholder="Enter Last Name"
                onChange={handleLastName}
              />
              {!enteredLastNameValid && (
                <p style={{ color: "red" }}>
                  {" "}
                  Enter a Valid Name between 5-15 letters
                </p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
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
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
          <p style={{ marginTop: "1em", fontSize: "1.1em" }}>
            Already a Member Please{" "}
            <span style={{ color: "green" }} onClick={handleLoginModal}>
              {" "}
              Login
            </span>
          </p>
        </div>
        
      </Modal>
      <Modal isOpen={LoginmodalIsOpen} style={customStyles}>
        <div>
          <i
            className="fa-solid fa-xmark cross"
            onClick={LoginmodalCloseHandler}
          ></i>
          <form onSubmit={handleLoginData}>
            <div class="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Enter email"
                value={loginemail}
                onChange={handleloginEmail}
              />
              {!loginemailisValid ? (
                <div style={{ color: "red" }}>Please Enter a Valid Email</div>
              ) : null}
            </div>
            <div class="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
                value={loginpassword}
                onChange={handleloginPassword}
              />
              {!loginpasswordIsValid ? (
                <div style={{ color: "red" }}>
                  Minimum eight characters, at least one uppercase letter, one
                  lowercase letter, one number and one special character
                </div>
              ) : null}
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      
      </Modal>
      <ToastContainer />
    </Fragment>
  );
};
export default Header;
