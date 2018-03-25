
import * as React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
//import (Destination as DestinationM) from '../../models/Destination';

import Authenticate from '../../HOC/Authenticate';
import DestinationAction from '../../store/action/DestinationAction';
import DestinationForm from '../../component/OnlineTicketing/DestinationForm';
import DestinationList from '../../component/OnlineTicketing/DestinationList';


const mapStateToProps = state => {
    return {
        destinations: state.Destination.destinations,
        currentItem: state.Destination.currentItem,
        uid: state.User.uid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getData: (): void => dispatch(DestinationAction.getData()),
        getDataByKey: (payload): void => dispatch(DestinationAction.getDataByKey(payload)),
        insertRow: (payload): void => dispatch(DestinationAction.saveRow(payload)),
        deleteRow: (payload): void => dispatch(DestinationAction.deleteRow(payload)),
    }
}

class Destination extends React.Component<any, any>{

    constructor(){
        super();
        //this.state = {data : {DestinationID : ""} };
    }

    componentDidMount() {
        this.props.getData();       
    }

    // fetchDataByKey(data){
    //     console.log('fetch data',data);
    //     this.setState({data : data});
    // }

    GetListItem(key) {
        let destination = this.props.destinations[key];
        return <DestinationList key={key} data={destination}
            getDataByKey={this.props.getDataByKey} deleteRow={this.props.deleteRow} />
        /*return <DestinationList key={key} data={destination}
            getDataByKey={this.fetchDataByKey.bind(this)} deleteRow={this.props.deleteRow} />*/
    }

    render() {
        
        return (
            <div>
                <h1>Destinations</h1>
                <DestinationForm insertRow={this.props.insertRow} currentItem={this.props.currentItem} />

                <h2>Destination List</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Abbreviation</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(this.props.destinations).map(this.GetListItem.bind(this))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate(Destination));