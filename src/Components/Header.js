import { Fragment, useState } from "react";
import Modal from 'react-modal';
import HeaderCartButton from "./Cart/HeaderCartButton";
import "../Styles/header.css";
import Icons from "../Images/logo.svg";
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginHandler=()=>{
    setIsLoggedIn((prevState) => !prevState);
  }
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
                {!isLoggedIn &&
                <button type="button" className="btn btn-outline-dark">
                  SignUp
                </button>
  } 
                {!isLoggedIn && (
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={()=>{
                      loginHandler()
                    }}
                  >
                    Login
                  </button>
                )} 
                  {isLoggedIn && ( 
                  <HeaderCartButton/> 
                 )}
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
    </Fragment>
  );
};
export default Header;
