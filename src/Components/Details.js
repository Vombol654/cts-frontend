import { Fragment, useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation } from "react-router";
import Modal from "react-modal";
import axios from "axios";
import "../Styles/details.css";
import "../Styles/mentorDetailPage.css";
import { Link } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ratingComponent = (rating) => {
  let rate = [];
  let round = (rating * 10) % 10;
  let limit = round > 5 ? Math.round(rating) : Math.floor(rating);
  let half = round === 5 ? 1 : 0;

  for (let i = 0; i < (limit < 0 ? 0 : limit); i++) {
    rate.push(<ion-icon name="star" class="md hydrated icon"></ion-icon>);
  }

  if (half === 1) {
    rate.push(<ion-icon name="star-half" class="md hydrated icon"></ion-icon>);
  }

  for (let i = 0; i < rating - limit - half; i++) {
    rate.push(
      <ion-icon name="star-outline" class="md hydrated icon"></ion-icon>
    );
  }

  return rate;
};

const Details = () => {
  const [mentorData, setMentorData] = useState({
    _id: 0,
    about: "About Mentor",
    name: "Mentor Name",
    designation: "Mentor Designation",
    language: "Language",
    expert: "Expert",
    rating: 0,
    reviewCount: 0,
    features: [],
    images: "",
    phone: "Phone Number",
    email: "Mentor Email Id",
    spotsLeft: 0,
    company: "Cognizant Technology Solutions",
    tag: "Top Mentor",
    callCount: 2,
  });
  const location = useLocation();
  const qs = queryString.parse(location.search);
  const { mentorId } = qs;
  useEffect(() => {
    axios({
      url: `http://localhost:8085/mentordetail/${mentorId}`,
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
  }, []);
  const {
    _id,
    about,
    designation,
    expert,
    rating,
    reviewCount = 40,
    images,
    name,
    language,
    city,
    features,
    cost,
    spotsLeft = 100,
    company = "Cognizant Technology Solutions",
    tag = "Top",
    callCount = 2,
  } = mentorData;

  return (
    <div className="mentor-details-container">
      {/* <div className="navigate-container"> */}
      <div className="navigation-list">
        <Link to="/">
          <ion-icon class="md hydrated icon" name="home"></ion-icon>
        </Link>
        <span className="right-icon">&#10095;</span>
        <Link to="/filter">Filter</Link>
        <span className="right-icon">&#10095;</span>
        <Link to={`/details?mentorId=${_id}`}>{name}</Link>
        {/* </div> */}
      </div>
      <div className="mentor-page">
        {/* <span className="spots-left">Only {spotsLeft} Spots Left</span> */}
        <div className="mentor-img">
          <img src={require(`../${images}`)} alt={name} />
        </div>
        <div className="mentor-details">
          <div className="mentor-details-header">
            <div className="mentor-name-tag">
              <div className="mentor-name-country">
                <h1 className="mentor-name">{name}</h1>
                {/* <span className="country">{country}</span> */}
              </div>
              {tag !== "" && (
                <p className="mentor-tag">
                  <span>
                    <ion-icon name="star" class="md hydrated icon"></ion-icon>
                  </span>
                  <span>{tag} Mentor</span>
                </p>
              )}
            </div>
            <div className="mentor-occupation">
              <ion-icon class="md hydrated icon" name="ribbon"></ion-icon>
              <p>
                {designation} at{" "}
                <span className="mentor-company">{company}</span>
              </p>
            </div>
            <div className="locality">
            <div className="location">
              <ion-icon class="md hydrated icon" name="pin"></ion-icon>
              <span>{city}</span>
            </div>
            <div className="language">
              <ion-icon class="md hydrated icon" name="mic"></ion-icon>
              <span>{language}</span>
            </div>
            </div>
            {reviewCount > 0 && (
              <div className="mentor-review">
                <div className="ratings">
                  {ratingComponent(rating).map((r) => {
                    return r;
                  })}
                </div>
                <span className="review-count">({reviewCount} reviews)</span>
              </div>
            )}
          </div>
          <div className="mentor-services">
            {features.map(({ name }) => {
              if (name === "chat") {
                return (
                  <div className="service-item">
                    <ion-icon
                      name="chatboxes"
                      class="md hydrated icon"
                    ></ion-icon>
                    <span className="service-name">Chat</span>
                  </div>
                );
              } else if (name === "call") {
                return (
                  <div className="service-item">
                    <ion-icon name="call" class="md hydrated icon"></ion-icon>
                    <span className="service-name">
                      {typeof callCount === "number"
                        ? callCount + " x "
                        : callCount + " "}
                      Call
                    </span>
                  </div>
                );
              } else if (name === "task") {
                return (
                  <div className="service-item">
                    <ion-icon
                      name="checkmark-circle-outline"
                      class="md hydrated icon"
                    ></ion-icon>
                    <span className="service-name">Task</span>
                  </div>
                );
              } else if (name === "handson") {
                return (
                  <div className="service-item">
                    <ion-icon
                      name="briefcase"
                      class="md hydrated icon"
                    ></ion-icon>
                    <span className="service-name">HandsOn</span>
                  </div>
                );
              }
            })}
          </div>
          <div className="mentor-description">{about}</div>
          <div className="mentor-skills">
            <h3>Skilled Areas :</h3>
            <div className="mentor-skill-sets">
              {expert.split(",").map((skill) => {
                return <span className="mentor-skill">{skill}</span>;
              })}
            </div>
          </div>
        </div>
        <div className="mentorship-details">
          <div className="mentorship-details-header">
            <p className="free-trail">
              <ion-icon name="trophy" class="md hydrated icon"></ion-icon>{" "}
              <span>7 Day Free Trial</span>
            </p>
          </div>

          <p className="mentorship-expectation">
            What can I expect from this mentor?
          </p>
          <div className="feature-item">
            <ion-icon name="school" class="md hydrated icon"></ion-icon>
            <p className="tag-line">
              One of our {tag.toLowerCase()} mentor,{tag.toLowerCase()} services
              & fast responses
            </p>
          </div>
          <div className="feature-item">
            <div className="icon-container">
              <ion-icon name="chatboxes" class="md hydrated icon"></ion-icon>
              <ion-icon name="mail" class="md hydrated icon"></ion-icon>
              <ion-icon name="text" class="md hydrated icon"></ion-icon>
            </div>
            <p className="tag-line">
              Unlimited chat, e-mail or text with mentor, within boundaries.
            </p>
          </div>
          <div className="feature-item">
            <ion-icon name="call" class="md hydrated icon"></ion-icon>
            <p className="tag-line">
              {typeof callCount === "number"
                ? `Up to ${callCount} ${
                    callCount > 1 ? "calls" : "call"
                  } per month`
                : `Regular 1-on-1 calls, per agreement with mentor`}
            </p>
          </div>
        </div>
        <div className="price">
          ₹{cost}
          <span>/month</span>
        </div>
        <div className="view-profile">
          <button>Proceed to Payment</button>
        </div>
      </div>

      {/* <Modal isOpen={loginmodalIsOpen} style={customStyles}>
        <div>
          <i
            className="fa-solid fa-xmark cross"
            onClick={modalIsCloseHandler}
          ></i>
          <div>
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  // onChange={()=>userEmailHandler}
                />
                <small id="emailHelp" class="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="text" class="form-control" placeholder="Name" />
              </div>
              <small class="form-text text-muted">
                We'll never store your Password.
              </small>
              <button
                type="submit"
                class="btn btn-primary"
                onClick={makePayment}
              >
                Submit
              </button>
            </form> */}
      {/* </div>
        </div>
      </Modal> */}
    </div>
  );
};
export default Details;

{
  /* <div className="container">
        <div className="row top">
          <div className="col-lg-5 col-md-5 col-sm-12 detail-left">
            <img
              src={require(`../${mentorData.images}`)}
              alt="Card image cap"
            />
          </div>
          <div className="col-lg-5 col-md-5 col-sm-12 details-right">
            <div className="detail-name">{mentorData.name}</div>
            <div className="detail-des">{mentorData.designation}</div>
            <div className="detail-exp">{mentorData.expert}</div>
            <div className="detail-rat">{mentorData.rating}</div>
            <div className="detail-pho">{mentorData.phone}</div>
            <div className="detail-ema">{mentorData.email}</div>
          </div>
          <div className="col-12 details-low">
            <p>{mentorData.about}</p>
            <div className="payment">
              <button type="button" className="btn btn-info payment-btn">
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div> */
}
