import * as React from 'react';
import { connect } from 'react-redux';
import { Bar, Doughnut } from 'react-chartjs-2';
import * as ColorScheme from 'color-scheme';
import { getFormattedDate } from '../../helper/DateHelper';

import SearchList from '../../component/OnlineTicketing/SearchList';
import BookingListC from '../../component/OnlineTicketing/BookingList';
import Authenticate from '../../HOC/Authenticate';

import SearchHelper from '../../helper/SearchHelper';
//import { columnChart } from '../../helper/charts';
import BookingAction from '../../store/action/BookingAction';
import ScheduleAction from '../../store/action/ScheduleAction';
import DestinationAction from '../../store/action/DestinationAction';
import TicketAction from '../../store/action/TicketAction';
import ChargesAction from '../../store/action/ChargesAction';

function mapStateToProps(state: any) {
    return {
        uid: state.User.uid,
        isAdmin: state.User.isAdmin,
        isEmployee: state.User.isEmployee,
        isExternal: state.User.isExternal,
        residingDestinationID: state.User.residingDestinationID,
        schedules: state.Schedule.schedules,
        destinations: state.Destination.destinations,
        bookings: state.Booking.bookings,
        sale_by_dates: state.Booking.sale_by_dates,
        sale_by_schedule: state.Booking.sale_by_schedule,
        tickets: state.Ticket.tickets,
        charges: state.Charges.charges
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        getDestnation: () => dispatch(DestinationAction.getData()),
        getSchedules: () => dispatch(ScheduleAction.getData(null)),
        getBookings: () => dispatch(BookingAction.getData()),
        getTickets: () => dispatch(TicketAction.getData()),
        getCharges: () => dispatch(ChargesAction.getCharges()),
        getSaleByDate: (payload) => dispatch(BookingAction.getSaleByDate(payload)),
        getSaleBySchedule : (payload) => dispatch(BookingAction.getSaleBySchedule(payload))        ,
        bookingAdded: () => dispatch(BookingAction.bookingAdded()),
        bookingChanged : () => dispatch(BookingAction.bookingChanged())
    }
}

class Home extends React.Component<any, any>{

    constructor() {
        super();

        //const {sale_by_schedule} = props;

        this.state = {
            searchRecords: [],
            sale_by_dates: {},
            chart_data: {
                labels: [],
                datasets: [
                    {
                        label: 'Sales Previous Week',
                        data: [],
                        backgroundColor: '#777'
                    }
                ]
            },
            sale_by_schedule_data: {}
        }
    }

    getSaleByScheduleData(sale_by_schedule){
        let 
            labels = [], 
            data = [],
            result : any = {},
            scheme,
            colors;
        const {schedules} = this.props;

        labels = Object.keys(sale_by_schedule).map(key => {
            let result,ScheduleTitle,ScheduleID;
            ScheduleID = sale_by_schedule[key].ScheduleID;
            result = typeof schedules[ScheduleID] !== 'undefined' ? schedules[ScheduleID].ScheduleTitle : ScheduleID;
            return result;
        });
        
        data = Object.keys(sale_by_schedule).map(key => sale_by_schedule[key].sale);
        scheme = new ColorScheme();
        scheme.from_hue(21).scheme('triade').variation('soft');
        colors = scheme.colors();        
        colors = colors.map(item => '#' + item);
       // console.log(colors);
        result = {
            labels: labels,
            datasets: [
                {
                    label: "Today's Sale Schedule Wise",
                    data: data,
                    backgroundColor: colors
                }
            ]
        }

        return result;
    }

    componentDidMount() {
        let date, formattedDate;
        const {sale_by_dates :sale_by_dates_props ,sale_by_schedule} = this.props;
        const barChartbgColor : string = '#758282';

        //---Dispatching actions
        this.props.getDestnation();
        this.props.getSchedules();
        this.props.getBookings();
        this.props.getTickets();
        this.props.getCharges();
        this.props.bookingAdded();      
        this.props.bookingChanged();           

        date = new Date();
        date = getFormattedDate(date,'yyyy/mm/dd');
        this.props.getSaleBySchedule(date);         //get sale by Schedule data        

        const { isAdmin } = this.props;                  
        if (isAdmin === true) {
            this.dispatchChartActions.call(this);           
        }
        //---End dispatching actions

        //---Setting the initial state
        this.setState({
            searchRecords: [],
            sale_by_dates: sale_by_dates_props,
            chart_data: {
                labels: [],
                datasets: [
                    {
                        label: 'Sales Previous Week',
                        data: [],
                        backgroundColor: barChartbgColor
                    }
                ]
            },
            sale_by_schedule_data: this.getSaleByScheduleData(sale_by_schedule)
        });
        //---End setting the initial state

    }

