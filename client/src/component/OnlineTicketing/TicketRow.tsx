
import * as React from 'react';

export default class TicketRow extends React.Component<any,any>{
    displayTicket(){  
        this.props.displayTicket(this.props.index);
    }

    deleteTicket(){
        //console.log('deleteTicket TicketRow');
        let ticket = this.props.item;
        //if(ticket.isNewTicket === false){
        if (confirm('Are you sure you want to Delete this ticket')){
            this.props.deleteTicket(this.props.item.TicketID);
        }
        //}
        
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
                    <td><a onClick={this.displayTicket.bind(this)} style={{'cursor':'pointer'}}>Edit</a></td>
                    <td><a onClick={this.deleteTicket.bind(this)} style={{'cursor':'pointer'}}>Delete</a></td>
                </tr>
        )
    }
}