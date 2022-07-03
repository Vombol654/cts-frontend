import "../Styles/CourseCard.css";

const CourseCard = ({ course, user }) => {
  const { name, image, content, skillsRequired = [], mentors } = course;
  console.log(skillsRequired);
  const applied = mentors.find((mentor) => {
    return mentor._id === user._id;
  });

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
      {applied ? (
        <button className="course-apply-btn" disabled>
          Applied
        </button>
      ) : (
        <button className="course-apply-btn">Apply</button>
      )}
    </div>
  );
};

export default CourseCard;
