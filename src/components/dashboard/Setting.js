import React from 'react';
import DashboardPage from "./layout/DashboardPage";

const Setting = props => {
    return (
        <DashboardPage title={props.title} menuKey={props.menuKey}>
            <h2>Setting</h2>
        </DashboardPage>
    )
};

export default Setting;