import { Fragment, useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation } from "react-router";
import Modal from "react-modal";
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
  const location = useLocation();
  const qs = queryString.parse(location.search);
  const { mentorId } = qs;
  useEffect(() => {
    // console.log(mentorId);
    axios({
      url: `http://localhost:8085/mentordetail/${mentorId}`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setMentorData(res.data.mentor);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(mentorData.images);
  }, [mentorData]);
  return (
    <Fragment>
      <div className="container">
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
    </Fragment>
  );
};
export default Details;
