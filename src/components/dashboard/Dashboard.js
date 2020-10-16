import React from 'react';
import DashboardPage from "./layout/DashboardPage";

const Dashboard = (props) => {

    return (
        <DashboardPage title={props.title} menuKey={props.menuKey}>
            <h2>Dashboard</h2>
        </DashboardPage>
    );
};

export default Dashboard;