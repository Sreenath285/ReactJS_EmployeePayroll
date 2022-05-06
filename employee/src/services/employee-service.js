import config from '../config/config';
import axios from 'axios';

class EmployeeService {
    baseURL = config.baseURL;

    addEmployee = (data) => {
        return axios.post(`${this.baseURL}employee`, data);
    }

    getEmployees = () => {
        return axios.get(`${this.baseURL}employee`);
    }

    getEmployee(employeeID) {
        return axios.get(`${this.baseURL}employee/${employeeID}`);
    }

    updateEmployee(employeeID,data) {
        return axios.put(`${this.baseURL}employee/${employeeID}`, data);
    }

    deleteEmployee(employeeID) {
        return axios.delete(`${this.baseURL}employee/${employeeID}`);
    }
}

export default new EmployeeService();