
import * as React from 'react';
import {connect} from 'react-redux';


class AddUser extends React.Component<any,any>{

    constructor(){
        super();
        this.state = {

        };
    }

    private onFormSubmit = (e) => {
        e.preventDefault;
    }

    render(){
        return(
            <div className = "row">
                <div className="col-md-offset-1 col-md-10">
                    <div className="row">
                        <form onSubmit={this.onFormSubmit.bind(this)}>
                            {/*<div className="col-md-6">
                                <label className="col-md-3">User Name :</label>
                                <div htmlFor="txtUserName" className="col-md-9">
                                    <input type="text"  value={this.state.txtUserName}
                                        className="form-control" id="txtUserName" required />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="txtPassword" className="col-md-3">Title :</label>
                                <div className="col-md-9">
                                    <input type="password" ref={input => this.RouteTitle = input} className="form-control" 
                                    id="txtRouteTitle" required/>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="ddlStartDestinationID" className="col-md-3">Start :</label>
                                <div className="col-md-9">
                                    <select ref={ input  => this.StartDestinationID = input} className="form-control" 
                                        id="ddlStartDestinationID" required>
                                        {options}
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="ddlEndDestinationID" className="col-md-3">End :</label>
                                <div className="col-md-9">
                                    <select ref={input => this.EndDestinationID = input} className="form-control" 
                                        id="ddlEndDestinationID" required>
                                        {options}
                                    </select>
                                </div>
                            </div>*/}
                        
                            <div className="col-md-12">
                                <div className="text-center">
                                        <input type="submit" value="Save" className="btn btn-primary" />
                                </div>                        
                            </div>
                        </form>
                    </div>
                </div>                
            </div>
        )
    }
}
