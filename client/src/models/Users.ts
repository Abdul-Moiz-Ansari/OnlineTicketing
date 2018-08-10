

export default class User{

    public userID;
    public username;
    public displayName;
    public email;
    public password;
    public disabled : Boolean;
    public isAdmin;
    public isEmployee;
    public isExternal;
    public employeeID;
    public isFirstTimeLoggedIn;
    public residingDestinationID;

    constructor(userID?,username?,email?,displayName? : string,password?,isDisabled?,isAdmin?,isEmployee?,isExternal?,employeeID?,
        isFirstTimeLoggedIn?,residingDestinationID?){
        this.userID = userID;
        this.username = username;
        this.displayName = displayName;
        this.email = email;
        this.password = password;
        this.disabled = isDisabled;
        this.isAdmin = isAdmin;
        this.isEmployee= isEmployee;
        this.isExternal = isExternal;
        this.employeeID = employeeID;
        this.isFirstTimeLoggedIn = isFirstTimeLoggedIn;
        this.residingDestinationID = residingDestinationID;
    }   
}