

export default class ChargesHelper{

    getCharges(pStartDestinationID, pEndDestinationID, pBusID,charges) {
        let result : any = 0;
        //const {charges} = this.props;
        //console.log('hello');
        for (let key in charges) {
            let item;
            item = charges[key];
            
            if (item.StartDestinationID === pStartDestinationID && item.EndDestinationID === pEndDestinationID 
                    && item.busID === pBusID) {
                result = item.Charges;
                break;
            }
        }
        result = result > 0 ? result : "Not found";
        return result;
    }
}