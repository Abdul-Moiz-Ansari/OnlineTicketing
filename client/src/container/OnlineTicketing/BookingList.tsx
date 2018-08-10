import * as React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import BookingListC from '../../component/OnlineTicketing/BookingList';
import Authenticate from '../../HOC/Authenticate';
import ErrorNotification from '../../component/ErrorNotification';

import Booking from '../../models/Booking';
import BookingAction, * as bookingActionExt from '../../store/action/BookingAction';
import TicketAction, * as ticketActionExt from '../../store/action/TicketAction';
import { isNull } from '../../helper/GeneralFunctions';

class BookingList extends React.Component<any, any>{

    componentDidMount() {        
        this.props.getBookings();
        this.props.ticketRemoved();
        this.props.setErrorMessage("");
        this.props.bookingRemoved();
    }   

    componentWillReceiveProps(nextProps) {
        const { currentBooking } = nextProps;
        if (!isNull(currentBooking.BookingID) && currentBooking.BookingID !== "") {
            browserHistory.push('/booking');
        }
    }

    render() {
        const {
            tickets,
            bookings,
            isAdmin,
            isEmployee,
            isExternal,
            uid,
            deleteBooking,
            getBookingByKey,
            getTicketByBooking,
            errorMessage,
            ticketsByBookingID
        } = this.props;

        //console.log(this.props)

        return (
            <div>
                <h1>My Bookings</h1>
                <ErrorNotification errorMessage={errorMessage} />
                <BookingListC
                    uid={uid}
                    tickets={tickets}
                    bookings={bookings}
                    isAdmin={isAdmin}
                    isEmployee={isEmployee}
                    isExternal={isExternal}
                    isDashboard={false}
                    ticketsByBookingID={ticketsByBookingID}
                    deleteBooking={deleteBooking}
                    getBookingByKey={getBookingByKey}
                    getTicketByBooking={getTicketByBooking}
                    {...this.props} />

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { currentBooking, errorMessage } = state.Booking;
    const { ticketsByBookingID } = state.Ticket;
    return {
        uid: state.User.uid,
        isAdmin: state.User.isAdmin,
        isEmployee: state.User.isEmployee,
        isExternal: state.User.isExternal,
        tickets: state.Ticket.tickets,
        ticketsByBookingID,
        bookings: state.Booking.bookings,
        currentBooking,
        errorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTickets: () => dispatch(TicketAction.getData()),
        getBookings: () => dispatch(BookingAction.getData()),
        getBookingByKey: (payload) => dispatch(BookingAction.getDataByKey(payload)),
        deleteBooking: (payload) => dispatch(BookingAction.deleteRow(payload)),
        bookingRemoved: () => dispatch(bookingActionExt.bookingRemoved()),
        setErrorMessage: (payload) => dispatch(bookingActionExt.setErrorMessage(payload)),
        ticketRemoved: () => dispatch(TicketAction.ticketRemoved()),
        getTicketByBooking: (payload) => dispatch(ticketActionExt.getTicketByBooking(payload)),
        setTicketByBooking: (payload) => dispatch(ticketActionExt.setTicketByBooking(payload))
    }
}

let component;
component = BookingList;
export default Authenticate(connect(mapStateToProps, mapDispatchToProps)(component));