import * as React from 'react';
import Option from '../Option';


export default class ShowRoute extends React.Component<any,any>{

    constructor(){
        super();
        this.state = {
            routes : [],
            currentRoute : 0
        };
    }

    componentDidMount(){
        this.setState({
            routes : this.props.routes,
            ddlRoutes : this.props.currentRoute
            //,currentRoute : this.props.currentRoute
        });
    }

    componentWillReceiveProps(nextProps){        
        if (Object.keys(nextProps.routes).length !== Object.keys(this.props.routes).length){            
            this.setState({
                routes : nextProps.routes
            });
        }

        if(nextProps.currentRoute !== this.props.currentRoute){
            this.setState({
                ddlRoutes : nextProps.currentRoute
            });
        }
    }

    getRoutes(){
        let options = [];
        let routes = this.state.routes;
        //console.log('routes : ',routes);
        if (Object.keys(routes).length > 0){
            //console.log('Object.keys(routes).length : ', Object.keys(routes).length);
            options= Object.keys(routes).map(function(key,index){
                let item;
                item = routes[key];
                return (<option key={item.RouteID} value={item.RouteID}>{item.RouteTitle}</option>)
            });
        }
        options.unshift(<Option value="0" text="-Select-" key="0" />);
        return options;
    }

    onFormSubmit(e){
        e.preventDefault();
        let routeID = this.state['ddlRoutes'];      //selected routeid
        //console.log('show route' , routeID );
        this.props.getDataByRouteID(routeID);
    }

    onFormChange(e){
        let state;
        if(e.target.id === 'ddlRoutes'){
            this.props.changeRoute(e.target.value);
            //this.props.changeRouteID(e.target.value);
        }
        else{
            state = this.state;
            state[e.target.id] = e.target.value;
            this.setState(state);
        }
    }

    render(){
         let options = [];
         options = this.getRoutes();
        return(  
            <div className="form-group">         
                <form onSubmit={this.onFormSubmit.bind(this)} onChange={this.onFormChange.bind(this)}>
                    <div className="col-md-6">
                        <label htmlFor="ddlRoutes" className="col-md-4">Route : </label>
                        <div className="col-md-8" >
                            <select name="" id="ddlRoutes" className="form-control" value={this.props.routeID}>
                                {options}
                            </select>
                        </div>
                    </div>
                    {/*<div className="col-md-6">
                        <input type="submit" value="Show" className="btn btn-primary"/>
                    </div>*/}
                </form>
            </div>
        )
    }
}