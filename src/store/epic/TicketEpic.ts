
import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import TicketAction from '../action/TicketAction';
import AxiosService from './Axios';
import { ticketRef, ticketcollection, rootRef,scheduleRef, FirebaseSnap } from '../../helper/Firebase';

export default class TicketEpic {
    //private controller = AxiosService.port + "Ticket";

    GetData(action$) {
        return action$.ofType(TicketAction.GETDATA).mergeMap(
            function (action) {
               
                return Observable.fromEvent(ticketRef, 'child_added').mergeMap(
                    function (snap) {
                        let ticket,promise;
                        ticket = (snap as FirebaseSnap).val();
                        
                        promise = rootRef.child('booking/' + ticket.BookingID).once('value');
                        return Observable.fromPromise(promise).mergeMap(snap => {
                            let val,promise1,promise2,promise3,destRef;
                            
                            destRef = rootRef.child('destination');
                            val = (snap as FirebaseSnap).val();
                            ticket.ScheduleID = val.ScheduleID;
                            ticket.UserID = val.UserID;
                            
                            promise1 = scheduleRef.orderByChild("ScheduleID").equalTo(val.ScheduleID).once('value');
                            promise2 = destRef.orderByChild("DestinationID").equalTo(val.StartDestinationID).once('value');
                            promise3 = destRef.orderByChild("DestinationID").equalTo(val.EndDestinationID).once('value');
                            
                            return Observable.forkJoin(promise1,promise2,promise3).mergeMap(arr => {
                                let schedule,startDest,endDest;
                                schedule = (arr[0] as FirebaseSnap).val();
                                startDest = (arr[1] as FirebaseSnap).val();
                                endDest = (arr[2] as FirebaseSnap).val();
                            
                                ticket.ScheduleTitle = schedule[val.ScheduleID].ScheduleTitle;
                                ticket.StartDestinationTitle = startDest[val.StartDestinationID].DestinationTitle;
                                ticket.EndDestinationTitle = endDest[val.EndDestinationID].DestinationTitle;
                            
                                return Observable.of(TicketAction.getDataSuccess(ticket));
                            });
                        });
                    }
                ).catch(
                    function (err) { return Observable.of(TicketAction.error(err)); }
                    );
            }
        );
    }

    SaveSuccess(action$) {
        return action$.ofType(TicketAction.INSERTROW_SUCCESS).mergeMap(
            function (action) {
                let url, promise, success$;
                url = AxiosService.port + "Ticket";
                promise = AxiosService.Get_CORS(url);

                return Observable.fromPromise(promise).mergeMap(
                    function (res) {
                        return Observable.of(TicketAction.refreshData(res['data']));
                    }
                ).catch(
                    function (err) { return Observable.of(TicketAction.error(err.response['data'])); }
                    );
            }
        );
    }

    GetDataByKey(action$) {
        return action$.ofType(TicketAction.GETDATA_BYKEY).mergeMap(
            function (action) {

                let TicketID, url, promise;
                TicketID = action.payload;
                url = AxiosService.port + "Ticket" + "/" + TicketID.toString();
                promise = AxiosService.Get_CORS(url);

                return Observable.fromPromise(promise).mergeMap(
                    function (res) {
                        return Observable.of(TicketAction.getDataByKeySuccess(res['data']));
                    }
                ).catch(
                    function (err) { return Observable.of(TicketAction.error(err.response['data'])); }
                    );
            }
        );
    }

    InsertRow(action$) {
        return action$.ofType(TicketAction.insertRow).mergeMap(
            function (action) {
                let ticket, url, promise;

                ticket = action.payload;
                url = AxiosService.port + "Ticket";
                promise = AxiosService.Post_CORS(url, ticket);

                return Observable.fromPromise(promise).mergeMap(
                    function () {
                        return Observable.of(TicketAction.insertRowSuccess());
                    }
                ).catch(
                    function (error) {
                        return Observable.of(TicketAction.error(error.response.data));
                    }
                    );
            }
        );
    }

    DeleteRow(action$) {
        return action$.ofType(TicketAction.deleteRow).mergeMap(
            function (action) {
                let ticketID, url, promise;
                ticketID = action.payload;
                url = AxiosService.port + "Ticket" + "/" + ticketID.toString();
                promise = AxiosService.Delete_CORS(url);

                return Observable.fromPromise(promise).mergeMap(
                    function () {
                        return Observable.of(TicketAction.getData());
                    }
                ).catch(
                    function (err) { return Observable.of(TicketAction.error(err.response['data'])); }
                    );
            }
        );
    }

    public CheckSeatNo = action$ =>
        action$.ofType(TicketAction.IS_SEATNO_AVAILABLE).mergeMap(action => {
            let promise;

            promise = ticketcollection
                .where("ScheduleID", "==", action.scheduleID)
                .where("StartDestinationID", "==", action.startDestinationID)
                .where("EndDestinationID", "==", action.endDestinationID)
                .where("SeatNo", "==", action.seatNo);
        });
}