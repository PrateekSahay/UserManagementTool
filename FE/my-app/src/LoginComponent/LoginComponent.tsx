import React, { useState } from 'react';
import './LoginComponent.css';
import { AuthReq } from '../Interfaces/Interfaces';

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

        // fetch('https://localhost:44365/api/User')
        // .then(resp => resp.json())
        // .then(data => {            
        // console.log(data);                
        // }
        // );

        fetch('https://localhost:44365/api/User/Auth', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
        .then(resp => resp.json())
        .then(data => {console.log("data", data); props.isAuthenticated(data)});
    }

    return (
        <div className='loginContainer'>
            <div className='header'>
                GEMS Cloud Web Application
            </div>
            <div className='form'>
                <input type = "text"
                    value={userName}
                    placeholder='UserName'
                    onChange={(e) => setUserName(e.target.value)}/>
                <input type = "text"
                    value={pass}
                    placeholder='Password'
                    onChange={(e) => setPass(e.target.value)}/>            
                <button onClick={onsubmitClick}>Sign in</button>
                <button>Forgot password</button>
            </div>
        </div>
    );
};

export { LoginComponent as default }