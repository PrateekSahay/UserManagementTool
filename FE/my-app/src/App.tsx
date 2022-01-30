import React, { useState } from 'react';
import Login from './Login/Login';
import UserManagementTool from './UserManagementTool/UserManagementTool';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const updateAuthentication = (value: boolean) => setIsAuthenticated(value);

  return (    
    <div className="page">
      {!isAuthenticated ?
       <Login
        isAuthenticated={updateAuthentication}
       />
       :
       <UserManagementTool />
      }      
    </div>
  );
}

export default App;
