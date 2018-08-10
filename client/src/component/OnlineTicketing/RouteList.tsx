

import * as React from 'react';

export default class RouteList extends React.Component<any,any>{
    updateRow(){
        this.props.updateRow(this.props.data.RouteID);
    }

    deleteRow(){
        this.props.deleteRow(this.props.data.RouteID);
    }

    render(){
        return(            
            <tr>
                <td>{this.props.data.RouteRefNo}</td>
                <td>{this.props.data.RouteTitle}</td>
                <td>{this.props.data.StartDestinationTitle}</td>
                <td>{this.props.data.EndDestinationTitle}</td>
                <td><a onClick={this.updateRow.bind(this)}>Edit</a></td>
                <td><a onClick={this.deleteRow.bind(this)}>Delete</a></td>
            </tr>
        )
    }
}