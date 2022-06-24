import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import "../../../Styles/layout.css";
const Layout = (props) => {
  const history = useHistory();
  const { mentorData } = props;
  const handleNavigate = (mentorId) => {
    history.push(`/details?mentorId=${mentorId}`);
  };
  console.log(`${mentorData.images}`);
  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div
            className="filter-right"
            onClick={() => handleNavigate(mentorData._id)}
          >
            <div className="layout-pic col-lg-3 col-md-4 col-sm-6">
              <img
                className="card-img-top"
                src={require(`../../../${mentorData.images}`)}
                alt="Card image cap"
              />
            </div>
            <div className="layout-details col-lg-8 col-md-7 col-sm-6">
              <span>Name:{mentorData.name}</span>
              <span>Language: {mentorData.language}</span>
              <span>Location: {mentorData.city}</span>
            </div>
            <hr />
            <div className="layout-feture">
              <span>
                {" "}
                Features:{mentorData.features.map((item) => `${item.name}, `)}
              </span>
              <span>Cost: {mentorData.cost}</span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Layout;
