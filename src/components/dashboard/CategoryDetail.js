import React, {useEffect, useState} from 'react';
import { InputText } from 'primereact/inputtext';
import {Button} from "primereact/button";
import {functions} from "../../util/use/functions";

const CategoryDetail = () => {

    const [data, setData] = useState({name:'', slug:''})

    useEffect(()=>{
        data.slug = functions.slug(data.name)
    }, [data.name])

    return (
        <div>
            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col">
                    <label htmlFor="firstname2">Firstname</label>
                    <InputText id="firstname2" type="text" value={data.name} onChange={(e)=>{
                        setData({name:e.target.value})
                    }}/>
                </div>
                <div className="p-field p-col">
                    <label htmlFor="lastname2">Lastname</label>
                    <InputText id="lastname2" type="text" value={data.slug}/>
                </div>
                <Button type="button" label="Submit"/>
            </div>
        </div>
    );
};

export default CategoryDetail;