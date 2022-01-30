import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import './Form.scss';
import { User, UserRoles } from '../Interfaces/Interfaces';
import { staticRoles } from './Constants';
import { Button } from '@mui/material';

export interface FormProps {
    user: User | undefined;
    roles: UserRoles[] | undefined;
    viewOnly: boolean;    
    isPut?: boolean;
}

const Form = (props: FormProps) => {
    console.log("props", props);
    const [email, setEmail] = useState(props.user?.email);
    const [firstName, setFirstName] = useState(props.user?.firstName);
    const [lastName, setLastName] = useState(props.user?.lastName);
    const [isTrialUser, setIsTrialUser] = React.useState(props.user?.isTrialUser);
    const [userName, setUserName] = useState(props.user?.userName);
    const [checkBoxesArray, setCheckBoxesArray] = useState<any>([]);    

    useEffect(() => {
        setEmail(props.user?.email);
        setFirstName(props.user?.firstName);
        setLastName(props.user?.lastName);
        setIsTrialUser(props.user?.isTrialUser);
        setUserName(props.user?.userName);
        updateCheckBoxArray();
        //setChecked();
    }, [props]);

    function updateCheckBoxArray() {
        const updatedArray = staticRoles.map((role) => ({
          ...role,
          isSelected: props.user?.userRoles?.some(({ roleId }) => roleId === role.roleId)
        }));
        setCheckBoxesArray(updatedArray);
      }
    
      function handleCheckStatus(roleId: any) {
        setCheckBoxesArray(
          checkBoxesArray.map((role: any) => {
            if (roleId === role.roleId) {
              return {
                ...role,
                isSelected: !role.isSelected
              };
            }
    
            return role;
          })
        );
      }

      const getUserRoles = () => {
        const roles: UserRoles[] = [];
        checkBoxesArray.map((role: any) => {
          if (role.isSelected) {
            const roleRes: UserRoles = {
              roleId: role.roleId,
              roleName: role.roleName
            };
            roles.push(roleRes);
          }
        })
        return roles;
      }

      const onSubmit = () => {
        if (!props.isPut) {
          const postReq: User = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: props.user?.password || 'pass',
            userName: userName,
            isTrialUser: isTrialUser,
            userId: props.user?.userId,
            userRoles: getUserRoles()
          };
  
          fetch('https://localhost:44365/api/User', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(postReq)
          })
          .then(resp => resp.json())
          .then(data => {
            console.log("data", data);          
          });
        }
        else {
          const postReq: User = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: props.user?.password || 'pass',
            userName: userName,
            isTrialUser: isTrialUser,
            userId: props.user?.userId,
            userRoles: getUserRoles()
          };
  
          fetch('https://localhost:44365/api/User', {
              method: 'PUT',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(postReq)
          })
          .then(resp => resp.json())
          .then(data => {
            console.log("data", data);          
          });
        }        

      }

      const onReset = () => {}

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
            {checkBoxesArray.map(({ isSelected, roleName, roleId }: any) => (
                <>
                <InputLabel>{roleName}</InputLabel>
                <input
                type="checkbox"
                disabled={props.viewOnly}
                onClick={() => handleCheckStatus(roleId)}
                checked={isSelected}                       
             />
             </>
            ))}                            
            </div>
            <div>
            <Button        
                variant="contained"
                disabled={props.viewOnly}    
                onClick={() => onSubmit()}
            >
                Add
            </Button>
            <Button        
                variant="contained"
                disabled={props.viewOnly}    
                onClick={() => onReset()}
            >
              Reset
            </Button>
            </div>
        </div>
    );
}

export { Form as default};