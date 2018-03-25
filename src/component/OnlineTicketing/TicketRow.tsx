
import * as React from 'react';

export default class TicketRow extends React.Component<any,any>{
    displayTicket(){  
        this.props.displayTicket(this.props.index);
    }

    deleteTicket(){
        this.props.deleteTicket(this.props.item.TicketID);
    }
    render(){
        let item = this.props.item;
        return(
            <tr>
                    {/*<td>{item.TicketRefNo}</td>*/}
                    <td>{item.CustomerName}</td>
                    <td>{item.CustomerAge}</td>
                    <td>{item.SeatNo}</td>
                    <td>{item.Amount}</td>
                    <td><a onClick={this.displayTicket.bind(this)}>Edit</a></td>
                    <td><a onClick={this.deleteTicket.bind(this)}>Delete</a></td>
                </tr>
        )
    }
}