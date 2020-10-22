import React, {useEffect, useState, useContext} from 'react';
import AppTopBar from "./AppTopBar";
import AppMenu from "./AppMenu";
import classNames from 'classnames';
import {Button} from "primereact/button";
import {Card} from "primereact/card";
import {BreadCrumb} from "primereact/breadcrumb";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";

import StateContext from "../../../util/context/StateContext";
import LoadingPage from "../../website/layout/LoadingPage";

// import '../../../util/asset/dashboard.css'

const DashboardPage = (props) => {
    const {t} = useTranslation();
    const appState = useContext(StateContext)
    const history = useHistory();
    const [sidebarActive, setSidebarActive] = useState(false)


    useEffect(() => {
        if (props.title === undefined){
            document.title = global.variable.appName
        } else {
            document.title = `${props.title} | ${global.variable.appName}`
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.title])


    if (!appState.loggedIn) {
        history.replace(`${global.variable.dashboardPath}/login`);
        return (<LoadingPage />)
    }

    const maskClassName = classNames('layout-mask', {
        'layout-mask-active': sidebarActive
    });
    const onMenuButtonClick = () => {
        setSidebarActive(oldValue => !oldValue)

        if (sidebarActive) {
            setSidebarActive(false)
            removeClass(document.body, 'blocked-scroll');
        }
        else {
            setSidebarActive(true)
            addClass(document.body, 'blocked-scroll');
        }
    }
    const onMaskClick = () => {
        setSidebarActive(false)
        removeClass(document.body, 'blocked-scroll');
    }
    const addClass = (element, className) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }
    const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }


    const home = { icon: 'pi pi-home', url: global.variable.dashboardPath }

    return (
        <>
            <AppTopBar onMenuButtonClick={onMenuButtonClick}/>
            <AppMenu active={sidebarActive} menuKey={props.menuKey}/>

            <div className="layout-content">
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>{props.title}</h1>
                    </div>
                    {
                        props.addUrl === undefined ? null :
                            <div className="add_button_content">
                                <Link to={props.addUrl}>
                                    <Button label={t('add')} className="p-button-outlined" icon="pi pi-plus"/>
                                </Link>
                            </div>
                    }
                </div>

                <div className="content-section implementation button-demo">

                    <Card>
                        <BreadCrumb model={props.breadCrumbItems} home={home} />
                        {props.children}
                    </Card>
                </div>

            </div>

            <div className={maskClassName} onClick={onMaskClick} />
        </>
    );
};

export default DashboardPage;