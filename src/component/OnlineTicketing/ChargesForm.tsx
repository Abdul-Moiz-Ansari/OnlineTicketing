
import * as React from 'react';
import Charges from '../../models/Charges';
import Option from '../Option';

export default class ChargesForm extends React.Component<any, any>{

    //private txtChargesRefNo = null;
    private txtCharges = null;
    private ddlBus = null;
    //private ddlRoute  = null;
    //private chkIsActive = null;
    private ddlStartDestination = null;
    private ddlEndDestination = null;

    constructor() {
        super();
        this.state = {
            charges: [],
            currentCharges: new Charges("", "", 0, 0, 0, 0, 0, false),
            buses: [],
            routes: [],
            destinations: []
        };
    }

    componentDidMount() {
        this.setState({
            charges: this.props.charges,
            currentCharges: this.props.currentCharges,
            buses: this.props.buses,
            routes: this.props.routes,
            destinations: this.props.destinations
        });
        //console.log(this.state.buses,"componentDidMount");
    }

    componentWillReceiveProps(nextprops) {

        //right now i am not considering this
        // console.log(nextprops,this.props);
        let currentChargesChange = nextprops.currentCharges.ChargesID !== this.props.currentCharges.ChargesID;
        let routesChange = nextprops.routes.length !== this.props.routes.length;
        let busesChanage = nextprops.buses.length !== this.props.buses.length;

        if (currentChargesChange || routesChange || busesChanage) {
            //console.log(nextprops.buses);
            this.setState({
                charges: nextprops.charges,
                currentCharges: nextprops.currentCharges,
                buses: nextprops.buses,
                routes: nextprops.routes
            });
        }

        if (this.props.destinations.length !== nextprops.destinations.length) {
            this.setState({
                destinations: nextprops.destinations
            });
        }
    }

    componentDidUpdate() {
        this.updateControls();
    }

    updateControls() {
        let charges = this.state.currentCharges;
        //this.txtChargesRefNo.value = charges.ChargesRefNo;
        this.txtCharges.value = charges.Charges;
        this.ddlBus.value = charges.busID;
        //this.ddlRoute.value = charges.RouteID;
        this.ddlStartDestination.value = charges.StartDestinationID;
        this.ddlEndDestination.value = charges.EndDestinationID;
        //this.chkIsActive.checked = charges.IsActive;
    }

    onFormSubmit(e) {
        e.preventDefault();
        var _charges;
        let chargesID = this.state.currentCharges.ChargesID;
        let RefNo = '';//this.txtChargesRefNo.value;
        let charges = this.txtCharges.value;
        let busID = this.ddlBus.value;
        let routeID = 0//this.ddlRoute.value;       
        let startDestinationID = this.ddlStartDestination.value;
        let endDestinationID = this.ddlEndDestination.value;
        let isActive = true;//this.chkIsActive.checked;
        
        _charges = new Charges(chargesID, RefNo, busID, routeID, startDestinationID, endDestinationID, charges, isActive);
        
        this.props.insertRow(_charges);
        //this.clearForm();
    }

    clearForm() {
        this.setState({
            currentCharges: new Charges("", "", 0, 0, 0, 0, 0, false)
        });
    }

    getBusOptions() {
        let busOptions = [];
        let buses = this.state.buses;
        
        //if(typeof buses !== 'undefined' && buses.length > 0){
        if (typeof buses !== 'undefined' && Object.keys(buses).length > 0) {
            
            // busOptions = buses.map(function (item) {
            busOptions = Object.keys(buses).map(function (key) {
                let item;
                item = buses[key];
                return <Option key={item.busID} value={item.busID} text={item.title} />
            });
        };
        busOptions.unshift(<Option key={0} value={0} text={"Select"} />);

        //console.log('busOptions : ',busOptions);

        return busOptions;
    }

    getOptionsFromState(stateOptions, valueName, titleName) {
        let options = [];
        // if (stateOptions.length > 0) {
        if (Object.keys(stateOptions).length > 0) {
            // options = stateOptions.map(function (item, index) {
            options = Object.keys(stateOptions).map(function (key, index) {
                let item;
                item = stateOptions[key];
                return (<option value={item[valueName]} key={item[valueName]}>{item[titleName]}</option>)
            });
        }
        options.unshift(<option key={0} value="0">Select</option>)
        return options;
    }

    getRouteOptions() {
        let routeOptions = [];
        let routes = this.state.routes;
        if (typeof routes !== 'undefined' && routes.length > 0) {
            routeOptions = routes.map(function (item) {
                return <Option key={item.RouteID} value={item.RouteID} text={item.RouteTitle} />
            });
        }
        routeOptions.unshift(<Option key={0} value={0} text={"Select"} />);
        return routeOptions;
    }

    render() {
        let busOptions = [];//let routeOptions = [];
        let destinationOptions = [];
        //busOptions = this.getBusOptions();
        //routeOptions = this.getRouteOptions();
        busOptions = this.getOptionsFromState(this.state.buses, "busID", "title");
        destinationOptions = this.getOptionsFromState(this.state.destinations, "DestinationID", "DestinationTitle");

        // console.log('busOptions : ',busOptions);

        return (
            <div className="row">
                <form onSubmit={this.onFormSubmit.bind(this)}>
                    {/*<div className="col-md-6" style={{'display':'none'}}>
                        <label htmlFor="txtChargesRefNo" className="col-md-3">ID : </label>
                        <div className="col-md-9">
                            <input type="text" id="txtChargesRefNo" ref={input => this.txtChargesRefNo = input}
                                className="form-control" required />
                        </div>
                    </div>*/}

                     <div className="col-md-6">
                        <label htmlFor="ddlStartDestination" className="col-md-4">Start Destination :</label>
                        <div className="col-md-8">
                            <select id="ddlStartDestination" ref={input => this.ddlStartDestination = input}
                                className="form-control" required>
                                {destinationOptions}
                            </select>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="ddlEndtDestination" className="col-md-4">End Destination :</label>
                        <div className="col-md-8">
                            <select id="ddlEndtDestination" ref={input => this.ddlEndDestination = input}
                                className="form-control" required>
                                {destinationOptions}
                            </select>
                        </div>
                    </div>
                    
                    <div className="col-md-6">
                        <label htmlFor="ddlBus" className="col-md-4">Bus :</label>
                        <div className="col-md-8">
                            <select id="ddlBus" ref={input => this.ddlBus = input} className="form-control" required>
                                {busOptions}
                            </select>
                        </div>
                    </div>

                   

                    <div className="col-md-6">
                        <label htmlFor="txtCharges" className="col-md-4">Charges :</label>
                        <div className="col-md-8">
                            <input type="text" id="txtCharges" ref={input => this.txtCharges = input}
                                className="form-control" required />
                        </div>
                    </div>

                    {/*<div className="col-md-6" style={{'display' : 'none'}}>
                        <label htmlFor="chkIsActive" className="col-md-3">Is Active :</label>
                        <div className="col-md-9">
                            <input type="checkbox" id="chkIsActive" ref={input => this.chkIsActive = input} className="form-control" />
                        </div>
                    </div>*/}

                    <div className="col-md-12">
                        <div className="text-center">
                            <input type="submit" value="Save" className="btn btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}