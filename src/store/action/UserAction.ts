
import { getAction } from './Action';

export default class UserAction {

    public SIGNIN: string = "SIGNIN";
    public SIGNIN_SUCCESS: string = "SIGNIN_SUCCESS";

    public SIGNUP: string = "SIGNUP";
    public SIGNUP_SUCCESS: string = "SIGNUP_SUCCESS";

    public TRACK_USER_STATUS: string = "USER_STATUS";
    public SIGNOUT: string = "SIGNOUT";

    public ADD_USER = "ADD_USER";
    public ADD_USER_SUCCESS = "ADD_USER_SUCCESS";

    public GET_USER_CREDENTIALS = "GET_USER_CREDENTIALS";
    public GET_USER_CREDENTAILS_SUCCESS = "GET_USER_CREDENTAILS_SUCCESS";

    public MESSAGE: string = "MESSAGE";

    public getUserCredentials(payload){
        return{
            type : this.GET_USER_CREDENTIALS,
            payload
        }
    }

    public getUserCredentialsSuccess(payload){
        return{
            type :this.GET_USER_CREDENTAILS_SUCCESS,
            payload
        }
    }

    public addUser(payload){
        return{
            type : this.ADD_USER,
            payload
        }
    }

    public addUser_Success(payload){
        return{
            type : this.ADD_USER_SUCCESS,
            payload
        }
    }

    public signIn(payload): Object {
        //return getAction(this.SIGNIN,payload);
        return {
            type: this.SIGNIN,
            payload: payload
        }
    }

    public signInSuccess(payload): Object {
        //return getAction(this.SIGNIN_SUCCESS,payload);
        return {
            type: this.SIGNIN_SUCCESS,
            payload
        }
    }

    public signUp(payload): Object {
        //return getAction(this.SIGNUP,payload);
        return {
            type: this.SIGNUP,
            payload: payload
        }
    }

    public signUpSuccess(payload): Object {
        //return getAction(this.SIGNUP_SUCCESS,payload);
        return {
            type: this.SIGNUP_SUCCESS,
            payload
        }
    }

    public signOut(payload): Object {
        return {
            type: this.SIGNOUT,
            payload
        }
    }

    public trackUserStatus(payload): Object {
        return {
            type: this.TRACK_USER_STATUS,
            payload
        }
    }

    public message(payload): Object {
        return {
            type: this.MESSAGE,
            payload
        }
    }
}