
import * as React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import Authenticate from '../../HOC/Authenticate';
import BusAction from  '../../store/action/BusAction';
import BusForm from '../../component/OnlineTicketing/BusForm';
import BusList from '../../component/OnlineTicketing/BusList';
import ErrorNotification from '../../component/ErrorNotification';
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
            buses : [],
            currentItem: new Bus("","","",0),
            errorMessage : ""
        }
    }

    componentWillReceiveProps(nextProps){
        let state : any = {};
        const {currentItem} = this.props; 
        const {currentItem : nextCurrentItem} = nextProps;
        
        if(nextCurrentItem.busID !== ""){
            state.currentItem = currentItem;
        }

        this.setState(state);
    }

    componentDidMount(){
        const {currentItem} = this.props;
        this.props.getData();

        this.setState({
            currentItem
        });
    }

    GetListItem(key,index){
        let bus = this.props.buses[key];
        return <BusList key={key} data={bus} 
                    updateRow={this.props.updateRow} deleteRow={this.props.deleteRow} />
    }

    updateParentState(key,value){
        this.setState({[key] : value});
    }

    render(){
        return(
            <div>
                <h1>Buses</h1>
                <ErrorNotification errorMessage={this.state.errorMessage} />
                <BusForm 
                    buses = {this.props.buses}
                    insertRow={this.props.insertRow} 
                    currentBus={this.props.currentItem}
                    updateParentState = {this.updateParentState.bind(this)} />
                {/*<h2>Bus List</h2>                */}

                <table className="table">
                    <thead>
                        <tr>
                            <th>Bus Title</th>
                            <th>Type</th>
                            <th>No Of Seats</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { Object.keys(this.props.buses).map(this.GetListItem.bind(this))}
                    </tbody>
                    
                </table>
                

            </div>
            
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Authenticate(Buses));