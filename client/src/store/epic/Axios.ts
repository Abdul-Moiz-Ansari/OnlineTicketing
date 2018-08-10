
import axios from 'axios';

export default class AxiosService{
    static Get_CORS(url){
        var promise = axios.get(url,{
                    headers:{
                        'crossDomain':true,
                        "dataType" : 'jsonp'
                    }
                });
        return promise;
    }

    static Post_CORS(url,data){
        let promise = axios.post(url,data,{headers:{
                        'crossDomain':true,
                        "dataType":'jsonp',
                        "contentType" : 'application/json'
                    }
                });

        return promise;
    }

    static Delete_CORS(url){
        let promise = axios.delete(url ,{headers:{
                        'crossDomain':true,
                        "dataType":'jsonp',
                        "contentType" : 'application/json'
                    }
                });

        return promise;
    }

    // static port = "http://localhost:49337/api/";
    static port = APP_CONFIG.api_key;
}

declare let APP_CONFIG : any;