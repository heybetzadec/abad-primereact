import React from 'react';
import DashboardPage from "./layout/DashboardPage";

const Roles = props => {

    return (
        <DashboardPage title={props.title} menuKey={props.menuKey}>
            <h2>Roles</h2>
        </DashboardPage>
    )
};

export default Roles;