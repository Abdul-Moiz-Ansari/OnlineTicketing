
import * as React from 'react';
import { connect } from 'react-redux';

import ChargesHelper from '../../Helper/ChargesHelper';

class SearchList extends React.Component<any, any>{

    getResultRows(results) {
        let arrResult = [], arrItems = [], charges, {isDashboard} = this.props;



        results.map((item, index) => {
            charges = new ChargesHelper().getCharges(item.StartDestinationID, item.EndDestinationID, item.busID, this.props.charges);

            if (isDashboard) {
                arrItems = [
                    <td key={0}>{item.BusTitle}</td>,
                    <td key={1}>{item.StartDestinationTitle}</td>,
                    <td key={2}>{item.EndDestinationTitle}</td>,
                    <td key={3}>{item.DepartureDate}</td>, 
                    <td key={4}>{charges}</td>
                ];
            }
            else {
                arrItems = [
                    <td key={0}>{item.BusTitle}</td>,
                    <td key={1}>{item.StartDestinationTitle}</td>,
                    <td key={2}>{item.EndDestinationTitle}</td>,
                    <td key={3}>{item.DepartureDate}</td>,
                    <td key={4}>{item.DepartureTime}</td>,
                    <td key={5}>{item.ArrivalDate}</td>,
                    <td key={6}>{item.ArrivalTime}</td>,
                    <td key={7}>{charges}</td>
                ]
            }

            arrResult.push(
                <tr key={index}>
                    {arrItems}
                </tr>
            );
        });

        return arrResult;
    }

    getCharges(pStartDestinationID, pEndDestinationID, pBusID) {
        let result: any = 0;
        const {charges} = this.props;

        for (let key in charges) {
            let item;
            item = charges[key];

            if (item.StartDestinationID === pStartDestinationID && item.EndDestinationID === pEndDestinationID && item.busID === pBusID) {
                result = item.Charges;
                break;
            }
        }
        result = result > 0 ? result : "Not found";
        return result;
    }

    render() {
        let resultRows = [], arrTH = [];
        const { data: results, isDashboard} = this.props;
        resultRows = this.getResultRows.call(this, results);

        if (isDashboard) {
            arrTH = [
                <th key={0}>Bus</th>,
                <th key={1}>From</th>,
                <th key={2}>To</th>,
                <th key={3}>Departure Date</th>,
                <th key={4}>Charges</th>
            ];
        }
        else {
            arrTH = [
                <th key={0}>Bus</th>,
                <th key={1}>From</th>,
                <th key={2}>To</th>,
                <th key={3}>Departure Date</th>,
                <th key={4}>Departure Time</th>,
                <th key={5}>Arrival Date</th>,
                <th key={6}>Arrival Time</th>,
                <th key={7}>Charges/Ticket</th>
            ];
        }

        return (
            <div className="row form-group">
                <table className="table">
                    <thead>
                        <tr>
                            {arrTH}
                        </tr>
                    </thead>

                    <tbody>
                        {resultRows}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default SearchList;