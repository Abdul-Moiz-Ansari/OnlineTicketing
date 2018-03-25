import * as React from 'react';
import {browserHistory} from 'react-router';

export class Back extends React.Component<any,any>{

    constructor(){
        super();
    }
    goBack(e){
        e.preventDefault();
        browserHistory.goBack();
    }
    
    render(){
        return(
            <span onClick={this.goBack} style={{color:'purple',cursor:'pointer'}} >Back</span>
        )
    }
}