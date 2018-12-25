import * as React from 'react';
import { isNullOrUndefined } from 'util';
import TicketsModal from './TicketsModal';

export default class BookingListC extends React.Component<any, any>{

    constructor(props: any) {
        super(props);

        const { isAdmin, isExternal, isEmployee } = props;
        this.state = {
            isAdmin,
            isExternal,
            isEmployee,
            showModal: false
        };
        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleHideModal = this.handleHideModal.bind(this);
    }

    static defaultProps = {
        deleteBooking: () => { },
        ticketsByBookingID: []
    }

    getListItem(key) {
        let item, arrItems = [];
        const { uid, isExternal, isAdmin, isDashboard } = this.props;
        item = this.props.tickets[key];

        if (isExternal) {
            if (uid !== item.UserID) {
                return undefined;
            }
        }

        if (isDashboard) {
            arrItems = [
                <td key={0}>{item.CustomerName}</td>,
                <td key={1}>{item.BusTitle}</td>,
                <td key={2}>{item.StartDestinationTitle}</td>,
                <td key={3}>{item.EndDestinationTitle}</td>,
                <td key={4}>{item.Amount}</td>
            ];
        }
        else {
            arrItems = [
                // <td key={0}>{item.TicketRefNo}</td>,
                <td key={1}>{item.CustomerName}</td>,
                <td key={2}>{item.BusTitle}</td>,
                <td key={3}>{item.StartDestinationTitle}</td>,
                <td key={4}>{item.EndDestinationTitle}</td>,
                <td key={5}>{item.DepartureDate}</td>,
                <td key={6}>{item.ArrivalDate}</td>,
                <td key={7}>{item.Amount}</td>,
            ];

            //console.log('isAdmin : ',isAdmin);
            if (isAdmin === true) {
                arrItems = arrItems.concat([
                    <td key={8}><a >Edit</a></td>,
                    <td key={9}><a style={{ 'cursor': 'pointer' }} onClick={() => { this.deleteBooking.call(this, item.TicketID) }}>Delete</a></td>,
                ]);
            }
        }

        return (
            <tr key={key}>
                {arrItems}
            </tr>
        );
    }

    deleteBooking(pTicketID) {
        const { deleteBooking } = this.props;
        deleteBooking(pTicketID);
    }

    // handleModalVisibility(isVisible) {
    //     this.setState((prevState) => {
    //         return { isModalVisible: !prevState.isModalVisible };
    //     });
    // }

    handleShowModal(BookingID) {
        const { getTicketByBooking } = this.props;
        getTicketByBooking(BookingID);
        this.setState({ showModal: true });
    }

    handleHideModal() {
        this.setState({ showModal: false });
    }

    render() {
        const {
            uid,
            tickets,
            bookings,
            isDashboard,
            isAdmin,
            isExternal,
            isEmployee,
            getBookingByKey,
            deleteBooking,
            ticketsByBookingID,
            setTicketByBooking
        } = this.props;

        const { showModal } = this.state;

        if (isNullOrUndefined(bookings)) {
            return (
                <div>
                    <table className="table">
                        <thead>
                            <HeaderRow
                                isDashboard={isDashboard}
                                isAdmin={isAdmin} />
                        </thead>
                        <tbody>
                            <Row
                                key={"0"}
                                BookingID={"0"}
                                uid={uid}
                                isAdmin={isAdmin}
                                isExternal={isExternal}
                                isDashboard={isDashboard}
                                bookings={{}}
                                getBookingByKey={getBookingByKey}
                                deleteBooking={deleteBooking}
                                showTickets={this.handleShowModal} />
                        </tbody>
                    </table>

                </div>
            )
        }

        return (
            <div>
                <TicketsModal
                    show={showModal}
                    onHide={this.handleHideModal}
                    tickets={ticketsByBookingID}
                    setTicketByBooking={setTicketByBooking}
                />
                <table className="table">
                    <thead>
                        <HeaderRow
                            isDashboard={isDashboard}
                            isAdmin={isAdmin} />
                    </thead>
                    <tbody>
                        {Object.keys(bookings).map(key =>
                            <Row
                                key={key}
                                BookingID={key}
                                uid={uid}
                                isAdmin={isAdmin}
                                isExternal={isExternal}
                                isDashboard={isDashboard}
                                bookings={bookings}
                                getBookingByKey={getBookingByKey}
                                deleteBooking={deleteBooking}
                                showTickets={this.handleShowModal} />
                        )}
                    </tbody>
                </table>

            </div>
        )
    }
}

