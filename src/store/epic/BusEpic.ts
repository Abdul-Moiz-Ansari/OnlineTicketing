
import {Observable} from 'rxjs';
import {ActionsObservable} from 'redux-observable';
import {reset} from 'redux-form';
import BusAction from '../action/BusAction';
import axios from 'axios';
import {FirebaseDB} from '../../helper/Firebase';
import FirebaseSnap from '../../helper/FirebaseSnap';
import Bus from '../../models/Bus';

export default class BusEpic{

static AddBus(action$){    
    return action$.ofType(BusAction.INSERTROW).mergeMap(
        //return action$.ofType(BusAction.INSERTROW).map(
        function(action){            
            let promise,bus;

            bus = action.payload;
            //console.log('bus epic : ', bus);
            if (bus.busID === ""){
                bus.busID = FirebaseDB.ref().child("bus").push().key;
            }            
            promise = FirebaseDB.ref().child('bus/' + bus.busID).set(bus);
            //console.log('bus epic : ', bus);
            
            return  Observable.fromPromise(promise).mergeMap(
                () => Observable.of(reset("BusForm"))               
            );
        }
    );
}

static GetData(action$){
    return action$.ofType(BusAction.GETDATA).mergeMap(action =>{
        let ref;
        ref = FirebaseDB.ref().child('bus');

        //console.log("in get data epic")

        return Observable.fromEvent(ref,'value').mergeMap(snap => {
            //console.log("value recieved")
            let val;
            val = (<FirebaseSnap>snap).val();

            val = typeof val === 'undefined' || val === null ? [] :val;

            //console.log('bus epic : ',val);

            return Observable.of(BusAction.getDataSuccess(val));
        });
    });
}

static UpdateRow(action$){
    return action$.ofType(BusAction.UPDATEROW).mergeMap(
        function(action){
            let data = action.payload;
            let promise = axios.post("http://localhost:49337/api/buses",data,{
                 headers: {
                    "crossDomain":true,
                    "dataType":'jsonp',
                    "contentType":"application/json"
                }
            });
            //let success$ = Observable.of(BusAction.getData());
            return Observable.fromPromise(promise).mergeMap(
                function(res){
                    return Observable.of(BusAction.getData());
                }
            );
        }
    );
}

static DeleteRow(action$){
    return action$.ofType(BusAction.DELETEROW).mergeMap(
        (action) => {
            let busID,promise;
            busID = action.payload;
             promise = FirebaseDB.ref().child('bus/'+busID).remove();

            return Observable.fromPromise(promise).mergeMap(
                function(res){
                    return Observable.of(BusAction.error("data deleted successfully"));
                }
            );
        }
    );
}

// static DeleteRow(action$){
//     return action$.ofType(BusAction.DELETEROW).mergeMap(
//         function(action){
//             let busid = action.payload;
//             let promise = axios.delete("http://localhost:49337/api/buses/" + busid.toString(),{
//                  headers: {
//                     "crossDomain":true,
//                     "dataType":'jsonp',
//                     "contentType":"application/json"
//                 }
//             });

//             return Observable.fromPromise(promise).mergeMap(
//                 function(res){
//                     return Observable.of(BusAction.getData());
//                 }
//             );
//         }
//     );
// }

static GetDataByKey(action$){
    return action$.ofType(BusAction.GETDATA_BYKEY).mergeMap(
        function(action){
            let busID,query,promise;

            busID = action.payload;
            query = FirebaseDB.ref().child('bus').orderByChild('busID').equalTo(busID);
            promise = query.once('value');

            return Observable.fromPromise(promise).mergeMap(
                function(snapshot){
                    let val,keys,value;
                    val = (<FirebaseSnap>snapshot).val();

                    if(typeof val ==='undefined' || val === null){
                        value = new Bus("","","",0);
                    }
                    else{
                        keys = Object.keys(val);
                        value= val[keys[0]];                    
                    }
                    
                    return Observable.of(BusAction.getDataByKeySuccess(value));
            });
        });  
}

// static GetDataByKey(action$){
//     return action$.ofType(BusAction.GETDATA_BYKEY).mergeMap(
//         function(action){
//             var busid = action.payload;
//             var promise = axios.get('http://localhost:49337/api/buses/' + busid.toString(),{
//                  headers: {
//                     "crossDomain":true,
//                     "dataType":'jsonp',
//                     "contentType":"application/json"
//                 }
//             });

//             return Observable.fromPromise(promise).mergeMap(
//                 function(res){
//              //     return Observable.of(BusAction.getDataByKeySuccess(res.data));
//                   return Observable.of(BusAction.getDataByKeySuccess(null));
//             });
//         });  
// }

static GetDataEpic(action){            
    let promise = axios.get("http://localhost:49337/api/buses",{
        headers: {
            "crossDomain":true,
            "dataType":'jsonp'
        }
    });            

    return Observable.fromPromise(promise).mergeMap(
        function(nextValue){
            //console.log("got value",nextValue.data);
            return Observable.of(BusAction.getDataSuccess(nextValue.data));
        }        
    );
}

}

