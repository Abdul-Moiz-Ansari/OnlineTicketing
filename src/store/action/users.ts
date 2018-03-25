
import axios from 'axios';
//import $ from 'jquery';


//HERE I am making my actions
export class UserAction{
    static FETCH_USERS = "FETCH_USERS";
    static FETCH_USERS_SUCCESS ="FETCH_USERS_SUCCESS";
    static FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
    static FETCH_USERS_FAILED = "FETCH_USERS_FAILED";
    static ADD_USER = "ADD_USER";
    static ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
    static REMOVE_USER= "REMOVE_USER";
    static REMOVE_USER_SUCCESS = "REMOVE_USER_SUCCESS";
    static EDIT_USER= "EDIT_USER";
    static DISPLAY_USER= "DISPLAY_USER";
    static ERROR_USER= "ERROR_USER";
    static GET_USER="GET_USER";
    static GET_USER_SUCCCESS = "GET_USER_SUCCCESS";

    private url ="http://localhost:49337/api/values/";

    static fetchUsers(){
        return{
            type:UserAction.FETCH_USERS
        }
    }

    //static is which can be accessed outside of the class
    static AddUser(user){
        return{
            type : UserAction.ADD_USER,
            payload : user
        }
    }

    static GetUser(userid){       
        return{
            type:UserAction.GET_USER,
            payload: userid
        }       
    }

    static GetUserSuccess(user){
        return{
            type:UserAction.GET_USER_SUCCCESS,
            payload:user
        }
    }

    static fetchUserSuccess(response){
        return{
            type:UserAction.FETCH_USER_SUCCESS,
            payload : response
        }
    }
    
    static displayUser(user){
         return{
            type:UserAction.DISPLAY_USER,
            payload:  user
        }
    }

    static addUserSuccess(res){
        return{
            type:UserAction.ADD_USER_SUCCESS,
            payload:res
        }
    }

    static RemoveUser(userid){

        return{
            type:UserAction.REMOVE_USER,
            payload : userid
        }
        // var promise = axios.delete("http://localhost:49337/api/values/" + userid.toString(),{
        //     headers: {
        //         "crossDomain":"true",
        //         "dataType" : 'jsonp',
        //         "contentType" : "application/json"
        //     }
        // });

        // return function(dispatch){
        //     promise
        //     .then(function(res){
        //         dispatch(UserAction.fetchUsers());
        //     })
        //     .catch(function(err){
        //         dispatch(UserAction.fetchUsersFailed(err));
        //     });
        // }
        // return{
        //     type:UserAction.REMOVE_USER,
        //     payload: index
        // }
    }

    static RemoveUserSuccess(userid){
        return{
            type:UserAction.REMOVE_USER_SUCCESS,
            payload : userid
        }
    }   

    static fetchUsersSuccess(users){
        return{
            type:UserAction.FETCH_USERS_SUCCESS,
            payload:users
        }
    }

    static fetchUsersFailed(error:String){
        return{
            type:UserAction.FETCH_USERS_FAILED,
            payload:error
        }
    }
}