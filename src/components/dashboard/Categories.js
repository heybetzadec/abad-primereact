import React, {useContext, useEffect, useState} from 'react';
import DashboardPage from "./layout/DashboardPage";
import {useTranslation} from "react-i18next";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import CategoryService from "../../service/CategoryService";
import StateContext from "../../util/context/StateContext";

const Categories = (props) => {
    const {t} = useTranslation();
    const service = new CategoryService()
    const appState = useContext(StateContext)

    const breadcrumbItems =  [{ label: t('categories'), url: global.variable.dashboardPath+'/categories'}]

    const [tableData, setTableData] = useState([])


    useEffect(()=>{
        service.getCategories(appState.language.id).then(response => {
            if (response.status === 'ok') {
                setTableData(response.categories)
            } else {
                console.log(response.message)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    const publishBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">{t('publish')}</span>
                {rowData.is_publish === 1 ? <span className="p-tag p-tag-success">{t('publish')}</span> : <span className="p-tag p-tag-warning">{t('pending')}</span>}
            </React.Fragment>
        );
    }

    return (
        <DashboardPage title={props.title} menuKey={props.menuKey} breadCrumbItems={breadcrumbItems} addUrl={global.variable.dashboardPath+'/category/add'}>
            <div className="datatable-responsive-demo">
                <div className="card">
                    <DataTable value={tableData} className="p-datatable-responsive-demo" paginator rows={10}>
                        <Column field="name" header={t('name')} body={(rowData) => <React.Fragment><span className="p-column-title">{t('name')}</span>{rowData.name}</React.Fragment>} />
                        <Column field="key_name" header={t('slug')}  body={(rowData) => <React.Fragment><span className="p-column-title">{t('slug')}</span>{rowData.key_name}</React.Fragment>} />
                        <Column field="is_publish" header={t('publish')}  body={publishBodyTemplate} />
                    </DataTable>
                </div>
            </div>
        </DashboardPage>
    );
};

export default Categories;