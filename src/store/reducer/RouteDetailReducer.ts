
import { IAction } from '../IAction';
import RouteDetail from '../../models/RouteDetail';
import RouteDetailAction from '../action/RouteDetailAction';

const initState = {
    routeDetails: {},
    currentRouteDetail: new RouteDetail("", "", "", 0, ""),
    routeID: 0,
    errorMessage: ""
}

export function routeDetailReducer(state = initState, action: IAction) {
    let newState, existingData = {}, newData,removedData;
    let data;
    switch (action.type) {
        case RouteDetailAction.GETROUTEDETAIL_SUCCESS:
            newData = action.payload;
            Object.keys(state.routeDetails).map(key => {
                existingData[key] = key !== newData.RouteDetailID ? state.routeDetails[key] : undefined;
            });

            existingData[newData.RouteDetailID] = newData;
            newState = Object.assign({}, state, { routeDetails: existingData });
            return newState;

        case RouteDetailAction.GETDATA_BYKEY_SUCCESS:
            data = action.payload;
            newState = Object.assign({}, state, {
                 currentRouteDetail: data,
                 routeID : data.RouteID
                 });
            return newState;

        case RouteDetailAction.GETDATA_BYROUTEID_SUCCESS:
            data = action.payload.payload;
            let routeID = action.payload.routeID;
            let filteredData = data.filter(
                function (item) {
                    if (item["RouteID"] === routeID) {
                        return item;
                    }
                }
            );
            newState = Object.assign({}, state, { routeDetails: filteredData, routeID: routeID });
            return newState;

        case RouteDetailAction.ROUTEDETAIL_ERROR:
            let msg = action.payload;
           // console.log('route detail error reducer');
            newState = Object.assign({}, state, { errorMessage: msg });
            return newState;

        case RouteDetailAction.INSERTROW_SUCCESS : 
            return Object.assign({},state,{
                currentRouteDetail : new RouteDetail("","","",0,""),
                routeID : ""
            });
        
        case RouteDetailAction.ROUTEDETAIL_REMOVED:
            removedData = action.payload;
            Object.keys(state.routeDetails).map(key => {
                existingData[key] = key !== removedData.RouteDetailID ? state.routeDetails[key] : undefined;
            });

            delete existingData[removedData.RouteDetailID];
            newState = Object.assign({}, state, { routeDetails: existingData });
            return newState;

        default:
            return state;
    }
}