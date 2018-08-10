
import * as React from 'react';

export default class DestinationList extends React.Component<any,any>{
    getDataByKey(){
        //this.props.getDataByKey(this.props.data);
        this.props.getDataByKey(this.props.data.DestinationID);
    }

    deleteRow(){
        this.props.deleteRow(this.props.data.DestinationID);
    }

    render(){
        return(            
            <tr>                
                <td>{this.props.data.DestinationTitle}</td>
                <td>{this.props.data.Abbreviation}</td>
                <td><a onClick={this.getDataByKey.bind(this)} style={{'cursor':'pointer'}}>Edit</a></td>
                <td><a onClick={this.deleteRow.bind(this)} style={{'cursor':'pointer'}}>Delete</a></td>
            </tr>
        )
    }
}