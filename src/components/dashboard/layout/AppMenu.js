import React from 'react';
import classNames from 'classnames';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const AppMenu = (props) => {
    const {t} = useTranslation();

    const menuItems = [
        {
            key:'1',
            name: t('dashboard'),
            to: global.variable.dashboardPath,
            icon: 'pi-th-large'
        },
        {
            key:'2',
            name: t('categories'),
            to: global.variable.dashboardPath + '/categories',
            icon: 'pi-align-justify'
        },
        {
            key:'3',
            name: t('posts'),
            to: global.variable.dashboardPath + '/posts',
            icon: 'pi-align-left'
        },
        {
            key:'4',
            name: t('slider'),
            to: global.variable.dashboardPath + '/slider',
            icon: 'pi-image'
        },
        {
            key:'5',
            name: t('users'),
            to: global.variable.dashboardPath + '/users',
            icon: 'pi-users'
        },
        {
            key:'6',
            name: t('roles'),
            to: global.variable.dashboardPath + '/roles',
            icon: 'pi-check-square'
        },
        {
            key:'7',
            name: t('settings'),
            to: global.variable.dashboardPath + '/settings',
            icon: 'pi-cog'
        },
    ]

    return (
        <div className={classNames('layout-sidebar', {'active': props.active})} role="navigation">
            <div className="layout-menu" role="menubar">
                {
                    menuItems.map(item=> {
                        return (
                            <Link key={item.key} className={item.key === props.menuKey ? 'menu-items active-menu' : 'menu-items'} to={item.to}>
                                <i className={'pi ' + item.icon}/>
                                <span>{item.name}</span>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default AppMenu;