

export default class Charges {
    // ChargesID : number;
    ChargesID : string;
    ChargesRefNo : string;
    busID : number;
    RouteID : number;
    StartDestinationID : number;
    EndDestinationID : number;
    Charges : number;
    IsActive : boolean;

    constructor(chargesID:string,chargesRefNo:string,busID:number,routeID:number,startDestinationID:number,
                endDestionationID:number,charges:number,isActive:boolean){
        this.ChargesID = chargesID;
        this.ChargesRefNo = chargesRefNo;
        this.busID = busID;
        this.RouteID = routeID;
        this.StartDestinationID = startDestinationID;
        this.EndDestinationID = endDestionationID;
        this.Charges = charges;
        this.IsActive = isActive;
    }
}