import React, { useState } from 'react';
import LoginComponent from './LoginComponent/LoginComponent';
import UserManagementToolComponent from './UserManagementToolComponent/UserManagementToolComponent';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const updateAuthentication = (value: boolean) => setIsAuthenticated(value);

  return (    
    <div className="page">
      {!isAuthenticated ?
       <LoginComponent 
        isAuthenticated={updateAuthentication}
       />
       :
       <UserManagementToolComponent />
      }      
    </div>
  );
}

export default App;