interface ITicketRowProps {
    uid: string;
    isAdmin: boolean;
    isDashboard: boolean;
    isExternal: boolean;
    tickets: Object;
    TicketID: string;
}

//booking list header row
interface IHeaderProps {
    isAdmin: boolean;
    isDashboard: boolean;
}

const HeaderRow: React.SFC<IHeaderProps> = (props) => {
    const { isDashboard, isAdmin } = props;
    let arrTH = [];

    if (isDashboard) {
        arrTH = [
            <th key={0}>Schedule</th>,
            <th key={1}>Bus</th>,
            <th key={2}>Start Dest</th>,
            <th key={3}>End Dest</th>,
            <th key={4}>Amount</th>,
            <th key={5}></th>
        ];
    }
    else {
        arrTH = [
            <th key={1}>Schedule</th>,
            <th key={2}>Bus</th>,
            <th key={3}>Start Dest</th>,
            <th key={4}>End Dest</th>,
            <th key={5}>Departure Date</th>,
            <th key={6}>Arrival Date</th>,
            <th key={7}>Amount</th>,
            <th key={8}></th>,
        ];

        if (isAdmin === true) {
            arrTH = arrTH.concat([
                <th key={9}></th>,
                <th key={10}></th>
            ]);
        }
    }

    return (
        <tr>
            {arrTH}
        </tr>
    );
}

//booking list row
interface IBookingRowProps {
    uid: string;
    isAdmin: boolean;
    isDashboard: boolean;
    isExternal: boolean;
    bookings: Object;
    BookingID: string;
    getBookingByKey: Function;
    deleteBooking: Function;
    showTickets: Function;
}

const Row: React.SFC<IBookingRowProps> = (props) => {

    let item, arrItems = [];
    const {
        uid,
        isExternal,
        isAdmin,
        isDashboard,
        bookings,
        BookingID,
        getBookingByKey,
        deleteBooking,
        showTickets
    } = props;

    if (BookingID === '' || Object.keys(bookings).length === 0) { return null; }
    item = bookings[BookingID];

    if (typeof item === 'undefined') { return null; }

    if (isExternal) {
        if (uid !== item.UserID) {
            return null;
        }
    }

    function showTicketsModal() {
        showTickets(item.BookingID);
    }

    function edit() {
        getBookingByKey(item.BookingID);
    }

    function deleteRow() {
        if (confirm("Are you sure you want to delete this Booking ?"))
            deleteBooking(item.BookingID);
    }

    if (isDashboard) {
        arrItems = [
            <td key={0}>{item.ScheduleTitle}</td>,
            <td key={1}>{item.BusTitle}</td>,
            <td key={2}>{item.StartDestinationTitle}</td>,
            <td key={3}>{item.EndDestinationTitle}</td>,
            <td key={4}>{item.TotalAmount}</td>,
            <td key={8}><a href="#" onClick={showTicketsModal} >Tickets</a></td>,
        ];
    }
    else {
        arrItems = [
            <td key={1}>{item.ScheduleTitle}</td>,
            <td key={2}>{item.BusTitle}</td>,
            <td key={3}>{item.StartDestinationTitle}</td>,
            <td key={4}>{item.EndDestinationTitle}</td>,
            <td key={5}>{item.DepartureDate}</td>,
            <td key={6}>{item.ArrivalDate}</td>,
            <td key={7}>{item.TotalAmount}</td>,
            <td key={8}><a href="#" onClick={showTicketsModal} >Tickets</a></td>,
        ];

        if (isAdmin === true) {
            arrItems = arrItems.concat([
                <td key={9}><a href="#" onClick={edit} >Edit</a></td>,
                <td key={10}><a href="#" onClick={deleteRow}>Delete</a></td>,
            ]);
        }
    }

    return (
        <tr key={BookingID}>
            {arrItems}
        </tr>
    );
}

