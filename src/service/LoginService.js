import axios from 'axios'
import '../util/use/variable'

export default class LoginService {

    getLoginAuthentication(requestBody) {
        let axiosConfig = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        };
        return axios.post(`${global.variable.api}user/login`, requestBody, axiosConfig).then(res => res.data);
    }

    checkToken(token) {
        let axiosConfig = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };
        return axios.post(`${global.variable.api}secure/checkToken`, {}, axiosConfig).then(res => res.data);
    }

    logout(token) {
        let axiosConfig = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };
        return axios.post(`${global.variable.api}secure/logout`, {}, axiosConfig);
    }

}