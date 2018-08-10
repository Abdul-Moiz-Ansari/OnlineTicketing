
import * as _ from 'lodash';
import { IAction } from '../IAction';
import UserAction, * as userActionExt from '../action/UserAction';
import User from '../../models/Users';
import { isNull } from '../../helper/GeneralFunctions';
import { isNullOrUndefined } from 'util';

const InitState = {
    uid: "",
    users: [],
    authUsers: [],
    currentUser: new User("", "", "", "","", false),
    message: "",
    displayName : "",
    isSignUp : false,
    isAdmin: false,
    isEmployee: false,
    isExternal: false,
    residingDestinationID: "",
    isSaveSuccess: false
};

export function UserReducer(state = InitState, action: IAction) {
    let newState, uid,userID, users = [],authUsers = [], index, user: any,authUser : any, message;

    switch (action.type) {
        case new UserAction().SIGNIN_SUCCESS:

            uid = action.payload.uid;
            newState = Object.assign({}, state, { uid: uid });
            return newState;

        case new UserAction().SIGNUP_SUCCESS:
            uid = action.payload.uid;
            newState = Object.assign(state, {}, { uid: uid });
            return newState;

        case new UserAction().SIGNOUT_SUCCESS:
            return Object.assign({}, state, {
                uid: "",
                isAdmin: false,
                isEmployee: false,
                isExternal: false,
                residingDestinationID: ""
            });

        case new UserAction().ADD_USER_SUCCESS:
            message = action.payload === "" ? "User added successfully." : "User updated successfully.";
            return Object.assign({}, state, {
                message,
                isSaveSuccess: true
            });

        case userActionExt.GET_USERS_SUCCESS:
            users = !isNull(action.payload) ? _.toArray(action.payload) : users;
            return Object.assign({}, state, { users });

        case userActionExt.GET_AUTH_USERS_SUCCESS:
            users = !isNullOrUndefined(action.payload) ? _.toArray(action.payload) : users;
            return Object.assign({}, state, { authUsers: users });

        case userActionExt.USERS_ADDED_OR_CHANGED:
            user = action.payload.user;
            authUser = action.payload.authUser;
            users = _.cloneDeep(state.users);
            authUsers = _.cloneDeep(state.authUsers);
            index = _.findKey(users, { 'userID': user.userID });
            index = index > -1 ? index : users.length;
            users[index] = user;

            index = _.findKey(authUsers, { 'uid': authUser.uid });
            index = index > -1 ? index : authUsers.length;
            authUsers[index] = authUser;

            return Object.assign({}, state, { users,authUsers });

        case userActionExt.GET_USER_BY_KEY_SUCCESS:
            user = action.payload;
            return Object.assign({}, state, { currentUser: user });

        case new UserAction().GET_USER_CREDENTAILS_SUCCESS:

            let payload;
            const { displayName,isAdmin, isEmployee, isExternal, residingDestinationID } = action.payload[Object.keys(action.payload)[0]];
            newState = Object.assign(state, {}, {
                displayName,
                isAdmin: isAdmin,
                isEmployee: isEmployee,
                isExternal: isExternal,
                residingDestinationID
            });
            return newState;           
        
        case userActionExt.SET_IS_SIGNUP:
            return {...state, isSignUp : action.payload  };

        case userActionExt.SET_CURRENT_USER:
            return Object.assign(state, {}, {
                currentUser: action.payload
            });

        case userActionExt.SET_SAVE_SUCCESS:
            return Object.assign(state, {}, {
                isSaveSuccess: action.payload
            });

        case userActionExt.USERS_REMOVED:
            
            userID = action.payload.userID;
            //remove db user
            users = _.cloneDeep(state.users);
            index = _.findKey(users,{'userID' : userID});
            if(index > -1){
                users.splice(index,1);
            }
            //remove auth user
            authUsers = _.cloneDeep(state.authUsers);
            index = _.findKey(authUsers,{'uid' : userID});
            if(index > -1){
                authUsers.splice(index,1);
            }
            return {...state,users,authUsers};

        case userActionExt.SET_ERROR_MESSAGE:
            return Object.assign(state, {}, {
                message: action.payload
            });

        case new UserAction().MESSAGE:
            newState = Object.assign({}, state, { message: action.payload });
            return newState;

        default:
            //newState = state;
            return state;
    }
    //console.log('newState : ', newState, '| state :',state,'| action.type  : ',action.type);
    //return newState;
}

export const addUserFormReducer = (state, action) => {
    let uAction = new UserAction();
    switch (action.type) {
        case uAction.ADD_USER_SUCCESS:
            return undefined;
        default:
            return state;
    }
}