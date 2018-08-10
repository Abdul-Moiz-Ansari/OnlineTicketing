
import * as React from 'react';
import ComponentHelper from '../../helper/ComponentHelper';
import Schedule from '../../models/Schedule';

export default class ScheduleForm extends React.Component<any,any>{

    constructor(){
        super();
        this.state = {
            txtScheduleRefNo : "",
            txtScheduleTitle : "",
            ddlRoute : 0,
            ddlBus : 0,
            txtDepartureDate : "",
            txtDepartureTime : "",
            txtArrivalDate : "",
            txtArrivalTime : "",
            chkIsActive : "",
            routes : [],
            buses  : [],
            currentSchedule : new Schedule("","","","","",new Date(),"",new Date(),"",false)
        };
    }

    componentDidMount(){
        this.setState({
            routes : this.props.routes,
            buses : this.props.buses,
            currentSchedule : this.props.currentSchedule
        });
    }

    componentWillReceiveProps(nextProps){
        let helper = new ComponentHelper();
        if(Object.keys(this.props.routes).length !== Object.keys(nextProps.routes).length){
            this.setState({
                routes : nextProps.routes
            });
        }

        if(Object.keys(this.props.buses).length !== Object.keys(nextProps.buses).length){
            this.setState({
                buses : nextProps.buses
            });
        }

        //console.log(this.state.currentSchedule.ScheduleID , nextProps.currentSchedule.ScheduleID);
        
        if(this.props.currentSchedule.ScheduleID !== nextProps.currentSchedule.ScheduleID ||
            nextProps.isClearForm === true){
            this.setState({
                currentSchedule : nextProps.currentSchedule,
                txtScheduleRefNo : nextProps.currentSchedule.ScheduleRefNo,
                txtScheduleTitle : nextProps.currentSchedule.ScheduleTitle,
                ddlRoute : nextProps.currentSchedule.RouteID,
                ddlBus : nextProps.currentSchedule.busID,
                txtDepartureDate : helper.getFormattedDate(nextProps.currentSchedule.DepartureDate,"yyyy/MM/dd","-"),
                txtDepartureTime : nextProps.currentSchedule.DepartureTime,
                txtArrivalDate : helper.getFormattedDate(nextProps.currentSchedule.ArrivalDate,"yyyy/MM/dd","-"),
                txtArrivalTime : nextProps.currentSchedule.ArrivalTime,
                chkIsActive : nextProps.currentSchedule.IsActive
            });
            this.props.formCleared();
        }
    }


    getOptionsFromState(stateOptions,valueName,titleName){
        let options = [];
        //console.log('stateOptions : ',stateOptions)
        if(Object.keys(stateOptions).length > 0){
            //console.log('stateOptions 2 : ',stateOptions)
            options = Object.keys(stateOptions).map(function(key,index){
                let item;
                item = stateOptions[key];
                return (<option value={item[valueName]} key={item[valueName]}>{item[titleName]}</option>)
            });
        }
        options.unshift(<option key={0} value="0">-Select-</option>)
        return options;
    }

    onFormChange(e){
       // e.preventDefault();
         let state = this.state;
         if (e.target.id !== "chkIsActive"){
            state[e.target.id] = e.target.value;
         }
         else{
            state[e.target.id] = e.target.checked;
         }
        this.setState(state);
        //console.log(this.state.chkIsActive);
    }

    onFormSubmit(e){
        e.preventDefault();
        let isInvalid = false;
        let DepartureDate = this.state.txtDepartureDate;
        let ArrivalDate = this.state.txtArrivalDate;
        const {ddlRoute : RouteID,ddlBus:busID} = this.state;
        const{schedules,showMessage} = this.props;
        const {ScheduleID} = this.props.currentSchedule;

        for(let key in schedules){
            let item;
            item = schedules[key];
            // console.log(item.RouteID , RouteID , item.busID , busID , item.DepartureDate , DepartureDate ,
            //     item.ScheduleID, 'ScheduleID : ' , ScheduleID);
            if(item.RouteID === RouteID && item.busID === busID && item.DepartureDate === DepartureDate &&
                item.ScheduleID !== ScheduleID){
                    showMessage("Another record already exists with same Route, Bus and Departure Date");
                    isInvalid = true;
                    break;
                }
        }
        if(isInvalid){return;}

        let schedule = new Schedule(this.props.currentSchedule.ScheduleID,this.state.txtScheduleRefNo,
                                    this.state.txtScheduleTitle,this.state.ddlRoute,this.state.ddlBus,
                                    DepartureDate,this.state.txtDepartureTime,
                                    ArrivalDate,this.state.txtArrivalTime,this.state.chkIsActive);
        this.props.insertRow(schedule);
        showMessage("Schedule saved sucessfully");
    }

