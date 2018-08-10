
import { IAction } from '../IAction';
import BookingAction, * as bookingActionExt from '../action/BookingAction';
import * as _ from 'lodash';
import Booking from '../../models/Booking';
import { isNull } from '../../helper/GeneralFunctions';

const initState = {
    bookings: {},
    currentBooking: new Booking("", "", "", 0, 0, 0, 0, new Date(), "", false, "", new Date(), new Date(), "", "", "", ""),
    errorMessage: "",
    saveSuccess: false,
    sale_by_dates: {},
    sale_by_schedule: {},
    isSeatNoValid: true
}

export function BookingReducer(state = initState, action: IAction) {
    let newState; let data, saleObj,BookingID,bookings,booking;
    switch (action.type) {

        case BookingAction.GETDATA_SUCCESS:
            data = action.payload;
            newState = Object.assign({}, state, { bookings: data });
            return newState;

        case BookingAction.GETDATA_BYKEY_SUCCESS:
             booking = action.payload;
            newState = Object.assign({}, state, { currentBooking: booking });
            return newState;

        case BookingAction.INSERTROW_SUCCESS:
            newState = Object.assign({}, state, {
                currentBooking: new Booking("", "", "", 0, 0, 0, 0, new Date(), "", false, "", new Date(), new Date(), "", "", "", ""),
                saveSuccess: true,
                errorMessage: "Booking saved successfully"
            });
            return newState;
        
        case BookingAction.NOT_SAVE_SUCCESS:
            return Object.assign({},state,{
                saveSuccess : false
            });

        case BookingAction.REFRESH_DATA:
            data = action.payload;
            newState = Object.assign({}, state, {
                currentBooking: new Booking("", "", "", 0, 0, 0, 0, new Date(), "", false, "", new Date(), new Date(), "", "", "", ""),
                bookings: data
            });
            return newState;
        
        case bookingActionExt.BOOKING_REMOVED_SUCCESSFULLY:
            let index;
            BookingID = action.payload;
            bookings = _.cloneDeep(state.bookings); //state.bookings.slice(0);
            booking = _.find(bookings,{ 'BookingID' : BookingID});
            console.log({booking},{bookings});
            if(!isNull(booking)){                
                
                delete bookings[booking.BookingID];
                newState = Object.assign({},state,{bookings});
                return newState
            }
            else{
                return state;
            }
        case BookingAction.DELETEROW_SUCCESS:
            return Object.assign({},state,{
                errorMessage : "Booking deleted successfully."
            });

        case BookingAction.ERROR:
            let msg = action.payload;
            newState = Object.assign({}, state, { errorMessage: msg });
            return newState;

        case BookingAction.GET_SALE_BY_DATE_SUCCESS:
            let sale_by_dates_new = {};
            let { sale_by_dates: sale_by_dates_old } = state;
            saleObj = action.payload;
            Object.keys(sale_by_dates_old).map(key => {
                let item = sale_by_dates_old[key];
                sale_by_dates_new[key] = saleObj.date !== key ? item : undefined;
            });

            sale_by_dates_new[saleObj.date] = saleObj;
            newState = Object.assign({}, state, { sale_by_dates: sale_by_dates_new });
            return newState;

        case BookingAction.GET_SALE_BY_SCHEDULE_SUCCESS:
            let sale_by_schedule_new = {};
            sale_by_schedule_new = action.payload;
            newState = Object.assign({}, state, { sale_by_schedule: sale_by_schedule_new });
            return newState;

        case BookingAction.GET_SALE_BY_SCHEDULE_DATE_SUCCESS:
            let salebyScheduleDate: any = {}, ScheduleID;
            let { sale_by_schedule } = state;
            salebyScheduleDate = action.payload;
            //console.log('action.payload : ', action.payload);
            ScheduleID = salebyScheduleDate.ScheduleID;

            if (Object.keys(sale_by_schedule).indexOf(ScheduleID) === -1) {
                sale_by_schedule[ScheduleID] = salebyScheduleDate;
            }
            else {
                sale_by_schedule[ScheduleID].sale = salebyScheduleDate.sale;
            }

            //console.log('sale_by_schedule : ',sale_by_schedule);

            newState = Object.assign({}, state, { sale_by_schedule: sale_by_schedule });

            //console.log('newState : ',newState);
            return newState;

        case bookingActionExt.IS_SEATNO_AVAILABLE_RESULT:
            let { isAvailable: isSeatNoValid, errorMessage } = action.payload;
            newState = Object.assign({}, state, {
                isSeatNoStatusFetched: true,
                isSeatNoValid: isSeatNoValid,
                errorMessage: errorMessage
            });
            return newState;

        case bookingActionExt.SET_IS_SEATNO_AVAILABLE:
            newState = Object.assign({}, state, {
                isSeatNoValid: action.payload
            });
            return newState;

        case bookingActionExt.SET_ERROR_MESSAGE:
            return newState = Object.assign({}, state, {
                errorMessage: action.payload
            });
        default:
            return state;
    }

    //return state;
}
