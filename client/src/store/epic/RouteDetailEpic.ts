
import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import RouteDetailAction from '../action/RouteDetailAction';
import AxiosService from './Axios';
import { rootRef, routeDetailRef, FirebaseSnap } from '../../helper/Firebase';

export default class RouteDetailEpic {
    //private controllerTitle = "RouteDetail";

    public InsertRow = (action$) =>
        action$.ofType(RouteDetailAction.INSERTROUTEDETAIL).mergeMap((action) => {
            let routeDetail, promise;
            //console.log('InsertRow : ', action.payload);
            routeDetail = action.payload;
            routeDetail.RouteDetailID = routeDetail.RouteDetailID === "" ?
                rootRef.child('routeDetail').push().key : routeDetail.RouteDetailID;

            promise = rootRef.child('routeDetail/' + routeDetail.RouteDetailID).set(routeDetail);

            return Observable.fromPromise(promise).mergeMap(snap =>
                Observable.of(RouteDetailAction.insertRow_Success(snap))
            ).
                catch(err => Observable.of(RouteDetailAction.routeDetailError(err)));
        }
        );


    public Listen_ChildAdded = (action$) =>
        action$.ofType(RouteDetailAction.GETROUTEDETAIL).mergeMap((action) =>
            Observable.fromEvent(routeDetailRef, 'child_added').mergeMap(snap => {
                let val, promise1, promise2;
                val = (snap as FirebaseSnap).val();
                return this.GetDataWithJoin(val);
            })
        );

    public Listen_ChildChanged = (action$) =>
        action$.ofType(RouteDetailAction.GETROUTEDETAIL).mergeMap((action) =>
            Observable.fromEvent(routeDetailRef, 'child_changed').mergeMap(snap => {
                let val, promise1, promise2;
                val = (snap as FirebaseSnap).val();
                return this.GetDataWithJoin(val);
            })
        );

    public Listen_ChildRemoved = (action$) =>
        action$.ofType(RouteDetailAction.GETROUTEDETAIL).mergeMap((action) =>
            Observable.fromEvent(routeDetailRef, 'child_removed').mergeMap(snap => {
                let val, promise1, promise2;
                val = (snap as FirebaseSnap).val();
                return Observable.of(RouteDetailAction.routeDetail_Removed(val));
            })
        );

    private GetDataWithJoin = val => {
        let promise1, promise2;
        promise1 = rootRef.child('destination/' + val.DestinationID).once('value');
        promise2 = rootRef.child('route/' + val.RouteID).once('value');

        return Observable.forkJoin(promise1, promise2).mergeMap(arr => {
            val.DestinationTitle = (arr[0] as FirebaseSnap).val().DestinationTitle;
            val.RouteTitle = (arr[1] as FirebaseSnap).val().RouteTitle;

            return Observable.of(RouteDetailAction.getDataSuccess(val));
        });
    }

    public GetDataByKey = (action$) =>
        action$.ofType(RouteDetailAction.GETDATA_BYKEY).mergeMap((action) => {
            let routeDetailID, url, promise;
            routeDetailID = action.payload;
            promise = routeDetailRef.orderByChild("RouteDetailID").equalTo(routeDetailID).once('value');
            return Observable.fromPromise(promise).mergeMap((snap) => {
                let val;
                val = (snap as FirebaseSnap).val();
                val = val[Object.keys(val)[0]];
                return Observable.of(RouteDetailAction.getDataByKeySuccess(val));
            }
            );
        }
        );


    static GetDataByRouteID(action$) {
        return action$.ofType(RouteDetailAction.GETDATA_BYROUTEID).mergeMap(
            function (action) {
                let _routeID = action.payload;
                let url = AxiosService.port + "RouteDetail";
                let promise = AxiosService.Get_CORS(url);
                //console.log();
                return Observable.fromPromise(promise).mergeMap(
                    function (res) {
                        let result = {
                            routeID: parseInt(_routeID),
                            payload: res.data
                        };
                        return Observable.of(RouteDetailAction.getDatabyRouteIDSuccess(result));
                    }
                );
            }
        );
    }

    public DeleteRow = (action$) =>
        action$.ofType(RouteDetailAction.DELETEROW).mergeMap((action) => {
            let routeDetailID, routeID, url, promise;
            routeDetailID = action.payload.RouteDetailID;
            promise = rootRef.child('routeDetail/' + routeDetailID).remove();
            return Observable.fromPromise(promise).mergeMap((res) =>
                Observable.of(RouteDetailAction.routeDetailError("deleted successfully"))
            ).catch(err => Observable.of(RouteDetailAction.routeDetailError(err)));
        }
        );


}