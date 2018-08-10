
import {IAction} from '../IAction';
import Schedule from '../../models/Schedule';
import  ScheduleAction from '../action/ScheduleAction';

// interface IState{
//     schedules : Array[],    

// }

const initState = {
    schedules : {},
    currentSchedule : new Schedule("","","","","",new Date(),"",new Date(),"",false),
    isClearForm : false,
    errorMessage : ""
}

export function ScheduleReducer(state = initState,action:IAction){
    let newState,newData,removedData,existingData : Object = {};

    switch(action.type){
        case ScheduleAction.getDataSuccess:
            newData= action.payload;
            Object.keys(state.schedules).map(key => {
                existingData[key] = key !== newData.ScheduleID ? state.schedules[key] : undefined; 
            });
            existingData[newData.ScheduleID] = newData;
            newState = Object.assign({},state,{schedules : existingData});
            return newState;

         case ScheduleAction.refreshData:
            newState = Object.assign({},state,
                {
                    schedules : action.payload,
                    currentSchedule: new Schedule("","", "","","",new Date(),"",new Date(),"",false)
                }
            );
           // console.log(newState);
            return newState;

        case ScheduleAction.getDataByKeySuccess:
            newState = Object.assign({},state,{currentSchedule : action.payload});
            return newState;

        case ScheduleAction.saveSuccess : 
            return Object.assign({},state,{
                currentSchedule : new Schedule("","","","","",new Date(),"",new Date(),"",false),
                isClearForm : true
            });
        
        case ScheduleAction.SCHEDULE_REMOVED:
            removedData= action.payload;
            Object.keys(state.schedules).map(key => {
                existingData[key] = key !== removedData.ScheduleID ? state.schedules[key] : undefined; 
            });
            delete existingData[removedData.ScheduleID] ;
            return  Object.assign({},state,{schedules : existingData});

        case ScheduleAction.error : 
            console.log(action.payload);
            newState = Object.assign({},state,{errorMessage : action.payload});
            return newState;
            
        default:
            return state;        
    }
}