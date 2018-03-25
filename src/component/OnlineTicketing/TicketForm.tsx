
import * as React from 'react';
import Ticket from '../../models/Ticket';


export default class TicketForm extends React.Component<any,any>{

    constructor(){
        super();

        this.state = {      
            txtTicketRefNo:  "",     
            txtCustomerName : "",
            txtCustomerAge :  "0",
            txtSeatNo : "",
            txtAmount : "0",
            Tickets : [],
            currentTicket : new Ticket("","",0,"",0,0,0,false),
            isSeatNoValid : false
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.ticketCharges !== nextProps.ticketCharges){
            this.setState({txtAmount : nextProps.ticketCharges});
        }

        if(this.props.currentTicket !== nextProps.currentTicket){
            this.setState({
                currentTicket : nextProps.currentTicket,
                txtCustomerName : nextProps.currentTicket.CustomerName,
                txtCustomerAge :  nextProps.currentTicket.CustomerAge,
                txtSeatNo : nextProps.currentTicket.SeatNo,
                txtAmount : nextProps.currentTicket.Amount
            });
        }
    }

    componentDidMount(){
        this.setState({
            txtTicketRefNo : "Auto",
            txtAmount : this.props.ticketCharges,
            txtCustomerName : "",
            txtCustomerAge :  "",
            txtSeatNo : ""
        });
    }

    form_Submit(e){
        let ticket;
        let BookingID,TicketID,TicketRefNo,CustomerName,CustomerAge,SeatNo,Amount,IsActive;

        e.preventDefault();

        BookingID = this.state.currentTicket.TicketID;  //for now it is 0
        TicketID = this.state.currentTicket.TicketID;
        if(TicketID === 0 )
            TicketID = this.getNegativeTicketID(this.props.tickets);

        TicketRefNo = this.state.currentTicket.TicketRefNo;   //it will be get from db in api
        CustomerName = this.state.txtCustomerName;
        CustomerAge = this.state.txtCustomerAge;
        SeatNo = this.state.txtSeatNo;
        Amount = this.state.txtAmount;
        IsActive= true;
        ticket= new Ticket(TicketID,TicketRefNo,BookingID,CustomerName,CustomerAge,SeatNo,Amount,IsActive);
        //console.log(ticket);
        this.props.addTicket(ticket);
    }

    onFormChange(e){
        let state;
        state = this.state;
        state[e.target.id] = e.target.value
        this.setState(state);
    }

    onSeatBlur(e){
        let seatNo,isAvailable;

        seatNo = this.state.txtSeatNo;
        this.props.updateParentState('seatNo',seatNo);
        this.props.checkSeatNo(seatNo);
        //console.log('isAvailable : ',isAvailable);
        //if(!isAvailable){
            //this.props.updateParentState("errorMessage","Invalid seat no");
            //window.alert('invalid seat no');
        //}
        
        //this.setState({isSeatNoValid : isAvailable});
    }

    getNegativeTicketID(arrTickets){
        let minID = 0;

        arrTickets.map(function(item){
            if(item.TicketID < minID)
                minID = item.TicketID;
        });

        minID = minID < 0 ? minID -1 : -1; 
        return minID;
    }

    render(){
        return(
            <div className="row form-group">

                <h3>Ticket Information</h3>

                <form onSubmit={this.form_Submit.bind(this)} onChange={this.onFormChange.bind(this)}>
                    <div className="col-md-6">
                        <label htmlFor="txtTicketRefNo" className="col-md-3">Ticket No :</label>
                        <div className="col-md-8">
                            <input type="text"  id="txtTicketRefNo" className="form-control" 
                                                        value={this.state['txtTicketRefNo']} disabled />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="txtCustomerName" className="col-md-3">Cust. Name :</label>
                        <div className="col-md-8">
                            <input type="text" id="txtCustomerName" className="form-control" value={this.state['txtCustomerName']} 
                                required />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="txtCustomerAge" className="col-md-3">Cust. Age :</label>
                        <div className="col-md-8">
                            <input type="number" id="txtCustomerAge" className="form-control" value={this.state['txtCustomerAge']}
                                required />
                        </div>
                    </div>

                     <div className="col-md-6">
                        <label htmlFor="txtSeatNo" className="col-md-3">Seat No :</label>
                        <div className="col-md-8">
                            <input type="number" id="txtSeatNo" className="form-control" value={this.state['txtSeatNo']}
                                onBlur={this.onSeatBlur.bind(this)} required />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="txtAmount" className="col-md-3">Amount :</label>
                        <div className="col-md-8">
                            <input type="text" id="txtAmount" className="form-control"  
                                value={this.state['txtAmount']} disabled />
                        </div>
                    </div>

                    <div className="col-md-12">                        
                        <div className="text-center">
                            <input type="submit" id="btnAdd" value="Add" className="btn btn-primary" />
                        </div>
                    </div>
            </form>

            </div>
            
        )
    }

}