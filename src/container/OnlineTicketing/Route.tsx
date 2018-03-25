import * as React from 'react';
import { connect } from 'react-redux';
import RouteAction from '../../store/action/RouteAction';
import DestinationAction from '../../store/action/DestinationAction';
import RouteForm from '../../component/OnlineTicketing/RouteForm';
import RouteList from '../../component/OnlineTicketing/RouteList';

function MapStateToProps(state) {
    return {
        routes: state.Route.routes,
        currentRoute: state.Route.currentRoute,
        destinations: state.Destination.destinations
    }
}

function MapDispatchToProps(dispatch) {
    return {
        getData: function () {
            dispatch(RouteAction.getData());
        },
        insertRow: function (data) {
            dispatch(RouteAction.insertRoute(data));
        },
        updateRow: function (id) {
            dispatch(RouteAction.getDataByKey(id));
        },
        deleteRow: function (id) {
            dispatch(RouteAction.deleteRoute(id));
        },
        getDestination: function () {
            dispatch(DestinationAction.getData());
        }
    }
}

class Routes extends React.Component<any, any>{

    componentWillMount() {
        this.props.getData();
        this.props.getDestination();
    }

    componentWillReceiveProps(nextProps){
        //console.log(nextProps.routes);
    }

    renderList(item, index) {
        return <RouteList
            key={item.RouteID}
            data={item}
            updateRow={this.props.updateRow}
            deleteRow={this.props.deleteRow} />
    }

    render() {
        //console.log('this.props.routes : ',this.props.routes, this.props.routes.length);
        //console.log('routes : ',Object.keys(this.props.routes))
        return (
            <div>
                <h1>Route</h1>
                <RouteForm
                    destinations={this.props.destinations}
                    insertRow={this.props.insertRow}
                    currentRoute={this.props.currentRoute} />

                <h2>List</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Start</th>
                            <th>End</th>
                            <td>    </td>
                            <td>    </td>
                        </tr>
                    </thead>
                    <tbody>
                        {/*{this.props.routes.map(this.renderList.bind(this))}*/}
                        {Object.keys(this.props.routes).map((key, index) =>
                            this.renderList(this.props.routes[key], index)
                            )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(Routes);