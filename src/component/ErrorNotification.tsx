
import * as React from 'react';

export default class ErrorNotification extends React.Component<any, any>{

    constructor() {
        super();
        this.state = {
            errorMessage: ""
        };
    }

    componentDidMount() {
        this.setState({
            errorMessage: this.props.errorMessage
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errorMessage !== this.state.errorMessage) {
            this.setState({
                errorMessage: nextProps.errorMessage
            });
        }
    }

    clearMessage() {
        //console.log('clicked');
        this.setState({
            errorMessage: ""
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <p className="text-danger"> {this.state.errorMessage}
                        <a className="pull-right text-danger" onClick={this.clearMessage.bind(this)}
                            style={{ 'fontWeight': 'bold', 'cursor': 'pointer' }}>
                            {this.state.errorMessage !== "" ? "X" : ""}
                        </a>
                    </p>
                </div>
            </div>
        )
    }
}