
import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Destination from '../../models/Destination';
import DestinationAction from '../../store/action/DestinationAction';

class DestinationForm extends React.Component<any, any>{

    /**
     *
     */
    constructor() {
        super();
        this.state = {
            currentItem: new Destination("", "", ""),
            txtTitle: "",
            txtAbbreviation: ""
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentItem) {
            const {currentItem} = nextProps;
            this.setState({
                currentItem,
                txtTitle: currentItem.DestinationTitle,
                txtAbbreviation: currentItem.Abbreviation
            });
        }
    }

    formSubmit(e) {
        e.preventDefault();
        var objDestination: Destination, DestinationID, isInValid = false,_Abbreviation;
        const {txtTitle: DestinationTitle, txtAbbreviation: Abbreviation} = this.state;
        const {currentItem, destinations, showMessage} = this.props;

        if (Abbreviation.length !== 3) {
            showMessage("Abbreviation should consist of 3 letters, all upper case");            
            return;
        }
        _Abbreviation = Abbreviation.trim().toUpperCase();

        for (var key in destinations) {
            const ITEM = destinations[key];
            if (ITEM.DestinationTitle === DestinationTitle && ITEM.DestinationID !== currentItem.DestinationID) {
                showMessage("Another record with same Title already exists");
                isInValid = true;
                break;
            }

            if (ITEM.Abbreviation === _Abbreviation && ITEM.DestinationID !== currentItem.DestinationID) {
                showMessage("Another record with same Abbreviation already exists");
                isInValid = true;
                break;
            }
        }
        if (isInValid) { return; }

        objDestination = new Destination(currentItem.DestinationID, DestinationTitle, _Abbreviation);
        this.props.insertRow(objDestination);
        showMessage('Saved successfully');
    }

    form_Change(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    private createRenderer = render => ({input, meta, label, ...rest}) =>
        <div className="col-md-6">

            <label className="col-md-3">{label}</label>
            <div className="col-md-8">
                {render(input, label, rest)}

                {/*{((meta.touched && meta.error) || (meta.dirty && meta.invalid)) && 
                <div className="text-danger">   
                    {meta.error}
                </div>}*/}
                {meta.error &&
                    <div className="text-danger">
                        {meta.error}
                    </div>}
            </div>
        </div>

    private createInput = this.createRenderer((input, label, {type}) =>
        <input type={type} {...input} className="form-control" />
    )

    render() {
        //let {handleSubmit} = this.props;

        return (
            <div className="row">
                <div className="form-group" >

                    {/*<form onSubmit={handleSubmit(values => this.formSubmit(values))}>*/}
                    <form onChange={this.form_Change.bind(this)} onSubmit={this.formSubmit.bind(this)}>

                        {/*<Field name="DestinationTitle" component={this.createInput} label="Title" />
                        <Field name="Abbreviation" component={this.createInput} label="Abbreviation" />*/}

                        <div className="col-md-6">
                            <label className="col-md-3">Title</label>
                            <div className="col-md-8">
                                <input type="text" id="txtTitle" className="form-control" value={this.state.txtTitle}
                                    required />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label className="col-md-3">Abbreviation</label>
                            <div className="col-md-8">
                                <input type="text" id="txtAbbreviation" className="form-control"
                                    value={this.state.txtAbbreviation}
                                    required />
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

// let form = reduxForm({
//     form: 'DestinationForm',
//     validate: validate
// })(DestinationForm);

// form = connect(
//     state => ({ initialValues: state.Destination.data }),
//     function (dispatch) {
//         return {
//             load: function (data) {
//                 dispatch(DestinationAction.load(data))
//             }
//         }
//     }
// )(form);

//export default form;
export default DestinationForm;