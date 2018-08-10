import {UserAction} from '../action/users';
import {IAction} from '../IAction';

const INITIAL_STATE = {
    users:[],
    currentUser : {userid : 0,user:"",email:""},
    IsFetching:false,
    //error:""
};

export function _userReducer(state = INITIAL_STATE,action:IAction)  {
     let newState;let users;
     switch(action.type){
        case UserAction.FETCH_USERS:
           //console.log('fetch');
            newState = state;
            return state;
        case UserAction.FETCH_USERS_SUCCESS:
            newState = Object.assign({},state) ;

            users = []//.concat(state.users);
            let data;
            console.log("entered in fetch users success reducer");
            if(action.payload.hasOwnProperty('data')){
                data = action.payload.data;   
            }else{
                data = action.payload;
            }

            data.map((item,index) => {
                users.push({
                    userid : item.userid,
                    user:item.user,
                    email:item.email
                });
            });
            newState.users = users
            newState.currentUser = INITIAL_STATE.currentUser;
            return newState;    

         case UserAction.DISPLAY_USER:
            newState = Object.assign({},state);
            newState.currentUser = action.payload.data;
            console.log(newState);
            return newState;

        case UserAction.REMOVE_USER:
            newState = Object.assign({},state);
            users = [].concat(state.users);
            users.splice(action.payload,1);
            newState.users = users;
            return newState;
        case UserAction.FETCH_USERS_FAILED:

            return state;
      
        case UserAction.FETCH_USER_SUCCESS: 
            newState = Object.assign({},state);
            newState.currentUser = action.payload.data;
            return newState;
        case UserAction.GET_USER_SUCCCESS:
            let currentUser = action.payload.data;
            newState = Object.assign({},state,{currentUser : currentUser});
            return newState;
        default:
            return state;
     }
}