import React, { useEffect, useState } from 'react';
import { User, UserRoles } from '../Interfaces/Interfaces';
import Form, { FormProps } from '../Form/Form';
import SimpleCard from '../Card/Card';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Drawer from "../SideBar/SideBar";
import { makeStyles } from "@material-ui/core/styles";
import StickyHeadTable from '../Table/Table';
import Dashboard from '../Dashboard/Dashboard';
import UserManagementPage from '../UserManagementPage/UserManagementPage';

const useStyles = makeStyles({
  container: {
    display: "flex"
  }
});

const UserManagementTool = () => {
    const [numberOfUsers, setNumberOfUsers] = useState(0);
    const [userList, setUserList] = useState<User[]>();
    const [rolesList, setRolesList] = useState<UserRoles[]>();
    useEffect(() => {
            fetch('https://localhost:44365/api/User')
            .then(resp => resp.json())
            .then(data => {            
                console.log(data);  
                setNumberOfUsers(data);              
            }
        );

        getAllUsers();

        fetch('https://localhost:44365/api/User/roles')
            .then(resp => resp.json())
            .then(data => {            
                console.log(data);     
                setRolesList(data);           
            }
        );
    }, []);

    const getAllUsers = () => {
        fetch('https://localhost:44365/api/User/all')
                .then(resp => resp.json())
                .then(data => {            
                    console.log(data);     
                    setUserList(data);           
                }
            );
    }

    // const FormComponentProps: FormComponentProps = {
    //     user: {
    //         email: "sad",
    //         firstName: "first",
    //         isTrialUser: true,
    //         lastName: "l",
    //         userName: "1",
    //         userRoles: rolesList,
    //         password: "s",
    //         userId: 1,
    //     }, 
    //     viewOnly: true,
    //     roles: rolesList        
    // };

    // const formProps: FormProps = {
    //     user: userList && userList[0], 
    //     viewOnly: false,
    //     roles: rolesList,     
    //     getAllUsers: () => {}   
    // };
    const classes = useStyles();

    return(        
        <div className={classes.container}>                   
                <BrowserRouter>
                    <Drawer />       
                    <Switch>
                        {/* <Route exact path ='/' render={props => <Form {...props} {...formProps}/>} /> */}
                        {/* <Route exact path ='/card' render={props => <SimpleCard {...props} numberOfUsers = {numberOfUsers}/>} /> */}
                        {/* <Route exact path ='/userForm/:formState/:id' render={props => <Form {...props} {...formProps}/>} /> */}
                        <Route exact path ='/' render={props => <Dashboard {...props} numberOfUsers = {numberOfUsers}/>} />
                        <Route exact path ='/user' render={props => <UserManagementPage {...props}
                         //formProps={formProps}
                          userList={userList} getAllUsers={getAllUsers}/>} />                        
                    </Switch>            
                </BrowserRouter>                  
        </div>
    );
}

export { UserManagementTool as default};