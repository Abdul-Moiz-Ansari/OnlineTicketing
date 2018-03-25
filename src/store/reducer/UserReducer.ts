
import { IAction } from '../IAction';
import UserAction from '../action/UserAction';

const InitState = {
    uid: "",
    message: "",
    isAdmin: false,
    isEmployee: false,
    isExternal: false
};

export function UserReducer(state = InitState, action: IAction) {
    let newState, uid;

    switch (action.type) {
        case new UserAction().SIGNIN_SUCCESS:

            uid = action.payload.uid;
            //console.log('sign in reducer state : ',state);
            newState = Object.assign({}, state, { uid: uid });
            //console.log('sign in reducer newState : ',newState);
            break;

        case new UserAction().SIGNUP_SUCCESS:
            uid = action.payload.uid;
            newState = Object.assign(state, {}, { uid: uid });
            break;

        case new UserAction().GET_USER_CREDENTAILS_SUCCESS:
            //console.log(action.payload);
            let payload;
            const {isAdmin, isEmployee, isExternal} = action.payload[Object.keys(action.payload)[0]];
            newState = Object.assign(state, {}, {
                isAdmin: isAdmin,
                isEmployee: isEmployee,
                isExternal: isExternal
            });
            //console.log(newState);
        case new UserAction().MESSAGE:
            newState = Object.assign(state, {}, { message: action.payload.message });

            break;

        default:
            newState = state;
            break;
    }
    //console.log('newState : ', newState, '| state :',state,'| action.type  : ',action.type);
    return newState;
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