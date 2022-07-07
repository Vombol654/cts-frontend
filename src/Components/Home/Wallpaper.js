import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import SelectBox from "../SelectBox";

import MainImage from "../../Images/mentoring.png";
import "../../Styles/wallpaper.css";

const Wallpaper = (props) => {
  const history = useHistory();
  const [mentorData, setMentorData] = useState([]);
  const [inputText, setinputText] = useState("");
  const [suggessionData, setsuggessionData] = useState([]);
  const { languageData } = props;

  const handleLanguageChange = (event) => {
    const languageId = event.target.value;
    sessionStorage.setItem("languageId", languageId);
    axios({
      url: `http://localhost:8085/mentorshipdetails/${languageId}`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(res.data.mentor);
        setMentorData(res.data.mentor);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleInputText = (event) => {
    const inputText = event.target.value;
    let suggessionData = [];
    suggessionData = mentorData.filter((item) => {
      console.log(item.mentor.name.toLowerCase(), inputText.toLowerCase());
      return item.mentor.name.toLowerCase().includes(inputText.toLowerCase());
    });
    setsuggessionData(suggessionData);
    setinputText(inputText);
  };
  const handleNavigate = (id) => {
    history.push(`/details?mentorId=${id}`);
  };

  const showSuggession = () => {
    if (suggessionData.length == 0 && inputText == "") {
      return null;
    }
    if (suggessionData.length > 0 && inputText == "") {
      return null;
    }
    if (suggessionData.length == 0 && inputText) {
      return (
        <div className="suggessions">
          <span>No Search Results Found</span>
        </div>
      );
    }
    return (
      <div className="suggessions">
        {suggessionData.map((item, index) => (
          <span
            className="suggession"
            key={index}
            onClick={() => handleNavigate(item.mentor._id)}
          >
            {item.mentor.name}
          </span>
        ))}
      </div>
    );
  };
  return (
    <Fragment>
      {/* <img className="main-image" src={Image} /> */}
      <div className="main-image">
        <div className="main-content">
          <img className="main-content-image" src={MainImage} />
          <p>
            If you can not see where are you going,ask someone who has been
            there before
          </p>
          <div className="main-bottom">
            <div className="main-bottom-left">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={handleLanguageChange}
              >
                <option value="0">Open this select menu</option>
                {languageData.map((item, index) => (
                  <option key={index} value={item.language_id}>
                    {item.name},{item.city}
                  </option>
                ))}
              </select>
            </div>
            <div className="main-bottom-right">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="mentor's name"
                  onChange={handleInputText}
                />
              {showSuggession()}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Wallpaper;
