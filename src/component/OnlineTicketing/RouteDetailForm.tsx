import * as React from 'react';
import RouteDetail from '../../models/RouteDetail';


export default class RouteDetailForm extends React.Component<any,any>{

    constructor(){
        super();
        this.state= {
            destinations: [],
            ddlDestination : 0,
            ddlOrderNo : 0,
            ddlSequenceType : "",
            currentRouteDetail : new RouteDetail("","","",0,""),
            txtDate: "",
            txtTime : ""
        }
    }

    componentDidMount(){
        let data = this.props.currentRouteDetail;
        this.setState({
            destinations : this.props.destinations,
            currentRouteDetail : data,
            ddlDestination : data.DestinationID,
            ddlOrderNo  : data.OrderNo,
            ddlSequenceType : data.SequenceType
        });
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.destinations.length !== this.props.destinations.length){
            this.setState({
                destinations : nextProps.destinations
            });
        }
        if(nextProps.currentRouteDetail.RouteDetailID !== this.props.currentRouteDetail.RouteDetailID){
            let data = nextProps.currentRouteDetail;
            this.setState({
                currentRouteDetail : data,
                ddlDestination : data.DestinationID,
                ddlOrderNo  : data.OrderNo,
                ddlSequenceType : data.SequenceType
            });
        }
    }
    getOptionsFromState(stateOptions,valueName,titleName){
        let options = [];
        // if(stateOptions.length > 0){
        if(Object.keys(stateOptions).length > 0){
            options = Object.keys(stateOptions).map(function(key,index){
                let item;
                item = stateOptions[key];
                return (<option value={item[valueName]} key={item[valueName]}>{item[titleName]}</option>)
            });
        }
        options.unshift(<option key="0" value="0">-Select-</option>)
        return options;
    }
    getOrderNoOptions(){
        let options = [];
        for(let i = 1 ;i <= 100 ; i++){            
            options.push(<option value={i.toString()} key={i.toString()}>{i.toString()}</option>)            
        }
        options.unshift(<option key="0" value="0">-Select-</option>)
        return options;
    }

    getSequenceOptions(){
        let options = [];        
        options.push(<option value={"start"} key={1}>{"Start"}</option>)            
        options.push(<option value={"middle"} key={2}>{"Middle"}</option>)            
        options.push(<option value={"end"} key={3}>{"End"}</option>)    
        options.unshift(<option key="0" value={0}>-Select-</option>)        
        return options;        
    }

    _onFormChange(e,pScope){
        let state = pScope.state;
        state[e.target.id] = e.target.value;
        pScope.setState(state);
    }

    onFormChange(e){
        this._onFormChange(e,this);
        //console.log(this.state);
    }

    onFormSubmit(e){
        e.preventDefault();
        let routeDetail;
        routeDetail = {
            RouteDetailID : this.props.currentRouteDetail.RouteDetailID,
            DestinationID : this.state.ddlDestination,
            OrderNo : this.state.ddlOrderNo,
            SequenceType : this.state.ddlSequenceType
        };
        this.props.insertRow(routeDetail);
    }

    //added temporary
    // test(){
    //     console.log(this.state.txtDate);
    //     console.log(this.state.txtTime);
    // }

    render(){
        let destOptions;let orderNoOptions; let sequenceOptions;

        destOptions = this.getOptionsFromState(this.state.destinations,"DestinationID","DestinationTitle");
        orderNoOptions =this.getOrderNoOptions();
        sequenceOptions = this.getSequenceOptions();

        return(
            <div className="form-group">
                <form onChange={this.onFormChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)} >
                    <div className="col-md-6">
                        <label htmlFor="ddlDestination" className="col-md-4">Destination : </label>
                        <div className="col-md-8">
                            <select name="" id="ddlDestination" className="form-control" value={this.state['ddlDestination']}>
                                {destOptions}
                            </select> 
                        </div>
                    </div>
                    
                    <div className="col-md-6">
                        <label htmlFor="ddlOrderNo" className="col-md-4">OrderNo : </label>
                        <div className="col-md-8">
                            <select name="" id="ddlOrderNo" className="form-control" value={this.state['ddlOrderNo']}>
                                {orderNoOptions}
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="ddlSequenceType" className="col-md-4">SequenceType : </label>
                        <div className="col-md-8">
                            <select name="" id="ddlSequenceType" className="form-control" 
                                value={this.state['ddlSequenceType']}>
                                {sequenceOptions}
                            </select>
                        </div>
                    </div>
                    {/*Added temporary*/}
                    {/*<div className="col-md-6">
                        <input type="date" id="txtDate" className="form-control"/>
                        <input type="time" id="txtTime" className="form-control"/>
                    </div>*/}
                    {/*End*/}
                    <div className="col-md-6">
                        <input type="submit" value="Save" className="btn btn-primary" />

                        {/*Added temporary*/}
                        {/*<input type="button" onClick={this.test.bind(this)} value="Test" className="btn btn-primary" />*/}
                        {/*End*/}
                    </div>                    
                </form>
            </div>
        )
    }
}