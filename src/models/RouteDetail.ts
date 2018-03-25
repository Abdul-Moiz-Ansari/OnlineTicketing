
export default class RouteDetail{

    constructor(routeDetailID:string,routeID:string,destinationID:string,orderNo : number,sequenceType : string){
        this.RouteDetailID = routeDetailID;
        this.RouteID = routeID;
        this.DestinationID = destinationID;
        this.OrderNo = orderNo;
        this.SequenceType = sequenceType;
    }

    RouteDetailID : string;
    RouteID : string;
    DestinationID : string;
    OrderNo : number;
    SequenceType : string;
}