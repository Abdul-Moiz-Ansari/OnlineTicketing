
import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import ErrorNotification from '../../component/ErrorNotification';
import Authenticate from '../../HOC/Authenticate';

import User from '../../models/Users';
import UserAction from '../../store/action/UserAction';
//import { browserHistory } from 'react-router';

class ChangePassword extends React.Component<any, any>{

    constructor() {
        super();
        this.state = {
            errorMessage: "",
            txtNewPassword : "",
            txtConfirmPassword : ""
        };
    }

    componentWillMount() {
        this.props.trackUserStatus();
    }

    componentDidMount() {
        this.setState({
            uid: this.props.uid
        });
    }

    componentWillReceiveProps(nextProps) {
        let state = {};
        const {errorMessage: stateMessage} = this.state;
        const {message: propsMessage} = nextProps;

        if (stateMessage !== propsMessage) {
            state['errorMessage'] = propsMessage;
        }
        this.setState(state);
    }

    onFormSubmit(e) {
        e.preventDefault();
        let user;
        const { txtNewPassword : newPassword, txtConfirmPassword : confirmPassword} = this.state;

        if (newPassword !== confirmPassword) {
            this.setState({ errorMessage: "Passwords does not match." });
            return;
        }

        this.props.changePassword({ newPassword, confirmPassword });
    }

    onFormChange(e){
        this.setState({[e.target.id]:e.target.value});
    }

    private createRenderer = render => ({input, meta, label, ...rest}) =>
        <div className="col-md-12">
            <label className="col-md-offset-2 col-md-2">{label}</label>
            <div className="col-md-4">
                {/*<input {...input} className="form-control" />*/}
                {render(input, label, rest)}

                <div className="text-help">
                    {meta.touched ? meta.error : ''}
                </div>
            </div>
        </div>

    private createInput = this.createRenderer((input, label, {type}) =>
        <input type={type} {...input} className="form-control" />)

    render() {
        //let {handleSubmit} = this.props;
        const {errorMessage} = this.state;

        return (
            <div className="row">
                <h1>Change Password</h1>
                <ErrorNotification errorMessage={errorMessage} />
                <div className="form-group" >
                    <form onChange={this.onFormChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>

                        {/*<Field name="newPassword" component={this.createInput} type="password" label="New Password" />*/}
                        <div className="col-md-12">
                            <label className="col-md-offset-2 col-md-2">New Password</label>
                            <div className="col-md-4">
                                <input type="password" id="txtNewPassword" value={this.state.txtNewPassword}
                                    className="form-control" required />
                            </div>
                        </div>

                        {/*<Field name="confirmPassword" component={this.createInput} type="password" label="Confirm Password" />*/}
                        <div className="col-md-12">
                            <label className="col-md-offset-2 col-md-2">Confirm Password</label>
                            <div className="col-md-4">
                                <input type="password" id="txtConfirmPassword" value={this.state.txtConfirmPassword}
                                    className="form-control" required />
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="text-center">
                                <input type="submit" value="Change Password" className="btn btn-primary" />
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}

function MapDispatchToProps(dispatch) {
    return {
        changePassword: (user): void => dispatch(new UserAction().changePassword(user)),
        trackUserStatus: () => dispatch(new UserAction().trackUserStatus(null))
    }
}

function MapStatetoProps(state) {
    return {
        uid: state.User.uid,
        message: state.User.message
    }
}

let form;
form = Authenticate(ChangePassword);

export default connect(MapStatetoProps, MapDispatchToProps)(form);