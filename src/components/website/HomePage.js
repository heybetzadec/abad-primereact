import React from 'react';
import WebPage from "./layout/WebPage";

const HomePage = (props) => {

    return (
        <WebPage title={props.title} menuKey={props.menuKey}>
            <h1>HomePage</h1>
        </WebPage>
    );
};

export default HomePage;