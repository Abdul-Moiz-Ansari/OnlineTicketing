
import {Observable} from 'rxjs';
import {ActionsObservable} from 'redux-observable';
import {UserAction} from '../action/users';
import axios from 'axios';


// export function GetUsers(action$){
//     return action$.ofType(UserAction.FETCH_USERS).mergeMap(FetchUsersEpic);
// }

// function FetchUsersEpic(action){            
//     let promise = axios.get("http://localhost:49337/api/values",{
//         headers: {
//             "crossDomain":true,
//             "dataType":'jsonp'
//         }
//     });            

//     return Observable.fromPromise(promise).mergeMap(
//         function(nextValue){
//             return Observable.of(UserAction.fetchUsersSuccess(nextValue));
//         }        
//     );
// }

// export function AddUser(action$){
//     return action$.ofType(UserAction.ADD_USER).mergeMap(
//         function(action){
//             let data=action.payload;
//             let promise = axios.post("http://localhost:49337/api/values/complex",data,{
//                 headers: {
//                     "crossDomain":true,
//                     "dataType":'jsonp',
//                     "contentType":"application/json"
//                 }
//             });
//             let success$ = Observable.of(UserAction.fetchUsers());
//             let error$ = Observable.of(UserAction.fetchUsersFailed("Some error occured"));
//             return  Observable.fromPromise(promise).mergeMap(
//                 function(res){
//                     return success$;
//                 }
//             );
//         }
//     );
// }

// export function EditUser(action$){
//     return action$.ofType(UserAction.GET_USER).mergeMap(
//         function(action){
//             //console.log("entered in edit user");
//             let userID = action.payload;
//             let url = "http://localhost:49337/api/values/" + userID.toString();
//             var promise = axios.get(url,{
//                 headers:{
//                     "crossDomain" : true,
//                     "dataType" : 'jsonp',
//                     "contentType" : "application/json"
//                 }
//             });
//             //let success$ = Observable.of(UserAction.GetUserSuccess);
//             return Observable.fromPromise(promise).mergeMap(
//                 function(res){
//                     return Observable.of(UserAction.GetUserSuccess(res));
//                 }
//             );
//         }
//     );
// }

// export function DeleteUser(action$){
//     return action$.ofType(UserAction.REMOVE_USER).mergeMap(
//         function(action){
//         let userID = action.payload;
//         let promise = axios.delete("http://localhost:49337/api/values/" + userID.toString(),{
//             headers: {
//                 "crossDomain":"true",
//                 "dataType" : 'jsonp',
//                 "contentType" : "application/json"
//             }
//         });
                      
//         return Observable.fromPromise(promise).mergeMap(
//             function(res){        
//                 let succes$;                
//                 succes$ = Observable.of(UserAction.fetchUsers()); 
//                 return succes$;                
//             }
//         );
//     });
// }