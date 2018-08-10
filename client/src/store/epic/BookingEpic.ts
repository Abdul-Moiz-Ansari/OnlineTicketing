
import { Observable } from 'rxjs';
import { of } from 'rxjs/Observable/of';
import { concat } from 'rxjs/Observable/concat';
import { forkJoin } from 'rxjs/Observable/forkJoin';
import { fromEvent } from 'rxjs/Observable/fromEvent';
import { fromPromise } from 'rxjs/Observable/fromPromise';
import { ActionsObservable } from 'redux-observable';

import BookingAction, * as bookingActionExt from '../action/BookingAction';
import { bookingAddedSuccess, isSeatNoAvailableResult, IS_SEATNO_AVAILABLE, bookingRemovedSuccess } from '../action/BookingAction';
import TicketAction, * as ticketActionExt from '../action/TicketAction';
import { unhandled } from '../action/CommonActions';
import AxiosService from './Axios';
import { FirebaseSnap, rootRef, bookingRef, ticketRef, scheduleRef, destinationRef, busRef } from '../../helper/Firebase';
import { getFormattedDate } from '../../helper/DateHelper';
import { isNull } from '../../helper/GeneralFunctions';
import Bus from '../../models/Bus';
import Schedule from '../../models/Schedule';
import Ticket from '../../models/Ticket';

export default class BookingEpic {

    public GetData =
        action$ => action$.ofType(BookingAction.GETDATA).mergeMap(
            action => fromEvent(bookingRef, 'value').mergeMap(
                snap => {
                    let val;
                    val = (snap as FirebaseSnap).val();
                    //console.log('val : ',val);
                    return of(BookingAction.getDataSuccess(val));
                })
        );

    public BookingAdded = (action$) => action$.ofType(BookingAction.BOOKING_ADDED).mergeMap(action =>
        Observable.fromEvent(bookingRef, 'child_added').mergeMap(snap => {

            return this.booking_child_event(snap);
            // let booking,
            //     result = [],
            //     todaysDate,
            //     todaysDate_formatted,
            //     bookingDate,
            //     dateOneWeekBefore,
            //     promise,
            //     promise2,
            //     promise3;

            // booking = (snap as FirebaseSnap).val();

            // const {
            //     ScheduleID,
            //     StartDestinationID,
            //     EndDestinationID
            // } = booking;

            // todaysDate_formatted = getFormattedDate(new Date(), "yyyy/mm/dd");
            // bookingDate = new Date(booking.BookingDate);
            // todaysDate = new Date();
            // dateOneWeekBefore = new Date();
            // dateOneWeekBefore.setDate(dateOneWeekBefore.getDate() - 6);

            // //if booking date falls between today and 6 days before then push the action to result array
            // if (bookingDate.getTime() <= todaysDate.getTime() && bookingDate.getTime() >= dateOneWeekBefore.getTime()) {
            //     result.push(BookingAction.getSaleByDate({ date: booking.BookingDate }));
            // }

            // if (todaysDate_formatted === booking.BookingDate) {
            //     result.push(BookingAction.getSaleBySchedule_date({
            //         BookingDate: booking.BookingDate,
            //         ScheduleID: booking.ScheduleID
            //     }));
            // }

            // if (result.length === 0)
            //     result.push(unhandled());

            // promise = scheduleRef.orderByChild("ScheduleID").equalTo(ScheduleID).once('value');
            // promise2 = destinationRef.orderByChild("DestinationID").equalTo(StartDestinationID).once('value');
            // promise3 = destinationRef.orderByChild("DestinationID").equalTo(EndDestinationID).once('value');

            // return forkJoin(promise, promise2, promise3).mergeMap(arr => {
            //     let schedule, startDest, endDest;
            //     schedule = (arr[0] as FirebaseSnap).val();
            //     startDest = (arr[1] as FirebaseSnap).val();
            //     endDest = (arr[2] as FirebaseSnap).val();

            //     booking.ScheduleTitle = schedule.ScheduleTitle;
            //     booking.StartDestinationTitle = startDest[StartDestinationID].DestinationTitle;
            //     booking.EndDestinationTitle = endDest[EndDestinationID].DestinationTitle;

            //     result.push(bookingAddedSuccess(booking));
            //     return result;

            // });
        })
    );

