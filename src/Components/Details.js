import { Fragment, useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../Styles/details.css";
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
const Details = () => {
  const [mentorData, setMentorData] = useState({
    name: "Mentor Name",
    designation: "Mentor Designation",
    expert: "Expert",
    rating: 0,
    images: "",
    phone: "Phone Number",
    email: "Mentor Email Id",
  });
  const [amount, setamount] = useState(0);
  const location = useLocation();
  const history = useHistory();
  const qs = queryString.parse(location.search);
  const { mentorId } = qs;
  useEffect(() => {
    console.log(mentorId);
    axios({
      url: `http://localhost:8085/mentordetail/${mentorId}`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setMentorData(res.data.mentor);
        setamount(res.data.mentor["cost"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handlePayment = () => {
    sessionStorage.setItem("amount", amount);
    history.push(`/payment`);
  };

  return (
    <Fragment>
      <div className="container">
        <div className="row top">
          <div className="col-lg-5 col-md-5 col-sm-12 detail-left">
            <img
              // src={'../Images/anindya.jpg'}
              // src={require(`../Images/anindya.jpg`)}
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
              <button
                type="button"
                className="btn btn-info payment-btn"
                onClick={handlePayment}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Details;
