

export function getFormattedDate(date, format, delimiter = "/") {
    let result = date;
    date = new Date(date);
    let day, month, year;
    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();
    day = day < 10 ? "0" + day.toString() : day.toString();
    month = month < 10 ? "0" + month.toString() : month.toString();
    switch (format.toLowerCase()) {
        case "mm/dd/yyyy":
            result = month + delimiter + day + delimiter + year.toString();
            break;

        case "dd/mm/yyyy":
            result = day + delimiter + month + delimiter + year.toString();
            break;

        case "yyyy/mm/dd":
            result = year.toString() + delimiter + month + delimiter + day;
            break;

        default:
            result = date.toString();
            break;
    }
    return result;
}