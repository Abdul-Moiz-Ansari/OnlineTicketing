
export default class Schedule{

    public ScheduleID : string;
    public ScheduleRefNo : string;
    public ScheduleTitle : string;
    public RouteID : string;
    public busID : string;
    public DepartureDate : Date;
    public DepartureTime : string;
    public ArrivalDate : Date;
    public ArrivalTime : string;
    public IsActive : Boolean;

    constructor(scheduleID : string,scheduleRefNo :string,scheduleTitle :string,routeID : string,busID : string,
                departureDate:Date,departureTime:string,arrivalDate : Date,arrivalTime : string,isActive : Boolean){
        this.ScheduleID = scheduleID;
        this.ScheduleRefNo = scheduleRefNo;
        this.ScheduleTitle = scheduleTitle;
        this.RouteID = routeID;
        this.busID = busID;
        this.DepartureDate = departureDate;
        this.DepartureTime = departureTime;
        this.ArrivalDate = arrivalDate;
        this.ArrivalTime = arrivalTime;
        this.IsActive = isActive;
    }

}