    clearFormState(){
        this.setState({
            currentSchedule : new Schedule("","","","","",new Date(),"",new Date(),"",false),
            txtScheduleRefNo : "",
            txtScheduleTitle : "",
            ddlRoute : 0,
            ddlBus : 0,
            txtDepartureDate : "",
            txtDepartureTime : "",
            txtArrivalDate : "",
            txtArrivalTime : "",
            chkIsActive : "",
        });
    }

    render(){
        
        let RouteOptions = this.getOptionsFromState(this.state.routes,"RouteID","RouteTitle");
        let BusOptions = this.getOptionsFromState(this.state.buses,"busID","title");
        
        //console.log('BusOptions : ',BusOptions);

        return(
            <div className="row">
                <form onSubmit={this.onFormSubmit.bind(this)} onChange={this.onFormChange.bind(this)}>

                    <div className="col-md-6">
                        <label htmlFor="txtScheduleTitle" className="col-md-3">Title :</label>
                        <div className="col-md-8">
                            <input type="text" id="txtScheduleTitle" className="form-control" 
                                value={this.state['txtScheduleTitle']}/>
                        </div>
                    </div>                    

                    {/*Route*/}
                     <div className="col-md-6">
                        <label htmlFor="ddlRoute" className="col-md-3">Route:</label>
                        <div className="col-md-8">                            
                            <select id="ddlRoute" className="form-control" 
                                value={this.state['ddlRoute']}>
                                {RouteOptions}    
                            </select>
                        </div>
                    </div>

                    {/*Bus*/}
                    <div className="col-md-6">
                        <label htmlFor="ddlBus" className="col-md-3">Bus:</label>
                        <div className="col-md-8">                            
                            <select id="ddlBus" className="form-control" 
                                value={this.state['ddlBus']}>
                                {BusOptions}
                            </select>
                        </div>
                    </div>

                    {/*Departure Date*/}
                    <div className="col-md-6">
                        <label htmlFor="txtDepartureDate" className="col-md-3">Deptarture Date:</label>
                        <div className="col-md-8">                            
                            <input type="date" id="txtDepartureDate"  className="form-control" 
                                value={this.state['txtDepartureDate']} />
                        </div>
                    </div>

                    {/*Arrival Date*/}
                    <div className="col-md-6">
                        <label htmlFor="txtArrivalDate" className="col-md-3">Arrival Date:</label>
                        <div className="col-md-8">                        
                            <input type="date" id="txtArrivalDate"  className="form-control" 
                                value={this.state['txtArrivalDate']} />
                        </div>
                    </div>

                    {/*Departure  Time*/}
                    <div className="col-md-6">
                        <label htmlFor="txtDepartureTime" className="col-md-3">Departure Time:</label>
                        <div className="col-md-8">                            
                            <input type="time" id="txtDepartureTime"  className="form-control" 
                                value={this.state['txtDepartureTime']} />
                        </div>
                    </div>

                    

                    {/*Arrival Time*/}
                    <div className="col-md-6">
                        <label htmlFor="txtArrivalTime" className="col-md-3">Arrival Time:</label>
                        <div className="col-md-8">                            
                            <input type="time" id="txtArrivalTime"  className="form-control" 
                                value={this.state['txtArrivalTime']} />
                        </div>
                    </div>
                    
                    <div className="col-md-12">
                        <div className="text-center">
                            <input type="submit" className="btn btn-primary" value="Save" />
                        </div>
                    </div>

                </form>
            </div>
        )
    }
}