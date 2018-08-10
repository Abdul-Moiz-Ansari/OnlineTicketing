
import * as React from 'react';
import Bus from '../../models/Bus';
import {reduxForm,Field} from 'redux-form';

export default class BusForm extends React.Component<any, any>{

    constructor() {
        super();
        
        this.state = {
            txtTitle: "",
            txtNoOfSeats: "0",
            ddlType: "0"
        };
    }

    componentDidMount(){
        this.setState({
            currentBus : this.props.currentBus
        });
    }

    componentWillReceiveProps(nextProps) {
        let bus : Bus;
        if(this.props.currentBus.busID !== nextProps.currentBus.busID){
            bus = nextProps.currentBus;
            this.setState({
                currentBus :bus,
                txtTitle : bus.title,
                ddlType : bus.type,
                txtNoOfSeats:bus.noOfSeats
            });
        }
    }

    clearForm(){
        this.setState({
            currentBus : new Bus("","","",0),
            txtTitle : "",
            ddlType : "0",
            txtNoOfSeats : "0"
        })
    }

    formChange(e) {
        //console.log(e.target.id, e.target.value);
        let state;
        //state = this.state;
        //state[e.t]
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    formSubmit(e) {
        e.preventDefault();
        var bus: Bus,currentBus : Bus;
               
        currentBus = this.state.currentBus;
        bus = new Bus(currentBus.busID, this.state.txtTitle, this.state.ddlType, this.state.txtNoOfSeats);

        console.log('bus : ',bus);
        this.props.insertRow(bus);
        this.clearForm();
    }

    render() {
        return (
            // <form onSubmit={this.insertRow.bind(this)} onChange={}>
            <form onSubmit={this.formSubmit.bind(this)} onChange={this.formChange.bind(this)}>
                <table>
                    <tbody>                        
                        <tr>
                            <td>Title :</td>
                            <td>
                                <input type="text" id="txtTitle" value={this.state.txtTitle} />
                            </td>
                        </tr>
                        <tr>
                            <td>Type :</td>
                            <td>                                
                                <select id="ddlType" value={this.state.ddlType} onChange={this.formChange.bind(this)}>
                                    <option value="0">Select</option>
                                    <option value="express">Express</option>
                                    <option value="luxury">Luxury</option>
                                    <option value="volvo">Volvo Non-AC</option>
                                    <option value="volvoac">Volvo AC</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>No Of Seats :</td>
                            {/*<td><input type="text" id="txtNoOfSeats" value={this.state.txtNoOfSeats} ref={input  => this.NoOfSeats = input} /></td>*/}
                            <td><input type="text" id="txtNoOfSeats" value={this.state.txtNoOfSeats} /></td>
                        </tr>
                        <tr>
                            <td>
                                <input type="submit" value="Save" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        )
    }

}