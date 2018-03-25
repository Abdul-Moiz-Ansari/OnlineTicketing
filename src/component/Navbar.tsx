
import * as React from 'react';
import {Link,browserHistory} from 'react-router';
import {connect} from 'react-redux';

class Navbar extends React.Component<any,any>{

    componentWillMount(){
        this.setState({
            uid : ""
        });
    }

    componentWillReceiveProps(nextProps){
        if(this.props.uid.trim() !== nextProps.uid.trim()){
           this.setState({uid : nextProps.uid});
        }
    }

    render(){
        let uid,listItems = [];
        uid = this.state.uid;

        uid= "--L"; //added temp, for development mode

        if(uid.trim() === ""){
            listItems = [
                    <li key="signin"><Link to="/signin">Sign In</Link></li>,
                    <li key="signup"><Link to="/signup">Sign Up</Link></li>];
        }else{
            listItems = [
                    <li key="home"><Link to="/home">Home</Link></li>,
                    <li key="buses"><Link to="/buses">Buses</Link></li>  ,
                    <li key="destination"><Link to="/destination">Destination</Link></li> ,
                    <li key="routes"><Link to="/route">Routes</Link></li> ,
                    <li key="charges"><Link to="/charges">Charges</Link></li>,
                    // <li key="routedetail"><Link to="/routeDetail">Route Detail</Link></li>,
                    <li key="schedule"><Link to="/schedule">Schedule</Link></li>,
                    <li key="booking"><Link to="/booking">Booking</Link></li>,
                    <li key="bookingList"><Link to="/bookingList">My Bookings</Link></li>,
                    <li key="search"><Link to="/search">Search</Link></li>,
                    <li key="addUser"><Link to="/addUser">Add User</Link></li>,
            ];
        }

        return(
            <div className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                {/*<a className="navbar-brand" href="#">Online Ticketing</a>*/}
                <Link className="navbar-brand" to="/home" >Online Ticketing</Link>
                    </div>
                    <div className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            {/*<li><Link to="/home">Home</Link></li>
                            <li><Link to="/signin">Sign In</Link></li>
                            <li><Link to="/signup">Sign Up</Link></li>
                            <li><Link to="/buses">Buses</Link></li>  
                            <li><Link to="/route">Routes</Link></li> 
                            <li><Link to="/charges">Charges</Link></li>
                            <li><Link to="/routeDetail">Route Detail</Link></li>
                            <li><Link to="/schedule">Schedule</Link></li>
                            <li><Link to="/booking">Booking</Link></li>*/}
                            {listItems}
                        </ul>
                    </div>
                </div>
            </div>

        )
    }
}

function MapStateToProps(state){
    return{
        uid : state.User.uid
    }
}

export default connect(MapStateToProps,null)(Navbar);