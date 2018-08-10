
import * as React from 'react';

export default class Option extends React.Component<any,any>{
    render(){
        return(
            <option value={this.props.value}>{this.props.text}</option>
        )
    }
}