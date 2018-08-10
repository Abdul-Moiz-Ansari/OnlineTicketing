
import {createAction} from 'redux-actions';

export const BOOKING_ADDED_SUCCESSFULLY = "BOOKING_ADDED_SUCCESSFULLY";
export const bookingAddedSuccess = createAction(BOOKING_ADDED_SUCCESSFULLY);

export const BOOKING_REMOVED = "BOOKING_REMOVED";
export const bookingRemoved = createAction(BOOKING_REMOVED);

export const BOOKING_REMOVED_SUCCESSFULLY = "BOOKING_REMOVED_SUCCESSFULLY";
export const bookingRemovedSuccess = createAction(BOOKING_REMOVED_SUCCESSFULLY);

export const IS_SEATNO_AVAILABLE = "IS_SEATNO_AVAILABLE";
export const isSeatNoAvailable = createAction(IS_SEATNO_AVAILABLE);

export const IS_SEATNO_AVAILABLE_RESULT = "IS_SEATNO_AVAILABLE_RESULT";
export const isSeatNoAvailableResult = createAction(IS_SEATNO_AVAILABLE_RESULT);

export const SET_IS_SEATNO_AVAILABLE = "RESET_IS_SEATNO_AVAILABLE";
export const setIsSeatNoAvailable = createAction(SET_IS_SEATNO_AVAILABLE);

export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
export const setErrorMessage = createAction(SET_ERROR_MESSAGE);

export default class BookingAction{

    static GETDATA = "GETBOOKING";
    static GETDATA_SUCCESS = "GETBOOKING_SUCCESS";

    static GETDATA_BYKEY = "GETBOOKING_BYKEY";
    static GETDATA_BYKEY_SUCCESS = "GETBOOKING_BYKEY_SUCCESS";

    static INSERTROW = "INSERTBOOKING";
    static INSERTROW_SUCCESS = "INSERTBOOKING_SUCCESS";
    static REFRESH_DATA = "REFRESH_DATA";
    
    static DELETEROW= "DELETE_BOOKING";
    static DELETEROW_SUCCESS= "DELETE_BOOKING_SUCCESS";
    static ERROR= "ERROR"; 
    static NOT_SAVE_SUCCESS = "NOT_SAVE_SUCCESS"; 

    static GET_SALE_BY_DATE = "GET_SALE_BY_DATE";
    static GET_SALE_BY_DATE_SUCCESS = "GET_SALE_BY_DATE_SUCCESS";

    static GET_SALE_BY_SCHEDULE = "GET_SALE_BY_SCHEDULE";
    static GET_SALE_BY_SCHEDULE_SUCCESS = "GET_SALE_BY_SCHEDULE_SUCCESS";

    static GET_SALE_BY_SCHEDULE_DATE = "GET_SALE_BY_SCHEDULE_DATE";
    static GET_SALE_BY_SCHEDULE_DATE_SUCCESS = "GET_SALE_BY_SCHEDULE_DATE_SUCCESS";

    static BOOKING_ADDED = "BOOKING_ADDED";
    //handles child_added
    //child_changed
    //child_deleted
    static BOOKING_CHANGED = "BOOKING_CHANGED";    

    static bookingAdded(){
        return{
            type:  BookingAction.BOOKING_ADDED
        }        
    }

    static bookingChanged(){
        return{
            type : BookingAction.BOOKING_CHANGED
        }
    }

    static getSaleBySchedule(payload){
        return{
            type : BookingAction.GET_SALE_BY_SCHEDULE,
            payload
        }
    }

    static getSaleByScheduleSuccess(payload){
        return{
            type : BookingAction.GET_SALE_BY_SCHEDULE_SUCCESS,
            payload
        }
    }

    static getSaleBySchedule_date(payload){
        //console.log('getSaleBySchedule_date payload : ', payload);
        return{
            type : BookingAction.GET_SALE_BY_SCHEDULE_DATE,
            payload
        }
    }

    static getSaleBySchedule_dateSuccess(payload){
        return{
            type : BookingAction.GET_SALE_BY_SCHEDULE_DATE_SUCCESS,
            payload
        }
    }

    static getSaleByDate(payload){
        //console.log( 'action : ', payload);
        return{
            type : BookingAction.GET_SALE_BY_DATE,
            payload
        }
    }

    static getSaleByDateSuccess(payload){
        return{
            type : BookingAction.GET_SALE_BY_DATE_SUCCESS,
            payload
        }
    }

    static notSaveSuccess(){
        return{
            type : BookingAction.NOT_SAVE_SUCCESS,
            payload: null
        }
    }

    static getData(){
        return{
            type:BookingAction.GETDATA,
            payload : null
        }
    }

    static getDataSuccess(data){
        //console.log('get data success');
        return{
            type: BookingAction.GETDATA_SUCCESS,
            payload : data
        }
    }

    static getDataByKey(id){
        return{
            type:BookingAction.GETDATA_BYKEY,
            payload : id
        }
    }

    static getDataByKeySuccess(data){
        //console.log('get data success');
        return{
            type: BookingAction.GETDATA_BYKEY_SUCCESS,
            payload : data
        }
    }

    static insertRow(booking,tickets,deleteTicketIDs){
        return{
            type:BookingAction.INSERTROW,
            payload : {booking,tickets,deleteTicketIDs}
        }
    } 

    static insertRowSuccess(){
        return{
            type:BookingAction.INSERTROW_SUCCESS,
            payload : null
        }
    }

    static refreshData(data){
        return{
            type:BookingAction.REFRESH_DATA,
            payload : data
        }
    }

    static deleteRow(id){
        return{
            type:BookingAction.DELETEROW,
            payload : id
        }
    }

    static deleteRowSuccess(payload){
        return{
            type:BookingAction.DELETEROW_SUCCESS,
            payload : payload
        }
    }

    static error(msg){
        return{
            type:BookingAction.ERROR,
            payload : msg
        }
    }
}