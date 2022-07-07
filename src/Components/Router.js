import { BrowserRouter, Route } from "react-router-dom";
import { Fragment } from "react";
import Header from "./Header";
import AdminHome from "./admin/AdminHome";
import Filter from "./Filter/Filter";
import Home from "./Home";
import Details from "./Details";
import Payment from "./Payment";
function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Route path='/admin' component={AdminHome}/>
      {/* <Route exact path="/" component={Home} />
      <Route path="/filter" component={Filter} />
      <Route path="/details" component={Details} />
      <Route path="/payment" component={Payment} /> */}
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
