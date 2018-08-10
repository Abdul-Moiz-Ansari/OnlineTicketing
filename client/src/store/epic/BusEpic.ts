
import { Observable } from 'rxjs';
import { of } from 'rxjs/Observable/of';
import { fromPromise } from 'rxjs/Observable/fromPromise';
import { ActionsObservable } from 'redux-observable';
import { reset } from 'redux-form';
import BusAction from '../action/BusAction';
//import axios from 'axios';
import { FirebaseDB, rootRef, bookingRef } from '../../helper/Firebase';
import FirebaseSnap from '../../helper/FirebaseSnap';
import Bus from '../../models/Bus';
import { isNull } from '../../helper/GeneralFunctions';

export default class BusEpic {

    static AddBus(action$) {
        return action$.ofType(BusAction.INSERTROW).mergeMap(
            function (action) {
                let promise, bus;

                bus = action.payload;
                if (bus.busID === "") {
                    bus.busID = FirebaseDB.ref().child("bus").push().key;
                    promise = FirebaseDB.ref().child('bus/' + bus.busID).set(bus);
                    return Observable.fromPromise(promise)
                        .mergeMap(() => Observable.of(BusAction.insertRowSuccess(null)));
                }
                else {
                    let updates = {},updatePromise;
                    updates['bus/' + bus.busID] = bus;
                    promise = bookingRef.orderByChild('BusID').equalTo(bus.busID).once('value');
                    return fromPromise(promise).mergeMap(snap => {
                        let bookings = (snap as FirebaseSnap).val();
                        if (!isNull(bookings)) {
                            Object.keys(bookings).map(key => {
                                let booking = bookings[key];
                                updates['booking/' + booking.BookingID + '/BusTitle'] = bus.title;
                            })                           
                        }

                        updatePromise = rootRef.update(updates);
                        return fromPromise(updatePromise)
                            .mergeMap(() => of(BusAction.insertRowSuccess(null)));
                        
                    });
                }
            }
        );
    }

    static GetData(action$) {
        return action$.ofType(BusAction.GETDATA).mergeMap(action => {
            let ref;
            ref = FirebaseDB.ref().child('bus');

            //console.log("in get data epic")

            return Observable.fromEvent(ref, 'value').mergeMap(snap => {
                //console.log("value recieved")
                let val;
                val = (<FirebaseSnap>snap).val();

                val = typeof val === 'undefined' || val === null ? [] : val;

                //console.log('bus epic : ',val);

                return Observable.of(BusAction.getDataSuccess(val));
            });
        });
    }

    // static UpdateRow(action$) {
    //     return action$.ofType(BusAction.UPDATEROW).mergeMap(
    //         function (action) {
    //             let data = action.payload;
    //             let promise = axios.post("http://localhost:49337/api/buses", data, {
    //                 headers: {
    //                     "crossDomain": true,
    //                     "dataType": 'jsonp',
    //                     "contentType": "application/json"
    //                 }
    //             });
    //             //let success$ = Observable.of(BusAction.getData());
    //             return Observable.fromPromise(promise).mergeMap(
    //                 function (res) {
    //                     return Observable.of(BusAction.getData());
    //                 }
    //             );
    //         }
    //     );
    // }

    static DeleteRow(action$) {
        return action$.ofType(BusAction.DELETEROW).mergeMap(
            (action) => {
                let busID, promise;
                busID = action.payload;
                promise = FirebaseDB.ref().child('bus/' + busID).remove();

                return Observable.fromPromise(promise).mergeMap(
                    function (res) {
                        return Observable.of(BusAction.error("data deleted successfully"));
                    }
                );
            }
        );
    }

    static GetDataByKey(action$) {
        return action$.ofType(BusAction.GETDATA_BYKEY).mergeMap(
            function (action) {
                let busID, query, promise;

                busID = action.payload;
                query = FirebaseDB.ref().child('bus').orderByChild('busID').equalTo(busID);
                promise = query.once('value');

                return Observable.fromPromise(promise).mergeMap(
                    function (snapshot) {
                        let val, keys, value;
                        val = (<FirebaseSnap>snapshot).val();

                        if (typeof val === 'undefined' || val === null) {
                            value = new Bus("", "", "", 0);
                        }
                        else {
                            keys = Object.keys(val);
                            value = val[keys[0]];
                        }
                        //console.log('value : ', value);                    
                        // return Observable.of(BusAction.getDataByKeySuccess(value));
                        return Observable.of(BusAction.load(value));
                    });
            });
    }


    // static GetDataEpic(action) {
    //     let promise = axios.get("http://localhost:49337/api/buses", {
    //         headers: {
    //             "crossDomain": true,
    //             "dataType": 'jsonp'
    //         }
    //     });

    //     return Observable.fromPromise(promise).mergeMap(
    //         function (nextValue) {
    //             //console.log("got value",nextValue.data);
    //             return Observable.of(BusAction.getDataSuccess(nextValue.data));
    //         }
    //     );
    // }

}

