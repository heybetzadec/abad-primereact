import React, {useState, useContext, useEffect} from 'react';
import {Card} from "primereact/card";
import {Link} from "react-router-dom";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useTranslation} from "react-i18next";
import {useImmer} from "use-immer";
import {Checkbox} from "primereact/checkbox";
import { Toast } from 'primereact/toast';
import LoginService from "../../service/LoginService";
import {useCookies} from "react-cookie";
import {useHistory} from "react-router-dom";
import StateContext from "../../util/context/StateContext";
import DispatchContext from "../../util/context/DispatchContext";
import LoadingPage from "../website/layout/LoadingPage";

const Login = () => {
    const {t} = useTranslation();
    const appState = useContext(StateContext)
    const appDispatch = useContext(DispatchContext)
    const history = useHistory();
    const service  = new LoginService()
    const [remember, setRemember] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const [toast, setToast] = useState(<Toast  />)
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['email']);
    const [error, updateError] = useImmer({
        mail: '',
        password: ''
    });

    if (appState.loggedIn) {
        history.push(global.variable.dashboardPath);
        return (<LoadingPage />)
    }

    const submit = () => {
        const inputData = {
            email: document.getElementById('mail').value,
            password: document.getElementById('password').value
        }

        updateError(draft => {
            if (inputData.mail === '')
                draft.mail = t('please_input');
            else
                draft.mail = ''


            if (inputData.password === '')
                draft.password = t('please_input');
            else
                draft.password = ''
        });

        if (error.mail === '' && error.password === '') {
            const service  = new LoginService()
            service.getLoginAuthentication(inputData).then(data => {
                let isMounted = true;
                if (isMounted) {
                    if (data.status === 'ok'){
                        if (remember){
                            setCookie('email', inputData.email, { path: '/' });
                            setCookie('password', inputData.password, { path: '/' });
                        }
                        appDispatch({ type: "login", data: data })
                    } else if (data.status === 'not_find'){
                        showToast('warn', t('warn'), t('invalid_login_credentials'))
                    } else {
                        showToast('warn', t('warn'), t('have_some_issues'))
                        console.log(data.message)
                    }
                }
                return () => { isMounted = false };
            }).catch(e => {
                showToast('error', t('error'), t('server_not_working'))
                console.log(e)
            });
        }

    }

    const showToast = (severity, summary, message) => {
        setToast(toast=> toast.show({severity:severity, summary: summary, detail:message, life: 4000}))
    }

    return (
        <div className="p-d-flex p-jc-center center-login">
            <Toast ref={(el) => setToast(el)} position="top-center"/>

            <div className="login-box">
                <div className="p-d-flex p-jc-center">
                    <Link to="/" className="logo" aria-label="Abad logo">
                        <img style={{width:150,marginBottom:'1em'}} alt="logo" src={global.variable.url+'image/abad_dark.png'} />
                    </Link>
                </div>

                <div className="box">
                    <Card>
                        <h1>{t('login')}</h1>
                        <div className="p-fluid">
                            <div className="p-field">
                                <label htmlFor="mail">{t('mail')}</label>
                                <InputText id="mail" type="text" className={error.mail==='' ? '' : 'p-invalid p-d-block'}/>
                                <small id="mailError" className={error.mail==='' ? '' : 'p-invalid p-d-block'}>{error.mail}</small>
                            </div>
                            <div className="p-field">
                                <label htmlFor="password">{t('password')}</label>
                                <InputText id="password" type="password" className={error.password==='' ? '' : 'p-invalid p-d-block'}/>
                                <small id="passwordError" className={error.password==='' ? '' : 'p-invalid p-d-block'}>{error.password}</small>
                            </div>
                            <div className="p-field">
                                <div className="p-field-checkbox">
                                    <Checkbox inputId="remember" onChange={()=>{setRemember(oldValue => !oldValue)}} checked={remember}/>
                                    <label htmlFor="remember">{t('remember_me')}</label>
                                </div>
                            </div>
                            <div className="p-field">
                                <Button style={{marginTop:10}} type="button" label={t('login')} onClick={submit}/>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
        // <div className="p-grid center-login">
        //     <Toast ref={(el) => setToast(el)} position="top-center"/>
        //
        //
        //     <div className="p-col-12 p-md-6 p-lg-4"/>
        //     <div className="p-col-12 p-md-6 p-lg-4">
        //         <div className="p-d-flex p-jc-center">
        //             <Link to="/" className="logo" aria-label="Abad logo">
        //                 <img style={{width:150,marginBottom:'1em'}} alt="logo" src={global.variable.url+'image/abad_dark.png'} />
        //             </Link>
        //         </div>
        //
        //         <div className="box">
        //             <Card>
        //                 <h1>{t('login')}</h1>
        //                 <div className="p-fluid">
        //                     <div className="p-field">
        //                         <label htmlFor="mail">{t('mail')}</label>
        //                         <InputText id="mail" type="text" className={error.mail==='' ? '' : 'p-invalid p-d-block'}/>
        //                         <small id="mailError" className={error.mail==='' ? '' : 'p-invalid p-d-block'}>{error.mail}</small>
        //                     </div>
        //                     <div className="p-field">
        //                         <label htmlFor="password">{t('password')}</label>
        //                         <InputText id="password" type="password" className={error.password==='' ? '' : 'p-invalid p-d-block'}/>
        //                         <small id="passwordError" className={error.password==='' ? '' : 'p-invalid p-d-block'}>{error.password}</small>
        //                     </div>
        //                     <div className="p-field">
        //                         <div className="p-field-checkbox">
        //                             <Checkbox inputId="remember" onChange={()=>{setRemember(oldValue => !oldValue)}} checked={remember}/>
        //                             <label htmlFor="remember">{t('remember_me')}</label>
        //                         </div>
        //                     </div>
        //                     <div className="p-field">
        //                         <Button style={{marginTop:10}} type="button" label={t('login')} onClick={submit}/>
        //                     </div>
        //                 </div>
        //             </Card>
        //         </div>
        //     </div>
        //     <div className="p-col-12 p-md-6 p-lg-4"/>
        // </div>
    );
};

export default Login;