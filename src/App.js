import React, {Suspense, lazy, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { useImmerReducer } from "use-immer"
import i18n from "i18next";
import {useTranslation, initReactI18next} from "react-i18next";
import StateContext from "./util/context/StateContext";
import DispatchContext from "./util/context/DispatchContext";

import translationAz from './util/locales/az/translation.json';
import translationEn from './util/locales/en/translation.json';

import LoadingPage from "./components/website/layout/LoadingPage";
import NotFound from "./components/website/layout/NotFound";
import {CookiesProvider} from "react-cookie";
import LoginService from "./service/LoginService";


import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import './util/use/variable'



import './App.css'

import DashboardLoading from "./components/dashboard/layout/DashboardLoading";

const HomePage = lazy(() => import('./components/website/HomePage'));
const Dashboard = lazy(() => import( './components/dashboard/Dashboard'));
const Login = lazy(() => import( './components/dashboard/Login'));
const Categories = lazy(() => import('./components/dashboard/Categories'));
const CategoryDetail = lazy(() => import('./components/dashboard/CategoryDetail'));
const Posts = lazy(() => import( './components/dashboard/Posts'));
const PostDetail = lazy(() => import( './components/dashboard/PostDetail'));
const Slider = lazy(() => import( './components/dashboard/Slider'));
const SliderDetail = lazy(() => import( './components/dashboard/SliderDetail'));
const Users = lazy(() => import( './components/dashboard/Users'));
const UserDetails = lazy(() => import( './components/dashboard/UserDetails'));
const Roles = lazy(() => import( './components/dashboard/Roles'));
const RoleDetail = lazy(() => import( './components/dashboard/RoleDetail'));
const Setting = lazy(() => import( './components/dashboard/Setting'));


i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources: {
        az: {
          translation: translationAz
        },
        en: {
          translation: translationEn
        }
      },
      lng: "az",
      fallbackLng: "az",
      interpolation: {
        escapeValue: false
      }
    }).then(r => {

});

