import React, {useState} from 'react';
import AppTopBar from "./AppTopBar";
import AppMenu from "./AppMenu";
import classNames from 'classnames';



const DashboardPage = (props) => {

    const [sidebarActive, setSidebarActive] = useState(false)


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

    const onMenuItemClick = () => {
        setSidebarActive(false)
        removeClass(document.body, 'blocked-scroll');
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

    return (
        <>
            <AppTopBar onMenuButtonClick={onMenuButtonClick}/>
            <AppMenu active={sidebarActive}/>
            {props.children}
            <div className={maskClassName} onClick={onMaskClick}></div>
        </>
    );
};

export default DashboardPage;