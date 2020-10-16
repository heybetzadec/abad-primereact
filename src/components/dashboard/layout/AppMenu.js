import React from 'react';
import classNames from 'classnames';
import {Link} from "react-router-dom";

const AppMenu = (props) => {

    return (
        <div className={classNames('layout-sidebar', {'active': props.active})} role="navigation">
            <div className="layout-menu" role="menubar">
                <div className="menu-items active-menu">
                    <Link to={"#"}>Dashboard</Link>
                </div>
                <div className="menu-items">
                    <Link to={"#"}>Categories</Link>
                </div>

            </div>
        </div>
    );
};

export default AppMenu;