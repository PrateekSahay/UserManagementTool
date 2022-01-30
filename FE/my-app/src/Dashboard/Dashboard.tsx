import React from 'react';
import SimpleCard from '../Card/Card';
import './Dashboard.scss';

export interface IDashboardProps {
    numberOfUsers: number;
}

const Dashboard = (props: IDashboardProps) => {
  return (
  <div>
      <h1>Dashboard</h1>
      <div className='dashBoardContainer'>
        <SimpleCard numberOfUsers={props.numberOfUsers} cardName={"Users"} />
        <SimpleCard numberOfUsers={32} cardName={"Applications"} />
        <SimpleCard numberOfUsers={110} cardName={"Modules"} />
        <SimpleCard numberOfUsers={50} cardName={"Packages"} />
      </div>      
  </div>
  );
};

export default Dashboard;
