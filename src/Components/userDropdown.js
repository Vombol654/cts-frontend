import { BackgroundImage } from "./userProfileImage";

import "../Styles/userDropdown.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const UserDropdown = ({ user, name, Logout }) => {
  const [dropdown, setDropDown] = useState(false);

  const {
    imageUrl = new URL("../Images/default-profile.png", import.meta.url),
  } = user;

  // const imageUrl = profileImg;

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
        <Link to="/Profile">View Profile</Link>
        <Link to="/Cart">Cart</Link>
        <a onClick={Logout}>Logout</a>
      </div>
    </div>
  );
};

export default UserDropdown;
