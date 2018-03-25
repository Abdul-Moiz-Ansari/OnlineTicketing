import * as React from 'react';
import {connect} from 'react-redux';
import Authenticate from '../../HOC/Authenticate';
import {CounterAction as Action} from '../../store/action/counter';
import {UserAction} from '../../store/action/users';
import { Back } from '../../component/Back';
import {ShowCounter} from '../../component/ShowCounter';

function mapStateToProps(state:any){
    return{
        uid: state.User.uid
    }
}

function mapDispatchToProps(dispatch:any){
    return{
        fetchUsers: () :void => dispatch(UserAction.fetchUsers()),
        increment: () :void => dispatch(Action.increment()),
        decrement: () :void => dispatch(Action.decrement())
    }
}

class Home extends React.Component<any,any>{

    constructor(){
        super();
    }

    componentDidMount(){
        //this.props.fetchUsers;
    }

    render(){
        // var users = this.props.users.map((item,index) => {
        //     return <UserItem key={index} index={index} user={item} />
        // });

        return(
            <div>
                <h1>Home</h1>
                 {/*<Back />*/}
                {/*<ShowCounter counter={this.props.counter} />*/}
                <div>
                    {/*{this.props.users}*/}
                </div>
                {/*<div>
                    <button onClick={this.props.increment} style={{color:'green'}} >Incr ++</button>
                    <button onClick={this.props.decrement}  style={{color:'red'}}>Decr ++</button>
                    <button onClick={this.props.fetchUsers}  style={{color:'blue'}}>Fetch users</button>
                </div>*/}
                {/*<ol> {users} </ol>*/}
                {/*<pre> {this.props.users} </pre>*/}
            </div>
        )
    }
}

//for now creating listitem inside same file, can be moved afterward
class UserItem extends React.Component<any,any>{
    constructor(){
        super();
    }
    render(){
        return(
            <li>{this.props.user}</li>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Authenticate(Home));