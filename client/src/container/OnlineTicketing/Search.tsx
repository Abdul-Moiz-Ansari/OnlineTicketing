
import * as React from 'react';
import { connect } from 'react-redux';

import SearchList from '../../component/OnlineTicketing/SearchList';

import Authenticate from '../../HOC/Authenticate';
import DestinationAction from '../../store/action/DestinationAction';
import ScheduleAction from '../../store/action/ScheduleAction';
import BookingAction from '../../store/action/BookingAction';
import TicketAction from '../../store/action/TicketAction';
import ChargesAction from '../../store/action/ChargesAction';
import ComponentHelper from '../../helper/ComponentHelper';
import ChargesHelper from '../../helper/ChargesHelper';

class Search extends React.Component<any, any>{

    constructor() {
        super();

        let helper = new ComponentHelper();

        this.state = {
            ddlStartDestination: "0",
            ddlEndDestination: "0",
            txtArrivalDate: helper.getFormattedDate(new Date(), "yyyy-MM-dd", "-"),
            txtDepartureDate: helper.getFormattedDate(new Date(), "yyyy-MM-dd", "-"),
            destinations: {},
            schedules: {},
            bookings: {},
            tickets: {},
            results: []
        }
    }

    componentDidMount() {
        this.props.getDestnation();
        this.props.getSchedules();
        this.props.getBookings();
        this.props.getTickets();
        this.props.getCharges();

        const {destinations, schedules, bookings, tickets} = this.props;
        this.setState({
            destinations,
            schedules,
            bookings,
            tickets
        });
    }

    componentWillReceiveProps(nextProps) {
        let state: any = {};
        const {destinations, schedules, bookings, tickets} = this.props;
        const {
            destinations: nextDestinations,
            schedules: nextSchedules,
            bookings: nextBookings,
            tickets: nextTickets
        } = nextProps;

        if (Object.keys(destinations).length !== Object.keys(nextDestinations).length) {
            state.destinations = nextDestinations;
        }

        if (Object.keys(schedules).length !== Object.keys(nextSchedules).length) {
            state.schedules = nextSchedules;
        }

        if (Object.keys(bookings).length !== Object.keys(nextBookings).length) {
            state.bookings = nextBookings;
        }

        if (Object.keys(tickets).length !== Object.keys(nextTickets).length) {
            state.tickets = nextTickets;
        }

        this.setState(state);
    }

    getOptionsFromState(stateOptions, valueProp, titleProp) {
        let options = [];
        //console.log('hello from getOptionsFromState');
        if (Object.keys(stateOptions).length > 0) {
            options = Object.keys(stateOptions).map(function (key, index) {
                let item;
                item = stateOptions[key];
                return (<option value={item[valueProp]} key={item[valueProp]}>{item[titleProp]}</option>)
            });
        }
        options.unshift(<option key={0} value="0">Select</option>)
        return options;
    }

    form_Submit = (e) => {
        e.preventDefault();
        let data;
        const {txtArrivalDate, txtDepartureDate, ddlStartDestination, ddlEndDestination} = this.state;

        data = this.getSearchResults(ddlStartDestination, ddlEndDestination, txtArrivalDate, txtDepartureDate);
        //console.log('data in form submit : ',data);
        this.setState({ results: data });
    }

    getSearchResults(pStartDestinationID, pEndDestinationID, pDepartureDate, pArrivalDate) {
        const {schedules, destinations, bookings, tickets} = this.state;
        let arrMatchingSchedules = [];

        //taking the matching schedules with the search
        Object.keys(schedules).map(key => {
            let noOfSeats, noOfSeatsBooked = 0, diff, isAvailable, item;
            item = schedules[key];
            if (item.StartDestinationID === pStartDestinationID && item.EndDestinationID === pEndDestinationID &&
                item.DepartureDate === pDepartureDate && item.ArrivalDate === pArrivalDate) {
                noOfSeats = item.NoOfSeats;
                //taking bookings of that schedules
                //take tickets of those bookings
                //diff = Schedule.Bus.NoOfSeats - number of seats booked(tickets)
                //isAvailable = diff > 0

                Object.keys(bookings).map(bookingKey => {
                    let booking;
                    booking = bookings[key];
                    if (item.BookingID === booking.BookingID)
                        Object.keys(tickets).map(ticketKey => {
                            if (tickets[ticketKey].BookingID === booking.BookingID) { noOfSeatsBooked++; }
                        });
                });

                diff = noOfSeats - noOfSeatsBooked
                if (diff > 0)
                    arrMatchingSchedules.push(item);
            }
        });

        return arrMatchingSchedules;
    }

