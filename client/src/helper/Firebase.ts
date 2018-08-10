
import * as firebase from 'firebase';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBMOD-TFNSf-GgEQjXcTkv6cgojxNcxMmI",
    authDomain: "onlineticketing-cd96f.firebaseapp.com",
    databaseURL: "https://onlineticketing-cd96f.firebaseio.com",
    projectId: "onlineticketing-cd96f",
    storageBucket: "onlineticketing-cd96f.appspot.com",
    messagingSenderId: "707949134525"
};

let app = firebase.initializeApp(config);

export let FirebaseDB = app.database();
export let FBStorage = app.storage();
export let FBAuth = app.auth();
//export let Firestore =app.firestore();


export let rootRef = FirebaseDB.ref();
export let busRef = rootRef.child('bus');
export let routeRef = rootRef.child('route');
export let chargesRef = rootRef.child('charges');
export let routeDetailRef= rootRef.child('routeDetail');
export let scheduleRef = rootRef.child('schedule');
export let userRef = rootRef.child('user');
export let destinationRef = rootRef.child('destination');

export let bookingRef = rootRef.child('booking');
export let ticketRef = rootRef.child('ticket');
//export let ticketcollection = Firestore.collection('ticket');

export class FirebaseSnap {
    val: Function;
}

//export function checkNullArray(val){
    //return typeof val === 'undefined' || val === null ? [] :val;
//}