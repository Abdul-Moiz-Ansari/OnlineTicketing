

export default class BusAction{
    static GETDATA = "GETDATA";
    static GETDATA_SUCCESS = "GETDATA_SUCCESS";

    static GETDATA_BYKEY = "GETDATA_BYKEY";
    static GETDATA_BYKEY_SUCCESS = "GETDATA_BYKEY_SUCCESS";

    static INSERTROW = "INSERTROW";
    static INSERTROW_SUCCESS = "INSERTROW_SUCCESS";
    
    static UPDATEROW= "UPDATEROW";
    static UPDATEROW_SUCCESS = "UPDATEROW_SUCCESS";

    static DELETEROW= "DELETEROW";
    static DELETEROW_SUCCESS = "DELETEROW_SUCCESS";    
   
    //static DISPLAY_USER= "DISPLAY_USER";
    static ERROR= "ERROR";
    static LOAD = "BUS_LOAD";
    
    static load(payload){
        return{
            type : BusAction.LOAD,
            payload
        }
    }

    static getData(){
        return{
            type:BusAction.GETDATA
        }
    }

    static getDataSuccess(data){
        //console.log('get data success');
        return{
            type: BusAction.GETDATA_SUCCESS,
            payload : data
        }
    }

    static getDataByKey(id){
        return{
            type:BusAction.GETDATA_BYKEY,
            payload : id
        }
    }

    static getDataByKeySuccess(data){
        //console.log('get data success');
        return{
            type: BusAction.GETDATA_BYKEY_SUCCESS,
            payload : data
        }
    }

    static insertRow(data){
        return{
            type:BusAction.INSERTROW,
            payload : data
        }
    }
    static insertRowSuccess(payload){
        return{
            type : BusAction.INSERTROW_SUCCESS,
            payload
        }
    }

    static updateRow(data){
        return{
            type:BusAction.UPDATEROW,
            payload : data
        }
    }

    static deleteRow(id){
        return{
            type:BusAction.DELETEROW,
            payload : id
        }
    }

    static error(payload){
        return{
            type:BusAction.ERROR,
            payload
        }
    }
}