Row.defaultProps = {
    uid: "",
    BookingID: "",
    bookings: {},
    isAdmin: false,
    isExternal: false,
    isDashboard: false,
    getBookingByKey: () => { },
    deleteBooking: () => { },
    showTickets: () => { }
}

// const TicketModal: React.SFC<any> = (props) => {
//     //tabindex="-1"//
//     return (
//         <div className="modal fade" id="myModalNorm" role="dialog"
//             aria-labelledby="myModalLabel" aria-hidden="true">
//             <div className="modal-dialog">
//                 <div className="modal-content">

//                     <div className="modal-header">
//                         <button type="button" className="close" data-dismiss="modal">
//                             <span aria-hidden="true">&times;</span>
//                             <span className="sr-only">Close</span>
//                         </button>
//                         <h4 className="modal-title" id="myModalLabel">
//                             Modal title
//                    </h4>
//                     </div>


//                     <div className="modal-body">

//                         <form role="form">
//                             <div className="form-group">
//                                 <label htmlFor="exampleInputEmail1">Email address</label>
//                                 <input type="email" className="form-control"
//                                     id="exampleInputEmail1" placeholder="Enter email" />
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="exampleInputPassword1">Password</label>
//                                 <input type="password" className="form-control"
//                                     id="exampleInputPassword1" placeholder="Password" />
//                             </div>
//                             <div className="checkbox">
//                                 <label>
//                                     <input type="checkbox" /> Check me out
//                        </label>
//                             </div>
//                             <button type="submit" className="btn btn-default">Submit</button>
//                         </form>


//                     </div>


//                     <div className="modal-footer">
//                         <button type="button" className="btn btn-default" data-dismiss="modal">
//                             Close
//                         </button>
//                         <button type="button" className="btn btn-primary">
//                             Save changes
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     )
// }

const TicketHeaderRow: React.SFC<IHeaderProps> = (props) => {
    const { isDashboard, isAdmin } = props;
    let arrTH = [];

    if (isDashboard) {
        arrTH = [
            <th key={0}>Cust Name</th>,
            <th key={1}>Bus</th>,
            <th key={2}>Start Dest</th>,
            <th key={3}>End Dest</th>,
            <th key={4}>Amount</th>
        ];
    }
    else {
        arrTH = [
            <th key={1}>Cust Name</th>,
            <th key={2}>Bus</th>,
            <th key={3}>Start Dest</th>,
            <th key={4}>End Dest</th>,
            <th key={5}>Departure Date</th>,
            <th key={6}>Arrival Date</th>,
            <th key={7}>Amount</th>,
        ];

        if (isAdmin === true) {
            arrTH = arrTH.concat([
                <th key={8}></th>,
                <th key={9}></th>
            ]);
        }
    }

    return (
        <tr>
            {arrTH}
        </tr>
    );
}

const TicketRow: React.SFC<ITicketRowProps> = (props) => {

    let item, arrItems = [];
    const { uid, isExternal, isAdmin, isDashboard, tickets, TicketID } = props;

    if (typeof TicketID === 'undefined') { return null; }

    item = tickets[TicketID];

    if (isExternal) {
        if (uid !== item.UserID) {
            return null;
        }
    }

    if (isDashboard) {
        arrItems = [
            <td key={0}>{item.CustomerName}</td>,
            <td key={1}>{item.BusTitle}</td>,
            <td key={2}>{item.StartDestinationTitle}</td>,
            <td key={3}>{item.EndDestinationTitle}</td>,
            <td key={4}>{item.Amount}</td>
        ];
    }
    else {
        arrItems = [
            <td key={1}>{item.CustomerName}</td>,
            <td key={2}>{item.BusTitle}</td>,
            <td key={3}>{item.StartDestinationTitle}</td>,
            <td key={4}>{item.EndDestinationTitle}</td>,
            <td key={5}>{item.DepartureDate}</td>,
            <td key={6}>{item.ArrivalDate}</td>,
            <td key={7}>{item.Amount}</td>,
        ];

        if (isAdmin === true) {
            arrItems = arrItems.concat([
                <td key={8}><a href="#">Edit</a></td>,
                <td key={9}><a href="#">Delete</a></td>,
            ]);
        }
    }

    return (
        <tr key={TicketID}>
            {arrItems}
        </tr>
    );
}