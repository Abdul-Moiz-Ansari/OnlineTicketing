
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

interface IAuthenticate {
    uid: string;
}

type HOC<childProps, hocProps> = React.ComponentClass<childProps & hocProps> | React.SFC<childProps & hocProps>;

function Authenticate<Props, State>(Comp: HOC<Props, IAuthenticate | any>): React.ComponentClass<any> {
    
    class Authenticate extends Component<any, any>{

        componentDidMount() {
            if (this.props.uid.trim() === "") {
                browserHistory.push('/signin'); 
            }
        }

        componentWillReceiveProps(nextProps) {
            if (nextProps.uid.trim() === "") {
                browserHistory.push('/signin'); 
            }
        }

        render() {
            return <Comp {...this.props} {...this.state} />
        }
    }

    const mapStateToProps = (state) : IAuthenticate => {
        return {
            uid : state.User.uid
        }
    }

    return connect(mapStateToProps)(Authenticate);
}

export default Authenticate;