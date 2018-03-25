
import ChargesAction from '../action/ChargesAction';
import { IAction } from '../IAction';
import Charges from '../../models/Charges';

const initState = {
    charges: {},
    currentCharges: new Charges("", "", 0, 0, 0, 0, 0, false)
};

export function ChargesReducer(state = initState, action: IAction) {
    let newState, data, newCharges, existingCharges: Object = {}, removedCharges;
    switch (action.type) {
        case ChargesAction.GETCHARGES_SUCCESS:
            newCharges = action.payload;

            Object.keys(state.charges).map((key: any) => {
                existingCharges[key] = key !== newCharges.ChargesID ? state.charges[key] : undefined;
            });
            existingCharges[newCharges.ChargesID] = newCharges;
            newState = Object.assign({}, state, { charges: existingCharges });
            return newState;

        case ChargesAction.GETCHARGES_BYKEY_SUCCESS:
            data = action.payload;
            newState = Object.assign({}, state, { currentCharges: data });
            return newState;

        case ChargesAction.CHARGES_REMOVED:        
            removedCharges = action.payload;
            Object.keys(state.charges).map((key: any) => {
                existingCharges[key] = key !== removedCharges.ChargesID ? state.charges[key] : undefined;
            });
            delete existingCharges[removedCharges.ChargesID];
            newState = Object.assign({}, state, { charges: existingCharges });
            return newState;

        case ChargesAction.SAVECHARGES_SUCCESS:
            return Object.assign({},state,{currentCharges : new Charges("","",0,0,0,0,0,false)});
            
        case ChargesAction.ERROR:
            console.log(action.payload);

            return state;
        default:
            return state;
    }
}