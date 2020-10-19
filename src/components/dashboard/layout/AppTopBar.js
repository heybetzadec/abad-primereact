import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import {TieredMenu} from "primereact/tieredmenu";
import {useTranslation} from "react-i18next";
import DispatchContext from "../../../util/context/DispatchContext";

const AppTopBar = (props) => {
    const {t} = useTranslation();
    const appDispatch = useContext(DispatchContext)

    // eslint-disable-next-line no-unused-vars
    const [menu, setMenu] = useState(<TieredMenu model={[]} popup id="overlay_tmenu" />);

    const items = [
        {
            label: t('profile'),
            icon:'pi pi-fw pi-user',
            url:`${global.variable.dashboardPath}/profile`
        },
        {
            label: t('settings'),
            icon:'pi pi-fw pi-cog',
            url:`${global.variable.dashboardPath}/settings`
        },
        {
            separator:true
        },
        {
            label: t('quit'),
            icon:'pi pi-fw pi-power-off',
            command:()=>{ appDispatch({ type: "logout" }) }
        }
    ];


    return (
        <div className="layout-topbar">

            <button type="button" className="p-link menu-button" onClick={props.onMenuButtonClick} aria-haspopup aria-label="Menu">
                <i className="pi pi-bars"/>
            </button>
            <Link to="/" className="logo" aria-label="Abad logo">
                <img style={{width:100}} alt="logo" src={global.variable.url+'image/abad.png'} />
            </Link>

            <div className="app-theme">
                <TieredMenu model={items} popup ref={el => setMenu(el)} id="overlay_tmenu" />
                <Link to="#" onClick={(event) => setMenu(menu => menu.toggle(event))}>
                    <img className="rounded_user" src={global.variable.url+'image/user.jpg'} alt="user"/>
                </Link>
            </div>

        </div>
    );
};

export default AppTopBar;