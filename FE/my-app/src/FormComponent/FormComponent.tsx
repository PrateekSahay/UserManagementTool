import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


import React, { useState } from 'react';
import './FormComponent.css';
import { User, UserRoles } from '../Interfaces/Interfaces';

export interface FormComponentProps {
    user: User;
    roles: UserRoles[] | undefined;
    viewOnly: boolean;
}

const FormComponent = (props: FormComponentProps) => {
    const [email, setEmail] = useState(props.user.email);
    const [firstName, setFirstName] = useState(props.user.firstName);
    const [lastName, setLastName] = useState(props.user.lastName);
    const [isTrialUser, setIsTrialUser] = React.useState(props.user.isTrialUser);
    const [userName, setUserName] = useState(props.user.userName);
    return(
        <div className='column'>
            <div>
                <div>
                <InputLabel>Customer</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  placeholder="Select Side"
                  label="Age"
                  value="test"
                  disabled={props.viewOnly}
                >                
                  {/* <MenuItem value={10}>Ten</MenuItem> */}
                  {/* <MenuItem value={20}>Twenty</MenuItem> */}
                  {/* <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
                </div>            
                <div className='textField'>                
                    <InputLabel>Email</InputLabel>
                    <TextField
                        id="standard-helperText"                
                        value={email}            
                        variant="filled"
                        disabled={props.viewOnly}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='textField'>                
                    <InputLabel>First Name</InputLabel>
                    <TextField
                        id="standard-helperText"                
                        value={firstName}        
                        variant="filled"
                        disabled={props.viewOnly}
                        onChange={(e) => setFirstName(e.target.value)}                 
                    />
                </div>
                <div className='textField'>                
                    <InputLabel>Last Name</InputLabel>
                    <TextField
                        id="standard-helperText"                
                        value={lastName}            
                        variant="filled"
                        disabled={props.viewOnly}
                        onChange={(e) => setLastName(e.target.value)}                 
                    />
                </div>          
                <FormControlLabel control={<Checkbox
                    value={isTrialUser}
                    disabled={props.viewOnly}
                    checked={isTrialUser}                       
                 onChange={() => setIsTrialUser(!isTrialUser)} />} label="Label" />  
            </div>
            <div>
            <div className='textField'>                
                    <InputLabel>UserName</InputLabel>
                    <TextField
                        id="standard-helperText"                
                        value={userName} 
                        disabled={props.viewOnly}           
                        variant="filled"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
            </div>
            <div>

            </div>
        </div>
    );
}

export { FormComponent as default};