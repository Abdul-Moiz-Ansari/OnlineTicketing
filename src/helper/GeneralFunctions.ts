


export function validateAuthCredentials(isAdmin : Boolean,isEmployee : Boolean,isExternal : Boolean){
    let obj = {},_isAdmin,_isEmployee,_isExternal;

    _isAdmin = isAdmin;
    _isEmployee = isEmployee;
    _isExternal = isExternal;

    if(_isAdmin){
        _isEmployee = !_isAdmin;
        _isExternal = !_isAdmin;
    }
    else if(_isEmployee){
        _isAdmin = !_isEmployee;
        _isExternal = !_isEmployee;
    }
    else{
        _isExternal = true;
        _isEmployee = !_isExternal;
        _isAdmin = !_isExternal;
    }
    obj['isAdmin'] = _isAdmin;
    obj['isExternal'] = _isExternal;
    obj['isEmployee'] = _isEmployee;
}