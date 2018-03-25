
import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import RouteAction from '../action/RouteAction';
import Route from '../../models/Route';
import axios from 'axios';
import { FirebaseDB, FirebaseSnap,rootRef, routeRef } from '../../helper/Firebase';

export default class RouteEpic {

    public InsertRow = (action$) => {
        return action$.ofType(RouteAction.INSERTROUTE).mergeMap(action => {
            let route: Route, promise, ref;
            ref = FirebaseDB.ref()
            route = action.payload;
            if (route.RouteID === "") {
                route.RouteID = ref.child('route').push().key;
            }
            promise = ref.child('route/' + route.RouteID).set(route);

            // return Observable.fromPromise(promise).mergeMap(() => Observable.of(RouteAction.getData()));
            return Observable.fromPromise(promise).mergeMap(() => Observable.of(RouteAction.insertRoute_Success(route)));
        });
    }

    //not in use
    public InsertRowSuccess = (action$) => {
        return action$.ofType(RouteAction.INSERTROUTE_SUCCESS).mergeMap(action => {
            let RouteID, promise, ref;
            RouteID = action.payload.RouteID;
            //console.log('action.payload.RouteID : ', RouteID);

            promise = FirebaseDB.ref().child('route').orderByChild('RouteID').equalTo(RouteID).once('value');
            return Observable.fromPromise(promise).mergeMap(snapshot => {
                //console.log('route snap value : ', (snapshot as FirebaseSnap).val());
                return this.JoinDestinations(snapshot, FirebaseDB.ref());
            });
        });
    }

    public GetData = (action$) => {
        return action$.ofType(RouteAction.GETROUTE).mergeMap(function (action) {
            let rootRef, routeRef;
            rootRef = FirebaseDB.ref();
            routeRef = rootRef.child("route");

            return Observable.fromEvent(routeRef, 'child_added').mergeMap(snap => {
                let val, destRef, startDest, endDest, promise1, promise2;
                val = (snap as FirebaseSnap).val();

                promise1 = rootRef.child('destination/' + val.StartDestinationID).once('value');
                promise2 = rootRef.child('destination/' + val.EndDestinationID).once('value');

                return Observable.forkJoin(promise1, promise2).mergeMap(arr => {
                    val.StartDestinationTitle = (arr[0] as FirebaseSnap).val().DestinationTitle;
                    val.EndDestinationTitle = (arr[1] as FirebaseSnap).val().DestinationTitle;

                    return Observable.of(RouteAction.getDataSuccess(val));
                });
            });
        });
    }

    //it will also Listen to GETDATA action
    public Listen_ChildRemove = (action$) =>
        action$.ofType(RouteAction.GETROUTE).mergeMap(action =>
            Observable.fromEvent(routeRef, 'child_removed').mergeMap(snap => {
                let val;
                val = (snap as FirebaseSnap).val();
                return Observable.of(RouteAction.route_removed(val));
            })
        );

    
    //will also Listen to GETDATA action
    public Listen_Child_Changed = (action$) =>
        action$.ofType(RouteAction.GETROUTE).mergeMap(action =>
            Observable.fromEvent(routeRef, 'child_changed').mergeMap(snap => {
                let val;
                val = (snap as FirebaseSnap).val();
                return this.JoinDestinations(val,rootRef);
                //return Observable.of(RouteAction.getDataSuccess(val));                
            })
        );


    //not in use, not complete
    public GetData_Value = (action$) => {
        return action$.ofType(RouteAction.GETROUTE).mergeMap(action => {
            let rootRef, routeRef;
            rootRef = FirebaseDB.ref();
            routeRef = rootRef.child('route');

            // return Observable.fromEvent(routeRef,'value').mergeMap(snap => {
            //     let val;
            //     val = (snap as FirebaseSnap).val();

            // });
        });
    }

    private JoinDestinations = (snap, rootRef) => {
        let val, destRef, startDest, endDest, promise1, promise2;
        //val = (snap as FirebaseSnap).val();
        //val = val[Object.keys(val)[0]];
        val = snap;

        promise1 = rootRef.child('destination/' + val.StartDestinationID).once('value');
        promise2 = rootRef.child('destination/' + val.EndDestinationID).once('value');

        return Observable.forkJoin(promise1, promise2).mergeMap(arr => {
            val.StartDestinationTitle = (arr[0] as FirebaseSnap).val().DestinationTitle;
            val.EndDestinationTitle = (arr[1] as FirebaseSnap).val().DestinationTitle;

            return Observable.of(RouteAction.getDataSuccess(val));
        });
    }

    //not in use
    static UpdateRow(action$) {
        return action$.ofType(RouteAction.UPDATEROUTE).mergeMap(
            function (action) {
                let data = action.payload;
                let promise = axios.post("http://localhost:49337/api/route/Save", data, {
                    headers: {
                        "crossDomain": true,
                        "dataType": 'jsonp',
                        "contentType": "application/json"
                    }
                });
                //let success$ = Observable.of(RouteAction.getData());
                return Observable.fromPromise(promise).mergeMap(
                    function (res) {
                        return Observable.of(RouteAction.getData());
                    }
                );
            }
        );
    }

    public DeleteRow = (action$) => {
        return action$.ofType(RouteAction.DELETEROUTE).mergeMap(action => {
            let RouteID, promise, ref;
            ref = FirebaseDB.ref();
            RouteID = action.payload;
            promise = ref.child('route/' + RouteID).remove();
            return Observable.fromPromise(promise).mergeMap(res => Observable.of(RouteAction.getData()));
        });
    }

    public GetDataByKey = (action$) => {
        return action$.ofType(RouteAction.GETROUTE_BYKEY).mergeMap(action => {
            let RouteID, promise, ref;
            RouteID = action.payload;
            promise = FirebaseDB.ref().child('route').orderByChild('RouteID').equalTo(RouteID).once('value');
            return Observable.fromPromise(promise).mergeMap(snapshot => {
                let val;
                val = (<FirebaseSnap>snapshot).val();
                val = typeof val === 'undefined' || val === null ? new Route("", "", "", 0, 0) : val[Object.keys(val)[0]];
                return Observable.of(RouteAction.getDataByKeySuccess(val));
            });
        });
    }
}