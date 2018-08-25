

export default class Searchhelper {

    getSearchResults_ForDashboard(pStartDestinationID: String, pMinDepartureDate: Date, {...rest}): Array<Object> {
        const {schedules, destinations, bookings, tickets, isMatchDestination} = rest;
        let arrMatchingSchedules = [];

        pMinDepartureDate.setHours(0, 0, 0, 0);

        Object.keys(schedules).map(key => {
            let noOfSeats = 0, noOfSeatsBooked = 0, diff, isAvailable, item, isScheduleMatched = false;
            let ScheduleDepartureDate: Date;

            item = schedules[key];
            ScheduleDepartureDate = new Date(item.DepartureDate);
            ScheduleDepartureDate.setHours(0, 0, 0, 0);

            if (isMatchDestination === true) {
                if (item.StartDestinationID === pStartDestinationID &&
                    ScheduleDepartureDate.getTime() >= pMinDepartureDate.getTime()) {
                    noOfSeats = item.NoOfSeats;
                }
            }
            else {
                if (ScheduleDepartureDate.getTime() >= pMinDepartureDate.getTime()) {
                    noOfSeats = item.NoOfSeats;
                }
            }
            
            if (noOfSeats > 0) {
                Object.keys(bookings).map(bookingKey => {
                    let booking;
                    booking = bookings[key];

                    if (item.BookingID === booking.BookingID)
                        Object.keys(tickets).map(ticketKey => {
                            if (tickets[ticketKey].BookingID === booking.BookingID) { noOfSeatsBooked++; }
                        });
                });

                diff = noOfSeats - noOfSeatsBooked;
                
                if (diff > 0)
                    arrMatchingSchedules.push(item);
            }

        });

        return arrMatchingSchedules;
    }
}