    public BookingChanged =
        (action$) => action$.ofType(BookingAction.BOOKING_ADDED).mergeMap(
            action => fromEvent(bookingRef, 'child_changed')
                .mergeMap(snap => this.booking_child_event(snap))
        );

    public BookingDeleted =
        (action$) => action$.ofType(bookingActionExt.BOOKING_REMOVED).mergeMap(
            action => fromEvent(bookingRef, 'child_removed').mergeMap(
                (snap) => {
                    //console.log('booking child removed');
                    let result = [], booking;
                    const { BookingID } = (snap as FirebaseSnap).val();                    
                    result = this.get_booking_child_event(snap);
                    result.push(bookingRemovedSuccess(BookingID));
                    //console.log({result});
                    return result;
                })
        );

    private booking_child_event = (snap) => {
        let booking,
            result = [],
            todaysDate,
            todaysDate_formatted,
            bookingDate,
            dateOneWeekBefore,
            promise,
            promise2,
            promise3;

        booking = (snap as FirebaseSnap).val();

        const {
            ScheduleID,
            StartDestinationID,
            EndDestinationID
        } = booking;        

        result = this.get_booking_child_event(snap);

        promise = scheduleRef.orderByChild("ScheduleID").equalTo(ScheduleID).once('value');
        promise2 = destinationRef.orderByChild("DestinationID").equalTo(StartDestinationID).once('value');
        promise3 = destinationRef.orderByChild("DestinationID").equalTo(EndDestinationID).once('value');

        return forkJoin(promise, promise2, promise3).mergeMap(arr => {
            let schedule, startDest, endDest;
            schedule = (arr[0] as FirebaseSnap).val();
            startDest = (arr[1] as FirebaseSnap).val();
            endDest = (arr[2] as FirebaseSnap).val();

            booking.ScheduleTitle = schedule.ScheduleTitle;
            booking.StartDestinationTitle = startDest[StartDestinationID].DestinationTitle;
            booking.EndDestinationTitle = endDest[EndDestinationID].DestinationTitle;

            result.push(bookingAddedSuccess(booking));
            return result;
        });
    }

