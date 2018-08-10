import * as React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as _ from 'lodash';

import BookingListC from '../../component/OnlineTicketing/BookingList';
import Authenticate from '../../HOC/Authenticate';
import ErrorNotification from '../../component/ErrorNotification';
import { Row } from '../../component/OnlineTicketing/UserListRow';

import UserAction, * as userActionExt from '../../store/action/UserAction';
import { isNull } from '../../helper/GeneralFunctions';
import { isNullOrUndefined } from 'util';

class UserList extends React.Component<any, any>{

    static defaultProps = {
        users: [],
        authUsers: [],
        deleteUser: function () { }
    }

    componentDidMount() {
        const { getUsers, setErrorMessage, users } = this.props;
        if (users.length === 0) { getUsers(); }
        setErrorMessage("");
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.currentUser.userID === "" &&
            this.props.currentUser.userID !== "" &&
            !isNullOrUndefined(this.props.currentUser.userID)
        ) {
            browserHistory.push('/addUser');
        }
    }

    redirectToaddUsers(uid) {
        browserHistory.push('/addUser?id=' + uid);
    }

    getUserRow(authUser) {
        let user, mergedUser;
        const {
            authUsers,
            users,
            isAdmin,
            deleteUser
        } = this.props;

        user = _.find(users, { 'userID': authUser.uid });
        if (!isNull(user)) {
            mergedUser = Object.assign(authUser, user);
            return (<Row
                key={authUser.uid}
                isAdmin={isAdmin}
                user={mergedUser}
                getUserByKey={this.redirectToaddUsers}
                deleteUser={deleteUser} />);
        }
        return (<Row
            key={authUser.uid}
            isAdmin={isAdmin}
            user={authUser}
            getUserByKey={this.redirectToaddUsers}
            deleteUser={deleteUser} />);
    }

    render() {
        const {
            isAdmin,
            authUsers,
            errorMessage,
            setErrorMessage
        } = this.props;

        return (
            <div>
                <h1>Users List</h1>
                <ErrorNotification errorMessage={errorMessage} setMessage={setErrorMessage} />
                <table className="table">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Is Disabled</th>
                            <th>Is Admin</th>
                            <th>Is Employee</th>
                            <th>Is External</th>
                        </tr>
                    </thead>
                    <tbody>
                        {authUsers.map(this.getUserRow.bind(this))}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { uid, users, authUsers, currentUser, isAdmin, isExternal, isEmployee, message: errorMessage } = state.User;
    return {
        uid,
        users,
        authUsers,
        currentUser,
        isAdmin,
        isEmployee,
        isExternal,
        errorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    let userAction = new UserAction();
    return {
        getUsers: () => dispatch(userActionExt.getUsers()),
        getUsersByKey: (payload) => dispatch(userActionExt.getUserByKey(payload)),
        setErrorMessage: (payload) => dispatch(userAction.message(payload)),
        deleteUser: (payload) => dispatch(userActionExt.deleteUser(payload))
    }
}

let component;
component = UserList;
export default Authenticate(connect(mapStateToProps, mapDispatchToProps)(component));