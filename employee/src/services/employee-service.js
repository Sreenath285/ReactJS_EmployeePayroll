import config from '../config/config';
import axios from 'axios';
// const axios = require('axios').default;

class EmployeeService {
    baseURL = config.baseURL;
    addEmployee = (data) => {
        return axios.post(`${this.baseURL}employee`, data);
    }

    getEmployee = () => {
        return axios.get(`${this.baseURL}employee`);
    }
}

export default new EmployeeService();