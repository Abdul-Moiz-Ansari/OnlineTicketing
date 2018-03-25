

export default class TicketAction{

    static GETDATA = "GETDATA";
    static GET_TICKET_SUCCESS = "GETTICKET_SUCCESS";

    static GETDATA_BYKEY = "GETDATA_BYKEY";
    static GETDATA_BYKEY_SUCCESS = "GETDATA_BYKEY_SUCCESS";

    static INSERTROW = "INSERTROW";
    static INSERTROW_SUCCESS = "INSERTROW_SUCCESS";
    static REFRESH_DATA = "REFRESH_DATA";

    static IS_SEATNO_AVAILABLE = "IS_SEATNO_AVAILABLE";

    static DELETEROW= "DELETEROW";
    static ERROR= "ERROR"; 

    static getData(){
        return{
            type:TicketAction.GETDATA,
            payload : null
        }
    }

    static getDataSuccess(data){
        //console.log('get data success');
        return{
            type: TicketAction.GET_TICKET_SUCCESS,
            payload : data
        }
    }

    static getDataByKey(id){
        return{
            type:TicketAction.GETDATA_BYKEY,
            payload : id
        }
    }

    static getDataByKeySuccess(data){
        return{
            type: TicketAction.GETDATA_BYKEY_SUCCESS,
            payload : data
        }
    }

    static insertRow(data){
        return{
            type:TicketAction.INSERTROW,
            payload : data
        }
    } 

    static insertRowSuccess(){
        return{
            type:TicketAction.INSERTROW_SUCCESS,
            payload : null
        }
    }

    static refreshData(data){
        return{
            type:TicketAction.REFRESH_DATA,
            payload : data
        }
    }

    static deleteRow(id){
        return{
            type:TicketAction.DELETEROW,
            payload : id
        }
    }

    static error(msg){
        return{
            type:TicketAction.ERROR,
            payload : msg
        }
    }

    static isSeatNoAvailable(seatNo,scheduleID,startDestinationID,endDestinationID){
        return{
            type : TicketAction.IS_SEATNO_AVAILABLE,
            payload : {
                seatNo,
                scheduleID,
                startDestinationID,
                endDestinationID
            }
        }
    }
}