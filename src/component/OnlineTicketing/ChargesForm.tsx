
import * as React from 'react';
import Charges from '../../models/Charges';
import Option from '../Option';

export default class ChargesForm extends React.Component<any, any>{

    //private txtChargesRefNo = null;
    private txtCharges = null;
    private ddlBus = null;
    private ddlStartDestination = null;
    private ddlEndDestination = null;

    constructor() {
        super();
        this.state = {
            charges: [],
            currentCharges: new Charges("", "", 0, 0, 0, 0, 0, false),
            buses: [],
            routes: [],
            destinations: [],
            txtCharges : "",
            ddlBus : "",
            ddlStartDestination : "",
            ddlEndDestination : ""
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
    }

    componentWillReceiveProps(nextprops) {
        let currentChargesChange = nextprops.currentCharges.ChargesID !== this.props.currentCharges.ChargesID;
        let routesChange = nextprops.routes.length !== this.props.routes.length;
        let busesChanage = nextprops.buses.length !== this.props.buses.length;
        const {currentCharges}  = nextprops;
        if (currentChargesChange || routesChange || busesChanage) {
            this.setState({
                charges: nextprops.charges,
                currentCharges: nextprops.currentCharges,
                ddlBus : currentCharges.busID,
                ddlStartDestination : currentCharges.StartDestinationID,
                ddlEndDestination : currentCharges.EndDestinationID,
                txtCharges : currentCharges.Charges,
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
        //this.updateControls();
    }

    updateControls() {
        let StartDestinationID,EndDestinationID;
        let charges = this.state.currentCharges;        
        // this.txtCharges.value = charges.Charges;
        // this.ddlBus.value = charges.busID !== 0 ? charges.busID : "";        
        // this.ddlStartDestination.value = charges.StartDestinationID !== 0? charges.StartDestinationID : "" ;
        // this.ddlEndDestination.value = charges.EndDestinationID !== 0? charges.EndDestinationID : "";        
        this.setState({
            txtCharges : charges.Charges,
            ddlBus : charges.busID !== 0 ? charges.busID : "",
            ddlStartDestination : charges.StartDestinationID !== 0? charges.StartDestinationID : "",
            ddlEndDestination : charges.EndDestinationID !== 0? charges.EndDestinationID : ""
        });
    }

    onFormSubmit(e) {
        e.preventDefault();
        var _charges,isFormInvalid = false;
        const{charges } = this.props;
        let chargesID = this.state.currentCharges.ChargesID;
        let RefNo = '';//this.txtChargesRefNo.value;
        let chargesC = this.state.txtCharges;// this.txtCharges.value;
        let busID = this.state.ddlBus;//this.ddlBus.value;
        let routeID = 0//this.ddlRoute.value;       
        let startDestinationID =  this.state.ddlStartDestination; //this.ddlStartDestination.value;
        let endDestinationID = this.state.ddlEndDestination;//this.ddlEndDestination.value;
        let isActive = true;//this.chkIsActive.checked;
        
        if(startDestinationID === endDestinationID){
            this.props.showMessage("Select different values for start and end destinations");
            return;
        }

        for(let key in charges){
            let item;
            item = charges[key];
            if(item.StartDestinationID === startDestinationID && item.EndDestinationID === endDestinationID 
                    && item.busID === busID &&  item.ChargesID !== chargesID){
                this.props.showMessage("Another record already exists with same Start Destination, End Destination and Bus");
                isFormInvalid = true;
                break;
            }
        }
        if(isFormInvalid){return;}

        _charges = new Charges(chargesID, RefNo, busID, routeID, startDestinationID, endDestinationID, chargesC, isActive);
        
        this.props.insertRow(_charges);
        this.props.showMessage("Saved successfully");
        //this.clearForm();
    }

    form_change(e){
        this.setState({[e.target.id] : e.target.value});
    }

    clearForm() {
        this.setState({
            currentCharges: new Charges("", "", 0, 0, 0, 0, 0, false)
        });
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
        options.unshift(<option key={0} value="">Select</option>)
        return options;
    }

    render() {
        let busOptions = [];//let routeOptions = [];
        let destinationOptions = [];

        busOptions = this.getOptionsFromState(this.state.buses, "busID", "title");
        destinationOptions = this.getOptionsFromState(this.state.destinations, "DestinationID", "DestinationTitle");        

        return (
            <div className="row">
                <form onSubmit={this.onFormSubmit.bind(this)} onChange={this.form_change.bind(this)}>                    

                     <div className="col-md-6">
                        <label htmlFor="ddlStartDestination" className="col-md-4">Start Destination :</label>
                        <div className="col-md-8">
                            {/*<select id="ddlStartDestination" ref={input => this.ddlStartDestination = input}*/}
                                <select id="ddlStartDestination" value={this.state.ddlStartDestination}
                                className="form-control" required>
                                {destinationOptions}
                            </select>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="ddlEndtDestination" className="col-md-4">End Destination :</label>
                        <div className="col-md-8">
                            
                            {/*<select id="ddlEndtDestination" ref={input => this.ddlEndDestination = input}*/}
                            <select id="ddlEndDestination" value={this.state.ddlEndDestination}
                                className="form-control" required>
                                {destinationOptions}
                            </select>
                        </div>
                    </div>
                    
                    <div className="col-md-6">
                        <label htmlFor="ddlBus" className="col-md-4">Bus :</label>
                        <div className="col-md-8">
                            {/*<select id="ddlBus" ref={input => this.ddlBus = input} className="form-control" required>*/}
                            <select id="ddlBus" value={this.state.ddlBus} className="form-control" required>                                
                                {busOptions}
                            </select>
                        </div>
                    </div>

                   

                    <div className="col-md-6">
                        <label htmlFor="txtCharges" className="col-md-4">Charges :</label>
                        <div className="col-md-8">
                            {/*<input type="text" id="txtCharges" ref={input => this.txtCharges = input}*/}
                            <input type="text" id="txtCharges" value={this.state.txtCharges}                            
                                className="form-control" required />
                        </div>
                    </div>

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