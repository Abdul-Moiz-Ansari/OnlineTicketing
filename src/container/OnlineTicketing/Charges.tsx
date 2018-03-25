
import * as React from 'react';
import {connect} from 'react-redux';
import ChargesAction from '../../store/action/ChargesAction';
import BusAction from '../../store/action/BusAction';
import RouteAction from '../../store/action/RouteAction';
import DestinationAction from '../../store/action/DestinationAction';
import ChargesForm from '../../component/OnlineTicketing/ChargesForm';
import ChargesList from '../../component/OnlineTicketing/ChargesList';

function MapStateToProps(state){
    return{
        charges : state.Charges.charges,
        currentCharges : state.Charges.currentCharges,
        buses : state.busReducer.buses,
        routes : state.Route.routes,
        destinations : state.Destination.destinations
    }
}

function MapDispatchToProps(dispatch){
    return{
        getData : function(){
            dispatch(ChargesAction.getCharges());
        },
        insertRow : function(data){
            dispatch(ChargesAction.insertCharges(data));
        },
        updateRow:function(id){
            dispatch(ChargesAction.getChargesByKey(id));
        },
        deleteRow : function(id){
            dispatch(ChargesAction.deletecharges(id));
        },
        getBus : function(){
            dispatch(BusAction.getData());
        },
        getRoutes : function(){
            dispatch(RouteAction.getData());
        },
        getDestinations : function(){
            dispatch(DestinationAction.getData());
        }
    }
}

class  Charges extends React.Component<any,any>{

    componentWillMount(){
        this.props.getData();
        this.props.getBus();
        this.props.getRoutes();
        this.props.getDestinations();
    }
    //renderList(item){
    renderList(key){
        let item;
        item = this.props.charges[key];
        return <ChargesList key={item.ChargesID} charges={item} buses={this.props.buses} routes={this.props.routes}
                    updateRow={this.props.updateRow} deleteRow={this.props.deleteRow}
                    destinations={this.props.destinations} /> 
    }

    render(){
        return(
            <div>
                <h1>Charges</h1>

                <div className="row">
                    <div className="col-md-offset-1 col-md-10">
                        <ChargesForm routes={this.props.routes} buses={this.props.buses} 
                            insertRow={this.props.insertRow}
                            destinations = {this.props.destinations}
                            currentCharges={this.props.currentCharges} />
                    </div>
                </div>

                <h2>List</h2>
                <table className="table">
                    <thead>
                        <tr>
                            {/*<td>ID</td>*/}
                            <td>Start Destination</td>
                            <td>End Destination</td>
                            <td>Bus</td>                            
                            <td>Charges</td>
                            {/*<td>IsActive</td>*/}

                            <td> </td>
                            <td> </td>
                        </tr>
                    </thead>
                    <tbody>
                        {/*{this.props.charges.map(this.renderList.bind(this))}*/}
                        { Object.keys(this.props.charges).map(this.renderList.bind(this))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect(MapStateToProps,MapDispatchToProps)(Charges);