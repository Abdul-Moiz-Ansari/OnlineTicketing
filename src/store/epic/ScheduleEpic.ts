
import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import ScheduleAction from '../action/ScheduleAction';
import AxiosService from './Axios';
import { rootRef, scheduleRef,destinationRef, FirebaseSnap } from '../../helper/Firebase';
import Schedule from '../../models/Schedule';

export default class ScheduleEpic {
    private controller = AxiosService.port + "Schedule";

    public Listen_ChildAdded = (action$) =>
        action$.ofType(ScheduleAction.GETDATA).mergeMap((action) => {
            return Observable.fromEvent(scheduleRef, 'child_added').mergeMap((snap) => {
                let val;
                val = (snap as FirebaseSnap).val();
                return this.GetDataWithJoin(val);
            });
        });

    public Listen_ChildChanged = (action$) =>
        action$.ofType(ScheduleAction.GETDATA).mergeMap((action) => {
            return Observable.fromEvent(scheduleRef, 'child_changed').mergeMap((snap) => {
                let val;
                val = (snap as FirebaseSnap).val();
                return this.GetDataWithJoin(val);
            });
        });

    public Listen_ChildRemoved = (action$) =>
        action$.ofType(ScheduleAction.GETDATA).mergeMap((action) => {
            return Observable.fromEvent(scheduleRef, 'child_removed').mergeMap((snap) => {
                let val;
                val = (snap as FirebaseSnap).val();
                return Observable.of(ScheduleAction.schedule_removed(val));
            });
        });

    
    private GetDataWithJoin = val => {
        let promise1, promise2;

        promise1 = rootRef.child('route/' + val.RouteID).once('value');
        promise2 = rootRef.child('bus/' + val.busID).once('value');

        return Observable.forkJoin(promise1, promise2).mergeMap(arr => {
            let route,bus,promise_StartDestination,promise_EndDestination;
            route = (arr[0] as FirebaseSnap).val();
            bus = (arr[1] as FirebaseSnap).val();
            val.RouteTitle = route.RouteTitle;
            val.StartDestinationID= route.StartDestinationID;            
            val.EndDestinationID = route.EndDestinationID;
            val.BusTitle = bus.title;
            val.NoOfSeats = bus.noOfSeats;
            
            promise_StartDestination = rootRef.child('destination/' + val.StartDestinationID).once('value');
            promise_EndDestination = rootRef.child('destination/' + val.EndDestinationID).once('value');

            //return Observable.of(ScheduleAction.GetDataSuccess(val));
            return Observable.forkJoin(promise_StartDestination,promise_EndDestination).mergeMap(arr => {
                let startDestination,endDestination;
                val.StartDestinationTitle = (arr[0] as FirebaseSnap).val().DestinationTitle;
                endDestination = (arr[1] as FirebaseSnap).val();
                val.EndDestinationTitle = endDestination.DestinationTitle;
                
                return Observable.of(ScheduleAction.GetDataSuccess(val));
            });
        });
    }

    public GetDataByKey = (action$) => {
        return action$.ofType(ScheduleAction.getDataByKey).mergeMap(
            function (action) {
                let ScheduleID, promise;
                ScheduleID = action.payload;
                //console.log('ScheduleID : ', ScheduleID);
                promise = scheduleRef.orderByChild('ScheduleID').equalTo(ScheduleID).once('value');
                return Observable.fromPromise(promise).mergeMap(
                    function (snap) {
                        let val;
                        val = (snap as FirebaseSnap).val();
                        val = val[Object.keys(val)[0]];
                        return Observable.of(ScheduleAction.GetDataByKeySuccess(val));
                    }
                );
            }
        );
    }

    public InsertRow = (action$) =>
        action$.ofType(ScheduleAction.INSERTROW).mergeMap((action) => {
            let Schedule: Schedule, promise;

            //console.log('insert row epic', action.payload);

            Schedule = action.payload;
            Schedule.ScheduleID = Schedule.ScheduleID === "" ?
                scheduleRef.push().key : Schedule.ScheduleID;
            promise = rootRef.child('schedule/' + Schedule.ScheduleID).set(Schedule);

            return Observable.fromPromise(promise)
                .mergeMap(snap => Observable.of(ScheduleAction.SaveSuccess(snap)))
                .catch(err => Observable.of(ScheduleAction.Error(err)));
        });


    
    public DeleteRow = (action$) =>
        action$.ofType(ScheduleAction.deleteRow).mergeMap((action) => {
            let ScheduleID, promise;
            ScheduleID = action.payload;
            promise = rootRef.child('schedule/' + ScheduleID).remove();
            return Observable.fromPromise(promise).mergeMap(
                snap => Observable.of(ScheduleAction.Error("deleted successfully"))
            );
        });

}