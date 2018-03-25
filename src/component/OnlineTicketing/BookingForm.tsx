
import * as React from 'react';
import Ticket from '../../models/Ticket';
import Booking from '../../models/Booking';
import ComponentHelper from '../../helper/ComponentHelper';


export default class BookingForm extends React.Component<any, any>{

    constructor() {
        super();
        this.state = {
            destinations: [],
            schedules: [],
            routeDetails: [],
            destinationOptions: [],
            charges: [],
            txtBookingRefNo: "Auto",
            ddlSchedule: "0",
            ddlStartDestination: "0",
            ddlEndDestination: "0",
            txtTotalAmount: "0",
            txtTicketRefNo: "Auto",
            txtCustomerName: "",
            txtCustomerAge: "0",
            txtSeatNo: "",
            txtAmount: "0",
            Tickets: [],
            //saveSuccess: false
        }
    }

    componentDidMount() {
        let state, destinationOptions = [], options = [];
        const { destinations,schedules,routeDetails,charges} = this.props;
        options.push(<option key={0} value={0}>Select</option>);        
        this.setState({
            destinations,
            schedules,
            routeDetails,
            charges,
            destinationOptions: options,            
            txtBookingRefNo: "Auto",
            ddlSchedule: "0",
            ddlStartDestination: "0",
            ddlEndDestination: "0",
            txtTotalAmount: this.props.totalAmount,
        });
    }

    componentWillReceiveProps(nextProps) {
        let destinations, destinationOptions = [];

        if (Object.keys(this.props.destinations).length !== Object.keys(nextProps.destinations).length) {
            destinations = nextProps.destinations;
            destinationOptions = this.getOptionsFromState(destinations, "DestinationID", "DestinationTitle");
            this.setState({
                destinations,
                destinationOptions
            });
        }

        if (Object.keys(this.props.schedules).length !== Object.keys(nextProps.schedules).length) {
            this.setState({ schedules: nextProps.schedules });
        }

        if (Object.keys(this.props.routeDetails).length !== Object.keys(nextProps.routeDetails).length) {
            this.setState({ routeDetails: nextProps.routeDetails });
        }

        if (Object.keys(this.props.charges).length !== Object.keys(nextProps.charges).length) {
            this.setState({ charges: nextProps.charges });
        }

        if (this.props.totalAmount !== nextProps.totalAmount) {
            this.setState({ txtTotalAmount: nextProps.totalAmount });
        }
        if (this.props.saveSuccess !== nextProps.saveSuccess) {
            if (nextProps.saveSuccess === true) {
                this.setState({
                    txtBookingRefNo: "Auto",
                    ddlSchedule: "0",
                    ddlStartDestination: "0",
                    ddlEndDestination: "0",
                    txtTicketRefNo: "Auto",
                    txtCustomerName: "",
                    txtCustomerAge: "0",
                    txtSeatNo: "",
                    txtAmount: "0",
                    Tickets: [],
                    
                });
                this.props.updateParentState('ddlSchedule',"0");
                this.props.updateParentState('ddlStartDestination',"0");
                this.props.updateParentState('ddlEndDestination',"0");
            }
            // this.setState({
            //      saveSuccess: nextProps.saveSuccess 
            // });
        }
    }

    GetNextTicketNumber() {
        let maxNumber: string = "";
        let length = 9;
        //get Max TicketRefNo from db
        if (maxNumber === "0" || maxNumber === "") {
            maxNumber = "1";
        }

        maxNumber = Array(length - (maxNumber.length - 1)).join("0") + maxNumber;
        return maxNumber;
    }

    GetDestinationsBySchedule(pScheduleID) {
        let ScheduleID, options = [], routeDetails = [], arr = [], RouteID = 0,
            arrDestinationID = [], arrDestinations = [], schedules, destinations;

        ScheduleID = pScheduleID;
        routeDetails = this.state.routeDetails;
        schedules = this.state.schedules;
        destinations = this.state.destinations;

        Object.keys(this.state.schedules).map((key) => {
            let item;
            item = schedules[key];
            if (item.ScheduleID === ScheduleID) { 
                arr.push(item);
            }
        });

        if (arr.length > 0) {
            RouteID = arr[0].RouteID;
        }
        if (ScheduleID.trim() !== "") {
            //take DestinationIDs of all the destinations from route Detail           
            Object.keys(routeDetails).map(function (key) {
                let item;
                item = routeDetails[key];
                if (item.RouteID === RouteID && arrDestinationID.indexOf(item['DestinationID']) === -1) {
                    arrDestinationID.push(item['DestinationID']);
                }
            });

            for (let key in destinations) {
                let item;
                item = destinations[key];
                if (arrDestinationID.indexOf(item['DestinationID']) > -1) {
                    arrDestinations.push(item);
                }
            }

            if (arrDestinations.length > 0) {
                options = this.getOptionsFromState(arrDestinations, "DestinationID", "DestinationTitle");
            }
            else {
                options.push(<option key={0} value={0}>Select</option>);
            }

        }
        else {
            options.push(<option key={0} value={0}>Select</option>);
        }

        return options;
    }

