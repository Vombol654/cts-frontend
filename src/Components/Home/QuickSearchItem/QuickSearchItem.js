import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import "../../../Styles/quickSearchItem.css";

const QuickSearchItem = (props) => {
  const { QuickSearchItemData } = props;
  const history = useHistory();
  const handleNavigate = (course_type) => {
   const  languageId= sessionStorage.getItem('languageId')
   if(languageId){
    history.push(`/filter?course_type=${course_type}&languageId=${languageId}`);
   }
   else{
    history.push(`/filter?course_type=${course_type}`);
   }
   
  };
  return (
    <Fragment>
      <div
        className="card col-lg-3 col-md-5 col-sm-12"
        onClick={() => handleNavigate(QuickSearchItemData.course_type)}
      >
        <img
          className="card-img-top"
          // src={require(`../../../${QuickSearchItemData.image}`)}
          src={require(`../../../Images/ananda.jpg`)}
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">{QuickSearchItemData.name}</h5>
          <p className="card-text">{QuickSearchItemData.content}</p>
        </div>
      </div>
    </Fragment>
  );
};
export default QuickSearchItem;
