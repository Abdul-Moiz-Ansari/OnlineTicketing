
import * as React from 'react';
import {connect} from 'react-redux';
import RouteDetailAction from '../../store/action/RouteDetailAction';
import RouteAction from '../../store/action/RouteAction';
import DestinationAction from '../../store/action/DestinationAction';
import RouteDetailForm from '../../component/OnlineTicketing/RouteDetailForm';
import RouteDetailList from '../../component/OnlineTicketing/RouteDetailList';
import ShowRoute from '../../component/OnlineTicketing/ShowRoute';
import RouteDetail from '../../models/RouteDetail';
import ErrorNotification from '../../component/ErrorNotification';

function MapStateToProps(state){
    return{
        routeDetails : state.RouteDetail["routeDetails"],
        currentRouteDetail : state.RouteDetail["currentRouteDetail"],
        routes : state.Route["routes"],
        destinations : state.Destination['destinations'],
        routeID : state.RouteDetail['routeID'],
        errorMessage : state.RouteDetail['errorMessage']
    }
}

function MapDispatchToProps(dispatch){
    return{
        getData:function(){
             dispatch(RouteDetailAction.getData());
        },
        getDataByRouteID :function(routeID){
            dispatch(RouteDetailAction.getDatabyRouteID(routeID));
        },
        insertRow:function(data){
            //console.log('entered in function');
            dispatch(RouteDetailAction.insertRow(data));
        },
        // changeRouteID:function(routeID){
        //     dispatch(RouteDetailAction.changeRouteID(routeID));
        // },
        updateRow:function(id){
            dispatch(RouteDetailAction.getDataByKey(id));
        },
        deleteRow:function(routeDetailID,routeID){
            dispatch(RouteDetailAction.deleteRow(routeDetailID,routeID));
        },
        getRoutes : function(){
            dispatch(RouteAction.getData());
        },
        getDestinations : function(){
            dispatch(DestinationAction.getData());
        }
    }
}

class RouteDetailC extends React.Component<any,any>{

    constructor(){
        super();
        this.state = {
            routeID : ""
            //,errorMessage : ""
        }
    }

    changeRoute(pRouteID){
        this.setState({routeID : pRouteID});
    }

    componentDidMount(){
        this.props.getData();     //grid won't be filled on mount
        this.props.getRoutes(); 
        this.props.getDestinations();   
        this.setState({
            routeID : this.props.routeID
            //,errorMessage : this.props.errorMessage
        });     
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.routeID  !== this.props.routeID)
            this.setState({routeID : nextProps.routeID});
        
    }

    insertRow(obj){
        let RouteID = this.state.routeID;
        let _RouteDetail = new RouteDetail(obj.RouteDetailID,RouteID,obj.DestinationID,obj.OrderNo,obj.SequenceType);
        this.props.insertRow(_RouteDetail);
        // this.setState({
        //     currentRoute: 0,
        //     currentRouteDetail : new RouteDetail(0,0,0,0,"")
        // });
    }

    getList(key,index){
        let item;
        item = this.props.routeDetails[key];
        return (<RouteDetailList 
                            data={item} key={item.RouteDetailID} 
                            destinations={this.props.destinations} 
                            routes={this.props.routes}
                            updateRow={this.props.updateRow}
                            deleteRow={this.props.deleteRow}
                />)
    }

    
    render(){
        return(
            <div>
                <h1>Route Detail </h1>

                <ErrorNotification errorMessage= {this.props.errorMessage} />
                <div className="row">
                    <ShowRoute  routes={this.props.routes} 
                                routeID={this.state.routeID} 
                                changeRoute={this.changeRoute.bind(this)} 
                                getDataByRouteID={this.props.getDataByRouteID} />
                </div>
                <div className="row">
                    <RouteDetailForm    insertRow={this.insertRow.bind(this)} 
                                        destinations={this.props.destinations}
                                        routes={this.props.routes}
                                        currentRouteDetail = {this.props.currentRouteDetail} />
                </div>                

                <div className="row">
                    <table className="table">
                        <thead> 
                            <tr>
                                <th>Route</th>
                                <th>Destination</th>
                                <th>Order No</th>
                                <th>Sequence type</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody> 
                            {/*{this.props.routeDetails.map(this.getList.bind(this))}*/}
                            {Object.keys(this.props.routeDetails).map(this.getList.bind(this))}
                        </tbody>                        
                    </table>                    
                </div>                            
            </div>
        )
    }
}

export default connect(MapStateToProps,MapDispatchToProps)(RouteDetailC);