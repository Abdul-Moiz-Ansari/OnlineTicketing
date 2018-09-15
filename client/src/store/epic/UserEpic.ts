
import { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ActionsObservable } from 'redux-observable';
import UserAction, * as userActionExt from '../action/UserAction';
import AxiosService from './Axios';
//import User from '../../models/User';
import { FirebaseDB, FirebaseSnap, FBAuth, userRef, rootRef, bookingRef } from '../../helper/Firebase';
import { fromEvent } from 'rxjs/Observable/fromEvent';
import { of } from 'rxjs/Observable/of';
import { concat } from 'rxjs/Observable/concat';
import { fromPromise } from 'rxjs/Observable/fromPromise';
import Axios from 'axios';
import { isNullOrUndefined } from 'util';

export default class UserEpic {

    private isInitialDataFetched: Boolean = false;
    private userAction = new UserAction();

    SignUp = (action$) =>
        action$.ofType(new UserAction().SIGNUP).mergeMap(
            (action) => {
                //Add User in auth
                //Sign In
                //Add user in db in Track User Status
                //console.log('action.payload in SignUp : ', action.payload);
                return this.AddUserConditional(action, true);
            }
        );


    SignIn = (action$) =>
        action$.ofType(new UserAction().SIGNIN).mergeMap(
            (action) => {
                // let persistencePromise, promise;
                // const { username, password } = action.payload;

                // persistencePromise = FBAuth.setPersistence("local");

                // return Observable.fromPromise(persistencePromise).mergeMap(() => {

                //     promise = FBAuth.signInWithEmailAndPassword(username, password);
                //     return Observable.fromPromise(promise).mergeMap(
                //         function (user) {
                //             return Observable.of(new UserAction().trackUserStatus(action.payload));
                //         }).catch(error =>
                //             Observable.of(new UserAction().message(error.message))
                //         );
                // });
                return this.SignInGeneral(action.payload, false);
            });


    private SignInGeneral = (user, isSignUp) => {
        let persistencePromise, promise;
        const { username, password } = user;

        persistencePromise = FBAuth.setPersistence("local");

        return Observable.fromPromise(persistencePromise).mergeMap(() => {

            promise = FBAuth.signInWithEmailAndPassword(username, password);
            return Observable.fromPromise(promise).mergeMap(
                function (response_user) {
                    //add user in Firebase Realtime db
                    if (isSignUp) {
                        promise = rootRef.child('user/' + user.userID).set(user);

                        return fromPromise(promise)
                            .mergeMap(() => Observable.of(new UserAction().trackUserStatus(user)))
                            .catch(err => Observable.of(new UserAction().message(err.message)))
                    }
                    else {
                        return Observable.of(new UserAction().trackUserStatus(user));
                    }
                }).catch(error =>
                    Observable.of(new UserAction().message(error.message))
                );
        });
    }

    SignOut = (action$) => action$.ofType(new UserAction().SIGNOUT).mergeMap(action => {
        let promise;
        //console.log('sign out');
        promise = FBAuth.signOut();

        return Observable.fromPromise(promise).mergeMap(() => Observable.of(new UserAction().message("")));
    });

    TrackUserStatus(action$, store) {
        return action$.ofType(new UserAction().TRACK_USER_STATUS).mergeMap(action => {
            let result = [];
            let loggedInSubject: ReplaySubject<any>;

            //getting the Firebase stream of user authentication
            loggedInSubject = new ReplaySubject(1);
            FBAuth.onAuthStateChanged(loggedInSubject);
            return loggedInSubject.mergeMap(user => {
                if (!user) {
                    return Observable.of(new UserAction().signOutSuccess(null));
                }
                else {
                    let isSignUp, promise, state;
                    state = store.getState();
                    isSignUp = state.User.isSignUp;

                    // if (isSignUp) {
                    //     //if this is a signup process, then add the user to the database and signin
                    //     promise = rootRef.child('user/' + action.payload.userID).set(action.payload);
                    //     return Observable.fromPromise(promise)
                    //         .mergeMap(snap2 => {                                
                    //             return concat(
                    //                 of(userActionExt.setIsSignUp(false)),
                    //                 of(new UserAction().getUserCredentials((user as any).uid)),
                    //                 of(new UserAction().signInSuccess(user))
                    //             );
                    //         })
                    //         .catch(err => of(new UserAction().message(err)));
                    // }
                    // else {
                    return concat(
                        of(new UserAction().getUserCredentials((user as any).uid)),
                        of(new UserAction().signInSuccess(user))
                    );
                    //}                    
                }
            });
        });
    }

