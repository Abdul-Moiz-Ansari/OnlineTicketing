import * as React from 'react';
import {connect} from 'react-redux';
//import {CounterAction as Action} from '../../store/action/counter';
import { Back } from '../../component/Back';
import {ShowCounter} from '../../component/ShowCounter';

function mapStateToProps(state:any){
    return{
        counter:state.counterReducer['count']
    }
}


class About extends React.Component<any,any>{

    constructor(){
        super();
    }

    render(){
        return(
            <div>
                <h1>About</h1>
               
                <ShowCounter counter={this.props.counter} />
                
                <Back />
            </div>
        )
    }
}

export default connect(mapStateToProps,null)(About);