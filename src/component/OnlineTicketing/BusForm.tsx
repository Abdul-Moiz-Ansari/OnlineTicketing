
import * as React from 'react';
import { Field, reduxForm } from 'redux-form';

import reduxFormHelper from '../../helper/reduxFormHelper';
import Bus from '../../models/Bus';


class BusForm extends React.Component<any, any>{

    componentDidMount() {
        this.setState({
            currentBus: this.props.currentBus
        });
    }

    componentWillReceiveProps(nextProps) {
        let bus: Bus;
        if (this.props.currentBus.busID !== nextProps.currentBus.busID) {
            bus = nextProps.currentBus;
            this.setState({
                currentBus: bus,                
            });
        }
    }

    clearForm() {
        this.setState({
            currentBus: new Bus("", "", "", 0),            
        })
    }
    
    formSubmit(values) {
        var bus: Bus, currentBus: Bus;
        const {title, type, noOfSeats} = values;

        currentBus = this.state.currentBus;        
        bus = new Bus(currentBus.busID, title, type, noOfSeats);
        
        this.props.insertRow(bus);
        //this.clearForm();
        //this.props.reset();
    }

    private busTypes = [
        { value: "express", title: "Express" },
        { value: "luxury", title: "Luxury" },
        { value: "volvo", title: "Volvo Non-AC" },
        { value: "volvoac", title: "Volvo AC" },
    ];

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
        //let rfHelper;
        let {handleSubmit} = this.props;
        //rfHelper = new reduxFormHelper();

        return (

            <div className="row">
                <div className="form-group" >
                    
                    <form onSubmit={handleSubmit(values => this.formSubmit(values))}>

                        <Field name="title" component={this.createInput} label="Title" />

                        <Field name="type" component={this.createSelect} label="Type" >
                            {Object.keys(this.busTypes).map((key, index) => { 
                                let item = this.busTypes[key]; 
                                return <option key={item.value} value={key}  >{item.title}</option> 
                                })}
                        </Field>

                        <Field name="noOfSeats" component={this.createInput} label="No Of Seats" />

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

const validate = (values) =>{
    const errors :any = {};

    if(!values.title){
        errors.title = "Required";
    }

    if(!values.type){
        errors.type = "Required";
    }

    if(!values.noOfSeats){    
        errors.noOfSeats = "Required";
    }
    else if(values.noOfSeats.toString().trim() === "0" ){
        errors.noOfSeats = "Should be more than 1";
    }
    else if( isNaN(values.noOfSeats)){
        errors.noOfSeats = "Should be a numeric value";
    }

    return errors;
}

export default reduxForm({
    form: 'BusForm',
    validate : validate
})(BusForm);