import React from "react";
import './dashboard.css';
import profile_pic_1 from '../../assets/profile-images/Ellipse -3.png';
import profile_pic_2 from '../../assets/profile-images/Ellipse -1.png';
import profile_pic_3 from '../../assets/profile-images/Ellipse -8.png';
import editEmp from '../../assets/icons/create-black-18dp.svg';
import deleteEmp from '../../assets/icons/delete-black-18dp.svg';
import logo from '../../assets/images/logo.png'
import {Link} from "react-router-dom";


function Dashboard() {

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
                        <div className="emp-count">10</div>
                    </div>
                    <Link to="/payroll" className="add-button">
                        <img className="add-button" src="../assets/plus_symbol.svg" alt=""/>Add Employee
                    </Link>

                </div>

                <div className="table-main">
                    <table id="table-display" className="table">
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Department</th>
                            <th>Salary</th>
                            <th>Start Date</th>
                            <th>Actions</th>
                        </tr>
                        <tr>
                            <td><img className="profile" src={profile_pic_1} alt="profile_img-1"/></td>
                            <td>Sreenath</td>
                            <td>Male</td>
                            <td>
                                <div className="dept-label">HR</div>
                                <div className="dept-label">Finance</div>
                            </td>
                            <td>4000000</td>
                            <td>07 Feb 2022</td>
                            <td>
                                <img src={editEmp} alt="delete" id="1" onClick="remove(this)"/>
                                <img src={deleteEmp} alt="edit" id="1" onClick="update(this)"/>
                            </td>
                        </tr>
                        <tr>
                            <td><img className="profile" src={profile_pic_2} alt="profile_img-2"/></td>
                            <td>Sreenidhi</td>
                            <td>Female</td>
                            <td>
                                <div className="dept-label">HR</div>
                                <div className="dept-label">Finance</div>
                            </td>
                            <td>4000000</td>
                            <td>07 Feb 2022</td>
                            <td>
                                <img src={editEmp} alt="delete" id="1" onClick="remove(this)"/>
                                <img src={deleteEmp} alt="edit" id="1" onClick="update(this)"/>
                            </td>
                        </tr>
                        <tr>
                            <td><img className="profile" src={profile_pic_3} alt="profile_img-2"/></td>
                            <td>Tony</td>
                            <td>Male</td>
                            <td>
                                <div className="dept-label">HR</div>
                                <div className="dept-label">Finance</div>
                            </td>
                            <td>4000000</td>
                            <td>07 Feb 2022</td>
                            <td>
                                <img src={editEmp} alt="delete" id="1" onClick="remove(this)"/>
                                <img src={deleteEmp} alt="edit" id="1" onClick="update(this)"/>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </>
    )
}
export default Dashboard;