    form_Change = (e) => {
        let state;
        state = this.state;
        state[e.target.id] = e.target.value;
        this.setState(state);
    }

    getResultRows(results) {
        let arrResult = [], charges;

        results.map((item, index) => {
            // charges = this.getCharges(item.StartDestinationID, item.EndDestinationID, item.busID);
            charges = new ChargesHelper().getCharges(item.StartDestinationID, item.EndDestinationID, item.busID,this.props.charges);            
            arrResult.push(<tr key={index}>
                <td>{item.BusTitle}</td>
                <td>{item.StartDestinationTitle}</td>
                <td>{item.EndDestinationTitle}</td>
                <td>{item.DepartureDate}</td>
                <td>{item.DepartureTime}</td>
                <td>{item.ArrivalDate}</td>
                <td>{item.ArrivalTime}</td>
                <td>{charges}</td>
            </tr>);
        });

        return arrResult;
    }

    getCharges(pStartDestinationID, pEndDestinationID, pBusID) {
        let result : any = 0;
        const {charges} = this.props;
        
        for (let key in charges) {
            let item;
            item = charges[key];
            
            if (item.StartDestinationID === pStartDestinationID && item.EndDestinationID === pEndDestinationID && item.busID === pBusID) {
                result = item.Charges;
                break;
            }
        }
        result = result > 0 ? result : "Not found";
        return result;
    }

    render() {
        let destOptions, resultRows = [];
        const {destinations, results} = this.state;
        const {charges} = this.props;
        destOptions = this.getOptionsFromState(destinations, "DestinationID", "DestinationTitle");
        resultRows = this.getResultRows.call(this, results);
        // console.log('results in render : ', results);

        return (
            <div>
                <h1>Search</h1>

                <div className="row form-group">
                    <form onSubmit={this.form_Submit.bind(this)} onChange={this.form_Change.bind(this)}>

                        <div className="col-md-6">
                            <label htmlFor="ddlStartDestination" className="col-md-3">From : </label>
                            <div className="col-md-8">
                                <select id="ddlStartDestination" className="form-control"
                                    value={this.state.ddlStartDestination} required>
                                    {destOptions}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="ddlEndDestination" className="col-md-3">To : </label>
                            <div className="col-md-8">
                                <select id="ddlEndDestination"
                                    className="form-control"
                                    value={this.state.ddlEndDestination} required>
                                    {destOptions}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="txtDepartureDate" className="col-md-3">Departure : </label>
                            <div className="col-md-8">
                                <input type="date"
                                    id="txtDepartureDate"
                                    className="form-control"
                                    value={this.state.txtDepartureDate} required />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="txtArrivalDate" className="col-md-3">Arrival : </label>
                            <div className="col-md-8">
                                <input type="date"
                                    id="txtArrivalDate"
                                    className="form-control"
                                    value={this.state.txtArrivalDate} required />
                            </div>
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">Search</button>
                        </div>


                    </form>

                    <SearchList 
                        data={results} 
                        charges={charges}
                        isDashboard={false}  />
                    {/*<table className="table">
                        <thead>
                            <tr>
                                <th>Bus</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Departure Date</th>
                                <th>Departure Time</th>
                                <th>Arrival Date</th>
                                <th>Arrival Time</th>
                                <th>Charges/Ticket</th>
                            </tr>
                        </thead>

                        <tbody>                            
                            {resultRows}
                        </tbody>
                    </table>*/}
                </div>

                {/*results list*/}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        uid: state.User.uid,
        destinations: state.Destination.destinations,
        schedules: state.Schedule.schedules,
        bookings: state.Booking.bookings,
        tickets: state.Ticket.tickets,
        charges: state.Charges.charges,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDestnation: () => dispatch(DestinationAction.getData()),
        getSchedules: () => dispatch(ScheduleAction.getData(null)),
        getBookings: () => dispatch(BookingAction.getData()),
        getTickets: () => dispatch(TicketAction.getData()),
        getCharges: () => dispatch(ChargesAction.getCharges())
    }
}

const authenticatedSearch = Authenticate(Search);
export default connect(mapStateToProps, mapDispatchToProps)(authenticatedSearch);