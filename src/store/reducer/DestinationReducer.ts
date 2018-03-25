
import DestinationAction from '../action/DestinationAction';
import Destination from '../../models/Destination';
import {IAction} from '../IAction';

const initState = {
    currentItem : new Destination("","",""),
    destinations : []
};


export function DestinationReducer(state = initState,action:IAction){
    let newState; let data;
    switch(action.type){

        case DestinationAction.GETDESTINATION_SUCCESS:                        
            newState = Object.assign({},state,{destinations:action.payload});                        
            return newState;

        case DestinationAction.GETDATA_BYKEY_SUCCESS : 
            newState = Object.assign({},state,{destination : action.payload});
            //console.log('action.type : ',action.type,'newState : ',newState);
            return newState;

        case DestinationAction.LOAD:            
            newState = Object.assign({},state,{data : action.payload , currentItem : action.payload});
            //console.log(action.type,'newState : ', newState);
            return newState;

        case DestinationAction.SAVEROW_SUCCESS : 
            newState = Object.assign({},state,{data : undefined});
            return newState;
            
        default:
         return state;
    }
}