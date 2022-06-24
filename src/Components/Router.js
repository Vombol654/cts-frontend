import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Filter from './Filter/Filter';
import Home from './Home'; 
import Details from './Details';
function Router() {
    return (
        <BrowserRouter>
            <Header/>
            <Route exact path="/" component={Home} />
            <Route path="/filter" component={Filter} />
            <Route path="/details" component={Details} />
        </BrowserRouter>
    )
}
export default Router;