
import * as React from 'react';
import User from '../../models/Users';

//booking list header row
interface IHeaderProps {
    isAdmin: boolean;
    isDashboard: boolean;
}

const HeaderRow: React.SFC<IHeaderProps> = (props) => {
    const { isDashboard, isAdmin } = props;
    let arrTH = [];

    if (isDashboard) {
        arrTH = [
            <th key={0}>Schedule</th>,
            <th key={1}>Bus</th>,
            <th key={2}>Start Dest</th>,
            <th key={3}>End Dest</th>,
            <th key={4}>Amount</th>
        ];
    }
    else {
        arrTH = [
            <th key={1}>Schedule</th>,
            <th key={2}>Bus</th>,
            <th key={3}>Start Dest</th>,
            <th key={4}>End Dest</th>,
            <th key={5}>Departure Date</th>,
            <th key={6}>Arrival Date</th>,
            <th key={7}>Amount</th>,
        ];

        if (isAdmin === true) {
            arrTH = arrTH.concat([
                <th key={8}></th>,
                <th key={9}></th>
            ]);
        }
    }

    return (
        <tr>
            {arrTH}
        </tr>
    );
}

//booking list row
interface IUserRowProps {
    key : any;
    isAdmin: Boolean;
    user: any;
    getUserByKey : Function;
    deleteUser : Function;
}

export const Row: React.SFC<IUserRowProps> = (props) => {

    let item, arrItems = [];
    const {
        key,
        isAdmin,
        user,
        getUserByKey,
        deleteUser
    } = props;

    function edit() {        
        getUserByKey(user.uid);
    }

    function deleteRow() {
        if (confirm("Are you sure you want to delete this User?")){
            deleteUser(user.uid);
        }           
    }

    arrItems = [
        <td key={1}>{user.email}</td>,
        <td key={2}>
            <input type="checkbox" checked={user.disabled} />
        </td>,
        <td key={3}>
            <input type="checkbox" checked={user.isAdmin} />
        </td>,
        <td key={4}>
            <input type="checkbox" checked={user.isEmployee} />
        </td>,
        <td key={5}>
            <input type="checkbox" checked={user.isExternal} />
        </td>
    ];

    if (isAdmin === true) {
        arrItems = arrItems.concat([
            <td key={8}><a href="#" onClick={edit} >Edit</a></td>,
            <td key={9}><a href="#" onClick={deleteRow}>Delete</a></td>,
        ]);
    }

    return (
        <tr key={key}>
            {arrItems}
        </tr>
    );
}

Row.defaultProps = {
    key : "",
    isAdmin : false,
    user : new User("","","","","",false,false,false,false,"",false,""),
    getUserByKey : () =>{},
    deleteUser : () => {}
}
