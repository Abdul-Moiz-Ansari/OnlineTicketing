
import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import User from '../../models/Users';
import UserAction from '../../store/action/UserAction';
import { browserHistory } from 'react-router';


class SignIn extends React.Component<any, any>{

    componentDidMount() {
        this.setState({
            uid: this.props.uid
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.uid.trim() !== nextProps.uid.trim()) {
            if (nextProps.uid.trim !== "") {
                browserHistory.push('/home');
            }
        }
    }

    onFormSubmit(values) {
        let user; const {username, password} = values;

        user = new User(0, username, password, false);
        this.props.signIn(user);
    }

    private createRenderer = render => ({input, meta, label, ...rest}) =>
        <div className="col-md-6">
            <label htmlFor="txtUsername" className="col-md-3">{label}</label>
            <div className="col-md-8">
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
        let {handleSubmit} = this.props;

        return (
            <div className="row">
                <div className="form-group" >
                    <form onSubmit={handleSubmit(values => this.onFormSubmit(values))}>

                        <Field name="username" component={this.createInput} type="text" label="User Name" />

                        <Field name="password" component={this.createInput} type="password" label="Password" />

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

const validate = values => {
    const errors: any = {};

    if (!values.username) {
        errors.username = "Required";
    }

    if (!values.password) {
        errors.password = "Required";
    }

    return errors;
}

function MapDispatchToProps(dispatch) {
    return {
        signIn: (user): void => dispatch(new UserAction().signIn(user))
    }
}

function MapStatetoProps(state) {
    return {
        uid: state.User.uid
    }
}

const form = reduxForm({
    form: 'SignInForm',
    validate
})(SignIn);

export default connect(MapStatetoProps, MapDispatchToProps)(form);