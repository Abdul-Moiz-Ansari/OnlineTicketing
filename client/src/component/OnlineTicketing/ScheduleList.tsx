
import * as React from 'react';
import ComponentHelper  from '../../helper/ComponentHelper';


export default class ScheduleList extends React.Component<any,any>{

    UpdateRow(e){
        this.props.updateRow(this.props.data.ScheduleID);
    }

    DeleteRow(e){
        this.props.deleteRow(this.props.data.ScheduleID);
    }

    render(){
        let arrivalDate,departureDate,dateFormat;
        dateFormat = "MM/dd/yyyy";
        let data = this.props.data;
        let helper = new ComponentHelper();
        // let RouteTitle  = helper.getTitle("RouteID","RouteTitle",data.RouteID,this.props.routes);
        // let BusTitle = helper.getTitle("busid","busTitle",data.BusID,this.props.buses);        
        arrivalDate = helper.getFormattedDate(data.ArrivalDate,dateFormat);
        departureDate = helper.getFormattedDate(data.DepartureDate,dateFormat);

        return(
            <tr>
                
                <td>{data.ScheduleTitle}</td>
                <td>{data.RouteTitle}</td>
                <td>{data.BusTitle}</td>
                <td>{departureDate}</td>
                <td>{data.DepartureTime}</td>
                <td>{arrivalDate}</td>
                <td>{data.ArrivalTime}</td>
                
                <td><a style={{'cursor':'pointer'}} onClick={this.UpdateRow.bind(this)}>Edit</a></td>
                <td><a style={{'cursor':'pointer'}} onClick={this.DeleteRow.bind(this)}>Delete</a></td>
            </tr>
        )
    }
}