

export default class Action{
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
    
    static getData(){
        return{
            type:Action.GETDATA
        }
    }

    static getDataSuccess(data){
        //console.log('get data success');
        return{
            type: Action.GETDATA_SUCCESS,
            payload : data
        }
    }

    static getDataByKey(id){
        return{
            type:Action.GETDATA_BYKEY,
            payload : id
        }
    }

    static getDataByKeySuccess(data){
        //console.log('get data success');
        return{
            type: Action.GETDATA_BYKEY_SUCCESS,
            payload : data
        }
    }

    static insertRow(data){
        return{
            type:Action.INSERTROW,
            payload : data
        }
    }

    static updateRow(data){
        return{
            type:Action.UPDATEROW,
            payload : data
        }
    }

    static deleteRow(id){
        return{
            type:Action.DELETEROW,
            payload : id
        }
    }
}