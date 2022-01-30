import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { FormProps } from '../Form/Form';
import { User } from '../Interfaces/Interfaces';
import TableForm from '../Table/Table';
import ModalForm from '../Modal/Modal';

export interface IUserManagementPage {
    formProps: FormProps;
    userList: User[] | undefined;
}

const UserManagementPage = (props: IUserManagementPage) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateModalState = (value: boolean) => setIsOpen(value);
  const getFormProp = ():FormProps => {
    const formData: FormProps = {
      viewOnly: false,
      roles: props.formProps.roles,
      user: undefined
    }
    return formData;
  }

  return (
  <div className='userManagementPageCont'>
    {isOpen && <ModalForm isOpen={isOpen} handleClose={updateModalState}
      formProps={getFormProp()}
     />}
      <h1>User Management</h1>
      <Button        
        variant="contained"
        onClick={() => updateModalState(true)}
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
