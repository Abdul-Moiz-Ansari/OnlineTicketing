

export default class BookingAction{

    static GETDATA = "GETBOOKING";
    static GETDATA_SUCCESS = "GETBOOKING_SUCCESS";

    static GETDATA_BYKEY = "GETBOOKING_BYKEY";
    static GETDATA_BYKEY_SUCCESS = "GETBOOKING_BYKEY_SUCCESS";

    static INSERTROW = "INSERTBOOKING";
    static INSERTROW_SUCCESS = "INSERTBOOKING_SUCCESS";
    static REFRESH_DATA = "REFRESH_DATA";
    
    static DELETEROW= "DELETE_BOOKING";
    static ERROR= "ERROR"; 
    static NOT_SAVE_SUCCESS = "NOT_SAVE_SUCCESS"; 

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

    static error(msg){
        return{
            type:BookingAction.ERROR,
            payload : msg
        }
    }
}