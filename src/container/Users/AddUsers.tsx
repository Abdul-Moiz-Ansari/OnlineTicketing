import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { required, maxLength, minLength, requiredSelect } from '../../helper/reduxFormHelper';
import User from '../../models/Users';

//import { UserAction } from '../../store/action/users';
import UserAction from '../../store/action/UserAction';
import { UserItem } from '../../component/UserItem';
import ErrorNotification from '../../component/ErrorNotification';

const mapStateToProps = state => {
    return {
        uid: state.User.uid,
        message : state.User.message
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        //fetchUsers: (): void => dispatch(UserAction.fetchUsers()),
        addUser: (user): void => dispatch(new UserAction().addUser(user)),
        //removeUser: (index): void => dispatch(UserAction.RemoveUser(index)),
        //editUser: (userid): void => dispatch(UserAction.GetUser(userid))
    }
}

class AddUsers extends React.Component<any, any>{
    constructor() {
        super();
    }

    state = {
        userid: 0,
        txtUserName: "",
        txtPassword: "",
        ddlUserType: "0",
        ddlEmployee: "0",
    }

    private createRenderer = render => ({input, meta, label, ...rest}) =>
        <div className="col-md-6">
            <label className="col-md-3">{label}</label>
            <div className="col-md-9">
                {render(input, label, rest)}

                <div className="text-danger">
                    {meta.error && meta.touched ? meta.error : ''}
                </div>
            </div>
        </div>

    private createInput = this.createRenderer((input, label, {type}) =>
        <input type={type} {...input} className="form-control" />
    )

    public createSelect = this.createRenderer((input, label, {children}) =>
        <select {...input} className="form-control" >
            <option>Select</option>
            {children}
        </select>
    )

    onFormSubmit(values) {
        let isAdmin,isEmployee,isExternal,user : User ;
        if (Object.keys(values).length === 0) {
            window.alert('Please fill out the below fields');
            return;
        }

        isAdmin = values.userType && values.userType === "admin";
        isEmployee = values.userType && values.userType === "employee";
        isExternal = values.userType && values.userType === "external";
        user = new User("",values.username,values.password,true,isAdmin,isEmployee,isExternal,"",true);
        //console.log(values);
        this.props.addUser(user);        
    }

    onFormChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    render() {
        const {handleSubmit,submitting} = this.props;
        return (

            <div className="row">
                <h1>Add Users</h1>
                <ErrorNotification errorMessage={this.props.message} />
                <div className="col-md-offset-1 col-md-10">
                    <div className="row">
                        <form ref="UserForm" onSubmit={handleSubmit(values => this.onFormSubmit.call(this,values))}>

                            <Field name="username" component={this.createInput} label="User Name"
                                validate={[required,maxLength(20), minLength(8)]} />

                            <Field name="password" component={this.createInput} type="password" label="Password"
                                validate={[required,maxLength(20), minLength(8)]} />

                            <Field name="userType" component={this.createSelect} label="User Type"
                                valdate={[required,requiredSelect("0")]}>
                                <option value="admin" key="admin" >Admin</option>
                                <option value="employee" key="employee">Employee</option>
                                <option value="external" key="external">External</option>
                            </Field>

                            <Field name="employee" component={this.createSelect} label="Employee" />

                            <div className="col-md-12">
                                <div className="text-center">
                                    <input type="submit" value="Save" className="btn btn-primary" disabled={submitting} />
                                </div>
                            </div>

                        </form>
                    </div>
                </div>

                {/*<h3>Users</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Remove</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users}
                    </tbody>
                </table>*/}
            </div>
        )
    }
}

let comp = reduxForm({ form: "addUserForm" })(AddUsers);

export default connect(mapStateToProps, mapDispatchToProps)(comp);