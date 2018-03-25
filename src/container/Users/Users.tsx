import * as React from 'react';
import {connect} from 'react-redux';
import {UserAction} from '../../store/action/users';

function mapDispatchToProps(dispatch){
    return{
        FetchUsers  : () :void =>dispatch(UserAction.fetchUsers)
    }
}

 class Users extends React.Component<any,any>{
        constructor(){
            super();
        }

        render(){
            return(
                <button onClick={this.props.FetchUsers} ></button>
            )
        }
}

export default connect(null,mapDispatchToProps)(Users);