
import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import Authenticate from '../../HOC/Authenticate';
import BookingForm from '../../component/OnlineTicketing/BookingForm';
import BookingList from '../../component/OnlineTicketing/BookingList';
import TicketForm from '../../component/OnlineTicketing/TicketForm';
import TicketList from '../../component/OnlineTicketing/TicketList';
import ErrorNotification from '../../component/ErrorNotification';

import BookingActoin from '../../store/action/BookingAction';
import ScheduleAction from '../../store/action/ScheduleAction';
import DestinationAction from '../../store/action/DestinationAction';
import RouteDetailAction from '../../store/action/RouteDetailAction';
import ChargesAction, * as chargesActionExt from '../../store/action/ChargesAction';
import BookingAction, * as bookingActionExt from '../../store/action/BookingAction';
import TicketAction from '../../store/action/TicketAction';
import RouteAction from '../../store/action/RouteAction';
import BusAction from '../../store/action/BusAction';

import Booking from '../../models/Booking';
import Ticket from '../../models/Ticket';
import { guid } from '../../helper/GUID';
import { isNull } from '../../helper/GeneralFunctions';
import { eFormMode } from '../../helper/eFormMode';

class BookingC extends React.Component<any, any>{

    constructor(props) {
        super(props);

        //There should be a separate component of Ticket, but according to the time, this is the right approach
        this.state = {
            currentTicket: new Ticket("", guid(), 0, "", 0, 0, 0, false, "", "", ""),
            Tickets: [],
            newTicketIDs: [],
            deletedTicketIDs: [],
            formMode: eFormMode.Save,
            ticketCharges: 0,
            totalAmount: 0,
            seatNo: 0,
            errorMessage: "",
            isDestinationDisabled: false,
            ddlSchedule: "0",
            ddlStartDestination: "0",
            ddlEndDestination: "0",
        };
    }

    componentDidMount() {
        let Tickets = [];
        const { currentBooking } = this.props;
        let state: any = {};
        this.props.getSchedules();
        this.props.getRouteDetails();
        this.props.getDestinations();
        this.props.getCharges();
        this.props.getTickets();
        this.props.getRoutes();
        this.props.getBuses();
        this.props.setErrorMessage("");

        if (!isNull(currentBooking) && currentBooking.BookingID !== "") {
            let ticketCharges = 0;
            state.formMode = eFormMode.Edit;
            Object.keys(currentBooking.tickets).map(key => {
                let ticket: Ticket = Object.assign({}, currentBooking.tickets[key]);
                if (ticketCharges === 0) { ticketCharges = ticket.Amount; }
                ticket.isNewTicket = false;
                Tickets.push(ticket);
            });

            this.props.setChargesForBooking(ticketCharges);
            this.props.setIsSeatNoAvailable(true);
            state.Tickets = Tickets;
        }

        this.setState(() => state);
    }

    componentWillReceiveProps(nextProps) {
        let state: any = {};

        if (nextProps.saveSuccess !== this.props.saveSuccess && nextProps.saveSuccess === true) {
            state.totalAmount = 0;
            state.Tickets = [];
            state.ticketCharges = 0;
            state.isDestinationDisabled = false;
            this.props.notSaveSuccess();
            this.props.setIsSeatNoAvailable(false);
            this.props.setChargesForBooking(0);
        }

        if (parseFloat(nextProps.chargesForBooking) !== parseFloat(this.state.ticketCharges)) {
            state.ticketCharges = parseFloat(nextProps.chargesForBooking);
        }

        if (nextProps.errorMessage !== this.props.errorMessage) {
            state.errorMessage = nextProps.errorMessage;
        }

        this.setState(() => state);
    }

    updateTicketCharges(charges) {
        this.setState({ ticketCharges: charges });
    }

