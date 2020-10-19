import React, {useContext, useEffect, useState} from 'react';
import DashboardPage from "./layout/DashboardPage";
import {useTranslation} from "react-i18next";
import CategoryService from "../../service/CategoryService";
import StateContext from "../../util/context/StateContext";
import {Fieldset} from "primereact/fieldset";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {InputTextarea} from "primereact/inputtextarea";

const CategoryDetail = (props) => {
    const {t} = useTranslation();
    const service = new CategoryService()
    const appState = useContext(StateContext)

    const breadcrumbItems =  [
        { label: t('categories'), url: global.variable.dashboardPath+'/categories'},
        { label: props.title, url: global.variable.dashboardPath+'/category/add'}
    ]


    useEffect(()=>{
        service.getCategories(appState.language.id).then(response => {
            if (response.status === 'ok') {
                console.log(response)
            } else {
                console.log(response.message)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])




    return (
        <DashboardPage title={props.title} menuKey={props.menuKey} breadCrumbItems={breadcrumbItems}>
            <Fieldset legend="Azərbaycan" toggleable>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="firstname6">Firstname</label>
                        <InputText id="firstname6" type="text" />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="lastname6">Lastname</label>
                        <InputText id="lastname6" type="text" />
                    </div>
                    <div className="p-field p-col-12">
                        <label htmlFor="address">Address</label>
                        <InputTextarea id="address" type="text" rows="4" />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="city">City</label>
                        <InputText id="city" type="text" />
                    </div>
                    <div className="p-field p-col-12 p-md-3">
                        <label htmlFor="state">State</label>
                        {/*<Dropdown inputId="state" value={this.state.selectedState} options={this.state.states} onChange={this.onStateChange} placeholder="Select" optionLabel="name"/>*/}
                    </div>
                    <div className="p-field p-col-12 p-md-3">
                        <label htmlFor="zip">Zip</label>
                        <InputText id="zip" type="text" />
                    </div>
                </div>
            </Fieldset>

            <div className="p-field p-col-12 p-md-3">
                <label htmlFor="zip">Zip</label>
                <InputText id="zip" type="text" />
            </div>
        </DashboardPage>
    );
};

export default CategoryDetail;