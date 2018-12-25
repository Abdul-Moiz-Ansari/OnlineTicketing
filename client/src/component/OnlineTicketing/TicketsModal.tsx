import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { isNullOrUndefined } from 'util';

//
interface ITicketsModal {
    show: boolean;
    tickets: Array<Object>;
    onHide: Function;
    setTicketByBooking: Function;
}

//const TicketsModal: React.SFC<ITicketsModal> = (props) => {
class TicketsModal extends React.Component<ITicketsModal, any>{

    constructor() {
        super();

        this.handleButtonClose = this.handleButtonClose.bind(this);
    }

    static defaultProps = {
        show: false,
        tickets: [],
        onHide: () => { }
    }

    componentDidUpdate(prevProps) {
        //modal is being closed
        if (!isNullOrUndefined(this.props.show) && this.props.show === false &&
            !isNullOrUndefined(prevProps.show) && prevProps.show === true) {
            this.props.setTicketByBooking([]);
        }
    }

    handleButtonClose(e) {
        e.preventDefault();

        const {
            onHide
        } = this.props;

        onHide();
    }

    render() {
        const {
            show,
            tickets,
            onHide
        } = this.props;

        return (

            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <h3>Tickets</h3>
                </Modal.Header>

                <Modal.Body>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Customer Age</th>
                                <th>Charges</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tickets.map((item: any) => <TicketModalRow key={item.TicketID} ticket={item} />)}
                        </tbody>
                    </table>
                </Modal.Body>

                <Modal.Footer>
                    <button onClick={this.handleButtonClose} className="btn btn-primary">Close</button>
                </Modal.Footer>
            </Modal>
        )
    }
}


interface ITicketModalRow {
    ticket: any
}

const TicketModalRow: React.SFC<ITicketModalRow> = (props) => {

    const { ticket } = props;

    return (
        <tr >
            <td >{ticket.CustomerName}</td>
            <td >{ticket.CustomerAge}</td>
            <td >{ticket.Amount}</td>
        </tr>
    );
}

TicketModalRow.defaultProps = {
    ticket: {}
}

export default TicketsModal;