import axios from 'axios'
import '../util/use/variable'
import {functions} from "../util/use/functions";

export default class CategoryService {

    getCategories(langId){
        return axios.get(`${global.variable.api}category/all/lang/${langId}`).then(res => res.data);
    }

    createCategory(token){
        return axios.post(`${global.variable.secureApi}category/create`, {}, functions.tokenHeader(token))
    }

    getPaginationCategories(per, lang, page){
        let language = global.variable.languages.find(element => element.code === lang)
        return axios.get(`${global.variable.api}category/per/${per}/lang/${language.id}?page=${page}`).then(res => res.data);
    }

    getAllTopCategories(){
        return axios.get(`${global.variable.api}category/top/all`).then(res => res.data);
    }

    getCategory(key){
        return axios.get(`${global.variable.api}category/key/${key}`).then(res => res.data);
    }

    saveCategory(token, data){
        return axios.post(`${global.variable.secureApi}category/save`, data, functions.tokenHeader(token))
    }

    updateCategory(token, data, key){
        return axios.post(`${global.variable.secureApi}category/edit/key/${key}`, data, functions.tokenHeader(token))
    }
    
    removeCategory(token, key) {
        return axios.post(`${global.variable.secureApi}category/remove/key/${key}`, {}, functions.tokenHeader(token))
    }
}