import * as React from 'react';
import TicketRow from './TicketRow';

export default class TicketList extends React.Component<any,any>{   

    constructor(){
        super();
        this.state = {
            tickets : []
        }
    }

    componentDidMount(){
        this.setState({
            tickets : this.props.tickets
        });
    }

    componentWillReceiveProps(nextProps){
        if(this.props.tickets.length !== nextProps.tickets.length){
            this.setState({
                tickets : nextProps.tickets
            });
        }
    }

    getRow(item,index){
        return (<TicketRow item={item} index={index} key={index} displayTicket={this.props.displayTicket}
                    deleteTicket = {this.props.deleteTicket} />);
    }

    render(){
        return(
            <table className="table">
                <thead>
                    <tr>
                        {/*<th>Ticket No</th>*/}
                        <th>Customer Name</th>
                        <th>Customer Age</th>
                        <th>Seat No</th>
                        <th>Amount</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.tickets.map(this.getRow.bind(this))}
                </tbody>
            </table>
        )
    }
}

