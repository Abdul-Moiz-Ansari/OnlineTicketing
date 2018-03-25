
import {IAction} from '../IAction';
import TicketAction from '../action/TicketAction';
import Ticket from '../../models/Ticket';

const initState= {
    tickets : {},
    currentTicket : new Ticket("","",0,"",0,0,0,false) ,
    errorMessage : ""
}

export function TicketReducer(state = initState,action : IAction){
    let newState;let data,newTicket,existingTickets = {};
    switch(action.type){
        case TicketAction.GET_TICKET_SUCCESS:
            newTicket= action.payload;
            //console.log(newTicket);
            for(let key in state.tickets){
                let ticket;
                ticket = state.tickets[key];
                existingTickets[key] = newTicket.TicketID !== ticket.TicketID ? ticket : undefined;
            }
            //console.log(newTicket)
            existingTickets[newTicket.TicketID] = newTicket;
            newState = Object.assign({},state,{tickets : existingTickets});
            return newState;

        case TicketAction.GETDATA_BYKEY_SUCCESS:
            let ticket = action.payload;
            newState = Object.assign({},state,{currentTicket : ticket});
            return newState;

        case TicketAction.REFRESH_DATA:
            data = action.payload;
            newState = Object.assign({},state,{
                currentTicket : new Ticket("","",0,"",0,0,0,false),
                tickets : data                
            });
            return newState;
        
        case TicketAction.ERROR : 
            let msg = action.payload;
            newState = Object.assign({},state,{errorMessage : msg});
            return newState;
        
        default:
            return state;
    }

    //return state;
}
