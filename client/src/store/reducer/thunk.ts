
import {IAction} from '../IAction';
import {UserAction} from '../action/users';


//module not in use
const INITIAL_USER_STATE = {
    users:[],
    fetching:false,
    fetched:false,
    error : ""
};

export function thunkReducer(state = INITIAL_USER_STATE,action:IAction){
    switch(action.type){
        case UserAction.FETCH_USERS_SUCCESS:
            
        break;
    }
}