    componentWillReceiveProps(nextProps) {
        let state: any = {}, labels = [], data = [],sale_by_schedule_data;

        const { sale_by_dates,sale_by_schedule,isAdmin,isEmployee,isExternal } = nextProps;
        const {isAdmin : isAdmin_state,isExternal : isExternal_state,isEmployee:isEmployee_state} = this.state;

        if(isAdmin !== isAdmin_state){
            state.isAdmin = isAdmin;
            if(isAdmin === true){this.dispatchChartActions.call(this);}
        }

        if(isEmployee !== isEmployee_state){
            state.isEmployee = isEmployee;            
        }

        if(isExternal !== isExternal_state){
            state.isExternal = isExternal;            
        }

        if (Object.keys(sale_by_dates).length > 0) {
            labels = Object.keys(sale_by_dates).map((item, index) => sale_by_dates[item].date);
            data = Object.keys(sale_by_dates).map((item: any, index) => sale_by_dates[item].sale);            
            this.updateBarChart(labels, data);
        }

        if(Object.keys(sale_by_schedule).length > 0){
            sale_by_schedule_data = this.getSaleByScheduleData(sale_by_schedule);
            state.sale_by_schedule_data = sale_by_schedule_data;
        }

        this.setState(state);
    }

    dispatchChartActions(){
        let date,formattedDate;
        const sale_by_dates = this.state.sale_by_dates;        
            
        date = new Date();
        for (let i = 0; i < 7; i++) {
            date.setDate((new Date()).getDate() - i);
            formattedDate = getFormattedDate(date, "yyyy/mm/dd");

            if (Object.keys(sale_by_dates).indexOf(formattedDate) === -1) {                                             
                this.props.getSaleByDate({ date: formattedDate });
            }
        }
        
        if (Object.keys(sale_by_dates).length > 0) {
            let labels = [], data = [];
            labels = Object.keys(sale_by_dates).map((item, index) => sale_by_dates[item].date);
            data = Object.keys(sale_by_dates).map((item: any, index) => sale_by_dates[item].sale);
            this.updateBarChart(labels, data);
        }
    }

    updateBarChart(labels, data) {

        const dataSetCopy = this.state.chart_data.datasets.slice(0);
        dataSetCopy[0].data = data;

        const newData = Object.assign({}, this.state.chart_data, {
            labels: labels,
            datasets: dataSetCopy
        });

        this.setState({
            chart_data: newData
        });
    }

    getSearchRecords() {
        let todaysDate, searchRecords: Array<Object> = [], searchHelper = new SearchHelper(), state = {}, isMatchDestination;
        const { isExternal, isEmployee, residingDestinationID: destID,
            schedules, destinations, bookings, tickets } = this.props;

        todaysDate = new Date();

        if (isExternal && destID.trim() !== "") {
            isMatchDestination = true;
            searchRecords = searchHelper.getSearchResults_ForDashboard(destID, todaysDate,
                { schedules, destinations, bookings, tickets, isMatchDestination });
        }
        else if (isEmployee) {
            isMatchDestination = false;
            searchRecords = searchHelper.getSearchResults_ForDashboard(destID, todaysDate,
                { schedules, destinations, bookings, tickets, isMatchDestination });
        }

        return searchRecords;
    }

    increment() {
        // e.preventDefault();
        const dataSetCopy = this.state.chart_data.datasets.slice(0);
        const dataCopy = dataSetCopy[0].data.slice(0);
        dataCopy[0] = dataCopy[0] + 2000;
        dataSetCopy[0].data = dataCopy;
        const newData = Object.assign({}, this.state.chart_data, {
            datasets: dataSetCopy
        });

        this.setState({
            chart_data: newData
        });
    }

    render() {
        let searchResults, chartsDiv,employeeDiv;
        const { charges, tickets, isAdmin, isEmployee, isExternal, uid } = this.props;
        searchResults = this.getSearchRecords();

        if (isAdmin) {
            const { chart_data, sale_by_schedule_data } = this.state;
            chartsDiv = (
                <div className="row chartRow">
                    <div className="col-md-6">
                        <Bar data={chart_data} />
                    </div>

                    <div className="col-md-6">
                        <Doughnut data={sale_by_schedule_data} />
                    </div>
                </div>
            );
        }

        if (isExternal || isEmployee) {
            //put normal dashboard jsx here.
            employeeDiv = (
                <div className="row">
                    <div className="col-md-6">
                        <h3>Recent Bookings</h3>
                        <BookingListC
                            uid={uid}
                            tickets={tickets}
                            isAdmin={isAdmin}
                            isEmployee={isEmployee}
                            isExternal={isExternal}
                            isDashboard={true} />
                    </div>
                    <div className="col-md-6">
                        <h3>Available Bookings</h3>
                        <SearchList
                            data={searchResults}
                            charges={charges}
                            isDashboard={true} />
                    </div>
                </div>
            );
        }


        return (
            <div>
                <h1>Home</h1>

                {employeeDiv}

                {chartsDiv}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate(Home));