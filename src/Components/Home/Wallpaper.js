import { Fragment } from "react";
import Image from "../../Images/main.jpg";
import MainImage from "../../Images/mentoring.png";
import "../../Styles/wallpaper.css";
const Wallpaper = (props) => {
  const { languageData } = props;
  const handleLocationChange = (event) => {
    const languageId = event.target.value;
    sessionStorage.setItem("languageId", languageId);
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
                onChange={handleLocationChange}
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
                  placeholder="Ananda Sankar Panda"
                />
                <label htmlFor="floatingInput">Mentor's Name</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Wallpaper;
