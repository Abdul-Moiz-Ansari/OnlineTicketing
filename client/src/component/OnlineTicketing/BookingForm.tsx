
import * as React from 'react';
import * as _ from 'lodash';
import Ticket from '../../models/Ticket';
import Booking from '../../models/Booking';
import ComponentHelper from '../../helper/ComponentHelper';
import { isNull } from '../../helper/GeneralFunctions';


export default class BookingForm extends React.Component<any, any>{

    constructor(props) {
        super(props);
        this.state = {
            destinations: [],
            schedules: [],
            routeDetails: [],
            startDestinationOptions: [],
            endDestinationOptions: [],
            charges: [],
            BookingID: "",
            txtBookingRefNo: "Auto",
            ddlSchedule: "0",
            ddlStartDestination: "0",
            ddlEndDestination: "0",
            txtTotalAmount: "0",
            txtTicketRefNo: "Auto",
            txtCustomerName: "",
            txtCustomerAge: "0",
            txtSeatNo: "",
            txtAmount: props.totalAmount,
            Tickets: [],
            //saveSuccess: false
        }
    }

    componentDidMount() {
        let state: any = {}, options = [], ticketCharges;
        const {
            destinations,
            schedules,
            routeDetails,
            charges,
            currentBooking
        } = this.props;

        options.push(<option key={0} value={0}>Select</option>);
        state = {
            destinations,
            schedules,
            routeDetails,
            charges,
            startDestinationOptions: options,
            endDestinationOptions: options,
        }
        state = this.getFormState(currentBooking, state);
        //ticketCharges = this.GetTicketCharges(currentBooking.ScheduleID);                

        this.setState(() => state);

        if (currentBooking.BookingID !== "") {
            this.props.updateParentStateObject({
                totalAmount: currentBooking.TotalAmount,
                ddlSchedule: currentBooking.ScheduleID,
                ddlStartDestination: currentBooking.StartDestinationID,
                ddlEndDestination: currentBooking.EndDestinationID,
                isDestinationDisabled: true
            });
        }
    }

    getFormState(pCurrentBooking, pStateObj) {
        let destinationOptions: any = {};
        if (!isNull(pCurrentBooking) && pCurrentBooking.BookingID !== "") {
            const { BookingID, ScheduleID, StartDestinationID, StartDestinationTitle, EndDestinationID, EndDestinationTitle,
                TotalAmount } = pCurrentBooking;
            pStateObj.BookingID = BookingID;
            pStateObj.txtBookingRefNo = "";
            pStateObj.ddlSchedule = ScheduleID;
            pStateObj.ddlStartDestination = StartDestinationID;
            pStateObj.ddlEndDestination = EndDestinationID;
            pStateObj.txtTotalAmount = TotalAmount;

            //destinationOptions = this.GetDestinationsBySchedule(ScheduleID);

            pStateObj['startDestinationOptions'] = this.getDestinationOptions(StartDestinationID, StartDestinationTitle);
            pStateObj['endDestinationOptions'] = this.getDestinationOptions(EndDestinationID, EndDestinationTitle);
        }
        return pStateObj;
    }