function App() {

    const {t} = useTranslation();
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie, removeCookie] = useCookies(['email']);

    const initialState = {
        theme: 'light',
        user: {
            token: localStorage.getItem("appToken"),
            email: localStorage.getItem("appUserMail"),
            name: localStorage.getItem("appUserName"),
            logo: localStorage.getItem("appUserLogo")
        },
        loggedIn: Boolean(localStorage.getItem("appLoggedIn")),
        language: {id:1, name: 'Azərbaycan', code:'az'}
    }

    function ourReducer(draft, action) {
        switch (action.type) {
            case "login":
                draft.loggedIn = true
                draft.user = action.data.user
                return
            case "logout":
                draft.loggedIn = false
                draft.user = {
                    token: '',
                    email: '',
                    name: '',
                    logo: ''
                }
                return
            default:
        }
    }

    const [state, dispatch] = useImmerReducer(ourReducer, initialState)

    useEffect(() => {
        if (state.loggedIn) {
            localStorage.setItem("appToken", state.user.token)
            localStorage.setItem("appUserMail", state.user.email)
            localStorage.setItem("appUserName", state.user.name)
            localStorage.setItem("appUserLogo", state.user.logo)
            localStorage.setItem("appLoggedIn", state.loggedIn.toString())
        } else {
            // const service  = new LoginService()
            // service.logout(state.user.token).then()
            localStorage.removeItem("appToken")
            localStorage.removeItem("appUserMail")
            localStorage.removeItem("appUserName")
            localStorage.removeItem("appUserLogo")
            localStorage.removeItem("appLoggedIn")
            removeCookie('email')
            removeCookie('password')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.loggedIn])
    // , state.user.email, state.user.name, state.user.logo, state.user.token

// Check if token has expired or not on first render
    useEffect(() => {
        if (!state.loggedIn && state.user.token !== null) {
            const service  = new LoginService()
            service.checkToken(state.user.token).then(data => {
                if (data.status !== 'ok'){
                    // If token has expired check cookie for login.
                    if (cookies.email!==undefined && cookies.password!==undefined) {
                        service.getLoginAuthentication({email:cookies.email, password:cookies.password}).then(data => {
                            if (data.status === 'ok'){
                                dispatch({ type: "login", data: data })
                            }
                            console.log(data)
                        }).catch(e => {
                            console.log(e)
                        });
                    } else {
                        dispatch({ type: "logout" })
                    }
                }
            }).catch(e => {
                console.log(e)
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                <CookiesProvider>
                    <Router>
                        <Suspense fallback={window.location.href.includes(global.variable.dashboardPath) ? <DashboardLoading /> : <LoadingPage/> }>
                            <Switch>
                                <Route exact path="/">
                                    <HomePage title={t('home')} menuKey={'1'}/>
                                </Route>
                                <Route path={global.variable.dashboardPath} exact>
                                    <Dashboard title={t('dashboard')} menuKey={'1'}/>
                                </Route>
                                <Route path={`${global.variable.dashboardPath}/login`} >
                                    <Login title={t('login')} menuKey={'1'}/>
                                </Route>
                                <Route path={global.variable.dashboardPath+'/categories'}>
                                    <Categories title={t('categories')} menuKey={'2'}/>
                                </Route>
                                <Route path={global.variable.dashboardPath+'/category/add'}>
                                    <CategoryDetail title={t('add_category')} menuKey={'2'}/>
                                </Route>
                                <Route path={global.variable.dashboardPath+'/category/edit/key/:key'}>
                                    <CategoryDetail title={t('edit_category')}/>
                                </Route>
                                <Route path={global.variable.dashboardPath+'/posts'}>
                                    <Posts title={t('posts')} menuKey={'3'}/>
                                </Route>
                                <Route path={global.variable.dashboardPath+'/post/add'}>
                                    <PostDetail title={t('add_post')} menuKey={'3'}/>
                                </Route>
                                <Route path={global.variable.dashboardPath+'/post/edit/id/:id'}>
                                    <PostDetail title={t('edit_post')} menuKey={'3'}/>
                                </Route>
                                <Route path={global.variable.dashboardPath+'/slider'}>
                                    <Slider title={t('slider')} menuKey={'4'}/>
                                </Route>
                                <Route path={global.variable.dashboardPath+'/slider/add'}>
                                    <SliderDetail title={t('add_slider')} menuKey={'4'}/>
                                </Route>
                                <Route path={global.variable.dashboardPath+'/slider/edit/id/:id'}>
                                    <SliderDetail title={t('edit_slider')} menuKey={'4'}/>
                                </Route>
                                <Route path={global.variable.dashboardPath+'/users'}>
                                    <Users title={t('users')} menuKey={'5'}/>
                                </Route>
                                <Route path={global.variable.dashboardPath+'/user/add'}>
                                    <UserDetails title={t('add_user')} menuKey={'5'}/>
                                </Route>
                                <Route path={global.variable.dashboardPath+'/slider/edit/id/:id'}>
                                    <UserDetails title={t('edit_user')} menuKey={'5'}/>
                                </Route>
                                <Route path={global.variable.dashboardPath+'/roles'}>
                                    <Roles title={t('roles')} menuKey={'6'}/>
                                </Route>
                                <Route path={global.variable.dashboardPath+'/role/add'}>
                                    <RoleDetail title={t('add_role')} menuKey={'6'}/>
                                </Route>
                                <Route path={global.variable.dashboardPath+'/role/edit/id/:id'}>
                                    <RoleDetail title={t('edit_role')} menuKey={'6'}/>
                                </Route>
                                <Route path={global.variable.dashboardPath+'/settings'}>
                                    <Setting title={t('settings')} menuKey={'7'}/>
                                </Route>
                                <Route path={global.variable.dashboardPath + '/*'}>
                                    <DashboardLoading title={'...'}/>
                                </Route>
                                <Route component={NotFound} />
                            </Switch>
                        </Suspense>
                    </Router>
                </CookiesProvider>
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
}

export default App;
