

export default class Ticket{

    // public TicketID : number;
    public TicketID : string;
    public TicketRefNo : string;
    public BookingID :number;
    public CustomerName : string;
    public CustomerAge : number;
    public SeatNo : number;
    public Amount : number;
    public IsActive : boolean;

    constructor(ticketID:string,ticketRefNo: string,bookingID:number,customerName:string,customerAge : number,
        seatNo : number,amount:number,isActive : boolean)
    {
        this.TicketID = ticketID;
        this.TicketRefNo = ticketRefNo;
        this.BookingID = bookingID;
        this.CustomerName =customerName;
        this.CustomerAge = customerAge;
        this.SeatNo = seatNo;
        this.Amount = amount;
        this.IsActive = isActive;
    }

}