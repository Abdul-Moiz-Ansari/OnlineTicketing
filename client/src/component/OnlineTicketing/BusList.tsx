
import * as React from 'react';


export default class BusList extends React.Component<any, any>{

    deleteRow(e) {
        e.preventDefault();
        this.props.deleteRow(this.props.data.busID);
    }
    editRow(e) {
        e.preventDefault();
        this.props.updateRow(this.props.data.busID);
    }



    render() {
        const busTypes = {
            "express": "Express",
            "luxury": "Luxury",
            "volvo": "Volvo Non-AC",
            "volvoac": "Volvo AC",
        };
        const type = busTypes[this.props.data.type];

        return (
            <tr>
                <td>{this.props.data.title}</td>
                <td>{type}</td>
                <td>{this.props.data.noOfSeats}</td>
                <td><a onClick={this.editRow.bind(this)} style={{ "cursor": "pointer" }}>Edit</a></td>
                <td><a onClick={this.deleteRow.bind(this)} style={{ "cursor": "pointer" }}>Delete</a></td>
            </tr>
        )
    }
}