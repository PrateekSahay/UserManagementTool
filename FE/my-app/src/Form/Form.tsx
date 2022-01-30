import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import './Form.scss';
import { User, UserRoles } from '../Interfaces/Interfaces';
import { staticRoles } from './Constants';

export interface FormProps {
    user: User | undefined;
    roles: UserRoles[] | undefined;
    viewOnly: boolean;    
}

const Form = (props: FormProps) => {
    console.log("props", props);
    const [email, setEmail] = useState(props.user?.email);
    const [firstName, setFirstName] = useState(props.user?.firstName);
    const [lastName, setLastName] = useState(props.user?.lastName);
    const [isTrialUser, setIsTrialUser] = React.useState(props.user?.isTrialUser);
    const [userName, setUserName] = useState(props.user?.userName);
    const [finalArr, setFinalArr] = useState<any>([]);
    let arr1: ({ roleId: number; roleName: string; } | undefined)[] = [];

    console.log("email", email);
    // console.log("checked", checked);

    // const handleChangeCheckBox = (id: number) => {
    //     const index = checked.indexOf(id);
    //     if (index > -1) {
    //         const index = checked.indexOf(id);
    //         setChecked(checked.splice(index, 1));
    //     }
    //     else setChecked([...checked, id]);
    // }

    useEffect(() => {
        setEmail(props.user?.email);
        setFirstName(props.user?.firstName);
        setLastName(props.user?.lastName);
        setIsTrialUser(props.user?.isTrialUser);
        setUserName(props.user?.userName);
        getSelectedRoles();
        //setChecked();
    }, [props]);

    const getSelectedRoles = () => {
        console.log(props.user?.userRoles);
        props.user && props.user.userRoles?.forEach(element => {
            console.log(element)
            const isObjectPresent = staticRoles.find((o) => o.roleId === element.roleId);
            // finalArr.push(isObjectPresent);
            Object.assign(isObjectPresent, {
                isChecked: true
            });
            arr1.push(isObjectPresent);            
        });
        setFinalArr(arr1);
        console.log('Bro', finalArr, arr1);
    }

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
                    //value={isTrialUser}
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
            {console.log(props.roles)}
                {finalArr.map((x: { isChecked: boolean | undefined; roleName: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) =>
                <div>
                    <Checkbox
                    //value={checked}
                    disabled={props.viewOnly}
                    onChange={() => console.log('hI')}
                    checked={x?.isChecked}                       
                 />
                 <span>{x.roleName}</span>             
                </div>)}                
            </div>
        </div>
    );
}

export { Form as default};