    private get_booking_child_event = (snap) => {
        let booking,
            result = [],
            todaysDate,
            todaysDate_formatted,
            bookingDate,
            dateOneWeekBefore;

        booking = (snap as FirebaseSnap).val();

        const {
            ScheduleID,
            StartDestinationID,
            EndDestinationID
        } = booking;

        todaysDate_formatted = getFormattedDate(new Date(), "yyyy/mm/dd");
        bookingDate = new Date(booking.BookingDate);
        todaysDate = new Date();
        dateOneWeekBefore = new Date();
        dateOneWeekBefore.setDate(dateOneWeekBefore.getDate() - 6);

        //if booking date falls between today and 6 days before then push the action to result array
        if (bookingDate.getTime() <= todaysDate.getTime() && bookingDate.getTime() >= dateOneWeekBefore.getTime()) {
            result.push(BookingAction.getSaleByDate({ date: booking.BookingDate }));
        }

        if (todaysDate_formatted === booking.BookingDate) {
            result.push(BookingAction.getSaleBySchedule_date({
                BookingDate: booking.BookingDate,
                ScheduleID: booking.ScheduleID
            }));
        }

        if (result.length === 0)
            result.push(unhandled());

        return result;
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

    public GetDataByKey =
        (action$) => action$.ofType(BookingAction.GETDATA_BYKEY).mergeMap(
            (action) => {
                let BookingID, url, promise, ticketsPromise;;
                BookingID = action.payload;
                promise = bookingRef.orderByChild("BookingID").equalTo(BookingID).once('value');
                ticketsPromise = ticketRef.orderByChild("BookingID").equalTo(BookingID).once('value');

                return forkJoin(promise, ticketsPromise).mergeMap(
                    (arrSnap) => {
                        let bookingVal, ticketsVal, booking: any = {};
                        bookingVal = (arrSnap[0] as FirebaseSnap).val();
                        ticketsVal = (arrSnap[1] as FirebaseSnap).val();

                        if (!isNull(bookingVal)) {
                            booking = bookingVal[Object.keys(bookingVal)[0]];
                            if (!isNull(ticketsVal)) {
                                booking.tickets = ticketsVal;
                            }
                        }

                        return Observable.of(BookingAction.getDataByKeySuccess(booking));
                    }
                );
            }
        );


    public InsertRow = action$ =>
        action$.ofType(BookingAction.INSERTROW).mergeMap(action => {
            let updates = {}, promise, getSaleByDateObj: any = {};

            const { booking, tickets, deleteTicketIDs } = action.payload;
            //console.log(booking, tickets, deleteTicketIDs);

            delete booking['Tickets'];
            booking.BookingID = booking.BookingID === "" ? bookingRef.push().key : booking.BookingID;
            updates['booking/' + booking.BookingID] = booking;
            tickets.map(ticket => {
                ticket.TicketID = ticket.TicketID.trim() === "" ? ticketRef.push().key : ticket.TicketID;
                ticket.BookingID = booking.BookingID;
                updates['ticket/' + ticket.TicketID] = ticket;
            });

            if (!isNull(deleteTicketIDs)) {
                deleteTicketIDs.map(TicketID => {
                    updates['ticket/' + TicketID] = null;
                })
            }

            promise = rootRef.update(updates);

            getSaleByDateObj.date = booking.BookingDate;

            return Observable.fromPromise(promise).mergeMap(() => {
                return Observable.of(BookingAction.insertRowSuccess())
            }
            ).catch(
                (error) => Observable.of(BookingAction.error(error))
            );
        });



    public GetSalesByDate = action$ => action$.ofType(BookingAction.GET_SALE_BY_DATE).mergeMap(action => {
        let promise, result: any = {};
        let { date } = action.payload;
        result.date = date;

        promise = bookingRef.orderByChild('BookingDate').equalTo(date).once('value');

        return Observable.fromPromise(promise).mergeMap(snap => {
            let val, sale = 0;
            val = (snap as FirebaseSnap).val();

            if (typeof val === 'undefined' || val === null) {
                result.sale = 0;
                return Observable.of(BookingAction.getSaleByDateSuccess(result));
            }

            Object.keys(val).map(key => {
                sale += val[key].TotalAmount;
            })

            result.sale = sale;
            //console.log('GetSalesByDate : ');
            return Observable.of(BookingAction.getSaleByDateSuccess(result));
        });
    });

    public GetSalesByDate_ScheduleWise = action$ => action$.ofType(BookingAction.GET_SALE_BY_SCHEDULE).mergeMap(action => {
        let promise, result: any = {};
        let date = action.payload;

        promise = bookingRef.orderByChild('BookingDate').equalTo(date).once('value');

        return Observable.fromPromise(promise).mergeMap(snap => {
            let val, sale = 0;
            val = (snap as FirebaseSnap).val();
            if (typeof val === 'undefined' || val === null) {
                return Observable.of(BookingAction.getSaleByScheduleSuccess(result));
            }

            Object.keys(val).map(key => {
                let ScheduleID, resultKeyArray, booking: any;
                booking = val[key];
                ScheduleID = booking['ScheduleID'];
                resultKeyArray = Object.keys(result);

                if (resultKeyArray.indexOf(ScheduleID) > -1) {
                    //ScheduleID exists
                    result[ScheduleID].sale += booking.TotalAmount;
                }
                else {
                    //ScheduleID does not exists
                    result[ScheduleID] = {};
                    result[ScheduleID].ScheduleID = ScheduleID;
                    result[ScheduleID].sale = booking.TotalAmount;
                }
            });

            return Observable.of(BookingAction.getSaleByScheduleSuccess(result));
        });
    });

    public GetSalesBySchedule_Date = action$ => action$.ofType(BookingAction.GET_SALE_BY_SCHEDULE_DATE).mergeMap(action => {
        let promise, result: any = {};
        const { BookingDate, ScheduleID } = action.payload;

        //console.log('GetSalesBySchedule_Date epic payload : ', action.payload);

        promise = bookingRef.orderByChild('BookingDate').equalTo(BookingDate).once('value');
        result = {
            ScheduleID: ScheduleID,
            sale: 0
        };

        return Observable.fromPromise(promise).mergeMap(snap => {
            let val, sale = 0;
            val = (snap as FirebaseSnap).val();
            //console.log('val : ', val);
            if (typeof val === 'undefined' || val === null) {
                return Observable.of(BookingAction.getSaleBySchedule_dateSuccess(result));
            }

            Object.keys(val).map(key => {
                let bookingScheduleID, booking: any;
                booking = val[key];
                bookingScheduleID = booking['ScheduleID'];

                if (bookingScheduleID === ScheduleID) {
                    result.sale += booking.TotalAmount;
                }
            });

            //console.log('result : ', result);
            //console.log('GetSalesBySchedule_Date : ');
            return Observable.of(BookingAction.getSaleBySchedule_dateSuccess(result));
        });
    });

    public DeleteRow = (action$) =>
        action$.ofType(BookingAction.DELETEROW).mergeMap(
            (action) => {
                let BookingID, promise, updates: any = {}, TicketIDs = [];
                BookingID = action.payload;

                promise = ticketRef.orderByChild("BookingID").equalTo(BookingID).once('value');
                updates['booking/' + BookingID] = null;

                return fromPromise(promise).mergeMap(
                    (snap) => {
                        let tickets;
                        tickets = (snap as FirebaseSnap).val();

                        if (!isNull(tickets)) {
                            Object.keys(tickets).map(key => {
                                updates['ticket/' + tickets[key].TicketID] = null;
                                //TicketIDs.push(tickets[key].TicketID);
                            });
                        }

                        promise = rootRef.update(updates);
                        return fromPromise(promise).mergeMap(snap => concat([
                            BookingAction.deleteRowSuccess(BookingID)
                            //ticketActionExt.deleteTicketSuccess(TicketIDs)
                        ]));
                    }
                );
            }
        );


    public IsSeatNoAvailable =
        (action$) => action$.ofType(IS_SEATNO_AVAILABLE).mergeMap(
            (action) => {
                let promise, result: any = {}, isAvailable = true, errorMessage;
                let { ticketID, scheduleID, seatNo } = action.payload;

                if (isNaN(seatNo)) {
                    result.isAvailable = false;
                    result.errorMessage = "Invalid Seat No.";
                    return of(isSeatNoAvailableResult(result));
                }

                seatNo = parseInt(seatNo);
                promise = scheduleRef.orderByChild('ScheduleID').equalTo(scheduleID).once('value');

                return fromPromise(promise).mergeMap(snap => {
                    let tickets, schedule: Schedule;

                    schedule = (snap as FirebaseSnap).val();

                    if (isNull(schedule)) {
                        return of(isSeatNoAvailableResult(this.getResultObject(false, "Invalid Schedule")));
                    }
                    schedule = schedule[Object.keys(schedule)[0]];
                    promise = busRef.orderByChild('busID').equalTo(schedule.busID).once('value');

                    return fromPromise(promise).mergeMap(snap => {
                        let bus: Bus, noOfSeats: number;
                        bus = (snap as FirebaseSnap).val();
                        bus = bus[Object.keys(bus)[0]];
                        noOfSeats = bus.noOfSeats;

                        if (seatNo > noOfSeats) {
                            result.isAvailable = false;
                            result.errorMessage = "Invalid Seat No, can be max " + bus.noOfSeats.toString();
                            return of(isSeatNoAvailableResult(result));
                        }

                        promise = ticketRef.orderByChild('ScheduleID').equalTo(scheduleID).once('value');
                        return fromPromise(promise).mergeMap(snap => {
                            tickets = (snap as FirebaseSnap).val();
                            result.isAvailable = true;
                            result.errorMessage = "";

                            if (isNull(tickets)) {
                                return of(isSeatNoAvailableResult(result));
                            }

                            for (var key in tickets) {
                                let ticket: Ticket = tickets[key];

                                //by default TicketID === ""
                                if (parseInt(ticket.SeatNo.toString()) === seatNo && ticketID !== ticket.TicketID) {
                                    result.isAvailable = false;
                                    result.errorMessage = "This seat is already booked";
                                    break;
                                }
                            }

                            return of(isSeatNoAvailableResult(result));
                        });
                    });
                });
            });

    private getResultObject(isAvailable, errorMessage) {
        return {
            isAvailable, errorMessage
        }
    }
}