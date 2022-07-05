import { BrowserRouter, Route } from "react-router-dom";
import { Fragment } from "react";
import Header from "./Header";
import Filter from "./Filter/Filter";
import Home from "./Home";
import Details from "./Details";
import Payment from "./Payment";
import Login from "./Login/Login.page";
import SignUp from "./SignUp/SignUp.page";
import Courses from "./Courses/Courses.page";
import CourseForm from "./Courses/CourseForm.page";
function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/filter" component={Filter} />
      <Route path="/Courses" component={Courses} />
      <Route path="/details" component={Details} />
      <Route path="/courseform" component={CourseForm} />
      <Route path="/payment" component={Payment} />
      <Route path="/Login" component={Login} />
      <Route path="/SignUp" component={SignUp} />

      {/* <Route
        path="/payment"
        render={() => (
          <Fragment>
            <Payment />
            <Header />
          </Fragment>
        )}
      /> */}
    </BrowserRouter>
  );
}
export default Router;
