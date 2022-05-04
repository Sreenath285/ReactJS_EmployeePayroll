import React, { useEffect, useState } from "react";
import './dashboard.css';
import logo from '../../assets/images/logo.png'
import {Link} from "react-router-dom";
import Employee from "./employee";
import EmployeeService from "../../services/employee-service";

function Dashboard() {

    const [employeeArray, setEmployee] = useState([]);

    useEffect(() => {
        getAllEmployees();
    }, []);

    const getAllEmployees = () => {
       EmployeeService.getEmployees().then((response) => {
           const allEmployees = response.data;
           setEmployee(allEmployees);
       }).catch((error) => {
           alert(error);
       })
    }

    return (
        <>
            <div className="header header-content">
                <div className="logo-content">
                    <img src={logo} className="logo-content-img" alt="logo" />
                    <div>
                        <span className="emp-text">EMPLOYEE</span><br/>
                        <span className="emp-text emp-payroll">PAYROLL</span>
                    </div>
                </div>
            </div>

            <div className="main-content">
                <div className="header-content employee-header">
                    <div className="emp-detail-text">
                        Employee Details
                        <div className="emp-count"></div>
                    </div>
                    <Link to="/payroll" className="add-button">
                        <div className="add-button">Add Employee</div>
                    </Link>
                </div>

                <div className="table-main">
                    <Employee employeeArray={employeeArray}/>
                </div>
            </div>
        </>
    )
}
export default Dashboard;