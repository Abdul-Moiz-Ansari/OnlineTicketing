
//import Action from './ParentAction';

export default class ChargesAction {
    static GETCHARGES = "GETCHARGES";
    static GETCHARGES_SUCCESS = "GETCHARGES_SUCCESS";

    static GETCHARGES_BYKEY = "GETCHARGES_BYKEY";
    static GETCHARGES_BYKEY_SUCCESS = "GETCHARGES_BYKEY_SUCCESS";

    static SAVECHARGES = "SAVECHARGES";
    static SAVECHARGES_SUCCESS = "SAVECHARGES_SUCCESS";
    
    // static UPDATECHARGES= "UPDATECHARGES";
    // static UPDATECHARGES_SUCCESS = "UPDATECHARGES_SUCCESS";

    static DELETECHARGES= "DELETECHARGES";
    static CHARGES_REMOVED = "CHARGES_REMOVED";    
   
    //static DISPLAY_USER= "DISPLAY_USER";
    static ERROR= "ERROR";
    
    static charges_removed(payload){
        return{
            type : ChargesAction.CHARGES_REMOVED,
            payload
        }
    }

    static error(payload){
        return{
            type : ChargesAction.ERROR,
            payload
        }
    }

    static getCharges(){
        return{
            type:ChargesAction.GETCHARGES
        }
    }

    static getChargesSuccess(Charges){
        //console.log('get Charges success');
        return{
            type: ChargesAction.GETCHARGES_SUCCESS,
            payload : Charges
        }
    }

    static getChargesByKey(id){
        //console.log('ChargesAction.getChargesByKey');
        return{
            type:ChargesAction.GETCHARGES_BYKEY,
            payload : id
        }
    }

    static getChargesByKeySuccess(Charges){
        //console.log('get Charges success');
        return{
            type: ChargesAction.GETCHARGES_BYKEY_SUCCESS,
            payload : Charges
        }
    }

    static insertCharges(Charges){
        return{
            type:ChargesAction.SAVECHARGES,
            payload : Charges
        }
    }

    static saveCharges_Success(payload){
        return{
            type : ChargesAction.SAVECHARGES_SUCCESS,
            payload
        }
    }

    static deletecharges(id){
        return{
            type:ChargesAction.DELETECHARGES,
            payload : id
        }
    }
}