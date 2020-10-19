import React from 'react';
import DashboardPage from "./DashboardPage";
import { ProgressBar } from 'primereact/progressbar';

const DashboardLoading = (props) => {

    return (
        <DashboardPage title={props.title} menuKey={props.menuKey}>
            <ProgressBar mode="indeterminate" style={{ height: '6px' }} />
        </DashboardPage>
    );
};

export default DashboardLoading;