    GetUserCredentials = (action$) => action$.ofType(new UserAction().GET_USER_CREDENTIALS).mergeMap(action => {
        let promise, uid;

        uid = action.payload;
        promise = userRef.orderByChild("userID").equalTo(uid).once('value');
        return Observable.fromPromise(promise).mergeMap(snap => {
            let val;
            val = (snap as FirebaseSnap).val();
            //console.log({val});
            if (isNullOrUndefined(val)) {
                return of(new UserAction().message("User info not found"));
            }
            return Observable.of(new UserAction().getUserCredentialsSuccess(val));
        }).catch(err => Observable.of(new UserAction().message(err.Message)))
    })

    ChangePassword = (action$) => action$.ofType(new UserAction().CHANGE_PASSWORD).mergeMap(action => {
        let promise;
        const { newPassword, confirmPassword } = action.payload;

        promise = FBAuth.currentUser.updatePassword(newPassword);

        return Observable.fromPromise(promise)
            .mergeMap(() => Observable.of(new UserAction().signOut(null)))
            .catch(err => {
                return Observable.of(new UserAction().message(err));
            })
    });

    public AddUser = (action$) => action$.ofType(new UserAction().ADD_USER).mergeMap(action => {
        // let promise, promise2, user, message, initialUserID;
        // user = action.payload;
        // initialUserID = user.userID;

        // promise = Axios.post('http://localhost:8080/api/u', user);
        // return fromPromise(promise)
        //     .mergeMap((res: any) => {
        //         if (res.data.uid) {
        //             user.userID = res.data.uid;
        //             promise = rootRef.child('user/' + res.data.uid).set(user);

        //             return Observable.fromPromise(promise)
        //                 .mergeMap(snap2 => Observable.of(new UserAction().addUser_Success(initialUserID)))
        //                 .catch(err => Observable.of(new UserAction().message(err)));
        //         }

        //         return Observable.of(new UserAction().message(res.data.message));
        //     })
        //     .catch(err => Observable.of(new UserAction().message(err)));
        return this.AddUserConditional(action, false);
    });


    private AddUserConditional = (action, isSignUp) => {
        let promise, promise2, user, message, initialUserID;
        user = action.payload;
        initialUserID = user.userID;

        //add user in firebase authentication
        promise = Axios.post(AxiosService.port + '/api/u', user);
        return fromPromise(promise)
            .mergeMap((res: any) => {
                if (res.data.uid) {

                    user.userID = res.data.uid;

                    if (isSignUp) {
                        //if sign up then sign in after adding the user     
                        return this.SignInGeneral(user, isSignUp);
                    }
                    else {

                        //add user in Firebase Realtime db
                        promise = rootRef.child('user/' + res.data.uid).set(user);

                        //else make user add flag true
                        return Observable.fromPromise(promise)
                            .mergeMap(snap2 => {
                                return Observable.of(new UserAction().addUser_Success(initialUserID))
                            })
                            .catch(err => Observable.of(new UserAction().message(err)));
                    }
                }
                return Observable.of(new UserAction().message(res.data.message));
            })
            .catch(err => {
                //console.log('error happened while adding user',err);
                return Observable.of(new UserAction().message(err))
            });
    }

    private AddUserInDBAndUsers = (user, successFunc) => {
        let promise, promise2;
        promise2 = FBAuth.createUserWithEmailAndPassword(user.username, user.password);

        return Observable.fromPromise(promise2)
            .mergeMap(snap => {
                let uid = (snap as any).uid;
                user.userID = uid;
                promise = rootRef.child('user/' + user.userID).set(user);

                return Observable.fromPromise(promise)
                    .mergeMap(snap2 => Observable.of(successFunc(user)))
                    .catch(err => Observable.of(new UserAction().message(err)));
            })
            .catch(err => Observable.of(new UserAction().message(err)));
    }

