

import {IAction} from '../IAction';

export default class RouteDetailAction{
    static GETROUTEDETAIL = "GETROUTEDETAIL";
    static GETROUTEDETAIL_SUCCESS = "GETROUTEDETAIL_SUCCESS";

    static INSERTROUTEDETAIL = "INSERTROUTEDETAIL";
    static INSERTROW_SUCCESS = "INSERTROUTEDETAIL_SUCCESS";

    static GETDATA_BYKEY = "GETROUTEDETAIL_BYKEY";
    static GETDATA_BYKEY_SUCCESS = "GETROUTEDETAIL_BYKEY_SUCCESS";

    static GETDATA_BYROUTEID = "GETDATA_BYROUTEID";
    static GETDATA_BYROUTEID_SUCCESS = "GETDATA_BYROUTEID_SUCCESS";

    static GETDATA_BYORDERID = "GETDATA_BYORDERID";
    static GETDATA_BYORDERID_SUCCESS = "GETDATA_BYORDERID_SUCCESS";

    
    static DELETEROW = "DELETEROUTEDETAIL";
    static ROUTEDETAIL_REMOVED = "ROUTEDETAIL_REMOVED";
    static CHANGE_ROUTEID = "CHANGE_ROUTEID";
    static ROUTEDETAIL_ERROR = "ROUTEDETAIL_ERROR";

    static routeDetail_Removed(payload){
        return{
            type : RouteDetailAction.ROUTEDETAIL_REMOVED,
            payload
        }
    }

    static getData (): IAction{
        return{
            type: RouteDetailAction.GETROUTEDETAIL,
            payload : null 
        }
    }

    static getDataSuccess(data) : IAction{
        return{
            type : RouteDetailAction.GETROUTEDETAIL_SUCCESS,
            payload : data
        }
    }

    static getDataByKey(id):IAction{
        return{
            type: RouteDetailAction.GETDATA_BYKEY,
            payload : id
        }
    }

    static getDataByKeySuccess(data):IAction{
        return{
            type : RouteDetailAction.GETDATA_BYKEY_SUCCESS,
            payload : data
        }
    }

    static getDatabyOrderID(orderID):IAction{
        return{
            type:RouteDetailAction.GETDATA_BYORDERID,
            payload : orderID
        }
    }

    static getDataByOrderIDSuccess():IAction{
        return{
            type:RouteDetailAction.GETDATA_BYORDERID_SUCCESS,
            payload:null
        }
    }

    static getDatabyRouteID(routeID):IAction{
        return{
            type:RouteDetailAction.GETDATA_BYROUTEID,
            payload : routeID
        }
    }

    //param data should contain the data and the routeID associated
    static getDatabyRouteIDSuccess(data):IAction{
        return{
            type:RouteDetailAction.GETDATA_BYROUTEID_SUCCESS,
            payload : data
        }
    }

    static insertRow(data) : IAction{
        return{
            type : RouteDetailAction.INSERTROUTEDETAIL,
            payload : data
        }
    }

    static insertRow_Success(payload){
        return{
            type : RouteDetailAction.INSERTROW_SUCCESS,
            payload
        }
    }

    static deleteRow(routeDetailID,routeID):IAction{
        return{
            type : RouteDetailAction.DELETEROW,
            payload : {RouteDetailID : routeDetailID , RouteID : routeID}
        }
    }

    static changeRouteID(routeID):IAction{
        return{ 
            type:RouteDetailAction.CHANGE_ROUTEID,
            payload : routeID
        }
    }

    static routeDetailError(msg) : IAction{
        return{
            type:RouteDetailAction.ROUTEDETAIL_ERROR,
            payload : msg
        }
    }

}