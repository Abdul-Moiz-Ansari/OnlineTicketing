
import * as React from 'react';
import ComponentHelper from '../../helper/ComponentHelper';

export default class ChargesList extends React.Component<any,any>{

    constructor(){
        super();
        this.state = {
            charges:  {},
            buses : [],
            routes : []
        }
    }

    componentWillMount(){
        this.setState({
                charges : this.props.charges,
                buses : this.props.buses,
                routes : this.props.routes
            });
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.buses.length !== this.props.buses || nextProps.routes.length !== this.props.routes||
            nextProps.charges.ChargesID !== this.props.ChargesID){
            this.setState({
                charges:  nextProps.charges,
                buses : nextProps.buses,
                routes : nextProps.routes
            });
        }
    }



    // GetBusTitle(BusID,buses){
    //     let bus;let busTitle = "";
        
    //     // bus = buses.filter(function(item){
    //     bus = Object.keys(buses).filter(function(key){            
    //         //return item.busid === BusID;
    //         return key === BusID;
    //     });
        
    //     if (bus.length > 0){
    //         busTitle = bus[0]['title'];            
    //     }
        
    //     return busTitle;
    // }
    
    // GetRouteTitle(RouteID,routes){
    //     let arrRoute;let RouteTitle = "";

    //     arrRoute = routes.filter(function(item){
    //         return item.RouteID === RouteID;
    //     });
    //     if(arrRoute.length > 0){
    //         RouteTitle = arrRoute[0]["RouteTitle"];
    //     }
    //     return RouteTitle;
    // }

    updateRow(){
        this.props.updateRow(this.state.charges.ChargesID);
    }
    deleteRow(){
        this.props.deleteRow(this.state.charges.ChargesID);
    }
    render(){
        let startDestinationTitle;let endDestinationTitle;
        let helper = new ComponentHelper();        
        let data = this.state.charges ;

        return(
           <tr>
                {/*<td>{data.ChargesRefNo}</td>*/}
                <td>{data.StartDestinationTitle}</td>
                <td>{data.EndDestinationTitle}</td>
                <td>{data.busTitle}</td>                
                <td>{data.Charges}</td>
                {/*<td><input type="checkbox" checked={data.IsActive} disabled /></td>*/}
                <td><a onClick={this.updateRow.bind(this)}>Edit</a></td>
                <td><a onClick={this.deleteRow.bind(this)}>Delete</a></td>
           </tr>
        )
    }
}