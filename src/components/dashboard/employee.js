import React from "react";
import profile_pic_1 from'../../assets/profile-images/Ellipse -3.png';
import profile_pic_2 from '../../assets/profile-images/Ellipse -1.png';
import profile_pic_3 from '../../assets/profile-images/Ellipse -8.png';
import profile_pic_4 from '../../assets/profile-images/Ellipse -7.png';
import './dashboard.css';
import editEmp from '../../assets/icons/create-black-18dp.svg';
import deleteEmp from '../../assets/icons/delete-black-18dp.svg';
import { withRouter } from "react-router-dom";
import EmployeeService from "../../services/employee-service";


const Employee = (props) => {

    const update= (employeeId) => {
        props.history.push(`payroll/${employeeId}`);
    }

    const remove = (employeeId) => {
        EmployeeService.deleteEmployee(employeeId).then((response) => {
            window.location.reload();
        }).catch((error) =>{
            alert(error)
        })
    }

    return (
        <table id="table-display" className="table">
            <tr key={-1}>
                <th>Employee ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Start Date</th>
                <th>Actions</th>
            </tr>
            {
                props.employeeArray && props.employeeArray.map((element, index) =>(
                    <tr key={index}>
                        <td>{element.employeeId}</td>
                        <td><img className="profile" src={
                                                            element.profilePic === "../../assets/profile-images/Ellipse -1.png" ?
                                                            profile_pic_2 :
                                                            element.profilePic === "../../assets/profile-images/Ellipse -3.png" ?
                                                            profile_pic_1 :
                                                            element.profilePic === "../../assets/profile-images/Ellipse -7.png" ?
                                                            profile_pic_4 :
                                                            profile_pic_3
                                                          } alt=""/>
                        </td>
                        <td>{element.name}</td>
                        <td>{element.gender}</td>
                        <td>
                            {element.department && element.department.map((dept =>
                                (<div className="dept-label">{dept}</div>)))}
                        </td>
                        <td>{element.salary}</td>
                        <td>{element.startDate}</td>
                        <td>
                            <img src={editEmp} alt="edit" onClick={() => update(element.employeeId)}/>
                            <img src={deleteEmp} alt="delete" onClick={() => remove(element.employeeId)} />
                        </td>
                    </tr>
                ))
            }
        </table>
    );
}

export default withRouter(Employee);
