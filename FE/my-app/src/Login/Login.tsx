import React, { useState } from 'react';
import './Login.scss';
import { AuthReq } from '../Interfaces/Interfaces';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

interface LoginComponentProps {
    isAuthenticated: (value: boolean) => void;
}

const LoginComponent = (props: LoginComponentProps) => {

    const [userName, setUserName] = useState('');
    const [pass, setPass] = useState('');

    const onsubmitClick = () => {
        const req: AuthReq = {
            Password: pass,
            userName: userName
        };        

        fetch('https://localhost:44365/api/User/Auth', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
        .then(resp => resp.json())
        .then(data => {
          console.log("data", data); 
          props.isAuthenticated(data);
        });
    }

    return (
        <div className='loginContainer'>            
            <h1>GEMS Cloud Web Application</h1>            
            <div className='form'>                
                <TextField
                    className="textField"
                    id="input-with-icon-textfield"   
                    value={userName}                    
                    onChange={(e) => setUserName(e.target.value)}                 
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="filled"
                />
                <TextField
                    className="textField"
                    id="input-with-icon-textfield"   
                    value={pass}        
                    type="password"
                    onChange={(e) => setPass(e.target.value)}                 
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">
                          <LockIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="filled"
                />                            
                <Button variant="contained" onClick={onsubmitClick}>Sign in</Button>
                <Button variant="text">Forgot password</Button>
            </div>
        </div>
    );
};

export { LoginComponent as default }