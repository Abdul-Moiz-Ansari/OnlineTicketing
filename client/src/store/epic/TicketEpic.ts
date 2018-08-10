
import { Observable } from 'rxjs';
import { of } from 'rxjs/Observable/of';
import { fromPromise } from 'rxjs/Observable/fromPromise';
import { fromEvent } from 'rxjs/Observable/fromEvent';

import { ActionsObservable } from 'redux-observable';
import TicketAction,* as ticketActionExt from '../action/TicketAction';
import AxiosService from './Axios';
import { ticketRef, bookingRef, rootRef, scheduleRef, FirebaseSnap } from '../../helper/Firebase';
import { isNull } from '../../helper/GeneralFunctions';

export default class TicketEpic {
    //private controller = AxiosService.port + "Ticket";

    GetData(action$) {
        return action$.ofType(TicketAction.GETDATA).mergeMap(
            function (action) {

                return Observable.fromEvent(ticketRef, 'child_added').mergeMap(
                    function (snap) {
                        let ticket, promise;
                        ticket = (snap as FirebaseSnap).val();

                        promise = rootRef.child('booking/' + ticket.BookingID).once('value');
                        return Observable.fromPromise(promise).mergeMap(snap => {
                            let val, promise1, promise2, promise3, destRef;

                            destRef = rootRef.child('destination');
                            val = (snap as FirebaseSnap).val();
                            ticket.ScheduleID = val.ScheduleID;
                            ticket.UserID = val.UserID;

                            promise1 = scheduleRef.orderByChild("ScheduleID").equalTo(val.ScheduleID).once('value');
                            promise2 = destRef.orderByChild("DestinationID").equalTo(val.StartDestinationID).once('value');
                            promise3 = destRef.orderByChild("DestinationID").equalTo(val.EndDestinationID).once('value');

                            return Observable.forkJoin(promise1, promise2, promise3).mergeMap(arr => {
                                let schedule, startDest, endDest, busPromise;
                                schedule = (arr[0] as FirebaseSnap).val();
                                startDest = (arr[1] as FirebaseSnap).val();
                                endDest = (arr[2] as FirebaseSnap).val();
                                schedule = schedule[val.ScheduleID];
                                ticket.ScheduleTitle = schedule.ScheduleTitle;
                                ticket.StartDestinationTitle = startDest[val.StartDestinationID].DestinationTitle;
                                ticket.EndDestinationTitle = endDest[val.EndDestinationID].DestinationTitle;
                                ticket.DepartureDate = schedule.DepartureDate;
                                ticket.ArrivalDate = schedule.ArrivalDate;
                                //console.log('schedule.busID',schedule.busID,schedule);
                                busPromise = rootRef.child('bus/' + schedule.busID).once('value');

                                //return Observable.of(TicketAction.getDataSuccess(ticket));
                                return Observable.fromPromise(busPromise).mergeMap(snap => {
                                    let bus;
                                    bus = (snap as FirebaseSnap).val();
                                    ticket.BusTitle = bus.title;
                                    return Observable.of(TicketAction.getDataSuccess(ticket));
                                });
                            });
                        });
                    }
                ).catch(
                    function (err) { return Observable.of(TicketAction.error(err)); }
                );
            }
        );
    }

    Ticket_Removed =
        action$ => action$.ofType(TicketAction.TICKET_REMOVED).mergeMap(
            action => fromEvent(ticketRef, 'child_removed').mergeMap(
                (snap) => {
                    let ticket;
                    ticket = (snap as FirebaseSnap).val();
                    return of(TicketAction.ticketRemovedSuccessfully(ticket.TicketID));
                }
            )
        );

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

    DeleteRow = (action$) => action$.ofType(TicketAction.DELETEROW).mergeMap(
        (action) => {
            let TicketID, url, promise;
            TicketID = action.payload;
            promise = rootRef.child('ticket/' + TicketID).remove();

            return fromPromise(promise)
                .mergeMap(() => of(TicketAction.error("Ticket deleted successfully.")))
                .catch((err) => of(TicketAction.error(err.response['data'])));
        }
    );    

    GetTicketByBooking = 
        (action$) => action$.ofType(ticketActionExt.GET_TICKET_BY_BOOKING).mergeMap(
            action => {
                let promise,BookingID;
                BookingID = action.payload;
                promise = ticketRef.orderByChild('BookingID').equalTo(BookingID).once('value');
                return fromPromise(promise).mergeMap(snap => {
                    let val = (snap as FirebaseSnap).val();
                    //console.log('get ticket by booking success',{val});
                    return of(ticketActionExt.getTicketByBookingSuccess(val));
                })
                .catch(err => of(TicketAction.error(err.message)))
            }
        );
}