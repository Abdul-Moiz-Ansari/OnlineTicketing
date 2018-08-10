
import * as React from 'react';

export default class UserListItem extends React.Component<any,any>{

    EditUser(){
        let id = this.props.id;
        //console.log("hello from list item");
        this.props.editUser(id);
    }

    DeleteUser(){
        let id = this.props.id;
        this.props.deleteUser(id);
    }
    

    render(){
        return(
            <li >{this.props.user}
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a onClick={this.EditUser.bind(this)}>Edit</a>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a onClick={this.DeleteUser.bind(this)}>Delete</a>
            </li>
        )
    }
}