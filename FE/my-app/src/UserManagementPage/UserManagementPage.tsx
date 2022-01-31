import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { FormProps } from '../Form/Form';
import { User } from '../Interfaces/Interfaces';
import TableForm from '../Table/Table';
import ModalForm from '../Modal/Modal';

export interface IUserManagementPage {
    //formProps: FormProps;
    userList: User[] | undefined;
    getAllUsers: () => void;
}

const UserManagementPage = (props: IUserManagementPage) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateModalState = (value: boolean) => setIsOpen(value);
  const closeModal = () => setIsOpen(false);  
  const getFormProp = ():FormProps => {
    const formData: FormProps = {
      viewOnly: false,
      roles: undefined,
      user: undefined,
      getAllUsers: props.getAllUsers,
      closePopup: closeModal
    }
    return formData;
  }

  return (
  <div className='userManagementPageCont'>
    {isOpen && <ModalForm isOpen={isOpen} handleClose={updateModalState} getAllUsers={props.getAllUsers}
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
          <TableForm users={props.userList} getAllUsers={props.getAllUsers} />            
      </div>      
  </div>
  );
};

export default UserManagementPage;
