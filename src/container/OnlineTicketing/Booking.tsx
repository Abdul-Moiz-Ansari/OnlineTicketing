
import * as React from 'react';
import { connect } from 'react-redux';

import Authenticate from '../../HOC/Authenticate';
import AlertContainer from 'react-alert';
import BookingForm from '../../component/OnlineTicketing/BookingForm';
import BookingList from '../../component/OnlineTicketing/BookingList';
import TicketForm from '../../component/OnlineTicketing/TicketForm';
import TicketList from '../../component/OnlineTicketing/TicketList';
import ErrorNotification from '../../component/ErrorNotification';

import BookingActoin from '../../store/action/BookingAction';
import ScheduleAction from '../../store/action/ScheduleAction';
import DestinationAction from '../../store/action/DestinationAction';
import RouteDetailAction from '../../store/action/RouteDetailAction';
import ChargesAction from '../../store/action/ChargesAction';
import BookingAction from '../../store/action/BookingAction';
import TicketAction from '../../store/action/TicketAction';

import Booking from '../../models/Booking';
import Ticket from '../../models/Ticket';

enum eFormMode {
    Save = 0,
    Edit = 1
}

class BookingC extends React.Component<any, any>{

    constructor() {
        super();

        //There should be a separate component of Ticket, but according to the time, this is the right approach
        this.state = {
            Tickets: [],
            ticketCharges: 0,
            currentTicket: new Ticket("", "", 0, "", 0, 0, 0, false),
            totalAmount: 0,
            saveSuccess: false,
            ddlSchedule: "0",
            ddlStartDestination: "0",
            ddlEndDestination: "0",
            isDestinationDisabled: false,
            errorMessage: "",
            isSeatNoValid: true,
            seatNo: 0,
            formMode: eFormMode.Save
        };
    }

    componentDidMount() {
        this.props.getSchedules();
        this.props.getRouteDetails();
        this.props.getDestinations();
        this.props.getCharges();
        this.props.getTickets();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.saveSuccess !== this.props.saveSuccess) {
            let state;
            state = {};
            if (nextProps.saveSuccess === true) {
                state.totalAmount = 0;
                state.Tickets = [];
                state.ticketCharges = 0;
                this.props.notSaveSuccess();
            }

            state.saveSuccess = nextProps.saveSuccess;
            this.setState(state);
        }

