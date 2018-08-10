

export default class Bus{
    
    constructor(busID ?: string,title?:string,type?:string,noOfSeats?:number){
        this.busID = busID;
        this.title = title;
        this.type = type;
        this.noOfSeats = noOfSeats;
    }

    public busID : string;
    public title:string;
    public type: string;
    public noOfSeats: number;

    // private _busID : string;
    // public get busID() : string {
    //     return this._busID;
    // }
    // public set busID(v : string) {
    //     this._busID = v;
    // }
    
    
    // private _title : string;
    // public get title() : string {
    //     return this._title;
    // }
    // public set title(v : string) {
    //     this._title = v;
    // }
    
    
    // private _type : string;
    // public get type() : string {
    //     return this._type;
    // }
    // public set type(v : string) {
    //     this._type = v;
    // }
    
    
    // private _noOfSeats : number;
    // public get noOfSeats() : number {
    //     return this._noOfSeats;
    // }
    // public set noOfSeats(v : number) {
    //     this._noOfSeats = v;
    // }
    
}