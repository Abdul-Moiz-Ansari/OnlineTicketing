
import * as React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
//import Griddle,{plugins,RowDefinition,ColumnDefinition} from 'griddle-react';

import Authenticate from '../../HOC/Authenticate';
import BusAction from  '../../store/action/BusAction';
import BusForm from '../../component/OnlineTicketing/BusForm';
import BusList from '../../component/OnlineTicketing/BusList';
import Bus from '../../models/Bus';

function mapStateToProps(state){
    return{
        buses : state.busReducer['buses'],
        currentItem : state.busReducer['currentItem'],
        uid : state.User.uid
    }
}

function mapDispatchToProps(dispatch){
    return{
        getData : () : void => {dispatch(BusAction.getData());
        },
        insertRow : (data) : void => {
            dispatch(BusAction.insertRow(data));
        } ,
        updateRow : (id) : void => {
            dispatch(BusAction.getDataByKey(id));
        },
        deleteRow : (id) : void =>{
            dispatch(BusAction.deleteRow(id));
        }
    }
}

class Buses extends React.Component<any,any>{

    constructor(){
        super();
        this.state = {
            buses : []
        }
    }

    componentDidMount(){
        this.props.getData();
    }

    //componentWillReceiveProps(nextProps){
        //if(this.props.buses)
    //}    

    GetListItem(key,index){
        let bus = this.props.buses[key];
        return <BusList key={key} data={bus} 
                    updateRow={this.props.updateRow} deleteRow={this.props.deleteRow} />
    }

    render(){
        return(
            <div>
                <h1>Buses</h1>
                <BusForm insertRow={this.props.insertRow} currentBus={this.props.currentItem} />
                <h2>Bus List</h2>
                {/*<ul>
                    {this.props.buses.map(this.GetListItem.bind(this))}
                </ul>*/}
                <ul>
                    { Object.keys(this.props.buses).map(this.GetListItem.bind(this))}
                </ul>
                {/*<Griddle data={this.props.buses} />*/}              

            </div>
            
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Authenticate(Buses));