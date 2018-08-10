
import * as React from 'react';
import {connect} from 'react-redux';
import ChargesAction from '../../store/action/ChargesAction';
import BusAction from '../../store/action/BusAction';
import RouteAction from '../../store/action/RouteAction';
import DestinationAction from '../../store/action/DestinationAction';
import ChargesForm from '../../component/OnlineTicketing/ChargesForm';
import ChargesList from '../../component/OnlineTicketing/ChargesList';
import ErrorNotification from '../../component/ErrorNotification';

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
        },
        getMaxCharges : () => dispatch(ChargesAction.getMaxCharges(null))
    }
}

class  Charges extends React.Component<any,any>{

    /**
     *
     */
    constructor() {
        super();
        this.state = {
            errorMessage : ""
        };
    }
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

    showMessage(errorMessage){
        this.setState({errorMessage});
    }

    render(){
        return(
            <div>
                <h1>Charges</h1>

                <ErrorNotification errorMessage={this.state.errorMessage} />
                <div className="row">
                    <div className="col-md-offset-1 col-md-10">
                        <ChargesForm routes={this.props.routes} buses={this.props.buses} 
                            insertRow={this.props.insertRow}
                            destinations = {this.props.destinations}
                            currentCharges={this.props.currentCharges}
                            charges = {this.props.charges}
                            showMessage = {this.showMessage.bind(this)} />
                    </div>
                </div>

                <h2>List</h2>
                <table className="table">
                    <thead>
                        <tr>
                            {/*<th>ID</th>*/}
                            <th>Start Destination</th>
                            <th>End Destination</th>
                            <th>Bus</th>                            
                            <th>Charges</th>
                            {/*<th>IsActive</th>*/}

                            <th> </th>
                            <th> </th>
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