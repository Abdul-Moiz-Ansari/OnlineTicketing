
import { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ActionsObservable } from 'redux-observable';
import UserAction from '../action/UserAction';
import AxiosService from './Axios';
import { FirebaseDB, FirebaseSnap, FBAuth, userRef, rootRef } from '../../helper/Firebase';

export default class UserEpic {

    SignUp(action$) {
        return action$.ofType(new UserAction().SIGNUP).mergeMap(
            function (action) {
                let user, promise;
                user = action.payload;
                promise = FBAuth.createUserWithEmailAndPassword(user.username, user.password);

                return Observable.fromPromise(promise).mergeMap(
                    function () {
                        // return Observable.of(new UserAction().signUpSuccess(user));
                        return Observable.of(new UserAction().trackUserStatus(user));
                    }
                ).catch(
                    function (error) {
                        //TODO : need to handle error here                    
                        return Observable.of(null);
                    }
                    );
            }
        );
    }

    SignIn(action$) {
        return action$.ofType(new UserAction().SIGNIN).mergeMap(
            function (action) {
                let promise;
                const { username, password} = action.payload;
                promise = FBAuth.signInWithEmailAndPassword(username, password);

                return Observable.fromPromise(promise).mergeMap(
                    function (user) {
                        return Observable.concat(                            
                            Observable.of(new UserAction().getUserCredentials((user as any).uid)),
                            Observable.of(new UserAction().trackUserStatus(action.payload))
                        );
                        //return Observable.of(new UserAction().trackUserStatus(action.payload));
                        //add user in db
                    }).catch(error => {
                        return Observable.of(new UserAction().message(error.message));
                    });
            });
    }

    TrackUserStatus(action$) {
        return action$.ofType(new UserAction().TRACK_USER_STATUS).mergeMap(action => {
            let loggedInSubject: ReplaySubject<any>;

            loggedInSubject = new ReplaySubject(1);
            FBAuth.onAuthStateChanged(loggedInSubject);
            return loggedInSubject.mergeMap(user => {
                if (!user) {
                    return Observable.of(new UserAction().signOut(null));
                }
                else {
                    return Observable.of(new UserAction().signInSuccess(user));
                }
            });
        });
    }

    GetUserCredentials = (action$) => action$.ofType(new UserAction().GET_USER_CREDENTIALS).mergeMap(action => {
        let promise, uid;
        uid = action.payload;
        //console.log(action.payload);
        promise = userRef.orderByChild("userID").equalTo(uid).once('value');
        return Observable.fromPromise(promise).mergeMap(snap => {
            let val;
            val = (snap as FirebaseSnap).val();
            //console.log(val);
            return Observable.of(new UserAction().getUserCredentialsSuccess(val));
        }).catch(err => Observable.of(new UserAction().message(err.Message)))
    })

    public AddUser = (action$) => action$.ofType(new UserAction().ADD_USER).mergeMap(action => {
        let promise, promise2, user;
        user = action.payload;        

        if (user.userID === "") {
            promise2 = FBAuth.createUserWithEmailAndPassword(user.username, user.password);

            return Observable.fromPromise(promise2)
                .mergeMap(snap => {
                    let uid = (snap as any).uid;
                    user.userID = uid;
                    promise = rootRef.child('user/' + user.userID).set(user);

                    return Observable.fromPromise(promise)
                    .mergeMap(snap2 => Observable.of(new UserAction().addUser_Success(null)))
                    .catch(err => Observable.of(new UserAction().message(err)));                    
                })
                .catch(err => Observable.of(new UserAction().message(err)));
        }
        else {
            //updating user info
            promise = rootRef.child('user/' + user.userID).set(user);

            return Observable.fromPromise(promise2)
                .mergeMap(snap => Observable.of(new UserAction().addUser_Success(null)))
                .catch(err => Observable.of(new UserAction().message(err)));
        }



    });
}