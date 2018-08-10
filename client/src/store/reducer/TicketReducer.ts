
import { IAction } from '../IAction';
import TicketAction,* as ticketActionExt from '../action/TicketAction';
import * as _ from 'lodash';
import Ticket from '../../models/Ticket';
import { isNull } from '../../helper/GeneralFunctions';

const initState = {
    tickets: {},
    currentTicket: new Ticket("", "", 0, "", 0, 0, 0, false,"","",""),
    ticketsByBookingID : [],
    errorMessage: "",
}

export function TicketReducer(state = initState, action: IAction) {
    let newState; 
    let data, 
    newTicket, 
    existingTickets = {},
    TicketIDs = [],
    tickets : any = {};
    switch (action.type) {
        case TicketAction.GET_TICKET_SUCCESS:
            newTicket = action.payload;
            //console.log(newTicket);
            for (let key in state.tickets) {
                let ticket;
                ticket = state.tickets[key];
                existingTickets[key] = newTicket.TicketID !== ticket.TicketID ? ticket : undefined;
            }
            //console.log(newTicket)
            existingTickets[newTicket.TicketID] = newTicket;
            newState = Object.assign({}, state, { tickets: existingTickets });
            return newState;

        case TicketAction.TICKET_REMOVED_SUCCESFULLY:
            let removed_ticketID;
            removed_ticketID = action.payload;
            existingTickets = Object.assign({},state.tickets);
            if(existingTickets[removed_ticketID]){
                delete existingTickets[removed_ticketID];
            }            
            newState = Object.assign({},state,{tickets: existingTickets});
            return newState;

        case TicketAction.GETDATA_BYKEY_SUCCESS:
            let ticket = action.payload;
            newState = Object.assign({}, state, { currentTicket: ticket });
            return newState;    

        case ticketActionExt.GET_TICKET_BY_BOOKING_SUCCESS:
            tickets = _.toArray(action.payload);
            return {...state,ticketsByBookingID : tickets};

        case ticketActionExt.SET_TICKET_BY_BOOKING_SUCCESS:
            return {...state,ticketsByBookingID : action.payload};
        // case ticketActionExt.DELETE_TICKET_SUCCESS:
        //     TicketIDs = action.payload;

        //     if(!isNull(TicketIDs) && TicketIDs.length > 0){
        //         tickets = _.cloneDeep(state.tickets);

        //         TicketIDs.map(TicketID => {
        //             if(tickets[TicketID]){delete tickets[TicketID]};                        
        //         });

        //         newState = Object.assign({},state,{tickets : tickets});                
        //         return newState;
        //     }
        //     else{
        //         return state;
        //     }
        case TicketAction.REFRESH_DATA:
            data = action.payload;
            newState = Object.assign({}, state, {
                currentTicket: new Ticket("", "", 0, "", 0, 0, 0, false,"","",""),
                tickets: data
            });
            return newState;

        case TicketAction.ERROR:
            let msg = action.payload;
            //console.log(msg);
            newState = Object.assign({}, state, { errorMessage: msg });
            return newState;

        default:
            return state;
    }

    //return state;
}
