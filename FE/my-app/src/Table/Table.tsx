import React, { useState } from 'react';
import { Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import {Grid, Paper, GridListTile, GridList} from '@material-ui/core';
import { User } from '../Interfaces/Interfaces';
import Form, { FormProps } from '../Form/Form';
import ModalForm from '../Modal/Modal';

export interface ITableForm {
  users: User[] | undefined;
}

const TableForm = (props: ITableForm) => {

    const [isOpen, setIsOpen] = useState(false);
    const updateModalState = (value: boolean) => setIsOpen(value);
    //let viewOnlyformProps;
    const onViewOnlyClick = (user: User) => {
        // viewOnlyformProps: FormProps = {

        // }
    }

    const onDeleteIconClick = (userId: number | undefined) => {
        fetch(`https://localhost:44365/api/User/${userId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //body: JSON.stringify(req)
        })
        .then(resp => resp.json())
        .then(data => {
          console.log("data", data); 
          window.location.reload();
          //props.isAuthenticated(data);
        });
    }


        return (                
            <> 
                {/* {isOpen && <ModalForm formProps={props.formProps} isOpen={isOpen} handleClose={updateModalState} />}                */}
                <TableContainer component={Paper} className="tableContainer">
                    <Table className = "table" aria-label="simple table">
                        <TableHead>
                            <TableRow className = "tableheadrow">
                                <TableCell align="left"><b>User</b></TableCell>
                                <TableCell align="left"><b>Email Address&nbsp;</b></TableCell>
                                <TableCell align="left"><b>Customer&nbsp;</b></TableCell>            
                                <TableCell align="left"><b>Roles&nbsp;</b></TableCell>            
                                <TableCell align="left"><b>Trial User&nbsp;</b></TableCell>            
                                <TableCell align="left"><b>Actions&nbsp;</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props?.users && props.users.map((user) => (
                                <TableRow key={user.userId}>
                                    <TableCell align="left">{user.userName}</TableCell>
                                    <TableCell align="left">{user.email}</TableCell>
                                    <TableCell align="left">Gleason</TableCell>              
                                    <TableCell align="left">
                                        {user.userRoles?.map(x => x.roleName + ", ")}
                                    </TableCell>
                                    <TableCell align="left">{user.isTrialUser ? "Yes": "No"}</TableCell>
                                    <TableCell align="left">
                                        <button onClick={() => {onViewOnlyClick(user)}}>V</button>
                                        <button>E</button>
                                        <button onClick={() => {onDeleteIconClick(user.userId)}}>D</button>
                                    </TableCell>              
                                </TableRow> 
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>                
            </>
        )
    }

export default TableForm;