    addTicket(ticket: Ticket) {
        let
            arr,
            totalAmount: number = 0,
            state: any = {},
            isNewTicket = false;
        const { isSeatNoValid } = this.props;
        const { ticketCharges, Tickets, newTicketIDs, formMode } = this.state;

        if (isSeatNoValid !== true) {
            return;
        }

        //if charges have not been defined for this schedule
        if (parseFloat(ticketCharges) === 0) {
            state.errorMessage = "Charges have not been entered for this schedule.";
            this.setState(() => state);
            return;
        }

        //if start or end destinations have not been selected
        if (this.state.ddlStartDestination === "0" || this.state.ddlEndDestination === "0") {
            state['errorMessage'] = "Select start and end destinations ";
            this.setState(state);
            return;
        }

        //if it is a new ticket, then assign a new ID to it and push the ID to newTicketIDs array
        isNewTicket = ticket.TicketID === "";
        ticket.TicketID = isNewTicket ? Tickets.length.toString() : ticket.TicketID;   //assigning the next index of tickets array                

        ticket.isNewTicket = isNewTicket;
        if (isNewTicket)
            newTicketIDs.push(Tickets.length.toString());
        //-------------------

        //check if it an existing tickett
        arr = Tickets.filter((item) => {
            if (item.TicketID === ticket.TicketID)
                return item;
        });

        //if it an existing ticket, take it as existing one, else push it as new one
        if (arr.length > 0) {
            Tickets[Tickets.indexOf(arr[0])] = ticket;
        } else {
            Tickets.push(ticket);
        }

        //Calculate the total amount
        Tickets.map(function (item) {
            totalAmount += parseFloat(item.Amount);
        }, 0);

        //finally, set the state
        state.Tickets = Tickets;
        state.totalAmount = totalAmount;
        state.currentTicket = new Ticket("", guid(), 0, "", 0, 0, state.ticketCharges, false, "", "", "");
        state.isDestinationDisabled = true;
        this.setState(state);
    }

    deleteTicket(TicketID: number) {
        let ticket: any,
            totalAmount: number = 0,
            state: any = {};

        const { Tickets, deletedTicketIDs } = this.state;
        ticket = _.find(Tickets, { 'TicketID': TicketID });
        if (isNull(ticket)) { return; }

        Tickets.splice(Tickets.indexOf(ticket), 1);
        if (ticket.isNewTicket === false)
            deletedTicketIDs.push(ticket.TicketID);

        Tickets.map(function (item) {
            totalAmount += item.Amount;
        }, 0);

        state.Tickets = Tickets;
        state.totalAmount = totalAmount;
        this.setState(state);
    }

    displayTicket(index: number) {    //because we are saving it right away, we are using index
        let tickets, ticket;
        tickets = this.state.Tickets;
        ticket = tickets[index];
        this.setState({ currentTicket: ticket });
    }

    insertBooking(booking: Booking) {
        let tickets = [];
        let obj, deleteIDs = [];
        //formMode = this.state.formMode;
        const { Tickets, newTicketIDs, deletedTicketIDs } = this.state;

        Tickets.map(item => {
            if (newTicketIDs.indexOf(item.TicketID) > -1)
                item.TicketID = "";

            tickets.push(item);
        });

        this.props.insertBooking(booking, tickets, deletedTicketIDs);
    }

    //checks if tickets exists in database, if does not exists, then makes TicketID = ""
    //in Epic, system checks if TicketID === "", it assigns a new TicketID to it.
    private getTicketObj_ForSave = (pBookingID, pTickets) => {
        let existingTicketIDs = [], deleteIDs = [];

        //return default value, all tickets are to be inserted        
        if (pBookingID === "") {
            return { tickets: pTickets, deleteIDs };
        }

        //taking the already saved tickets against this booking
        //loop over all the tickets in store
        Object.keys(this.props.tickets).map(key => {
            let currentTicket;
            currentTicket = this.props.tickets[key];
            //if this ticket belongs to this booking
            if (currentTicket.BookingID === pBookingID) {
                //this is an existing saved ticket
                existingTicketIDs.push(key);

                //if key exists in pTickets= false then ticket should  be deleted
                let existsInUserTickets = false;
                //looping over tickets in state
                for (let i = 0; i < pTickets.length; i++) {
                    //if this ticket(ticket in props) exists in state(not deleted by user), then it should not be deleted
                    //, otherwise it should be deleted
                    if (pTickets[i].TicketID === key) {
                        existsInUserTickets = true;
                        break;
                    }
                }

                //add it to the delete ids array
                if (!existsInUserTickets)
                    deleteIDs.push(key);
            }
        });

        let tickets = pTickets;
        //looping over tickets in state
        pTickets.map(item => {
            //if this ticket(ticket in state) not exists in those tickets of props belongs to this booking, then it should be inserted
            if (existingTicketIDs.indexOf(item.TicketID) === -1) {
                tickets[tickets.indexOf(item)].TicketID = ""; //finding the current ticket and making TicketID = ""
            }
        });

        return { tickets, deleteIDs };
    }

    //method to update state of Booking component, to be passed in child components
    updateParentState(key, value) {
        this.setState({ [key]: value });
    }

    updateParentStateObject(obj: Object) {
        this.setState(obj);
    }

