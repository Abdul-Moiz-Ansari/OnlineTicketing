

 export default class ComponentHelper{
//export default class CommontHelper{
    
    onFormChange(e,pScope){
        let state = pScope.state;
        state[e.target.id] = e.target.value;
        pScope.setState(state);
    }

    getTitle(idColName,titleColName,id,arr){
        let result = ""; var _arr = [];
        
        //console.log('id : ',id , 'colName',idColName,arr) ;
        if(typeof arr !== 'undefined' && arr.length > 0){
            _arr = arr.filter(function(item){
                return item[idColName] === id;
            });            

            if(typeof _arr !== 'undefined' ){
                if(_arr.length > 0)
                    result = _arr[0][titleColName];
            }
        }        

        return result;
    }

    getFormattedDate(date,format,delimiter = "/"){
        let result = date;
        date = new Date(date);
        let day,month,year;
        day = date.getDate();
        month = date.getMonth()+1;
        year = date.getFullYear();
        day = day < 10 ? "0" +day.toString() : day.toString();
        month = month < 10 ? "0" + month.toString() : month.toString();
        switch(format.toLowerCase()){
            case "mm/dd/yyyy":
                result = month + delimiter + day + delimiter + year.toString();
                break;

            case "dd/mm/yyyy":
                result = day + delimiter + month + delimiter + year.toString();
                break;
            
            case "yyyy/mm/dd":
                result =  year.toString() + delimiter + month + delimiter + day;
                break;

            default:
                result = date.toString();
                break;
        }
        return result;
    }

    // getOptionsFromState(stateOptions, valueName, titleName) {
    //     let options = [];
    //     if (stateOptions.length > 0) {
    //         options = stateOptions.map(function (item, index) {
    //             return (<option value={item[valueName]} key={item[valueName]}>{item[titleName]}</option>)
    //         });
    //     }
    //     options.unshift(<option key={0} value="0">Select</option>)
    //     return options;
    // }
}