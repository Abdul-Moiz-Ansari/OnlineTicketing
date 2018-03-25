
import * as React from 'react';
import { connect } from 'react-redux';
import User from '../../models/Users';
import UserAction from '../../store/action/UserAction';
import {browserHistory} from 'react-router';


class SignIn extends React.Component<any, any>{

    
    constructor() {
        super();

        this.state = {
            txtUserName : "",
            txtPassword : ""
        };

        //console.log('state in constructor',this.state);
    }

    componentDidMount(){
        //let state;

        this.setState ( {
            uid : this.props.uid
        });

        //console.log('this.props.uid : ',this.props.uid);        
    }

    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps : ',nextProps.uid);
        if(this.props.uid.trim() !== nextProps.uid.trim()){
            if(nextProps.uid.trim !== ""){
                browserHistory.push('/home');
            }
        }
    }

    onFormSubmit(e) {
        let user,username,password;

        e.preventDefault();

        username = this.state["txtUserName"];
        password = this.state["txtPassword"];
        user = new User(0,username,password,false);

        this.props.signIn(user);        
    }

    onFormChange(e){
        let state;

        state = this.state;
        state[e.target.id] = e.target.value;
        this.setState(state);
    }

    render() {
        return (
            <div className="row ">
                <div className="form-group" >
                    <form onChange={this.onFormChange.bind(this)}  onSubmit={this.onFormSubmit.bind(this)}>

                        <div className="col-md-6">
                            <label htmlFor="txtUsername" className="col-md-3">User Name:</label>
                            <div className="col-md-8">
                                <input type="text" id="txtUserName" className="form-control" value={this.state['txtUserName']} />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="ddlSchedule" className="col-md-3">Password :</label>
                            <div className="col-md-8">
                                <input type="password" id="txtPassword" className="form-control" value={this.state['txtPassword']} />
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="text-center">
                                <input type="submit" value="Login" className="btn btn-primary" />
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
        signIn : (user) : void => dispatch(new UserAction().signIn(user))
    }
}

function MapStatetoProps(state){
    return{
        uid : state.User.uid
    }
}

export default connect(MapStatetoProps,MapDispatchToProps)(SignIn);