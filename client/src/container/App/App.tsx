import * as React from 'react'
import { Link,browserHistory } from 'react-router';
import Navbar from '../../component/Navbar';

export default class App extends React.Component<any,any>{ 
    constructor(){
        super();
    }
    

    render(){

        return(
            <div className="container-fluid">
                <Navbar />
                <div className="container body-content">
                    {this.props.children}        
                </div>                
            </div>
        )
    }
}