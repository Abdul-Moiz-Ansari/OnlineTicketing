//import Action from './ParentAction';

export default class DestinationAction {
    static GETDATA = "GETDESTINATION";
    static GETDESTINATION_SUCCESS = "GETDESTINATION_SUCCESS";
    static GETDATA_BYKEY = "GETDATA_BYKEY";
    static GETDATA_BYKEY_SUCCESS = "GETDATA_BYKEY_SUCCESS";

    static SAVEROW = "SAVEROW";
    static SAVEROW_SUCCESS = "SAVEROW_SUCCESS";
    static DELETEROW = "DELETEROW";
    static LOAD = "LOADDESTINATIONFORM";

    static getData(){
        return{
            type:DestinationAction.GETDATA
        }
    }

    static getDataSuccess(data){
        //console.log('get data success');
        return{
            type: DestinationAction.GETDESTINATION_SUCCESS,
            payload : data
        }
    }

    static getDataByKey(payload){
        return{
            type : DestinationAction.GETDATA_BYKEY,
            payload
        }
    }

    static getDataByKey_Success(payload){
        return{
            type : DestinationAction.GETDATA_BYKEY_SUCCESS,
            payload
        }
    }

    static saveRow(payload){
        return{
            type : DestinationAction.SAVEROW,
            payload
        }
    }

    static saveRowSuccess(payload){
        return{
            type : DestinationAction.SAVEROW_SUCCESS,
            payload 
        }
    }

    static deleteRow(payload){
        return{
            type : DestinationAction.DELETEROW,
            payload
        }
    }

    static load(payload){
        return{
            type : DestinationAction.LOAD,
            payload
        }
    }
}