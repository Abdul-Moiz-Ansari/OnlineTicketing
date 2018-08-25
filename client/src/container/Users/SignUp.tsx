
import * as React from 'react';
import { connect } from 'react-redux';
import User from '../../models/Users';

import ErrorNotification from '../../component/ErrorNotification';
import UserAction,* as userActionExt from '../../store/action/UserAction';
import {browserHistory} from 'react-router';


class SignUp extends React.Component<any, any>{

    constructor() {
        super();

        this.state = {
            txtFullName : "",
            txtUserName : "",
            txtPassword : ""
        };
    }

    componentDidMount(){
        this.props.setErrorMessage("");
        this.setState({
            uid : ""
        });        
    }

    componentWillReceiveProps(nextProps){
        if(this.props.uid.trim() !== nextProps.uid.trim()){
            if(nextProps.uid.trim() !== ""){ browserHistory.push('/home');}
        }
    }

    onFormSubmit(e) {
        let user,username,password,isDisabled,isAdmin,isEmployee,isExternal,employeeID,isFirstTimeLoggedIn;
        e.preventDefault();
        const {txtFullName : fullName} = this.state;

        username = this.state["txtUserName"];
        password = this.state["txtPassword"];
        isDisabled= false;
        isAdmin = false;
        isEmployee = false;
        isExternal = true;
        employeeID = "";
        isFirstTimeLoggedIn = false;
        user = new User("",username,username,fullName,password,isDisabled,isAdmin,isEmployee,isExternal,employeeID,
                isFirstTimeLoggedIn,"");

        this.props.setIsSignUp(true);
        this.props.signUp(user);        
    }

    onFormChange(e){
        let state;

        state = this.state;
        state[e.target.id] = e.target.value;
        this.setState(state);
    }

    render() {
        const {txtFullName} = this.state;
        const {errorMessage,setErrorMessage} = this.props;
        return (
            <div className="row ">
                <h1>Sign Up</h1>
                <ErrorNotification errorMessage={errorMessage} setMessage={setErrorMessage} />
                <div className="form-group" >
                    <form onChange={this.onFormChange.bind(this)}  onSubmit={this.onFormSubmit.bind(this)}>

                        <div className="col-md-6">
                            <label htmlFor="txtUsername" className="col-md-3">Name :</label>
                            <div className="col-md-8">
                                <input type="text" id="txtFullName" className="form-control" 
                                    value={txtFullName} required />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="txtUsername" className="col-md-3">Email : </label>
                            <div className="col-md-8">
                                <input type="email" id="txtUserName" className="form-control" 
                                    value={this.state['txtUserName']} required />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="ddlSchedule" className="col-md-3">Password :</label>
                            <div className="col-md-8">
                                <input type="password" id="txtPassword" className="form-control" 
                                    value={this.state['txtPassword']} required />
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="text-center">
                                <input type="submit" value="Sign Up" className="btn btn-primary" />
                            </div>
                        </div>

                    </form>
                </div>                
            </div>
        )
    }
}

function MapDispatchToProps(dispatch){    
    return{
        signUp : (user) : void => dispatch(new UserAction().signUp(user)),
        setIsSignUp  : (payload) : void => dispatch(userActionExt.setIsSignUp(payload)),
        setErrorMessage : (payload) : void => dispatch(userActionExt.setErrorMessage(payload))
    }
}

function MapStateToProps(state){
    const {message : errorMessage} = state.User;
    return{
        uid : state.User.uid,
        errorMessage
    }
}

export default connect(MapStateToProps,MapDispatchToProps)(SignUp);