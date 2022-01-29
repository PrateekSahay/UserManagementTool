import React, { useEffect, useState } from 'react';
import { User } from '../Interfaces/Interfaces';

const UserManagementToolComponent = () => {
    const [numberOfUsers, setNumberOfUsers] = useState(0);
    const [userList, setUserList] = useState<User[]>();
    useEffect(() => {
        fetch('https://localhost:44365/api/User')
        .then(resp => resp.json())
        .then(data => {            
        console.log(data);  
        setNumberOfUsers(data);              
        }
        );

        fetch('https://localhost:44365/api/User/all')
        .then(resp => resp.json())
        .then(data => {            
        console.log(data);     
        setUserList(data);           
        }
        );
    }, [])

    return(
        <div>
            UserManagement
            {numberOfUsers}
            {/* {userList} */}
        </div>
    );
}

export { UserManagementToolComponent as default};