    render() {
        const { uid, buses, currentBooking, isSeatNoAvailable, saveSuccess } = this.props;
        const { ddlSchedule, ddlStartDestination, ddlEndDestination } = this.state;
        return (
            <div>
                <h1>Booking</h1>
                <ErrorNotification errorMessage={this.state.errorMessage} />

                <BookingForm
                    destinations={this.props.destinations}
                    uid={uid}
                    routes={this.props.routes}
                    routeDetails={this.props.routeDetails}
                    schedules={this.props.schedules}
                    charges={this.props.charges}
                    buses={buses}
                    currentBooking={currentBooking}
                    saveSuccess={saveSuccess}
                    updateTicketCharges={this.updateTicketCharges.bind(this)}
                    _insertBooking={this.insertBooking.bind(this)}
                    totalAmount={this.state.totalAmount}
                    updateParentState={this.updateParentState.bind(this)}
                    isDestinationDisabled={this.state.isDestinationDisabled}
                    updateParentStateObject={this.updateParentStateObject.bind(this)}
                    {...this.props} />

                <TicketForm
                    ticketCharges={this.state.ticketCharges}
                    currentTicket={this.state.currentTicket}
                    ddlSchedule={ddlSchedule}
                    ddlStartDestination={ddlStartDestination}
                    ddlEndDestination={ddlEndDestination}
                    addTicket={this.addTicket.bind(this)}
                    tickets={this.state.Tickets}
                    isSeatNoAvailable={isSeatNoAvailable}
                    updateParentState={this.updateParentState.bind(this)}
                    updateParentStateObject={this.updateParentStateObject.bind(this)}
                    {...this.props}
                    {...this.state} />

                <TicketList
                    tickets={this.state.Tickets}
                    displayTicket={this.displayTicket.bind(this)}
                    deleteTicket={this.deleteTicket.bind(this)} />

            </div>
        )
    }
}

function mapStateToProps(state) {
    const { currentBooking, isSeatNoStatusFetched, isSeatNoValid } = state.Booking;
    const { chargesForBooking } = state.Charges;
    return {
        errorMessage: state.Booking.errorMessage,
        saveSuccess: state.Booking.saveSuccess,
        bookings: state.Booking.bookings,
        currentBooking,
        isSeatNoValid,
        chargesForBooking,
        destinations: state.Destination.destinations,
        schedules: state.Schedule.schedules,
        routes: state.Route.routes,
        routeDetails: state.RouteDetail.routeDetails,
        charges: state.Charges.charges,
        tickets: state.Ticket.tickets,
        buses: state.busReducer.buses,
        uid: state.User.uid
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDestinations: () => dispatch(DestinationAction.getData()),
        getSchedules: () => dispatch(ScheduleAction.getData(null)),
        getRouteDetails: () => dispatch(RouteDetailAction.getData()),
        getCharges: () => dispatch(ChargesAction.getCharges()),
        insertBooking: (booking, tickets, deleteTicketIDs) =>
            dispatch(BookingAction.insertRow(booking, tickets, deleteTicketIDs)),
        deleteBooking: function (bookingID) {
            dispatch(BookingAction.insertRow(bookingID, null, []));
        },
        getBooking: function () {
            dispatch(BookingAction.getData());
        },
        getBookingByKey: function (id) {
            dispatch(BookingAction.getDataByKey(id));
        },
        insertTicket: function (data) {
            dispatch(TicketAction.insertRow(data));
        },
        deleteTicket: function (ticketID) {
            dispatch(TicketAction.insertRow(ticketID));
        },
        getTickets: function () {
            dispatch(TicketAction.getData());
        },
        getTicketByKey: function (id) {
            dispatch(TicketAction.getDataByKey(id));
        },
        notSaveSuccess: () => dispatch(BookingAction.notSaveSuccess()),
        isSeatNoAvailable: (payload) => dispatch(bookingActionExt.isSeatNoAvailable(payload)),
        setIsSeatNoAvailable: () => dispatch(bookingActionExt.setIsSeatNoAvailable()),
        setErrorMessage : (payload) => dispatch(bookingActionExt.setErrorMessage(payload)),
        getRoutes: () => dispatch(RouteAction.getData()),
        getBuses: () => dispatch(BusAction.getData()),
        getChargesForBooking: (payload) => dispatch(chargesActionExt.getChargesForBooking(payload)),
        setChargesForBooking: (payload) => dispatch(chargesActionExt.setChargesForBooking(payload))
        
    }
}

let component = Authenticate(BookingC);
export default connect(mapStateToProps, mapDispatchToProps)(component);