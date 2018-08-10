import * as React from 'react';
import {connect} from 'react-redux';
import ScheduleForm from '../../component/OnlineTicketing/ScheduleForm';
import SchduleList from '../../component/OnlineTicketing/ScheduleList';
import BusAction from '../../store/action/BusAction';
import RouteAction from '../../store/action/RouteAction';
import ScheduleAction from '../../store/action/ScheduleAction';
import ErrorNotification from '../../component/ErrorNotification';
import Authenticate from '../../HOC/Authenticate';

function mapStateToProps(state){
    return{
        schedules  : state.Schedule['schedules'],
        currentSchedule : state.Schedule['currentSchedule'],
        isClearForm: state.Schedule.isClearForm,
        routes : state.Route['routes'],
        buses : state.busReducer['buses'],
        errorMessage : state.Schedule['errorMessage'],
        uid : state.User.uid
    }
}

function mapDispatchToProps(dispatch){
    return{
        getBuses: function(){
            dispatch(BusAction.getData());
        },
        getRoutes : function(){
            dispatch(RouteAction.getData());
        },
        getData:function(){
            dispatch(ScheduleAction.getData(null));
        },
        insertRow:function(data){
            dispatch(ScheduleAction.insertRow(data));
        },
        updateRow : function(id){
            dispatch(ScheduleAction.GetDataByKey(id));
        },
        deleteRow : function(id){
            dispatch(ScheduleAction.DeleteRow(id));
        },
        formCleared : () => dispatch(ScheduleAction.formCleared())
    }
}

class Schedule extends React.Component<any,any>{

    /**
     *
     */
    constructor() {
        super();
        this.state={
            errorMessage: ""
        };
    }

    componentDidMount(){
        this.props.getData();
        this.props.getBuses();
        this.props.getRoutes();
    }

    renderList(key){
        let item;
        item = this.props.schedules[key];
        return (<SchduleList 
                   key={item.ScheduleID} data={item} routes={this.props.routes} buses={this.props.buses}
                   updateRow={this.props.updateRow} deleteRow={this.props.deleteRow} />)
    }

    showMessage(errorMessage){
        this.setState({errorMessage});
    }


    render(){
        return(
            <div>

                <h1>
                    Schedule
                </h1>

                <ErrorNotification errorMessage ={this.state.errorMessage} />

                <ScheduleForm 
                    routes = {this.props.routes} 
                    buses={this.props.buses}  
                    insertRow = {this.props.insertRow} 
                    currentSchedule = {this.props.currentSchedule}
                    isClearForm = {this.props.isClearForm}
                    formCleared = {this.props.formCleared}
                    schedules={this.props.schedules}
                    showMessage={this.showMessage.bind(this)}/>
                
                <div className="row">
                    <table className="table">
                        <thead>
                            <tr>
                                {/*<th>ID</th>*/}
                                <th>Title</th>
                                <th>Route</th>
                                <th>Bus</th>
                                <th>Departure Date</th>
                                <th>Departure Time</th>
                                <th>Arrival Date</th>
                                <th>Arrival Time</th>
                                {/*<th>Is Active</th>*/}
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(this.props.schedules).map(this.renderList.bind(this))}
                        </tbody>
                    </table>
                </div>
                {/*Detail*/}
            </div>
        )
        
    }
}

const authenticatedComponent = Authenticate(Schedule)
export default connect(mapStateToProps,mapDispatchToProps)(authenticatedComponent);