    GetTicketCharges() {
        let startDestinationID, endDestinationID, charges, ticketCharges : number, arr;

        startDestinationID = this.state.ddlStartDestination//parseInt(this.state.ddlStartDestination);
        endDestinationID = this.state.ddlEndDestination//parseInt(this.state.ddlEndDestination);
        charges = this.state.charges;        
        ticketCharges = 0;

        for (let key in charges) {
            let item;
            item = charges[key];
            if (item.StartDestinationID === startDestinationID && item.EndDestinationID === endDestinationID) {
                ticketCharges = (item.Charges as number);
                break;
            }
        }       

        return ticketCharges;
    }

    getOptionsFromState(stateOptions, valueName, titleName) {
        let options = [];
        if (Object.keys(stateOptions).length > 0) {
            options = Object.keys(stateOptions).map(function (key, index) {
                let item;
                item = stateOptions[key];
                return (<option value={item[valueName]} key={item[valueName]}>{item[titleName]}</option>)
            });
        }
        options.unshift(<option key={0} value="0">Select</option>)
        return options;
    }

    form_Submit(e) {
        e.preventDefault();
        //console.log(this.props);
        const {uid} = this.props;
        let booking, helper, date;
        let bookingID, bookingRefNO, userID, scheduleID, startDestinationID, endDestinationID, totalAmount,
            bookingDate, bookingTime, isActive;
        helper = new ComponentHelper();
        date = new Date();

        bookingID = ""; //for the time being
        bookingRefNO = this.state.txtBookingRefNo;
        userID = uid ;
        scheduleID = this.state.ddlSchedule;
        startDestinationID = this.state.ddlStartDestination;
        endDestinationID = this.state.ddlEndDestination;
        totalAmount = this.state.txtTotalAmount;
        bookingDate = helper.getFormattedDate(date, "yyyy/MM/dd", "/");
        bookingTime = date.getHours() + ":" + date.getMinutes();
        isActive = true;

        booking = new Booking(bookingID, bookingRefNO, userID, scheduleID, startDestinationID,
            endDestinationID, totalAmount, bookingDate, bookingTime, isActive);
        this.props.insertBooking(booking);
    }

    form_Change(e) {
        let state; let options; let charges;

        state = this.state;
        state[e.target.id] = e.target.value;
        if (e.target.id === "ddlSchedule") {
            options = this.GetDestinationsBySchedule(e.target.value);
            state['destinationOptions'] = options;
            this.props.checkSeatNo(undefined,e.target.value);
        }

        if (e.target.id === 'ddlStartDestination' || e.target.id === 'ddlEndDestination') {
            charges = this.GetTicketCharges();
            this.props.updateTicketCharges(charges);
        }

        if(e.target.id === "ddlSchedule" || e.target.id === 'ddlStartDestination' || e.target.id === 'ddlEndDestination'){
            this.props.updateParentState(e.target.id,e.target.value);            
        }        

        this.setState(state);
    }

    render() {
        let ScheduleOptions = []; let StartDestinationOptions = []; let EndDestinationOptions = [];
        ScheduleOptions = this.getOptionsFromState(this.state.schedules, "ScheduleID", "ScheduleTitle");       

        StartDestinationOptions = this.state.destinationOptions;
        EndDestinationOptions = this.state.destinationOptions;

        return (
            <div className="row form-group">
                <form onSubmit={this.form_Submit.bind(this)} onChange={this.form_Change.bind(this)}>

                    <div className="col-md-6">
                        <label htmlFor="txtBookingRefNo" className="col-md-3">ID:</label>
                        <div className="col-md-8">
                            <input type="text" id="txtBookingRefNo" className="form-control" value={this.state['txtBookingRefNo']}
                                disabled />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="ddlSchedule" className="col-md-3">Schedule :</label>
                        <div className="col-md-8">
                            <select name="" id="ddlSchedule" className="form-control" value={this.state['ddlSchedule']}>
                                {ScheduleOptions}
                            </select>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="ddlStartDestination" className="col-md-3">Start Dest. :</label>
                        <div className="col-md-8">
                            <select name="" id="ddlStartDestination" className="form-control" value={this.state['ddlStartDestination']}
                                disabled={this.props.isDestinationDisabled} >
                                {StartDestinationOptions}
                            </select>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="ddlEndDestination" className="col-md-3">End Dest. :</label>
                        <div className="col-md-8">
                            <select name="" id="ddlEndDestination" className="form-control" value={this.state['ddlEndDestination']}
                                disabled={this.props.isDestinationDisabled}>
                                {StartDestinationOptions}
                            </select>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="txtTotalAmount" className="col-md-3">Total Amount :</label>
                        <div className="col-md-8">
                            <input type="text" name="" id="txtTotalAmount" className="form-control" value={this.state['txtTotalAmount']}
                                disabled />
                        </div>
                    </div>

                    {/*<div className="col-md-6">
                        <label htmlFor="chkIsActive" className="col-md-3">Is Active :</label>
                        <div className="col-md-8">
                            <input type="checkbox" name="" id="chkIsActive" className="form-control" checked={this.state['txtTotalAmount']} />
                        </div>
                    </div>*/}

                    <div className="col-md-12">
                        <div className="text-center">
                            {/*<input type="button" value="Show" className="btn btn-primary" onClick={this.btnShow_Click.bind(this)} />*/}
                            <input type="submit" value="Save" className="btn btn-primary" />
                        </div>
                    </div>
                </form>


            </div>
        )
    }
}