    componentWillReceiveProps(nextProps) {
        let destinations;

        if (Object.keys(this.props.destinations).length !== Object.keys(nextProps.destinations).length) {
            destinations = nextProps.destinations;
            // if (this.state.currentBooking.BookingID !== ""){

            // }
            this.setState({
                destinations
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
                this.props.updateParentState('ddlSchedule', "0");
                this.props.updateParentState('ddlStartDestination', "0");
                this.props.updateParentState('ddlEndDestination', "0");
            }
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
        let ScheduleID, RouteID: string = "", schedules, destinations, objResult: any = {},
            StartDestinationID, StartDestinationTitle, EndDestinationID, EndDestinationTitle,
            startDestinationOptions = [], endDestinationOptions = [];

        ScheduleID = pScheduleID;
        const { routes } = this.props;
        schedules = this.state.schedules;
        destinations = this.state.destinations;

        startDestinationOptions.push(<option key={0} value={0}>Select</option>);
        endDestinationOptions.push(<option key={0} value={0}>Select</option>);
        
        if (ScheduleID.trim() !== "") {

            RouteID = _.get(schedules, pScheduleID + '.RouteID', "");
            //console.log('RouteID : ',RouteID);
            if (RouteID !== "") {
                StartDestinationID = _.get(routes, RouteID + '.StartDestinationID', "");
                EndDestinationID = _.get(routes, RouteID + '.EndDestinationID', "");
                //console.log('destinations : ',destinations);
                if (StartDestinationID !== "") {
                    StartDestinationTitle = _.get(destinations, StartDestinationID + '.DestinationTitle', "");
                    startDestinationOptions.push(<option key={1} value={StartDestinationID}>{StartDestinationTitle}</option>);
                }

                if (EndDestinationID !== "") {
                    EndDestinationTitle = _.get(destinations, EndDestinationID + '.DestinationTitle', "");
                    endDestinationOptions.push(<option key={1} value={EndDestinationID}>{EndDestinationTitle}</option>);
                }
                
                objResult.StartDestinationID = StartDestinationID;
                objResult.EndDestinationID = EndDestinationID;
            }
        }

        objResult.startDestinationOptions = startDestinationOptions;
        objResult.endDestinationOptions = endDestinationOptions;
        return objResult;
    }

    GetTicketCharges(ScheduleID) {
        let ticketCharges: number = 0, schedule, busID;

        const { schedules } = this.props;
        const { startDestinationID, endDestinationID, charges } = this.state;

        busID = _.get(schedules, ScheduleID + '.busID', "");
        if (busID === "") { return 0; }

        for (let key in charges) {
            let item;
            item = charges[key];
            if (item.StartDestinationID === startDestinationID && item.EndDestinationID === endDestinationID
                && item.busID === busID) {
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

    getDestinationOptions(destinationID, destinationTitle) {
        let options = [];
        options.push(<option key={0} value={0}>Select</option>);
        options.push(<option key={1} value={destinationID}>{destinationTitle}</option>);
        return options;
    }

    form_Submit(e) {
        e.preventDefault();

        const {
            uid,
            buses,
            currentBooking
        } = this.props;
        const { schedules, destinations } = this.state;
        let booking, helper, date;
        let bookingID, bookingRefNO, userID, scheduleID, startDestinationID, endDestinationID, totalAmount,
            bookingDate, bookingTime, isActive, ScheduleTitle, DepartureDate, ArrivalDate, StartDestinationTitle, EndDestinationTitle,
            BusID, BusTitle;

        helper = new ComponentHelper();
        date = new Date();

        //console.log('getting credentials ');
        bookingID = currentBooking.BookingID; //for the time being
        bookingRefNO = this.state.txtBookingRefNo;
        userID = uid;
        scheduleID = this.state.ddlSchedule;
        startDestinationID = this.state.ddlStartDestination;
        endDestinationID = this.state.ddlEndDestination;
        totalAmount = this.state.txtTotalAmount;
        bookingDate = helper.getFormattedDate(date, "yyyy/MM/dd", "/");
        bookingTime = date.getHours() + ":" + date.getMinutes();
        isActive = true;
        //console.log('calling lod funcs : ');
        ScheduleTitle = _.get(schedules, scheduleID + '.ScheduleTitle', '');
        DepartureDate = _.get(schedules, scheduleID + '.DepartureDate', '');
        ArrivalDate = _.get(schedules, scheduleID + '.ArrivalDate', '');
        StartDestinationTitle = _.get(destinations, startDestinationID + '.DestinationTitle', '');
        EndDestinationTitle = _.get(destinations, endDestinationID + '.DestinationTitle', '');
        BusID = _.get(schedules, scheduleID + '.busID', '');
        BusTitle = _.get(buses, BusID + '.title', '');

        booking = new Booking(bookingID, bookingRefNO, userID, scheduleID, startDestinationID,
            endDestinationID, totalAmount, bookingDate, bookingTime, isActive, ScheduleTitle, DepartureDate, ArrivalDate,
            StartDestinationTitle, EndDestinationTitle, BusID, BusTitle);

        //console.log('calling insertBooking : ',booking);
        this.props._insertBooking(booking);
    }

    form_Change(e) {
        let state; let options;
        let charges,
            obj,
            isDestinationChanged = false,
            ScheduleID,
            busID;

        const { schedules } = this.props;
        state = this.state;
        state[e.target.id] = e.target.value;
        if (e.target.id === "ddlSchedule") {
            ScheduleID = e.target.value;
            obj = this.GetDestinationsBySchedule(e.target.value);

            state['startDestinationOptions'] = obj.startDestinationOptions;
            state['endDestinationOptions'] = obj.endDestinationOptions;
            state['ddlStartDestination'] = obj.StartDestinationID;
            state['ddlEndDestination'] = obj.EndDestinationID;
            isDestinationChanged = true;
            //charges = this.GetTicketCharges(ScheduleID);

            this.props.updateParentStateObject({
                //ticketCharges: charges,
                ddlSchedule: ScheduleID,
                ddlStartDestination: obj.StartDestinationID,
                ddlEndDestination: obj.EndDestinationID
            });
            //this.props.checkSeatNo(undefined, e.target.value);

            busID = _.get(schedules, ScheduleID + '.busID', "");
            this.props.getChargesForBooking({
                startDestinationID: obj.StartDestinationID,
                endDestinationID: obj.EndDestinationID,
                busID
            });
        }

        //if (e.target.id === 'ddlStartDestination' || e.target.id === 'ddlEndDestination') {
        //ScheduleID = this.state.ddlSchedule;
        //charges = this.GetTicketCharges(ScheduleID);
        //this.props.updateTicketCharges(charges);
        //}

        if (e.target.id === "ddlSchedule" || e.target.id === 'ddlStartDestination' || e.target.id === 'ddlEndDestination') {
            this.props.updateParentState(e.target.id, e.target.value);
        }

        this.setState(state);
        if (isDestinationChanged) { this.props.updateParentState('isDestinationDisabled', true); }
    }

    render() {
        let ScheduleOptions = [];
        ScheduleOptions = this.getOptionsFromState(this.state.schedules, "ScheduleID", "ScheduleTitle");
        const { startDestinationOptions, endDestinationOptions } = this.state;

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
                                {startDestinationOptions}
                            </select>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="ddlEndDestination" className="col-md-3">End Dest. :</label>
                        <div className="col-md-8">
                            <select name="" id="ddlEndDestination" className="form-control" value={this.state['ddlEndDestination']}
                                disabled={this.props.isDestinationDisabled}>
                                {endDestinationOptions}
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