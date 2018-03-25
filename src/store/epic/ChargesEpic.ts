
import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import ChargesAction from '../action/ChargesAction';
import axiosService from './Axios';
import { FirebaseDB, FirebaseSnap, rootRef, chargesRef } from '../../helper/Firebase';
import Charges from '../../models/Charges';


export default class ChargesEpic {
    
    public GetData = action$ =>
        action$.ofType(ChargesAction.GETCHARGES).switchMap(action => {

            return Observable.fromEvent(chargesRef, 'child_added').mergeMap(snap => {
                let val, promise1, promise2, promise3;
                val = (snap as FirebaseSnap).val();
                val = typeof val === 'undefined' || val === null ? {} : val;

                promise1 = rootRef.child('bus/' + val.busID).once('value');
                promise2 = rootRef.child('destination/' + val.StartDestinationID).once('value');
                promise3 = rootRef.child('destination/' + val.EndDestinationID).once('value');

                return Observable.forkJoin(promise1, promise2, promise3).mergeMap(arr => {
                    let bus, startDest, endDest;
                    val.busTitle = (arr[0] as FirebaseSnap).val().title;
                    val.StartDestinationTitle = (arr[1] as FirebaseSnap).val().DestinationTitle;
                    val.EndDestinationTitle = (arr[2] as FirebaseSnap).val().DestinationTitle;

                    return Observable.of(ChargesAction.getChargesSuccess(val));
                }).catch(err => Observable.of(ChargesAction.error(err)));
            });
        });

    public GetDataByKey = action$ =>
        action$.ofType(ChargesAction.GETCHARGES_BYKEY).switchMap(action => {
            let ChargesID : any,promise;
            ChargesID = action.payload;
            promise = chargesRef.orderByChild("ChargesID").equalTo(ChargesID).once('value');

            return Observable.fromPromise(promise).mergeMap(snap => {
                let val;
                val = (snap as FirebaseSnap).val();                    
                val = Object.keys(val).length > 0 ? val[Object.keys(val)[0]] : val;
                return Observable.of(ChargesAction.getChargesByKeySuccess(val));
            });
        });

    //
    public Listen_ChildRemoved = action$ =>
        action$.ofType(ChargesAction.GETCHARGES).switchMap(action =>
            Observable.fromEvent(chargesRef, 'child_removed').mergeMap(snap => {
                let val;
                val = (snap as FirebaseSnap).val();
                //console.log('child removed', val);
                return Observable.of(ChargesAction.charges_removed(val));
            })
        );

    public Listen_ChildChaged = action$ =>
        action$.ofType(ChargesAction.GETCHARGES).switchMap(action =>
            Observable.fromEvent(chargesRef, 'child_changed').mergeMap(snap => {
                let val;
                val = (snap as FirebaseSnap).val();

                return this.GetChargesWithJoin(val);
            })
        );

    private GetChargesWithJoin = val => {
        let promise1, promise2, promise3;

        promise1 = rootRef.child('bus/' + val.busID).once('value');
        promise2 = rootRef.child('destination/' + val.StartDestinationID).once('value');
        promise3 = rootRef.child('destination/' + val.EndDestinationID).once('value');

        return Observable.forkJoin(promise1, promise2, promise3).mergeMap(arr => {
            let bus, startDest, endDest;
            val.busTitle = (arr[0] as FirebaseSnap).val().title;
            val.StartDestinationTitle = (arr[1] as FirebaseSnap).val().DestinationTitle;
            val.EndDestinationTitle = (arr[2] as FirebaseSnap).val().DestinationTitle;

            return Observable.of(ChargesAction.getChargesSuccess(val));
        })
            .catch(err => Observable.of(ChargesAction.error(err)));
    }

    public SaveCharges = action$ =>
        action$.ofType(ChargesAction.SAVECHARGES).mergeMap(action => {
            let charges: Charges, promise;

            charges = action.payload;
            if (charges.ChargesID === "") {
                charges.ChargesID = chargesRef.push().key;
            }

            promise = rootRef.child('charges/' + charges.ChargesID).set(charges);
            return Observable.fromPromise(promise).mergeMap(snap =>
                Observable.of(ChargesAction.saveCharges_Success(snap))
            );

        });


    public DeleteCharges = action$ =>
        action$.ofType(ChargesAction.DELETECHARGES).mergeMap(action => {
            let ChargesID, promise;
            ChargesID = action.payload;
            //console.log();
            promise = rootRef.child('charges/'+ChargesID).remove();
            return Observable.fromPromise(promise).mergeMap(snap => {
                return Observable.of(ChargesAction.error("deleted successfully"));
            });
        });


}