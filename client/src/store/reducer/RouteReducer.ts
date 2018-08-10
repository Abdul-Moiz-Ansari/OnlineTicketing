
import RouteAction from '../action/RouteAction';
import Route from '../../models/Route'; 
import {IAction} from '../IAction';

const initState = {
    routes : {},
    currentRoute: new Route("","","",0,0)
};


export function RouteReducer(state = initState,action:IAction){
    let newState,existingRoutes;
    switch(action.type){
        case RouteAction.GETROUTE_BYKEY_SUCCESS:
            let route  = action.payload;
            newState = Object.assign({},state,{currentRoute: route});
            return newState;
        case RouteAction.GETROUTE_SUCCESS:
            let newRoute,newRoutes : Object = {};
            newRoute= action.payload;

            Object.keys(state.routes).map((key : any) => {
                newRoutes[key] = key !== newRoute.RouteID ? state.routes[key] : undefined;
            });

            newRoutes[newRoute.RouteID] = newRoute;
            newState = Object.assign({},state,{routes : newRoutes});
            return newState;
        
        case RouteAction.INSERTROUTE_SUCCESS : 
            newState = Object.assign({},state,{currentRoute : new Route("","","",0,0,)})
            return newState;
            
        case RouteAction.ROUTE_REMOVED:
            let removedRoute;
            removedRoute = action.payload;
            existingRoutes = state.routes;
            delete existingRoutes[removedRoute.RouteID];

            newState = Object.assign({},state,{routes : existingRoutes});
            return newState;

        case RouteAction.CHILD_CHANGED:
            let changedRoute;
            changedRoute = action.payload;
            existingRoutes = state.routes;

            delete existingRoutes[changedRoute.RouteID];
            existingRoutes[changedRoute.RouteID] = changedRoute;
            //console.log(existingRoutes[changedRoute.RouteID]);
            newState = Object.assign({},state,{routes : existingRoutes});

            //console.log(newState);
            return newState;

        default: 
            return state;
    }
}