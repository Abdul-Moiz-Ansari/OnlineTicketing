import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router,Route,IndexRoute,browserHistory} from 'react-router';
import {Provider} from 'react-redux';


 import Home from './container/Home/Home';
//import Home from './container/OnlineTicketing/Home';
import AddUser from './container/Users/AddUsers';
import About from './container/About/About';
import App from './container/App/App';
import UsersList from './container/Users/UsersList';
import AddUsers from './container/Users/AddUsers';
import Buses from './container/OnlineTicketing/Buses';
import Destination from './container/OnlineTicketing/Destination';
import Routes from './container/OnlineTicketing/Route';
import Charges from './container/OnlineTicketing/Charges';
import RouteDetailC from './container/OnlineTicketing/RouteDetail';
import Schedule from './container/OnlineTicketing/Schedule';
import BookingC from './container/OnlineTicketing/Booking';
import BookingList from './container/OnlineTicketing/BookingList';
import Search from './container/OnlineTicketing/Search';

//import LeaveRequest from './container/Leave/LeaveRequest';

import SignIn from './container/SignIn/SignIn';
import SignUp from './container/SignIn/SignUp';
import ChangePassword from './container/SignIn/ChangePassword';
import UserList from './container/OnlineTicketing/UserList';
//import Users from './container/Users/Users';
import {store} from './store/index';

//for now, skipping react router , we'll do that in evening

ReactDOM.render(
<Provider store={store} >
    <Router history={browserHistory}>
        <Route path="/" component={App} >
            <IndexRoute component ={Home} />
            <Route path="/signin" component ={SignIn} />
            <Route path="/signup" component ={SignUp} />
            <Route path="/home" component ={Home} />
            <Route path="/about" component ={About} />
            <Route path="/buses" component ={Buses} />
            <Route path="/destination" component ={Destination} />
            <Route path="/route" component ={Routes} />
            <Route path="/charges" component={Charges} />
            <Route path="/routeDetail" component={RouteDetailC} />
            <Route path="/schedule" component={Schedule} />
            <Route path="/booking" component={BookingC} />
            <Route path="/bookingList" component={BookingList} />
            <Route path="/booking/:bookingid" component={BookingC} />
            <Route path="/search" component={Search} />
            <Route path="/changePassword" component={ChangePassword} />
            <Route path="/addUser(?id)" component={AddUsers} />
            <Route path="/userList" component={UserList} />

            {/*<Route path="/leaveRequest" component={LeaveRequest} />*/}
        </Route>
    </Router>
</Provider>,
document.getElementById('root')
);