        if (nextProps.errorMessage !== this.props.errorMessage) {
            this.setState({ errorMessage: nextProps.errorMessage });
        }
    }

    updateTicketCharges(charges) {
        this.setState({ ticketCharges: charges });
    }

    addTicket(ticket: Ticket) {
        let tickets, arr, totalAmount: number = 0, state;
        let obj = {};// isEdit,

        if (!this.state.isSeatNoValid) {
            obj['errorMessage'] = "Cannot add because " + this.state.errorMessage.toString().toLowerCase();
            this.setState(obj);
            return;
        }

        if (this.state.ddlStartDestination === "0" || this.state.ddlEndDestination === "0") {
            obj['errorMessage'] = "Select start and end destinations ";
            this.setState(obj);
            return;
        }

        tickets = this.state.Tickets;
        if (ticket.TicketID === "") {
            ticket.TicketID = tickets.length.toString();   //assigning the next index of tickets array
        }

        //isEdit = false;        
        arr = tickets.filter((item) => {
            if (item.TicketID === ticket.TicketID)
                return item;
        });

        //console.log(arr.length);

        if (arr.length > 0) {
            tickets[tickets.indexOf(arr[0])] = ticket;
        } else {
            tickets.push(ticket);
        }

        tickets.map(function (item) {
            totalAmount += parseFloat(item.Amount);
        }, 0);

        state = this.state;
        state.Tickets = tickets;
        state.totalAmount = totalAmount;
        state.currentTicket = new Ticket("", "", 0, "", 0, 0, state.ticketCharges, false);
        state.isDestinationDisabled = true;

        //console.log(state.Tickets);

        this.setState(state);
    }

    deleteTicket(TicketID: number) {
        let tickets, arr, isEdit = false, totalAmount: number = 0, state;

        //isEdit = false;
        tickets = this.state.Tickets;

        arr = tickets.filter(function (item) {
            if (parseInt(item.TicketID) === TicketID)
                return item;
        });

        if (arr.length > 0) {
            tickets.splice(tickets.indexOf(arr[0]), 1);
        }

        tickets.map(function (item) {
            totalAmount += item.Amount;
        }, 0);

        state = this.state;
        state.Tickets = tickets;
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
        let tickets = [], formMode;
        formMode = this.state.formMode;

        this.state.Tickets.map(item => {
            item.TicketID = formMode === eFormMode.Save ? "" : item.TicketID;        //formMode === 0 means save mode
            tickets.push(item);
        });

        let obj, deleteIDs = [];
        obj = this.getTicketObj_ForSave(booking.BookingID, tickets);
        //console.log('obj : ',obj);
        tickets = obj.tickets;
        deleteIDs = deleteIDs;

        //console.log(tickets);

        this.props.insertBooking(booking, tickets, deleteIDs);
        this.setState({ isDestinationDisabled: false });
    }

    //GetTicketObj_ForDelete

    //checks if tickets exists in database, if does not exists, then makes TicketID = ""
    //in Epic, system checks if TicketID === "", it assigns a new TicketID to it.
    private getTicketObj_ForSave = (pBookingID, pTickets) => {
        let existingTicketIDs = [], deleteIDs = [];

        //return default value, all tickets are to be inserted        
        if (pBookingID === "") {     
            return { tickets : pTickets, deleteIDs };
        }

        //taking the already saved tickets against this booking
        Object.keys(this.props.tickets).map(key => {
            let item;
            item = this.props.tickets[key];
            if (item.BookingID === pBookingID) {
                existingTicketIDs.push(key);

                //if key exists in pTickets= false then ticket should  be deleted
                let existsInUserTickets = false;
                for (let i = 0; i < pTickets.length; i++) {
                    if (pTickets[i].TicketID === key) {
                        existsInUserTickets = true;
                        break;
                    }
                }

                if (!existsInUserTickets)
                    deleteIDs.push(key);
            }
        });

        let tickets = pTickets;
        pTickets.map(item => {
            if (existingTicketIDs.indexOf(item.TicketID) === -1) {
                tickets[tickets.indexOf(item)].TicketID = ""; //finding the current ticket and making TicketID = ""
            }
        });

        return { tickets, deleteIDs };
    }

    //method to update state of Booking component, to be passed in child components
    updateParentState(key, value) {
        //console.log('updateParentState : ', key, value);
        //console.log('', );
        this.setState({ [key]: value });
    }

    CheckSeatNo(seatNo, scheduleID) {
        //let scheduleID, 
        let startDestinationID, endDestinationID, isScheduleID, IsSeatNo,
            tickets, bookings, schedules, buses, selectedSchedule, BookingID, busID, maxSeats = 0,
            result = false, selectedBus, obj = {};

        isScheduleID = typeof scheduleID !== 'undefined';
        IsSeatNo = typeof seatNo !== 'undefined';

        if (typeof seatNo === 'undefined') {
            seatNo = this.state.seatNo.toString();
        }

        if (typeof scheduleID === 'undefined') {
            scheduleID = this.state.ddlSchedule;
        }

        //console.log('seatNo : ', seatNo, 'scheduleID : ', scheduleID);
        if (isNaN(seatNo.trim()) || seatNo.trim() === "" || parseInt(seatNo.trim()) <= 0) {
            obj['isSeatNoValid'] = result;
            obj['errorMessage'] = IsSeatNo ? "Seat No is invalid" : "";
            this.setState(obj);
            return result;
        }

        seatNo = parseInt(seatNo);
        tickets = this.props.tickets;
        bookings = this.props.bookings;
        schedules = this.props.schedules;
        buses = this.props.buses;

        // scheduleID

        //right now we are only assigning one ticket to one schedule i.e, we are not considering two passengers 
        //with diff start and end dest on a single schedule       

        for (let key in schedules) {
            if (key === scheduleID) {
                selectedSchedule = schedules[key];
                break;
            }
        }

        if (typeof selectedSchedule !== 'undefined') {
            busID = selectedSchedule.busID;

            for (let key in buses) {
                if (key === busID) { maxSeats = buses[key].noOfSeats; break; }
            }

            if (maxSeats > 0) {
                if (seatNo > maxSeats) {
                    obj['isSeatNoValid'] = result;
                    obj['errorMessage'] = "Seat No is invalid, can be max " + maxSeats.toString();
                    this.setState(obj);
                    return result; //result is still false
                }

                // let scheduleBookings = [];
                // for (let key in bookings) {
                //     if (bookings[key].ScheduleID === scheduleID) {
                //         scheduleBookings.push(bookings[key]);
                //     }
                // }

                result = true;
                //for (let i = 1; i <= maxSeats; i++){
                for (let key in tickets) {
                    let ticket: any = tickets[key];
                    if (ticket.ScheduleID === scheduleID && ticket.SeatNo === seatNo.toString()) { result = false; break; };
                }
            }
        }

        obj['isSeatNoValid'] = result;
        if (!result) {
            obj['errorMessage'] = "This seat is already booked";
        }
        else {
            obj['errorMessage'] = "";
        }
        this.setState(obj);
        return result;
    }

    render() {
        const {uid} = this.props;
        return (
            <div>
                <h1>Booking</h1>
                <ErrorNotification errorMessage={this.state.errorMessage} />

                <BookingForm destinations={this.props.destinations}
                    uid={uid}
                    routeDetails={this.props.routeDetails}
                    schedules={this.props.schedules}
                    charges={this.props.charges}
                    saveSuccess={this.state.saveSuccess}
                    updateTicketCharges={this.updateTicketCharges.bind(this)}
                    insertBooking={this.insertBooking.bind(this)}
                    totalAmount={this.state.totalAmount}
                    updateParentState={this.updateParentState.bind(this)}
                    checkSeatNo={this.CheckSeatNo.bind(this)}
                    isDestinationDisabled={this.state.isDestinationDisabled} />

                <TicketForm
                    ticketCharges={this.state.ticketCharges}
                    currentTicket={this.state.currentTicket}
                    addTicket={this.addTicket.bind(this)}
                    tickets={this.state.Tickets}
                    checkSeatNo={this.CheckSeatNo.bind(this)}
                    updateParentState={this.updateParentState.bind(this)} />

                <TicketList
                    tickets={this.state.Tickets}
                    displayTicket={this.displayTicket.bind(this)}
                    deleteTicket={this.deleteTicket.bind(this)} />

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.Booking['errorMessage'],
        saveSuccess: state.Booking.saveSuccess,
        bookings: state.Booking.bookings,
        destinations: state.Destination.destinations,
        schedules: state.Schedule.schedules,
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
        insertBooking: function (booking, tickets, deleteTicketIDs) {
            dispatch(BookingAction.insertRow(booking, tickets, deleteTicketIDs));
        },
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
        isSeatNoAvailable: (seatNo, scheduleID, startDestinationID, endDestinationID) =>
            dispatch(TicketAction.isSeatNoAvailable(seatNo, scheduleID, startDestinationID, endDestinationID))
    }
}

let component = Authenticate(BookingC);
export default connect(mapStateToProps, mapDispatchToProps)(component);