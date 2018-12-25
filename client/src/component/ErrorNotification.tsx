
import * as React from 'react';

interface iErrorNotification{
    errorMessage : string;
    setMessage ?: Function;
}

export default class ErrorNotification extends React.Component<any, any>{

    //if setMessage function is provided as prop then prop will be used as message, otherwise we'll have to copy message in state and 
    // clear state message when user clicks Clear button
    constructor() {
        super();
        this.state = {
            errorMessage: "",
            isSetMessageFuncProvided : false
        };
        this.clearMessage = this.clearMessage.bind(this);
    }

    componentDidMount() {
        if(this.props.setMessage){
             this.setState({isSetMessageFuncProvided : true});
        }
        else{
            this.setState({
                errorMessage: this.props.errorMessage
            });
        }        
    }

    componentWillReceiveProps(nextProps) {
            if (this.state.isSetMessageFuncProvided === false && nextProps.errorMessage !== this.state.errorMessage) {
            this.setState({
                errorMessage: nextProps.errorMessage
            });
        }
    }

    clearMessage() {
        if(this.state.isSetMessageFuncProvided === true){
            this.props.setMessage("");
        }
        else{
            this.setState({
                errorMessage: ""
            });
        }
        
    }

    render() {
        let errorMessage;        
        errorMessage = this.state.isSetMessageFuncProvided ? this.props.errorMessage : this.state.errorMessage;        
        
        return (
            <div className="row">
                <div className="col-md-6">
                    <p className="text-danger"> {errorMessage}
                        <a className="pull-right text-danger" onClick={this.clearMessage}
                            style={{ 'fontWeight': 'bold', 'cursor': 'pointer' }}>
                            {errorMessage !== "" ? "X" : ""}
                        </a>
                    </p>
                </div>
            </div>
        )
    }
}