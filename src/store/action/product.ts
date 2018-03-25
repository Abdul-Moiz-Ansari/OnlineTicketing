//import axios from 'axios';


//HERE I am making my actions
export class ProductAction{
    static FETCH_ProductS = "FETCH_ProductS";
    static FETCH_ProductS_SUCCESS ="FETCH_ProductS_SUCCESS";
    static FETCH_ProductS_FAILED = "FETCH_ProductS_FAILED";
    static ADD_Product = "ADD_Product";
    static REMOVE_Product= "REMOVE_Product";

    static fetchProducts(){
        //let promise =  axios.get("http://rest.learncode.academy/api/wstern/Products")
        //let promise = axios.get("http://localhost:49337/api/values");
        return function(dispatch){
            //Original
            // promise.then(function(response){
            //     dispatch(ProductAction.fetchProductsSuccess(response))
            // }).catch(function(err){
            //   //  dispatch(ProductAction.FETCH_ProductS_FAILED("error"))
            // })

            //Dummy
            dispatch(ProductAction.fetchProductsSuccess("Afnan"));
        }
    }

    //static is which can be accessed outside of the class
    static AddProduct(product){
        return{
            type:ProductAction.ADD_Product,
            payload:product
        }
    }

    static RemoveProduct(index){
        return{
            type:ProductAction.REMOVE_Product,
            payload: index
        }
    }

    static fetchProductsSuccess(Products){
        return{
            type:ProductAction.FETCH_ProductS_SUCCESS,
            payload:Products
        }
    }

    static fetchProductsFailed(error:String){
        return{
            type:ProductAction.FETCH_ProductS_FAILED,
            payload:error
        }
    }
}