    DeleteUser = (action$) => action$.ofType(userActionExt.DELETE_USER).mergeMap(
        (action) => {
            let promise, userID;
            userID = action.payload;
            // promise = Axios.delete('http://localhost:8080/api/u/' + userID);
            promise = Axios.delete(AxiosService.port + '/api/u/' + userID);
            return fromPromise(promise)
                .mergeMap((res: any) => {
                    if (res.data.result) {
                        promise = rootRef.child('user/' + userID).remove();
                        return fromPromise(promise)
                            .mergeMap(snap => {
                                return of(userActionExt.setErrorMessage("User deleted successfully"));
                            })
                            .catch(err => of(new UserAction().message(err)));
                    } else {
                        return Observable.of(new UserAction().message(res.data.message));
                    }
                })
                .catch(err => {
                    //console.log('1st error , err : ', err);
                    return of(new UserAction().message(err))
                });
        });

    UserAdded =
        (action$) => action$.ofType(userActionExt.GET_USERS).mergeMap(
            (action) => fromEvent(userRef, 'child_added').mergeMap(
                (snap) => {
                    let user, promise;;
                    if (this.isInitialDataFetched !== true) {
                        return of(new UserAction().message(""));
                    }
                    user = (snap as FirebaseSnap).val();
                    // promise = Axios.get('http://localhost:8080/api/u/' + user.userID);
                    promise = Axios.get(AxiosService.port + '/api/u/' + user.userID);
                    return fromPromise(promise).mergeMap((res: any) => {
                        let obj: any = {};
                        obj.authUser = res.data;
                        obj.user = user;
                        return of(userActionExt.userAddedOrChanged(obj));
                    });
                }
            )
        );

    GetUsers =
        (action$) => action$.ofType(userActionExt.GET_USERS).mergeMap(
            (action) => fromEvent(userRef, 'value').mergeMap(
                (snap) => {
                    this.isInitialDataFetched = true;
                    return of(userActionExt.getUsersSuccess((snap as FirebaseSnap).val()));
                }
            )
        );

    GetAuthUsers =
        (action$) => action$.ofType(userActionExt.GET_USERS).mergeMap(
            (action) => {
                let promise;
                promise = Axios.get(AxiosService.port + '/api/u');
                return fromPromise(promise)
                    .mergeMap((res: any) => {
                        if (res.data.users) {
                            return of(userActionExt.getAuthUsersSuccess(res.data.users));
                        } else {
                            return of(new UserAction().message(res.data.error));
                        }
                    })
                    .catch(err => of(new UserAction().message(err.message)));
            }
        );

    UserChanged =
        (action$) => action$.ofType(userActionExt.GET_USERS).mergeMap(
            (action) => fromEvent(userRef, 'child_changed').mergeMap(
                (snap) => of(userActionExt.getUsersSuccess((snap as FirebaseSnap).val()))
            )
        );

    UserRemoved =
        (action$) => action$.ofType(userActionExt.GET_USERS).mergeMap(
            (action) => fromEvent(userRef, 'child_removed').mergeMap(
                (snap) => of(userActionExt.userRemoved((snap as FirebaseSnap).val()))
            )
        );

    GetUserByKey =
        action$ => action$.ofType(userActionExt.GET_USER_BY_KEY).mergeMap(
            action => {
                let promise, uid;
                uid = action.payload;
                //promise = Axios.get('http://localhost:8080/api/u/' + uid);
                promise = Axios.get(AxiosService.port + '/api/u/' + uid);
                return fromPromise(promise).mergeMap((res: any) => {
                    //console.log(res.data.uid);
                    if (res.data.uid) {
                        promise = userRef.orderByChild('userID').equalTo(res.data.uid).once('value');
                        return fromPromise(promise).mergeMap(snap => {
                            let val, result;
                            val = (snap as FirebaseSnap).val();
                            if (isNullOrUndefined(val)) { return of(new UserAction().message("Data not found.")); }
                            result = Object.assign(res.data, val[Object.keys(val)[0]]);
                            //console.log({result});
                            return of(userActionExt.getUserByKeySuccess(result));
                        });
                    }
                    else {
                        return of(new UserAction().message("Data not found."));
                    }
                })
                    .catch(err => of(new UserAction().message(err)));
            }
        );
}