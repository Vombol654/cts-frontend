import { useEffect } from "react";
import { connect } from "react-redux";
import { getCourses } from "../../store/action/coursesAction";
import CourseCard from "../CourseCard";
import Loading from "../Loading";

import "./Courses.page.css";

const Courses = ({ coursesData, myData, getCourses }) => {
  const { courses, loading, error } = coursesData;
  const { user } = myData;

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="courses-grid">
      {loading && <Loading content="Get Courses" />}
      {error && <h1>Failed to Fetch courses...</h1>}
      {courses.map((course) => {
        return <CourseCard course={course} user={user} />;
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    coursesData: state.Courses,
    myData: state.Login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCourses: () => dispatch(getCourses()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
