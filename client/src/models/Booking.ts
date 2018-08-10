import Ticket from './Ticket';

export default class Booking {
  //BookingID: number;
  BookingID: string;
  BookingRefNo: string;
  UserID: string;
  ScheduleID: number;
  StartDestinationID: number;
  EndDestinationID: number;
  TotalAmount: number;
  BookingDate: Date;
  BookingTime: string;
  IsActive: boolean;
  Tickets: Object;    //because we are dealing with Firebase
  ScheduleTitle: string;
  DepartureDate: Date;
  ArrivalDate: Date;
  StartDestinationTitle: string;
  EndDestinationTitle: string;
  BusID: string;
  BusTitle: string;

  constructor(bookingID: string, bookingRefNo: string, userID: string, scheduleID: number, startDestinationID: number,
    endDestinationID: number, totalAmount: number, bookingDate: Date, bookingTime: string, isActive: boolean,
    scheduleTitle: string, departureDate: Date, arrivalDate: Date, startDestinationTitle: string, endDestinationTitle: string,
    busID: string, busTitle: string , tickets? : Object) {

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
    this.ScheduleTitle = scheduleTitle;
    this.DepartureDate = departureDate;
    this.ArrivalDate = arrivalDate;
    this.StartDestinationTitle = startDestinationTitle;
    this.EndDestinationTitle = endDestinationTitle;
    this.BusID = busID;
    this.BusTitle = busTitle;
    this.Tickets = tickets; 
  }
}