import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../Styles/CourseCard.css";

const CourseCard = ({ course, user, mentorships }) => {
  const { _id, name, image, content, skillsRequired = [], mentors } = course;

  const [applied, setApplied] = useState(null);
  const [approved, setApproved] = useState(null);

  const history = useHistory();

  useEffect(() => {
    setApproved(
      mentors.find((mentor) => {
        return mentor._id === user._id;
      })
    );

    setApplied(
      mentorships.find((mentor) => {
        return mentor.course_id === _id;
      })
    );
  }, [mentorships]);
  const redirectToCourseFormPage = async (course) => {
    await pushdataInsessionStorage(course)
      .then((res) => {
        history.push(`/courseform`);
      })
      .catch((err) => alert(err));
  };

  const pushdataInsessionStorage = async (course) => {
    return new Promise(function (resolve, reject) {
      sessionStorage.setItem("course", JSON.stringify(course));
      if (sessionStorage.getItem("course")) {
        resolve("Data set in session Storage");
      } else {
        reject("Sorry for the error...");
      }
    });
  };

  return (
    <div className="course-card">
      <div className="course-img">
        <img src={image} alt={name} />
      </div>
      <h1 className="course-title">{name}</h1>
      <div className="skills-expected">
        <h3>Skills Required for this Course</h3>
        <div className="skills">
          {skillsRequired.length === 0 ? (
            <h5>No Requirements Needed...</h5>
          ) : null}
          {skillsRequired.map((skill) => {
            return <span>{skill}</span>;
          })}
        </div>
      </div>
      <p className="summary">{content}</p>
      {approved ? (
        <button className="course-apply-btn" disabled>
          Go To Course
        </button>
      ) : applied ? (
        <button className="course-apply-btn" disabled>
          Proposed
        </button>
      ) : (
        <button
          className="course-apply-btn"
          onClick={() => redirectToCourseFormPage(course)}
        >
          Apply
        </button>
      )}
    </div>
  );
};

export default CourseCard;
