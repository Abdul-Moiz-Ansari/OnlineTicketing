
import * as React from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import Option from '../Option';
import Route from '../../models/Route';

export default class RouteForm extends React.Component<any,any>{

    private RouteRefNo = null;
    private RouteTitle = null;
    private StartDestinationID = null;
    private EndDestinationID  =null;

    constructor(){
        super();
        this.state = {
            destinations : [],
            currentRoute : new Route("","","",0,0)
        }
    }

    componentDidMount(){
       this.setState({
           destinations : this.props.destinations,
           currentRoute : this.props.currentRoute
        });
        //this.updateControls();
    }

    componentWillReceiveProps(nextProps){
        
        let destChange = nextProps.destinations.length !== this.props.destinations.length;        
        let routeChange = nextProps.currentRoute.RouteID !== this.props.currentRoute.RouteID;

        if(destChange || routeChange){
            if(destChange && routeChange){
                this.setState({
                    destinations:nextProps.destinations,
                    currentRoute : nextProps.currentRoute
                });
            }
            else if(destChange){
                this.setState({destinations:nextProps.destinations});
            }
            else if(routeChange){
                //console.log("route change confirm",routeChange);
                this.setState({currentRoute : nextProps.currentRoute});
            }
        }
    }

    componentDidUpdate(){
        this.updateControls();
    }

    updateControls(){
        let currentRoute = this.state.currentRoute;
        this.RouteRefNo.value = currentRoute.RouteRefNo;
        this.RouteTitle.value = currentRoute.RouteTitle;
        this.StartDestinationID.value = currentRoute.StartDestinationID;
        this.EndDestinationID.value= currentRoute.EndDestinationID;
    }

    SubmitForm(e){
        e.preventDefault();
        var route //= new Route(;
        var RouteID : string = this.state.currentRoute.RouteID;
        var routeRefNO :string = this.RouteRefNo.value;
        var routeTitle  :string= this.RouteTitle.value;
        var startDestinationID  :number= this.StartDestinationID.value;
        var endDestinationID  : number= this.EndDestinationID.value;
        route = new Route(RouteID,routeRefNO,routeTitle,startDestinationID, endDestinationID);
        this.props.insertRow(route);
        //this.clearControls();
    }

    clearControls(){
        // this.RouteRefNo.value = "";
        // this.RouteTitle.value =  "";
        // this.StartDestinationID.value = 0;
        // this.EndDestinationID.value = 0;
        this.setState({currentRoute : new Route("","","",0,0)});
    }

    private createRenderer = render => ({input, meta, label, ...rest}) =>
        <div className="col-md-6">            
            <label className="col-md-3">{label}</label>
            <div className="col-md-8">
                {render(input, label, rest)}
            
                {meta.error && <div className="text-danger">{meta.error}</div>}
            </div>
        </div>

    private createInput = this.createRenderer((input, label, {type}) =>
        <input type={type} {...input} className="form-control" />
    )

    private createSelect= this.createRenderer((input, label, {options}) =>
        <select {...input} className="form-control">
            {options}
        </select>
    )

    render(){
        let options = []; 
        options = Object.keys(this.props.destinations).map(key => { 
            let item = this.props.destinations[key];
            return (<option key={key} value={item.DestinationID}>{item.DestinationTitle}</option>);
        });
        options.unshift(<Option key={0} value={0} text={"Select"}/>);

        return(
            <div className="row">
                <div className="col-md-offset-1 col-md-10">
                    <div className="row">

                        <form onSubmit={this.SubmitForm.bind(this)}>
                            <div className="col-md-6">
                                <label htmlFor="txtRouteRefNo" className="col-md-3">ID :</label>
                                <div className="col-md-9">
                                    <input type="text"  ref={input => this.RouteRefNo = input} 
                                        className="form-control" id="txtRouteRefNo" required />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="txtRouteTitle" className="col-md-3">Title :</label>
                                <div className="col-md-9">
                                    <input type="text" ref={input => this.RouteTitle = input} className="form-control" 
                                    id="txtRouteTitle" required/>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="ddlStartDestinationID" className="col-md-3">Start :</label>
                                <div className="col-md-9">
                                    <select ref={ input  => this.StartDestinationID = input} className="form-control" 
                                        id="ddlStartDestinationID" required>
                                        {options}
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="ddlEndDestinationID" className="col-md-3">End :</label>
                                <div className="col-md-9">
                                    <select ref={input => this.EndDestinationID = input} className="form-control" 
                                        id="ddlEndDestinationID" required>
                                        {options}
                                    </select>
                                </div>
                            </div>
                        
                            <div className="col-md-12">
                                <div className="text-center">
                                        <input type="submit" value="Save" className="btn btn-primary" />
                                </div>                        
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}