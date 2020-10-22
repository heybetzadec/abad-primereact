import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "primereact/button";

const WebTopBar = (props) => {

    return (
        <div className="layout-web-topbar">

            <button type="button" className="p-link menu-button" onClick={props.onMenuButtonClick} aria-haspopup aria-label="Menu">
                <i className="pi pi-bars"/>
            </button>
            <Link to="/" className="logo" aria-label="Abad logo">
                <img style={{width:150}} alt="logo" src={global.variable.url+'asset/img/abadlogo.png'} />
            </Link>

            <div className="app-theme">
                <Button label="Secondary" className="p-button-rounded p-button-secondary" />
            </div>

        </div>
    );
};

export default WebTopBar;