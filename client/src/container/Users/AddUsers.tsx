import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { required, maxLength, minLength, requiredSelect } from '../../helper/reduxFormHelper';
import User from '../../models/Users';

import UserAction, * as userActionExt from '../../store/action/UserAction';
import ErrorNotification from '../../component/ErrorNotification';
import Authenticate from '../../HOC/Authenticate';
import { isNullOrUndefined } from 'util';

const mapStateToProps = state => {
    const { currentUser, isSaveSuccess } = state.User;
    return {
        uid: state.User.uid,
        currentUser,
        message: state.User.message,
        isSaveSuccess
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        addUser: (user): void => dispatch(new UserAction().addUser(user)),
        getUserByKey: (payload) => dispatch(userActionExt.getUserByKey(payload)),
        setCurrentUser: (payload) => dispatch(userActionExt.setCurrentUser(payload)),
        setSaveSuccess: (payload) => dispatch(userActionExt.setSaveSuccess(payload)),
        setErrorMessage: (payload) => dispatch(userActionExt.setErrorMessage(payload)),
    }
}

class AddUsers extends React.Component<any, any>{
    constructor() {
        super();

        this.state = {
            userid: 0,
            txtFullName : "",
            txtUserName: "",
            txtPassword: "",
            ddlUserType: "0",
            chkDisabled: false            
        }
    }

    static defaultProps = {
        currentUser: new User("", "", "", "","", false),
        isSaveSuccess : false
    };

    componentDidMount() {
        let state: any = {}, uid;
        uid = this.props.location.query.id;

        if (!isNullOrUndefined(uid)) {
            this.props.getUserByKey(uid);
        }
        this.props.setErrorMessage("");
        this.props.setSaveSuccess(false);
        this.props.setCurrentUser(new User("","","","","",false));
    }

    componentDidUpdate(prevProps) {
        let state: any = {};   //should be used with care

        //console.log('this.props.currentUser.userID : ',this.props.currentUser.userID, ' | prevProps.currentUser.userID : ', prevProps.currentUser.userID);
        if ((!isNullOrUndefined(this.props.currentUser.userID) && this.props.currentUser.userID !== "") 
            && (isNullOrUndefined(prevProps.currentUser.userID) || prevProps.currentUser.userID === "")) {
            //console.log('block 1');
            const { currentUser } = this.props;
            const { username, password, isAdmin, isEmployee, isExternal, disabled } = currentUser;

            state.txtUserName = username;
            state.txtPassword = password;
            state.chkDisabled = disabled;
            if (isAdmin) {
                state.ddlUserType = 'admin';
            }
            else if (isEmployee) {
                state.ddlUserType = 'employee';
            }
            else if (isExternal) {
                state.ddlUserType = 'external';
            }

            this.setState(() => state);
        }

        //console.log('this.props.isSaveSuccess : ',this.props.isSaveSuccess,' | prevProps.isSaveSuccess : ',prevProps.isSaveSuccess);
        if (this.props.isSaveSuccess === true && prevProps.isSaveSuccess !== true) {    
            //console.log('block 2');
            state.txtUserName = "";
            state.txtPassword = "";
            state.chkDisabled = false;
            state.ddlUserType = "";
            this.setState(() => state);
            this.props.setCurrentUser(new User("", "", "", "","", false));
            this.props.setSaveSuccess(false);
        }
    }

    onFormSubmit(e) {
        e.preventDefault();

        let isAdmin, isEmployee, isExternal, user: User;
        const { currentUser } = this.props;
        let {
            txtFullName : fullName, 
            txtUserName: username, 
            txtPassword: password, 
            ddlUserType: userType, 
            chkDisabled: disabled
         } = this.state;

        isAdmin = userType && userType === "admin";
        isEmployee = userType && userType === "employee";
        isExternal = userType && userType === "external";
        disabled = (disabled as boolean);
        user = new User(currentUser.userID, username, username,fullName, password, disabled, isAdmin, 
                    isEmployee, isExternal, "", true, "");
        this.props.addUser(user);
    }

    onFormChange(e) {
        let state: any = {};
        state[e.target.id] = e.target.value;
        if (e.target.id === 'chkDisabled') {
            state[e.target.id] = e.target.checked;
        }
        //this.setState({ [e.target.id]: e.target.value });
        this.setState(() => state);
    }

    render() {
        const { setErrorMessage } = this.props;
        const { txtFullName ,txtUserName, txtPassword, ddlUserType, chkDisabled } = this.state
        return (

            <div className="row">
                <h1>Add Users</h1>
                <ErrorNotification 
                errorMessage={this.props.message}
                setMessage = {setErrorMessage}/>

                <div className="col-md-offset-1 col-md-10">
                    <div className="row">
                        <form onChange={this.onFormChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>

                             <div className="col-md-6">
                                <label className="col-md-3">Name</label>
                                <div className="col-md-9">
                                    <input type="text" className="form-control" id="txtFullName" value={txtFullName} 
                                    required />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label className="col-md-3">User Name</label>
                                <div className="col-md-9">
                                    <input type="text" className="form-control" id="txtUserName" value={txtUserName} required />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label className="col-md-3">Password</label>
                                <div className="col-md-9">
                                    <input type="password" className="form-control" id="txtPassword" value={txtPassword} required />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label className="col-md-3">User Type</label>
                                <div className="col-md-9">
                                    <select className="form-control" id="ddlUserType" value={ddlUserType} required>
                                        <option>Select</option>
                                        <option value="admin" key="admin" >Admin</option>
                                        <option value="employee" key="employee">Employee</option>
                                        <option value="external" key="external">External</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label className="col-md-3">Disabled</label>
                                <div className="col-md-9">
                                    <input type="checkbox" id="chkDisabled" checked={chkDisabled} />
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="text-center">
                                    <input type="submit" value="Save" className="btn btn-primary" />
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

let comp;
comp = Authenticate(AddUsers);
export default connect(mapStateToProps, mapDispatchToProps)(comp);