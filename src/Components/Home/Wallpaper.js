import { Fragment, useState } from "react";
import axios from "axios";
import Image from "../../Images/main.jpg";
import MainImage from "../../Images/mentoring.png";
import "../../Styles/wallpaper.css";
import { useHistory } from "react-router-dom";
const Wallpaper = (props) => {
  const history=useHistory()
  const [mentorData, setMentorData] = useState([]);
  const [inputText, setinputText] = useState("");
  const [suggessionData, setsuggessionData] = useState([]);
  const { languageData } = props;
  const handleLanguageChange = (event) => {
    const languageId = event.target.value;
    sessionStorage.setItem("languageId", languageId);
    axios({
      url: `http://localhost:8085/mentordetails/${languageId}`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setMentorData(res.data.mentor);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleInputText = (event) => {
    const inputText=event.target.value
    let suggessionData = [];
    suggessionData = mentorData.filter((item) =>
      item.name.toLowerCase().includes(inputText.toLowerCase())
    );
    setsuggessionData(suggessionData);
    setinputText(inputText);
  };
  const handleNavigate=(id)=>{
    history.push(`/details?mentorId=${id}`);
  }
  const showSuggession = () => {
    if (suggessionData.length == 0 && inputText == "") {
      return null;
    }
    if (suggessionData.length > 0 && inputText == "") {
      return null;
    }
    if (suggessionData.length == 0 && inputText) {
      return (
        <ul className="suggession">
          <li>No Search Results Found</li>
        </ul>
      );
    }
    return (
      <span>
        {suggessionData.map((item, index) => (
          <div className="suggession" key={index} onClick={()=>handleNavigate(item._id)}>{item.name}</div>
        ))}
      </span>
    );
  };
  return (
    <Fragment>
      <img className="main-image" src={Image} />
      <div className="main-content">
        <img className="main-content-image" src={MainImage} />
        <p>
          If you can not see where are you going,ask someone who has been there
          before
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
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="ABC"
                onChange={handleInputText}
              />
              <label htmlFor="floatingInput">Mentor's Name</label>
            </div>
          </div>
          {showSuggession()}
        </div>
      </div>
    </Fragment>
  );
};
export default Wallpaper;
