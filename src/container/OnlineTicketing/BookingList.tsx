import * as React from 'react';
import { connect } from 'react-redux';

import Authenticate from '../../HOC/Authenticate';
import ErrorNotification from '../../component/ErrorNotification';

import Booking from '../../models/Booking';
import BookingAction from '../../store/action/BookingAction';
import TicketAction from '../../store/action/TicketAction';

class BookingList extends React.Component<any, any>{

    componentDidMount(){
        this.props.getTickets();
    }

    getListItem(key){
        let item;
        const {uid,isExternal} = this.props;
        item = this.props.tickets[key];

        //console.log

        if(isExternal){
            if(uid !== item.UserID){
                return undefined;
            }
        }

        return(
           <tr key={key}>
                <td></td>
                <td>{item.ScheduleTitle}</td>
                <td>{item.StartDestinationTitle}</td>
                <td>{item.EndDestinationTitle}</td>
                <td></td>
                <td>{item.CustomerName}</td>
                <td>{item.CustomerAge}</td>
                <td>{item.SeatNo}</td>
                <td>{item.Amount}</td>
           </tr> 
        );
    }   

    render() {
        const {tickets} = this.props;
        
        return (
            <div>
                <h1>My Bookings</h1>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Schedule</th>
                            <th>Start Dest</th>
                            <th>End Dest</th>
                            <th>Ticket No</th>
                            <th>Cust Name</th>
                            <th>Cust Age</th>
                            <th>Seat No</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(tickets).map(this.getListItem.bind(this))}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        uid : state.User.uid,
        isAdmin : state.User.isAdmin,
        isEmployee : state.User.isEmployee,
        isExternal : state.User.isExternal,
        tickets : state.Ticket.tickets
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTickets : () => dispatch(TicketAction.getData())
    }
}

let component = Authenticate(BookingList)
export default connect(mapStateToProps, mapDispatchToProps)(component);