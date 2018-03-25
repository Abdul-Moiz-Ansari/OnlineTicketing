

export default class Route{

    // RouteID : number;
    RouteID : string;    
    RouteRefNo : string;
    RouteTitle:string;
    StartDestinationID : number;
    EndDestinationID : number;

    constructor(RouteID:string,RouteRefNo:string,RouteTitle:string,StartDestinationID : number,EndDestinationID : number){
        this.RouteID = RouteID;
        this.RouteRefNo = RouteRefNo;
        this.RouteTitle = RouteTitle;
        this.StartDestinationID= StartDestinationID;
        this.EndDestinationID = EndDestinationID;
    }
}