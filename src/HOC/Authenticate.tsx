
import * as React from 'react';
import { Component } from 'react';
import {browserHistory} from 'react-router';

// import * as React from 'react';
// import { Component } from 'react';

// export default function HOCBaseRender<Props,State, ComponentState>(
//     Comp: new() => Component<any,any>) {
//     return class HOCBase extends Component<any, any> {
//         render() {
//             return <Comp {...this.props} {...this.state}/>;
//         }
//     }
// }

export default function Authenticate<Props, State, ComponentState>(Comp : new () => Component<any, any>) {
    return class Authenticate extends Component<any, any>{

        //private isAuth = APP_CONFIG.developmentMode;

        componentDidMount(){
            if(this.props.uid.trim() === ""){
                //if(this.isAuth){browserHistory.push('/signin');} 
               //browserHistory.push('/signin'); //commented for development mode
            }
        }

        componentWillReceiveProps(nextProps){
            if(nextProps.uid.trim() === ""){
                //browserHistory.push('/signin'); //commented for development mode
            }
        }

        render() {
            return <Comp {...this.props} {...this.state} />
        }
    }
}

declare let APP_CONFIG :any;