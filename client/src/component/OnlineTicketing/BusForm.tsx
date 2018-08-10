
import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import reduxFormHelper from '../../helper/reduxFormHelper';
import Bus from '../../models/Bus';
import BusAction from '../../store/action/BusAction';


class BusForm extends React.Component<any, any>{

    /**
     *
     */
    constructor() {
        super();

        this.state = {
            txtTitle: "",
            ddlType: "",
            txtNoOfSeats: ""
        };
    }

    componentDidMount() {
        this.setState({
            currentBus: this.props.currentBus
        });
    }

    componentWillReceiveProps(nextProps) {

        // if (nextProps.currentBus.busID !== "") {
        if (nextProps.currentBus) {
            const { currentBus: bus} = nextProps;
            this.setState({
                currentBus: bus,
                txtTitle: bus.title,
                ddlType: bus.type,
                txtNoOfSeats: bus.noOfSeats
            });
        }
    }

    clearForm() {
        this.setState({
            currentBus: new Bus("", "", "", 0),
        })
    }

    // formSubmit(values) {
    formSubmit(e) {
        e.preventDefault();
        var bus: Bus,isInValid = false;
        const {txtTitle: title, ddlType: type, txtNoOfSeats: noOfSeats,currentBus} = this.state;
        const {buses,updateParentState} = this.props;

        if (parseInt(noOfSeats) === 0) {
            updateParentState('errorMessage', 'No of Seats should be more than 0');
            return;
        }

        for (let key in buses) {
            //const ITEM = buses[key];
            let item;
            item = buses[key];
            console.log(item,currentBus);
            if (item.title === title && item.busID !== currentBus.busID) {
                updateParentState('errorMessage', 'Another record already exists with same Title');
                isInValid = true;
                break;
            }
        }
        if(isInValid){return;}
        bus = new Bus(currentBus.busID, title, type, noOfSeats);

        this.props.insertRow(bus);
        this.props.updateParentState('errorMessage', 'Saved successfully');
        //this.clearForm();
        //this.props.reset();
    }

    onFormChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    private busTypes = [
        { value: "express", title: "Express" },
        { value: "luxury", title: "Luxury" },
        { value: "volvo", title: "Volvo Non-AC" },
        { value: "volvoac", title: "Volvo AC" },
    ];

    private getBusOptions = () => {
        let results = [];
        results = Object.keys(this.busTypes).map((key, index) => {
            let item = this.busTypes[key];
            return (<option key={item.value} value={item.value}  >{item.title}</option>);
        })
        results.unshift(<option key={0} value="">Select</option>);
        return results;
    }

    private createRenderer = render => ({input, meta, label, ...rest}) =>
        <div className="col-md-6">
            <label className="col-md-3">{label}</label>
            <div className="col-md-8">
                {render(input, label, rest)}

                <div className="text-danger">
                    {meta.error && meta.touched ? meta.error : ''}
                </div>
            </div>
        </div>

    private createInput = this.createRenderer((input, label, {type}) =>
        <input type={type} {...input} className="form-control" />
    )

    public createSelect = this.createRenderer((input, label, {children}) =>
        <select {...input} className="form-control" >
            <option>Select</option>
            {children}
        </select>
    )

    render() {
        //let {handleSubmit} = this.props;
        let busOptions;
        busOptions = this.getBusOptions();
        return (

            <div className="row">
                <div className="form-group" >

                    {/*<form onSubmit={handleSubmit(values => this.formSubmit(values))}>*/}
                    <form onChange={this.onFormChange.bind(this)} onSubmit={this.formSubmit.bind(this)}>

                        {/*<Field name="title" component={this.createInput} label="Title" />

                        <Field name="type" component={this.createSelect} label="Type" >
                            {Object.keys(this.busTypes).map((key, index) => { 
                                let item = this.busTypes[key]; 
                                return <option key={item.value} value={key}  >{item.title}</option> 
                                })}
                        </Field>

                        <Field name="noOfSeats" component={this.createInput} label="No Of Seats" />*/}

                        <div className="col-md-6">
                            <label className="col-md-3">Title</label>
                            <div className="col-md-8">
                                <input type="text" id="txtTitle" className="form-control"
                                    value={this.state.txtTitle} required />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label className="col-md-3">Type</label>
                            <div className="col-md-8">
                                <select id="ddlType" value={this.state.ddlType} className="form-control" required >
                                    {busOptions}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label className="col-md-3">No Of Seats</label>
                            <div className="col-md-8">
                                <input type="number" id="txtNoOfSeats" className="form-control"
                                    value={this.state.txtNoOfSeats} required />
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="text-center">
                                <input type="submit" value="Save" className="btn btn-primary" />
                            </div>
                        </div>

                    </form>
                </div >
            </div >
        )
    }
}

const validate = (values) => {
    const errors: any = {};

    if (!values.title) {
        errors.title = "Required";
    }

    if (!values.type) {
        errors.type = "Required";
    }

    if (!values.noOfSeats) {
        errors.noOfSeats = "Required";
    }
    else if (values.noOfSeats.toString().trim() === "0") {
        errors.noOfSeats = "Should be more than 1";
    }
    else if (isNaN(values.noOfSeats)) {
        errors.noOfSeats = "Should be a numeric value";
    }

    return errors;
}

let form = reduxForm({
    form: 'BusForm',
    validate: validate
})(BusForm);

form = connect(
    state => ({ initialValue: state.busReducer.currentItem }),
    dispatch => ({ load: (payload) => dispatch(BusAction.load(payload)) })
)(form);

export default form;