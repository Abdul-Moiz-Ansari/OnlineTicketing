
import BusAction from '../action/BusAction';
import {IAction} from '../IAction';
import Bus from '../../models/Bus';

//we'll fix this
const initState = {
    buses : [],
    currentItem : new Bus("","","",0)
};

export function busReducer(state = initState,action:IAction){
    let newState;
    switch(action.type){
        case BusAction.GETDATA_SUCCESS:
            let buses = [];
            let data = action.payload;        
            newState = Object.assign({},state,{buses:data});     

            //console.log('bus GETDATA_SUCCESS' , newState);
            //console.log('action.type : ' , action.type);

            return newState;
        case BusAction.GETDATA_BYKEY_SUCCESS:
            let bus = action.payload;
            newState = Object.assign({},state,{currentItem : bus });
            return newState;
        default:
            return state;
    }
}