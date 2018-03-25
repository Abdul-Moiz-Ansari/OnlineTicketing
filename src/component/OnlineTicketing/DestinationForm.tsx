
import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Destination from '../../models/Destination';
import DestinationAction from '../../store/action/DestinationAction';

class DestinationForm extends React.Component<any, any>{    

    // componentDidMount() {
    //     this.setState({
    //         destination: this.props.destination
    //     });
    // }

    // componentWillReceiveProps(nextProps) {         
        
    // }

    // clearForm() {
    //     this.setState({
    //         destination: new Destination("", ""),
    //     })
    // }

    formSubmit(values) {
        //console.log('reached form submit, values : ', values);
        var objDestination: Destination,DestinationID;

        if(Object.keys(values).length === 0){
            window.alert('Please fill out the below fields');
            return;
        }

        const {DestinationTitle, Abbreviation} = values;
        const {currentItem} = this.props;

        objDestination = new Destination(currentItem.DestinationID, DestinationTitle, Abbreviation);        
        this.props.insertRow(objDestination);
    }

    //customSubmitValidation(){

    //}

    private createRenderer = render => ({input, meta, label, ...rest}) =>
        <div className="col-md-6">
            
            <label className="col-md-3">{label}</label>
            <div className="col-md-8">
                {render(input, label, rest)}

                {/*{((meta.touched && meta.error) || (meta.dirty && meta.invalid)) && 
                <div className="text-danger">   
                    {meta.error}
                </div>}*/}
                { meta.error && 
                <div className="text-danger">   
                    {meta.error}
                </div>}
            </div>
        </div>

    private createInput = this.createRenderer((input, label, {type}) =>
        <input type={type} {...input} className="form-control" />
    )

    render() {
        let {handleSubmit} = this.props;

        return (
            <div className="row">
                <div className="form-group" >

                    <form onSubmit={handleSubmit(values => this.formSubmit(values))}>

                        <Field name="DestinationTitle" component={this.createInput} label="Title" />
                        <Field name="Abbreviation" component={this.createInput} label="Abbreviation" />

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

    //console.log('error values : ' , values);

    if (!values.DestinationTitle) {
        errors.DestinationTitle = "*";
    }

    if (!values.Abbreviation) {
        errors.Abbreviation = "*";
    } else if (values.Abbreviation.toString().length !== 3) {
        errors.Abbreviation = "Should contain 3 characters";
    }

    return errors;
}

let form = reduxForm({
    form: 'DestinationForm',
    validate: validate
})(DestinationForm);

form = connect(
    state => ({ initialValues: state.Destination.data }),
    function (dispatch) { 
        return { load: function (data) 
            {
                 dispatch(DestinationAction.load(data)) 
            } 
        } }
)(form);

export default form;