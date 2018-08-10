
//import Action from './ParentAction';

export default class RouteAction {
    static GETROUTE = "GETROUTE";
    static GETROUTE_SUCCESS = "GETROUTE_SUCCESS";

    static GETROUTE_BYKEY = "GETROUTE_BYKEY";
    static GETROUTE_BYKEY_SUCCESS = "GETROUTE_BYKEY_SUCCESS";

    static INSERTROUTE = "INSERTROUTE";
    static INSERTROUTE_SUCCESS = "INSERTROUTE_SUCCESS";
    
    static UPDATEROUTE= "UPDATEROUTE";
    static UPDATEROUTE_SUCCESS = "UPDATEROUTE_SUCCESS";

    static DELETEROUTE= "DELETEROUTE";
    static DELETEROUTE_SUCCESS = "DELETEROUTE_SUCCESS";    

    static ROUTE_REMOVED = "ROUTE_REMOVED";
    static CHILD_CHANGED = "ROUTE_CHANGED";
   
    //static DISPLAY_USER= "DISPLAY_USER";
    static ERROR= "ERROR";
    
    static route_removed(payload){
        return{
            type : RouteAction.ROUTE_REMOVED,
            payload
        }
    }

    static child_changed(payload){
        return {
            type : RouteAction.CHILD_CHANGED,
            payload
        }
    }

    static getData(){
        return{
            type:RouteAction.GETROUTE
        }
    }

    static getDataSuccess(data){
        //console.log('get data success');
        return{
            type: RouteAction.GETROUTE_SUCCESS,
            payload : data
        }
    }

    static getDataByKey(id){
        //console.log('RouteAction.getDataByKey');
        return{
            type:RouteAction.GETROUTE_BYKEY,
            payload : id
        }
    }

    static getDataByKeySuccess(data){
        //console.log('get data success');
        return{
            type: RouteAction.GETROUTE_BYKEY_SUCCESS,
            payload : data
        }
    }

    static insertRoute(data){
        return{
            type:RouteAction.INSERTROUTE,
            payload : data
        }
    }

    static insertRoute_Success(payload){
        return{
            type : RouteAction.INSERTROUTE_SUCCESS,
            payload: payload
        }
    }

    static updateRoute(data){
        return{
            type:RouteAction.UPDATEROUTE,
            payload : data
        }
    }

    static deleteRoute(id){
        return{
            type:RouteAction.DELETEROUTE,
            payload : id
        }
    }
}