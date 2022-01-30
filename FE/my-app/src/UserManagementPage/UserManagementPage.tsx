import { Button } from '@mui/material';
import React from 'react';
import { FormProps } from '../Form/Form';
import { User } from '../Interfaces/Interfaces';
import TableForm from '../Table/Table';

export interface IUserManagementPage {
    formProps: FormProps;
    userList: User[] | undefined;
}

const UserManagementPage = (props: IUserManagementPage) => {
  return (
  <div className='userManagementPageCont'>
      <h1>User Management</h1>
      <Button        
        variant="contained"
       //onClick={onsubmitClick}
       >
           Add New User +
        </Button>
        <div className='tableCont'>
            <TableForm users={props.userList} />            
        </div>      
  </div>
  );
};

export default UserManagementPage;
