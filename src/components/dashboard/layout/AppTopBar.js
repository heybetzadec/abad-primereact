import React, {useState} from 'react';
import {InputText} from "primereact/inputtext";
import {Tooltip} from "primereact/tooltip";
import {Link} from "react-router-dom";
import {CSSTransition} from "react-transition-group";
import {Button} from "primereact/button";
import {TieredMenu} from "primereact/tieredmenu";

const AppTopBar = (props) => {

    const [activeMenuIndex, setActiveMenuIndex] = useState(0);
    const [menu, setMenu] = useState(<TieredMenu model={[]} popup ref={el => this.menu = el} id="overlay_tmenu" />);

    const items = [
        {
            label:'Profile',
            icon:'pi pi-fw pi-user',
            url:`${global.variable.dashboardPath}/profile`
        },
        {
            label:'Settings',
            icon:'pi pi-fw pi-cog',
            url:`${global.variable.dashboardPath}/settings`
        },
        {
            separator:true
        },
        {
            label:'Quit',
            icon:'pi pi-fw pi-power-off',
            command:()=>{ console.log('logout') }
        }
    ];

    function onMenuButtonClick(){
        console.log('onMenuButtonClick')
    }

    function resetMenuActive(){
        console.log('resetMenuActive')
    }

    function topbarMenu(){
        console.log('topbarMenu')
    }

    function onMenuEnter(){
        console.log('onMenuEnter')
    }

    function toggleMenu(e, val) {
        setActiveMenuIndex(value=>value === 1 ? 0 : 1)
        console.log(e)
    }

    return (
        <div className="layout-topbar">

            <button type="button" className="p-link menu-button" onClick={props.onMenuButtonClick} aria-haspopup aria-label="Menu">
                <i className="pi pi-bars"></i>
            </button>
            <Link to="/" className="logo" aria-label="PrimeReact logo">
                <img style={{width:100}} alt="logo" src="./abad.png" />
            </Link>



            <div className="app-theme">
                <TieredMenu model={items} popup ref={el => setMenu(el)} id="overlay_tmenu" />
                <Link to="#" onClick={(event) => setMenu(menu => menu.toggle(event))}>
                    <img className="rounded_user" src="./user.jpg"/>
                </Link>

                {/*<Button icon="pi pi-user" className="p-button-rounded p-button-info p-button-outlined" onClick={(event) => setMenu(menu => menu.toggle(event))} aria-haspopup aria-controls="overlay_tmenu"/>*/}
            </div>

        </div>
    );
};

export default AppTopBar;