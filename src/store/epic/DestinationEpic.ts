
import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import {reset} from 'redux-form';
import DestinationAction from '../action/DestinationAction';
import Destination from '../../models/Destination';
import { FirebaseDB, FirebaseSnap } from '../../helper/Firebase';
import axios from 'axios';

export default class DestinationEpic {

    public GetData = action$ =>
        action$.ofType(DestinationAction.GETDATA).mergeMap((action) => {
            let destination: Destination, promise, url, ref;
            destination = action.payload;
            ref = FirebaseDB.ref().child('destination');
            return Observable.fromEvent(ref, 'value').mergeMap(snapshot => {
                let val;
                val = (<FirebaseSnap>snapshot).val();
                val = typeof val === 'undefined' || val === null ? [] : val;
                return Observable.of(DestinationAction.getDataSuccess(val));
            });
        });

    public GetDataByKey = action$ =>
        action$.ofType(DestinationAction.GETDATA_BYKEY).mergeMap(action => {
            let DestinationID, promise;
            DestinationID = action.payload;
            promise = FirebaseDB.ref().child('destination').orderByChild('DestinationID').equalTo(DestinationID).once("value");
            return Observable.fromPromise(promise).switchMap(snapshot => {
                let val;
                val = (<FirebaseSnap>snapshot).val();
                val = typeof val === 'undefined' || val === null ? new Destination("","", "") : val[Object.keys(val)[0]];
                //return Observable.of(DestinationAction.getDataByKey_Success(val));
                return Observable.of(DestinationAction.load(val));
            });
        });

    public SaveRow = action$ =>
        action$.ofType(DestinationAction.SAVEROW).mergeMap((action) => {
            let destination: Destination, promise, url, ref;
            destination = action.payload;
            ref = FirebaseDB.ref();
            if (destination.DestinationID === "") {
                destination.DestinationID = ref.child("destination").push().key;
            }

            promise = FirebaseDB.ref().child('destination/' + destination.DestinationID).set(destination);
            //return Observable.fromPromise(promise).mergeMap(res => Observable.of(reset("DestinationForm")));
            return Observable.fromPromise(promise).mergeMap(res => Observable.of(DestinationAction.saveRowSuccess(res)));
        });

    public DeleteRow = action$ =>
        action$.ofType(DestinationAction.DELETEROW).mergeMap(action => {
            let DestinationID, promise;
            DestinationID = action.payload;
            promise = FirebaseDB.ref().child('destination/' + DestinationID).remove();
            return Observable.fromPromise(promise).mergeMap(res => Observable.of(reset("DestinationForm")));
        });
}