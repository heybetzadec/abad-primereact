import React from 'react';
import DashboardPage from "./layout/DashboardPage";

const Posts = (props) => {

    return (
        <DashboardPage title={props.title} menuKey={props.menuKey}>
            <h2>Posts</h2>
        </DashboardPage>
    );
};

export default Posts;