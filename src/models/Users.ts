

export default class User{
    
    
    // private _userID : number;
    // public get userID() : number {
    //     return this._userID;
    // }
    // public set userID(v : number) {
    //     this._userID = v;
    // }
        
    // private _username : string;
    // public get username() : string {
    //     return this._username;
    // }
    // public set username(v : string) {
    //     this._username = v;
    // }
        
    // private _password : string;
    // public get password() : string {
    //     return this._password;
    // }
    // public set password(v : string) {
    //     this._password = v;
    // }
        
    // private _isActive : boolean;
    // public get isActive() : boolean {
    //     return this._isActive;
    // }
    // public set isActive(v : boolean) {
    //     this._isActive = v;
    // }
    
    // private _isAdmin : boolean;
    // public get isAdmin() : boolean {
    //     return this._isAdmin;
    // }
    // public set isAdmin(v : boolean) {
    //     this._isAdmin = v;
    // } 
    
    // private _isEmployee : boolean;
    // public get isEmployee() : boolean {
    //     return this._isEmployee;
    // }
    // public set isEmployee(v : boolean) {
    //     this._isEmployee = v;
    // }    
    
    // private _isExternal : boolean;
    // public get isExternal() : boolean {
    //     return this._isExternal;
    // }
    // public set isExternal(v : boolean) {
    //     this._isExternal = v;
    // }   
    
    // private _employeeID : string;
    // public get employeeID() : string {
    //     return this._employeeID;
    // }
    // public set employeeID(v : string) {
    //     this._employeeID = v;
    // }
    
    // private _isFirstTimeLoggedIn : boolean;
    // public get isFirstTimeLoggedIn() : boolean {
    //     return this._isFirstTimeLoggedIn;
    // }
    // public set isFirstTimeLoggedIn(v : boolean) {
    //     this._isFirstTimeLoggedIn = v;
    // }

    public userID;
    public username;
    public password;
    public isActive;
    public isAdmin;
    public isEmployee;
    public isExternal;
    public employeeID;
    public isFirstTimeLoggedIn;

    constructor(userID?,username?,password?,isActive?,isAdmin?,isEmployee?,isExternal?,employeeID?,
        isFirstTimeLoggedIn?){
        this.userID = userID;
        this.username = username;
        this.password = password;
        this.isActive = isActive;
        this.isAdmin = isAdmin;
        this.isEmployee= isEmployee;
        this.isExternal = isExternal;
        this.employeeID = employeeID;
        this.isFirstTimeLoggedIn = isFirstTimeLoggedIn;
    }   
}