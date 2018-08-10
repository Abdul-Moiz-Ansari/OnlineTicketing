
import * as React from 'react';
import {connect} from 'react-redux';
import {UserAction} from '../../store/action/users';
import UserListItem from '../../component/UserListItem';
import UserForm from '../../component/UserForm';

function mapStateToProps(state){
    return{
        // users : state.userReducer['users'],
        // currentUser : state.userReducer['currentUser']
    }
}

function mapDispatchToProps(dispatch){
    return{
        fetchUsers : function(){
            //console.log('fetch users fired');
            dispatch(UserAction.fetchUsers());
        }
        ,
        addUser : function(objUser){
            dispatch(UserAction.AddUser(objUser));
        },
        editUser:function(userid){
            //console.log("hello from edit user");
            dispatch(UserAction.GetUser(userid));
        },
        deleteUser:function(userid){
            dispatch(UserAction.RemoveUser(userid));
        }
    }
}

class UsersList extends React.Component<any,any>{

    //fetch data when component mounts
    componentDidMount(){
        this.props.fetchUsers();
    }

    //render list items
    renderUsers(item,index){
        return <UserListItem key={item.userid} id={item.userid} user={item.user} editUser={this.props.editUser}
                deleteUser={this.props.deleteUser} />
    }   

    render(){
              
        return(
            <div>
                <h1>User List</h1>
                {/*<UserForm addUser={this.props.addUser} currentUser={this.props.currentUser} />*/}

                <ul>
                    {/*{this.props.users.map(this.renderUsers.bind(this))}*/}
                </ul>
                
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UsersList);