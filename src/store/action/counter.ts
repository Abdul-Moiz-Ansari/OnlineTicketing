
export class CounterAction{
    
    //variables to be used for actions
    static INCREMENT_COUNTER = "INCREMENT_COUNTER";
    static DECREMENT_COUNTER = "DECREMENT_COUNTER";

    //methods which will return action, which only contains type fow now
    static increment(){
        return{
            type:CounterAction.INCREMENT_COUNTER
        }
    }

    static decrement(){
        return{
            type:CounterAction.DECREMENT_COUNTER
        }
    }
}


