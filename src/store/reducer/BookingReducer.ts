
import {IAction} from '../IAction';
import BookingAction from '../action/BookingAction';
import Booking from '../../models/Booking';

const initState= {
    bookings : [],
    currentBooking : new Booking("","","",0,0,0,0,new Date(),"",false) ,
    errorMessage : "",
    saveSuccess : false
}

export function BookingReducer(state = initState,action : IAction){
    let newState;let data;
    switch(action.type){
        case BookingAction.GETDATA_SUCCESS:
            data = action.payload;
            newState = Object.assign({},state,{bookings : data});
            return newState;

        case BookingAction.GETDATA_BYKEY_SUCCESS:
            let booking = action.payload;
            newState = Object.assign({},state,{currentBooking : booking});
            return newState;

        case BookingAction.INSERTROW_SUCCESS:
            newState = Object.assign({},state,{
                currentBooking : new Booking("","","",0,0,0,0,new Date(),"",false),
                saveSuccess : true,
                errorMessage : "Booking saved successfully"    
            });
            return newState;
            
        case BookingAction.REFRESH_DATA:
            data = action.payload;
            newState = Object.assign({},state,{
                currentBooking : new Booking("","","",0,0,0,0,new Date(),"",false),
                bookings : data                
            });
            return newState;
        
        case BookingAction.ERROR : 
            let msg = action.payload;
            newState = Object.assign({},state,{errorMessage : msg});
            return newState;
        
        default:
            return state;
    }

    //return state;
}
