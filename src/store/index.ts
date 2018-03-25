
import {applyMiddleware,combineReducers,createStore} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {combineEpics,createEpicMiddleware} from 'redux-observable';

import {counterReducer} from './reducer/counter';
import {_userReducer} from './reducer/users';
import {UserReducer,addUserFormReducer} from './reducer/UserReducer';
import {busReducer} from './reducer/BusReducer';
import {RouteReducer} from './reducer/RouteReducer';
import {DestinationReducer} from './reducer/DestinationReducer';
import {ChargesReducer} from './reducer/ChargesReducer';
import {routeDetailReducer} from './reducer/RouteDetailReducer';
import {ScheduleReducer} from './reducer/ScheduleReducer';
import {BookingReducer} from './reducer/BookingReducer';
import {TicketReducer} from './reducer/TicketReducer';


//import {GetUsers,AddUser,EditUser,DeleteUser} from './epic/getUsers'; 
import BusEpic from './epic/BusEpic';
import DestinationEpic from './epic/DestinationEpic';
import RouteEpic from './epic/RouteEpic';
import ChargesEpic from './epic/ChargesEpic';
import RouteDetailEpic from './epic/RouteDetailEpic';
import ScheduleEpic from './epic/ScheduleEpic';
import BookingEpic from './epic/BookingEpic';
import TicketEpic from './epic/TicketEpic';
import UserEpic from './epic/UserEpic';

import DestinationAction from './action/DestinationAction';

//import {GetUsers} from './epic/getUsers'; 
//import thunk from 'redux-thunk';

interface IAppState{
    counterReducer,
    userReducer
}

//const middleware = applyMiddleware(thunk);


let rootEpics = combineEpics(
    // GetUsers,
    // AddUser,
    // EditUser,
    // DeleteUser,
    BusEpic.AddBus,
    BusEpic.GetData,
    BusEpic.UpdateRow,
    BusEpic.DeleteRow,
    BusEpic.GetDataByKey,
    new DestinationEpic().GetData,
    new DestinationEpic().GetDataByKey,
    new DestinationEpic().SaveRow,
    new DestinationEpic().DeleteRow,
    new RouteEpic().GetData,
    new RouteEpic().InsertRow,
    new RouteEpic().DeleteRow,
    new RouteEpic().GetDataByKey,
    new RouteEpic().Listen_Child_Changed,
    new RouteEpic().Listen_ChildRemove,
    new ChargesEpic().GetData,
    new ChargesEpic().Listen_ChildChaged,
    new ChargesEpic().Listen_ChildRemoved,
    new ChargesEpic().GetDataByKey,
    new ChargesEpic().SaveCharges,
    new ChargesEpic().DeleteCharges,
    new RouteDetailEpic().InsertRow,
    new RouteDetailEpic().Listen_ChildAdded,
    new RouteDetailEpic().Listen_ChildChanged,
    new RouteDetailEpic().Listen_ChildRemoved,
    // RouteDetailEpic.GetDataByRouteID,
    new  RouteDetailEpic().GetDataByKey,
    new RouteDetailEpic().DeleteRow,
    // new ScheduleEpic().GetData,
    new ScheduleEpic().GetDataByKey,
    new ScheduleEpic().InsertRow,
    new ScheduleEpic().Listen_ChildAdded,
    new ScheduleEpic().Listen_ChildChanged,
    new ScheduleEpic().Listen_ChildRemoved,
    new ScheduleEpic().DeleteRow,

    // new BookingEpic().GetData,
    // new BookingEpic().GetDataByKey,
    new BookingEpic().InsertRow,
    // new BookingEpic().SaveSuccess,
    // new BookingEpic().DeleteRow,
    new TicketEpic().GetData,
    // new TicketEpic().GetDataByKey,
    // new TicketEpic().InsertRow,
    // new TicketEpic().SaveSuccess,
    // new TicketEpic().DeleteRow,
    new UserEpic().SignIn,
    new UserEpic().SignUp,
    new UserEpic().TrackUserStatus,
    new UserEpic().AddUser,
    new UserEpic().GetUserCredentials
    );

//let rootEpics = combineEpics(GetUsers);
let epicMiddleware = createEpicMiddleware(rootEpics);
let storeWithMiddleware = applyMiddleware(epicMiddleware);

const rootReducer = combineReducers<IAppState>({
    form : formReducer.plugin({
        "DestinationForm": (state,action) =>{
            switch(action.type){
                case DestinationAction.SAVEROW_SUCCESS : 
                    return undefined;
                default:
                return state;
            }
        },
        "addUserForm":addUserFormReducer
    }),
    counterReducer,
    _userReducer : _userReducer,
    User : UserReducer,
    busReducer,
    Route : RouteReducer,
    Destination : DestinationReducer,
    Charges : ChargesReducer,
    RouteDetail : routeDetailReducer,
    Schedule : ScheduleReducer,
    Booking : BookingReducer,
    Ticket : TicketReducer
});

export let store =  createStore(
    rootReducer,
    storeWithMiddleware);