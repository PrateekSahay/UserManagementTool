import React from 'react';
import { Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import {Grid, Paper, GridListTile, GridList} from '@material-ui/core';
import { User } from '../Interfaces/Interfaces';

export interface ITableForm {
  users: User[] | undefined;
}

const TableForm = (props: ITableForm) => {
        return (                
            <>                
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
                                        <button>a</button>
                                        <button>b</button>
                                        <button>c</button>
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