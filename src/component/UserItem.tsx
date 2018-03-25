import * as React from 'react';
import {connect} from 'react-redux';
import {UserAction} from '../store/action/users';

// function mapDispatchToProps(dispatch:any){
//     return{
//         fetchUsers : () : void => dispatch(UserAction.fetchUsers()),
//         addUser : (username) :void => dispatch(UserAction.AddUser(username))
//     }
// }

// function mapDispatchToProps(dispatch:any){
//     return{
//         removeUser : (index) : void => dispatch(UserAction.RemoveUser(index))
//     }
// }

export class UserItem extends React.Component<any,any>{
    constructor(){
        super();
    }

    onRemoveClick(e){
        e.preventDefault();
        this.props.removeUser(this.props.userid);
    }

    onEditClick(e){
        e.preventDefault();
        //console.log(this.props.userid);
        this.props.editUser(this.props.userid);
    }

    render(){
        return(
            <tr>
                <td>
                    <input type="hidden" value={this.props.userid} />
                    <a> {this.props.user}</a>  
                </td>
                <td>
                    <a> {this.props.email}</a>  
                </td> 
                <td>
                    <a onClick={this.onRemoveClick.bind(this)} style={{cursor:'pointer'}}>x</a>
                </td>
                <td>
                    <a onClick={this.onEditClick.bind(this)}  style={{cursor:'pointer'}}>e</a>
                </td>
            </tr>
        )
    }
}

//export default connect(null,mapDispatchToProps)(UserItem);