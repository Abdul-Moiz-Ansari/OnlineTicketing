import Ticket from './Ticket';

export default class Booking {
  //BookingID: number;
  BookingID		        :string;
  BookingRefNo: string;
  UserID: string;
  ScheduleID: number;
  StartDestinationID: number;
  EndDestinationID: number;
  TotalAmount: number;
  BookingDate: Date;
  BookingTime: string;
  IsActive: boolean;
  Tickets: Array<Ticket>;

  constructor(bookingID: string, bookingRefNo: string, userID: string, scheduleID: number, startDestinationID: number,
    endDestinationID: number, totalAmount: number, bookingDate: Date, bookingTime: string, isActive: boolean) {

    this.BookingID = bookingID;
    this.BookingRefNo = bookingRefNo;
    this.BookingDate = bookingDate;
    this.BookingTime = bookingTime;
    this.UserID = userID;
    this.ScheduleID = scheduleID;
    this.StartDestinationID = startDestinationID;
    this.EndDestinationID = endDestinationID;
    this.TotalAmount = totalAmount;
    this.IsActive = isActive;
    this.Tickets = [];
  }
}