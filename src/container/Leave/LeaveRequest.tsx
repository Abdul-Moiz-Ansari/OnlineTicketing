
import * as React from 'react';
import {FirebaseDB} from '../../helper/Firebase';
import * as moment from 'moment';
//import DatePicker from 'react-datepicker';
//import DatePicker from 'react-datepicker';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css'

import {SingleDatePicker} from 'react-dates';

export default class LeaveRequest extends React.Component<any, any>{

    constructor() {
        super();
        // this.state = {
        //     ddlLeaveYear : 0,
        //     ddlLeaveType : 0,
        //     txtBalance : 0,
        //     ddlShortLeave : 0,
        //     ddlShortPortion : 1,
        //     ddlShortFor : 'F'
        // };
        this.state = {
            startDate : moment(),
            date : null,
            dateFocused : false
        };
    }

    componentWillMount() {
        // this.props.getData();
        // this.props.getDestination();
    }

    componentDidMount() {

    }

    renderList(item, index) {
        /*return <RouteList
            key={item.RouteID}
            data={item}
            updateRow={this.props.updateRow}
            deleteRow={this.props.deleteRow} />*/
    }

    form_Submit(e) {
        let leaveYear, leaveType, balance, shortLeave, portion, shortLeaveFor, fromDate, toDate, remarks,date;

        e.preventDefault();
        let obj;

        date = this.state.date;
        date = date.toDate();
        console.log('date : ', date);
        obj = {
            id : "",
            leaveYear: this.ddlLeaveYear.value,
            leaveType: this.ddlLeaveType.value,
            balance: this.txtBalance.value,
            shortLeave: this.ddlShortLeave.value,
            portion: this.ddlPortion.value,
            shortLeaveFor: this.ddlFor.value,
            fromDate: this.txtFromDate.value,
            toDate: this.txtToDate.value,
            remarks: this.txtRemarks.value,
        };
        //console.log(obj);
        //this.save(obj);
    }

    save(obj){
        let id,ref,promise;
        ref  = FirebaseDB.ref();
        
        //here we can do our ajax call and resolve the promise
        obj.id = ref.child('leave').push().key;
        promise= ref.child('leave/'+obj.id).set(obj);

        promise.then(() => {
            console.log('inserted successfully');
        }).catch(error =>{
            console.log('error',error);
        });

    }

    private ddlLeaveYear: HTMLSelectElement;
    private ddlLeaveType: HTMLSelectElement;
    private txtBalance: HTMLInputElement;
    private ddlShortLeave: HTMLSelectElement;
    private ddlPortion: HTMLSelectElement;
    private ddlFor: HTMLSelectElement;
    private txtFromDate: HTMLInputElement;
    private txtToDate: HTMLInputElement;
    private txtRemarks: HTMLTextAreaElement;

    render() {

        //console.log('this.props.routes : ',this.props.routes);
        return (
            <div>
                <h1>Leave Request</h1>
                <div className="row">
                    <div className="col-md-offset-1 col-md-10">
                        <div className="row">
                            <form onSubmit={this.form_Submit.bind(this)}>

                                <div className="col-md-6">
                                    <label className="col-md-3">Leave Year :</label>
                                    <div className="col-md-9">
                                        <select type="text" ref={input => this.ddlLeaveYear = input}
                                            className="form-control" required >
                                            <option value="2018">2018</option>
                                            <option value="2018">2017</option>
                                            <option value="2018">2016</option>
                                        </select>
                                    </div>
                                </div>

                                {/*<div className="col-md-6">&nbsp;</div>*/}

                                <div className="col-md-6">
                                    <label className="col-md-3">Leave Type :</label>
                                    <div className="col-md-9">
                                        <select type="text" ref={input => this.ddlLeaveType = input}
                                            className="form-control" required >
                                            <option value="0">Select</option>
                                            <option value="annual">Annual</option>
                                            <option value="sick">Sick</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label className="col-md-3">Balance :</label>
                                    <div className="col-md-9">
                                        <input ref={input => this.txtBalance = input} className="form-control"
                                            required />
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <label className="col-md-2">Short Leave :</label>
                                    <div className="col-md-10">
                                        <select type="text" ref={input => this.ddlShortLeave = input}
                                            className="form-control" required >
                                            <option value="0">No</option>
                                            <option value="1">Yes</option>
                                        </select>
                                    </div>
                                    <div className="col-md-offset-2 col-md-10">
                                        <select type="text" ref={input => this.ddlPortion = input}
                                            className="form-control" required >
                                            <option value="0.50">0.50</option>
                                            <option value="1">1</option>
                                        </select>
                                    </div>

                                    <div className="col-md-offset-2 col-md-10">
                                        <select type="text" ref={input => this.ddlFor = input}
                                            className="form-control" required >
                                            <option value="F">Full Day</option>
                                            <option value="M">1st Half</option>
                                            <option value="E">2nd Half</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label className="col-md-3">From Date :</label>
                                    <div className="col-md-9">
                                        <input type="text" ref={input => this.txtFromDate = input} className="form-control" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label className="col-md-3">To Date :</label>
                                    <div className="col-md-9">
                                        <input type="text" ref={input => this.txtToDate = input} className="form-control" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label className="col-md-3">Remarks :</label>
                                    <div className="col-md-9">
                                        <textarea type="text" ref={input => this.txtRemarks = input} className="form-control" >
                                        </textarea>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label className="col-md-3">Date Picker :</label>
                                    <div className="col-md-9">
                                        <SingleDatePicker
                                            date={this.state.date} // momentPropTypes.momentObj or null
                                            onDateChange={date => { this.setState({ date })}} // PropTypes.func.isRequired
                                            focused={this.state.focused} // PropTypes.bool
                                            onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                                            />
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
            </div>
        )
    }
}

