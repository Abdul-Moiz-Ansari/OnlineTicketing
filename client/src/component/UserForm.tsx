
import * as React from 'react';

export default class UserForm extends React.Component<any,any>{

    constructor(){
        super();
        this.state = {
            user : {userid : 0,user:  "",email : ""}
        };        
    }
    
    private userForm = null;
    private hidUserID = null;
    private txtUser = null;
    private txtEmail = null;

    componentWillReceiveProps(nextProps){
        if(nextProps.currentUser.userid !== this.props.currentUser.userid){
            this.setState({user : nextProps.currentUser});
        }
    }

    componentDidMount(){
        this.setState({
            user : this.props.currentUser
        });
        this.updateControls();
    }

    componentDidUpdate(){
        this.updateControls();    
    }

    updateControls(){
        this.hidUserID.value = this.state.user.userid;
        this.txtUser.value = this.state.user.user;
        this.txtEmail.value = this.state.user.email;
    }
    
    addUser(e){
        e.preventDefault();
        var obj  = {
            userid : this.hidUserID.value,
            user : this.txtUser.value,
            email : this.txtEmail.value
        };
        //console.log(obj);
        this.props.addUser(obj);      
        this.userForm.reset();
    }

    render(){
        return(
            <form ref={(input) => {this.userForm = input}} onSubmit={this.addUser.bind(this)}>
                    <input type="hidden" ref={(input) => {this.hidUserID = input}} />
                    User : <input type="text"  ref={(input) => {this.txtUser = input}} />
                    Phone No. :<input type="text" ref={(input) => {this.txtEmail = input}}   />
                    <button type="submit" >Add User</button>
            </form>            
        )
    }
}