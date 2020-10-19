import React from 'react';
import DashboardPage from "./layout/DashboardPage";

const Slider = props => {
    return (
        <DashboardPage title={props.title} menuKey={props.menuKey}>
            <h2>Slider</h2>
        </DashboardPage>
    )
};

export default Slider;