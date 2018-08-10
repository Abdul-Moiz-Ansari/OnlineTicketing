
import {createAction} from 'redux-actions';
import { getAction } from './Action';

export const GET_USERS = "GET_USERS";
export const getUsers = createAction(GET_USERS);

export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const getUsersSuccess = createAction(GET_USERS_SUCCESS);

export const GET_AUTH_USERS_SUCCESS = "GET_AUTH_USERS_SUCCESS";
export const getAuthUsersSuccess = createAction(GET_AUTH_USERS_SUCCESS);

export const USERS_ADDED_OR_CHANGED = "USERS_ADDED_OR_CHANGED";
export const userAddedOrChanged = createAction(USERS_ADDED_OR_CHANGED);

export const DELETE_USER = "DELETE_USER";
export const deleteUser = createAction(DELETE_USER);

export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const deleteUserSuccess = createAction(DELETE_USER_SUCCESS);

export const USERS_REMOVED = "USERS_REMOVED";
export const userRemoved = createAction(USERS_REMOVED);

export const GET_USER_BY_KEY = "GET_USER_BY_KEY";
export const getUserByKey = createAction(GET_USER_BY_KEY);

export const GET_USER_BY_KEY_SUCCESS = "GET_USER_BY_KEY_SUCCESS";
export const getUserByKeySuccess = createAction(GET_USER_BY_KEY_SUCCESS);

export const SET_IS_SIGNUP = "SET_IS_SIGNUP";
export const setIsSignUp = createAction(SET_IS_SIGNUP);

export const SET_USER_OTHER_CREDENTIALS = "SET_USER_OTHER_CREDENTIALS";
export const setUserOtherCredentials = createAction(SET_USER_OTHER_CREDENTIALS);

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const setCurrentUser = createAction(SET_CURRENT_USER);

export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
export const setErrorMessage = createAction(SET_ERROR_MESSAGE);

export const SET_SAVE_SUCCESS = "SET_SAVE_SUCCESS";
export const setSaveSuccess = createAction(SET_SAVE_SUCCESS);

export default class UserAction {

    public SIGNIN: string = "SIGNIN";
    public SIGNIN_SUCCESS: string = "SIGNIN_SUCCESS";

    public SIGNUP: string = "SIGNUP";
    public SIGNUP_SUCCESS: string = "SIGNUP_SUCCESS";

    public TRACK_USER_STATUS: string = "USER_STATUS";
    public SIGNOUT: string = "SIGNOUT";
    public SIGNOUT_SUCCESS: string = "SIGNOUT_SUCCESS";

    public ADD_USER = "ADD_USER";
    public ADD_USER_SUCCESS = "ADD_USER_SUCCESS";

    public GET_USER_CREDENTIALS = "GET_USER_CREDENTIALS";
    public GET_USER_CREDENTAILS_SUCCESS = "GET_USER_CREDENTAILS_SUCCESS";

    CHANGE_PASSWORD = "CHANGE_PASSWORD";
    public MESSAGE: string = "MESSAGE";

    changePassword(payload){
        return{
            type : new UserAction().CHANGE_PASSWORD,
            payload
        }
    }

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

    public signOutSuccess(payload = null) : Object{
        return {
            type : new UserAction().SIGNOUT_SUCCESS,
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