
import * as React from 'react';


export default class BusList extends React.Component<any,any>{

    deleteRow(e){
        e.preventDefault();
        this.props.deleteRow(this.props.data.busID);
    }
    editRow(e){
        e.preventDefault();
        this.props.updateRow(this.props.data.busID);
    }

    render(){
        
        return(
            <li>
                {/*{this.props.data.busTitle}*/}
                {this.props.data.title} &nbsp;&nbsp;|&nbsp;&nbsp;

                 <a onClick={this.editRow.bind(this)} style={{"cursor":"pointer"}}>Edit</a> &nbsp;&nbsp;|&nbsp;&nbsp;
                
                <a onClick={this.deleteRow.bind(this)}>Delete</a>
            </li>
        )
    }
}