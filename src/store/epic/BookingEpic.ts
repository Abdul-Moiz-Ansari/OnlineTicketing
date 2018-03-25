
import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import BookingAction from '../action/BookingAction';
import AxiosService from './Axios';
import { FirebaseSnap, rootRef, bookingRef, ticketRef } from '../../helper/Firebase';

export default class BookingEpic {
    //private controller = AxiosService.port + "Booking";

    GetData(action$) {
        return action$.ofType(BookingAction.GETDATA).mergeMap(
            function (action) {
                let url, promise, success$;
                url = AxiosService.port + "Booking";
                promise = AxiosService.Get_CORS(url);

                return Observable.fromPromise(promise).mergeMap(
                    function (res) {
                        return Observable.of(BookingAction.getDataSuccess(res['data']));
                    }
                );
                // return this._GetData(action);
            }
        );
    }

    SaveSuccess(action$) {
        return action$.ofType(BookingAction.INSERTROW_SUCCESS).mergeMap(
            function (action) {
                let url, promise, success$;
                url = AxiosService.port + "Booking";
                promise = AxiosService.Get_CORS(url);

                return Observable.fromPromise(promise).mergeMap(
                    function (res) {
                        return Observable.of(BookingAction.refreshData(res['data']));
                    }
                );
            }
        );
    }

    GetDataByKey(action$) {
        return action$.ofType(BookingAction.GETDATA_BYKEY).mergeMap(
            function (action) {

                let BookingID, url, promise;
                BookingID = action.payload;
                url = AxiosService.port + "Booking" + "/" + BookingID.toString();
                promise = AxiosService.Get_CORS(url);

                return Observable.fromPromise(promise).mergeMap(
                    function (res) {
                        return Observable.of(BookingAction.getDataByKeySuccess(res['data']));
                    }
                );
            }
        );
    }

    public InsertRow = action$ =>
        action$.ofType(BookingAction.INSERTROW).mergeMap(action => {
            let  updates = {}, promise;
            
            const {booking,tickets,deleteTicketIDs} = action.payload;
                           
            delete booking['Tickets'];
                        
            //console.log(action.payload);
            //loop over deleteTicketIDs the delete them

            booking.BookingID = bookingRef.push().key;
            updates['booking/' + booking.BookingID] = booking;

            tickets.map(ticket => {
                //check if seat no is available
                ticket.TicketID = ticket.TicketID.trim() === "" ? ticketRef.push().key : ticket.TicketID;
                ticket.BookingID = booking.BookingID;
                updates['ticket/'+ticket.TicketID] = ticket;
            });

            promise = rootRef.update(updates);

            return Observable.fromPromise(promise).mergeMap(
                () => {
                    //console.log();
                    return Observable.of(BookingAction.insertRowSuccess());
                }
            ).catch(
                (error) => Observable.of(BookingAction.error(error))
                );
        });

    // private GetTicketsObj = (bookingID,updateObj) => {
    //     let existingTickets,promise;

    //     //promise = ticketRef.orderByChild("BookingID").equalTo(bookingID).once('value');
        
        
    // }


    DeleteRow(action$) {
        return action$.ofType(BookingAction.deleteRow).mergeMap(
            function (action) {
                let BookingID, url, promise;
                BookingID = action.payload;
                url = AxiosService.port + "Booking" + "/" + BookingID.toString();
                promise = AxiosService.Delete_CORS(url);

                return Observable.fromPromise(promise).mergeMap(
                    function () {
                        return Observable.of(BookingAction.getData());
                    }
                );
            }
        );
    }
}