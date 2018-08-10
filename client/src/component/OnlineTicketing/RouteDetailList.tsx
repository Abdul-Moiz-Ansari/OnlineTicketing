import * as React from 'react';


export default class RouteDetailList extends React.Component<any,any>{

    getDestinationTitle(id,idColName,titleColName,arr){
        let result = ""; var _arr = [];
        
        //console.log('id : ',id , 'colName',idColName,arr) ;
        if(typeof arr !== 'undefined' && arr.length > 0){
            _arr = arr.filter(function(item){
                return item[idColName] === id;
            });            

            if(typeof _arr !== 'undefined' ){
                if(_arr.length > 0)
                    result = _arr[0][titleColName];
            }
        }        

        return result;
    }

    updateRow(){
        let routeDetailID;
        routeDetailID = this.props.data.RouteDetailID;
        this.props.updateRow(routeDetailID);
    }

    deleteRow(){
        let routeDetailID,routeID;
        routeDetailID = this.props.data.RouteDetailID;
        routeID = this.props.data.RouteID;
        this.props.deleteRow(routeDetailID,routeID);
    }

    render(){
        let data = this.props.data;
        // let destinationTitle = this.getDestinationTitle(data.DestinationID,"DestinationID",
        //                                         "DestinationTitle",this.props.destinations);
        // let routeTitle = this.getDestinationTitle(data.RouteID,"RouteID",
        //                                         "RouteTitle",this.props.routes);
        return(
            <tr>
                <td>{data.RouteTitle}</td>
                <td>{data.DestinationTitle}</td>
                <td>{data.OrderNo}</td>
                <td>{data.SequenceType}</td>
                <td><a onClick={this.updateRow.bind(this)}>Edit</a></td>
                <td><a onClick={this.deleteRow.bind(this)}>Delete</a></td>
            </tr>
        )
    }
}