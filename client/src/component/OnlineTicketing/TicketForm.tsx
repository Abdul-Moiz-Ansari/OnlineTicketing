
import * as React from 'react';
import Ticket from '../../models/Ticket';
import {guid} from '../../helper/GUID';
import {eFormMode} from '../../helper/eFormMode';


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
            currentTicket : new Ticket("",guid(),0,"",0,0,0,false,"","","")
        }
    }

    componentWillReceiveProps(nextProps){
        //let state = {};
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
        const{
            ddlSchedule : ScheduleID,
            ddlStartDestination : StartDestinationID,
            ddlEndDestination : EndDestinationID,
            currentBooking,
            ticketCharges
        } =this.props;
        e.preventDefault();

        BookingID = currentBooking.BookingID;
        TicketID = this.state.currentTicket.TicketID;
        // if(TicketID === 0 )
        //     TicketID = this.getNegativeTicketID(this.props.tickets);

        TicketRefNo = this.state.currentTicket.TicketRefNo;  
        CustomerName = this.state.txtCustomerName;
        CustomerAge = this.state.txtCustomerAge;
        SeatNo = this.state.txtSeatNo;
        //Amount = this.state.txtAmount;
        Amount = ticketCharges;
        IsActive= true;
        ticket= new Ticket(TicketID,TicketRefNo,BookingID,CustomerName,CustomerAge,SeatNo,Amount,IsActive,ScheduleID,
            StartDestinationID,EndDestinationID);
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
        let seatNo,
        isMatched = false,
        isAvailable = true,
        ticketID = "";
        
        const {isSeatNoAvailable,
            ddlSchedule : scheduleID,
            Tickets : unSavedTickets,
            updateParentStateObject,
            formMode,
            currentTicket,
            setIsSeatNoAvailable
        }  = this.props;
        seatNo = this.state.txtSeatNo;

        for(let index in unSavedTickets){
            let ticket: Ticket = unSavedTickets[index];            
            isMatched =  parseInt(ticket.SeatNo.toString()) === parseInt(seatNo);
            if(isMatched){break;}
        }
        
        if(isMatched){
            //update internally
            updateParentStateObject({
                seatNo : seatNo,
                isSeatNoValid : false,
                errorMessage : 'This seat is already belongs to another ticket.'
            })
            setIsSeatNoAvailable(false);
            
        }
        else{
            //update seatno and check seatno from via network call
            if(formMode === eFormMode.Edit){
                ticketID = currentTicket.TicketID;
            }
            this.props.updateParentState('seatNo',seatNo);
            isSeatNoAvailable({ticketID,seatNo,scheduleID});
        }        
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
        const {ticketCharges} = this.props;
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
                                value={ticketCharges} disabled />
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