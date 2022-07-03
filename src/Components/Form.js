import "../Styles/form.css";

const Form = ({ children, submitHandler, ...otherprops }) => {
  return (
    <form onSubmit={submitHandler} {...otherprops}>
      {children}
    </form>
  );
};

export default Form;
