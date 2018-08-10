
import * as React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import UserAction from '../store/action/UserAction';
import { validateAuthCredentials } from '../helper/GeneralFunctions';

class Navbar extends React.Component<any, any>{

    constructor() {
        super();

        this.toggleUserDropDown = this.toggleUserDropDown.bind(this);
        this.hideUserDropDown = this.hideUserDropDown.bind(this);
        this.toggleLoggedInUserDropDown = this.toggleLoggedInUserDropDown.bind(this);
        this.hideLoggedInUserDropDown = this.hideLoggedInUserDropDown.bind(this);
        this.state = {
            isUserDropDownOpened: false
        };
    }

    toggleUserDropDown() {
        this.setState((prevState) => {
            return { 
                isUserDropDownOpened: !prevState.isUserDropDownOpened,
                isLoggedInUserDropDownOpened : false
             };
        })
    }

    hideUserDropDown() {
        this.setState((prevState) => {
            return { 
                isUserDropDownOpened: false
             };
        })
    }

    toggleLoggedInUserDropDown() {
        this.setState((prevState) => {
            return { 
                isLoggedInUserDropDownOpened: !prevState.isLoggedInUserDropDownOpened,
                isUserDropDownOpened : false
             };
        })
    }

    hideLoggedInUserDropDown() {
        this.setState((prevState) => {
            return { 
                isLoggedInUserDropDownOpened: false
             };
        })
    }

    getListItems() {
        let listItems = [], dropDownDisplayProp,loggedInUserDropDownDisplayProp;
        const { uid, isAdmin, isEmployee, isExternal } = this.props;
        let {displayName} = this.props;
        const { isUserDropDownOpened,isLoggedInUserDropDownOpened } = this.state;
        dropDownDisplayProp = isUserDropDownOpened ? "block" : "none";
        loggedInUserDropDownDisplayProp = isLoggedInUserDropDownOpened ? "block" : "none";

        displayName = !displayName ? "Name unavailable" : displayName;

        if (uid.trim() === "") {
            listItems = [
                <li key="signin"><Link to="/signin">Sign In</Link></li>,
                <li key="signup"><Link to="/signup">Sign Up</Link></li>];
        }
        else {
            listItems.push(<li key="home"><Link to="/home">Home</Link></li>);
            if (isAdmin) {
                listItems = listItems.concat([
                    <li key="buses"><Link to="/buses">Buses</Link></li>,
                    <li key="destination"><Link to="/destination">Destination</Link></li>,
                    <li key="routes"><Link to="/route">Routes</Link></li>,
                    <li key="charges"><Link to="/charges">Charges</Link></li>,
                    <li key="schedule"><Link to="/schedule">Schedule</Link></li>,
                ]);
            }

            listItems = listItems.concat([
                <li key="booking"><Link to="/booking">Booking</Link></li>,
                <li key="bookingList"><Link to="/bookingList">My Bookings</Link></li>,
                <li key="search"><Link to="/search">Search</Link></li>
            ]);

            //User DropDown
            if(isAdmin === true){
                listItems.push(
                    <li key="userDropDown" className="dropdown" >
                        <a href="#" onClick={this.toggleUserDropDown} className="dropdown-toggle" data-toggle="dropdown"
                            role="button" aria-haspopup="true" aria-expanded="false">
                            User
                            <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu" style={{ 'display': dropDownDisplayProp }}>
                            <li key="addUser" onClick={this.hideUserDropDown} ><Link to="/addUser">Add User</Link></li>
                            <li key="userList" onClick={this.hideUserDropDown}><Link to="/userList">User List</Link></li>
                        </ul>
                    </li>
                );
            }            

            //Logged In User dropdown
            listItems.push(
                <li key="loggedInUserDropDown" className="dropdown" >
                    <a href="#" onClick={this.toggleLoggedInUserDropDown} className="dropdown-toggle" data-toggle="dropdown"
                        role="button" aria-haspopup="true" aria-expanded="false">
                        {displayName}
                        <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu" style={{ 'display': loggedInUserDropDownDisplayProp }}>
                        <li key="changePassword" onClick={this.hideLoggedInUserDropDown} ><Link to="/changePassword">Change Password</Link></li>
                        <li role="separator" className="divider"></li>
                        <li key="signout" onClick={this.hideLoggedInUserDropDown}>
                            <a onClick={() => this.props.signOut()} style={{ 'cursor': 'pointer' }}>Sign Out</a>
                        </li>
                    </ul>
                </li>
            );
        }
        return listItems;
    }

    render() {
        let listItems = [];
        listItems = this.getListItems();

        return (
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

function MapStateToProps(state) {
    const { User } = state;
    const {displayName} = User;
    return {        
        uid: state.User.uid,
        displayName,
        isAdmin: User.isAdmin,
        isEmployee: User.isEmployee,
        isExternal: User.isExternal
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signOut: () => dispatch(new UserAction().signOut(null))
    }
}

export default connect(MapStateToProps, mapDispatchToProps)(Navbar);