
import {createAction} from 'redux-actions';

export const GET_TICKET_BY_BOOKING = "GET_TICKET_BY_BOOKING";
export const getTicketByBooking = createAction(GET_TICKET_BY_BOOKING);

export const GET_TICKET_BY_BOOKING_SUCCESS = "GET_TICKET_BY_BOOKING_SUCCESS";
export const getTicketByBookingSuccess = createAction(GET_TICKET_BY_BOOKING_SUCCESS);

export const SET_TICKET_BY_BOOKING_SUCCESS = "SET_TICKET_BY_BOOKING_SUCCESS";
export const setTicketByBooking = createAction(SET_TICKET_BY_BOOKING_SUCCESS);

export default class TicketAction {

    static GETDATA = "GETDATA";
    static GET_TICKET_SUCCESS = "GETTICKET_SUCCESS";

    static GETDATA_BYKEY = "GETDATA_BYKEY";
    static GETDATA_BYKEY_SUCCESS = "GETDATA_BYKEY_SUCCESS";

    static TICKET_REMOVED = "TICKET_REMOVED";

    static INSERTROW = "INSERTROW";
    static INSERTROW_SUCCESS = "INSERTROW_SUCCESS";
    static REFRESH_DATA = "REFRESH_DATA";

    

    static DELETEROW = "DELETETICKET";
    static TICKET_REMOVED_SUCCESFULLY = "TICKET_REMOVED_SUCCESFULLY";
    static ERROR = "ERROR";

    static ticketRemoved() {
        return {
            type: TicketAction.TICKET_REMOVED
        }
    }

    static ticketRemovedSuccessfully(payload) {
        return {
            type: TicketAction.TICKET_REMOVED_SUCCESFULLY,
            payload: payload
        }
    }

    static getData() {
        return {
            type: TicketAction.GETDATA,
            payload: null
        }
    }

    static getDataSuccess(data) {
        //console.log('get data success');
        return {
            type: TicketAction.GET_TICKET_SUCCESS,
            payload: data
        }
    }

    static getDataByKey(id) {
        return {
            type: TicketAction.GETDATA_BYKEY,
            payload: id
        }
    }

    static getDataByKeySuccess(data) {
        return {
            type: TicketAction.GETDATA_BYKEY_SUCCESS,
            payload: data
        }
    }

    static insertRow(data) {
        return {
            type: TicketAction.INSERTROW,
            payload: data
        }
    }

    static insertRowSuccess() {
        return {
            type: TicketAction.INSERTROW_SUCCESS,
            payload: null
        }
    }

    static refreshData(data) {
        return {
            type: TicketAction.REFRESH_DATA,
            payload: data
        }
    }

    static deleteRow(id) {
        return {
            type: TicketAction.DELETEROW,
            payload: id
        }
    }

    static error(msg) {
        return {
            type: TicketAction.ERROR,
            payload: msg
        }
    }    
}