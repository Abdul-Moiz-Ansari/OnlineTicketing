
import {IAction} from '../IAction';

export default class ScheduleAction{
    static GETDATA = "GETSCHEDULE";
    static getDataSuccess = "getDataSuccess";
    static getDataByKey = "getDataByKey";
    static getDataByKeySuccess = "getDataByKeySuccess";
    static INSERTROW = "INSERTSCHEDULE";
    static updateRow = "updateRow";
    static saveSuccess = "saveSuccess";
    static refreshData = "refreshData";
    static deleteRow = "deleteRow";
    static SCHEDULE_REMOVED = "SCHEDULE_REMOVED";
    static FORM_CLEARED = "FORM_CLEARED"
    static error  = "error";

    //it will get data on save success
    //I want to fire an action which gets all the data and updates 
    static getData(payload){
        return{
            type:ScheduleAction.GETDATA,
            payload
        }
    }

    static schedule_removed(payload){
        return{
            type : ScheduleAction.SCHEDULE_REMOVED,
            payload
        }
    }

    static GetDataSuccess(data){
        return{
            type:ScheduleAction.getDataSuccess,
            payload : data
        }
    }

    static GetDataByKey(id){
        return{
            type:ScheduleAction.getDataByKey,
            payload : id
        }
    }

    static GetDataByKeySuccess(data){
        return{
            type:ScheduleAction.getDataByKeySuccess,
            payload : data
        }
    }

    static insertRow(data){
        //console.log('insert row action',data);
        return{
            type:ScheduleAction.INSERTROW,
            payload : data
        }
    }

    static SaveSuccess(payload){
        return{
            type:ScheduleAction.saveSuccess,
            payload
        }
    }

    static RefreshData(data){
        return{
            type:ScheduleAction.refreshData,
            payload : data
        }
    }

    static DeleteRow(id){
        return{
            type:ScheduleAction.deleteRow,
            payload : id
        }
    }

    static Error(msg){
        return{
            type:ScheduleAction.error,
            payload : msg
        }
    }

    static formCleared(){
        return{
            type : ScheduleAction.FORM_CLEARED
        }
    }

}