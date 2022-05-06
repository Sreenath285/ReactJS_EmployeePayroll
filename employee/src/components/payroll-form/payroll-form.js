import React, {useEffect, useState} from "react";
import './payroll-form.css';
import profile_pic_1 from '../../assets/profile-images/Ellipse -3.png';
import profile_pic_2 from '../../assets/profile-images/Ellipse -1.png';
import profile_pic_3 from '../../assets/profile-images/Ellipse -8.png';
import profile_pic_4 from '../../assets/profile-images/Ellipse -7.png';
import logo from '../../assets/images/logo.png'
import {Link} from "react-router-dom";
import EmployeeService from "../../services/employee-service";
import {useParams} from "react-router-dom/cjs/react-router-dom";

const PayrollForm = (props) => {
   let initialValue = {
       name: '',
       profilePicArray: [
           {url: '../../../assets/profile-images/Ellipse -3.png'},
           {url: '../../../assets/profile-images/Ellipse -1.png'},
           {url: '../../../assets/profile-images/Ellipse -8.png'},
           {url: '../../../assets/profile-images/Ellipse -7.png'}
       ],
       allDepartments: ['HR', 'Sales', 'Finance', 'Engineer', 'Others'],
       departmentValue: [],
       gender: '',
       salary: '',
       day: '1',
       month: 'Jan',
       year: '2021',
       notes: '',
       startDate: '',
       id: '',
       profileURL: '',
       isUpdate: false,
       error: {
           name: '',
           profileURL: '',
           gender: '',
           department: '',
           salary: '',
           startDate: ''
       }
   }

   const [formValue, setForm] = useState(initialValue);
   const params = useParams();

    const getEmployeeByID = (id) => {
        EmployeeService.getEmployee(id).then((response) => {
            let obj = response.data;
            console.log(obj);
            setData(obj);
        }).catch((error) => {
            alert(error);
        });
    }

    const setData = (obj) => {
        console.log(obj.department);
        let array=obj.startDate;
        setForm({
            ...formValue,
            ...obj,
            isUpdate: true,
            id: obj.id,
            name: obj.name,
            profileURL: obj.profileURL,
            gender: obj.gender,
            departmentValue: obj.department,
            salary: obj.salary,
            day: array[0] + array[1],
            month: array[3] + array[4] + array[5],
            year: array[7] + array[8] + array[9] + array[10],
            notes: obj.notes,
        });
    }

    useEffect(() => {
       if (params.id) {
           getEmployeeByID(params.id);
       }
   }, []);

   const changeValue = (event) => {
       setForm({...formValue, [event.target.name]: event.target.value})
   }

   const onCheckChange = (name) => {
       let index = formValue.departmentValue.indexOf(name);
       let checkArray = [...formValue.departmentValue];
       if (index > -1) {
           checkArray.splice(index, 1);
       }
       else {
           checkArray.push(name);
       }
       setForm({...formValue, departmentValue: checkArray})
   }

   const getChecked = (name) => {
       return formValue.departmentValue && formValue.departmentValue.includes(name);
   }

    const validateData = async () => {
        let isError = false;
        let error = {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profileURL: '',
            notes:''
        }
        if (!formValue.name.match('^[A-Z]{1}[a-z]{3,}$')) {
            error.name = 'Invalid NAME'
            isError = true;
        }
        if (formValue.gender.length < 1) {
            error.gender = 'Select GENDER'
            isError = true;
        }
        if (formValue.salary.length < 1) {
            error.salary = 'Required SALARY'
            isError = true;
        }
        if (formValue.profileURL.length < 1) {
            error.profileURL = 'Select PROFILE PIC'
            isError = true;
        }
        if (formValue.departmentValue.length < 1) {
            error.department = 'Select DEPARTMENT'
            isError = true;
        }
        if (formValue.notes.length < 1){
            error.notes = "Required NOTES"
            isError = true;
        }
        setForm({ ...formValue, error: error })
        return isError;
    }

    const save = async (event) => {
        event.preventDefault();
        if (await validateData()) {
            return;
        }
          let object = {
              name: formValue.name,
              department: formValue.departmentValue,
              gender: formValue.gender,
              salary: formValue.salary,
              startDate: `${formValue.day} ${formValue.month} ${formValue.year}`,
              notes: formValue.notes,
              id: formValue.id,
              profileURL: formValue.profileURL,
          }
          if (formValue.isUpdate) {
              EmployeeService.updateEmployee(params.id, object).then((response) => {
                  console.log(response.data);
                  props.history.push('');
              }).catch((error) => {
                  alert(error);
              })
          }
          else {
              EmployeeService.addEmployee(object).then(() => {
                  console.log("data added successfully");
                  props.history.push('');
              }).catch((error) => {
                  alert(error);
              })
          }
   }

   const reset = () => {
       setForm({...initialValue, id: formValue.id, isUpdate: formValue.isUpdate});
   }

    return (
    <>
       <div className="header header-content">
           <div className="logo-content">
               <Link to="/">
                   <img src={logo} className="logo-content-img" alt="logo" />
               </Link>
               <div>
                   <span className="emp-text">EMPLOYEE</span><br/>
                   <span className="emp-text emp-payroll">PAYROLL</span>
               </div>
           </div>
       </div>

       <div className="form-content">
           <form className="form" action="#" onSubmit={save}>
               <div className="form-head">Employee Payroll Form</div>
               <div className="row-content">
                   <label htmlFor="name" className="label text">Name</label>
                   <input type="text" name="name" id="name" className="input" value={formValue.name} onChange={changeValue} placeholder="Your Name ..."/>
                   <div className="error" > {formValue.error.name}</div>
               </div>

               <div className="row-content">
                   <label className="label text" htmlFor="profile">Profile image</label>
                   <div className="profile-radio-content">
                       <label>
                           <input type="radio" id="profile1" name="profileURL" checked={formValue.profileURL==='../../assets/profile-images/Ellipse -3.png'}
                                  value="../../assets/profile-images/Ellipse -3.png" onChange={changeValue}/>
                           <img className="profile" id="image1" src={profile_pic_1} alt=""/>
                       </label>
                       <label>
                           <input type="radio" id="profile2" name="profileURL" checked={formValue.profileURL==='../../assets/profile-images/Ellipse -1.png'}
                                  value="../../assets/profile-images/Ellipse -1.png" onChange={changeValue}/>
                           <img className="profile" id="image2" src={profile_pic_2} alt=""/>
                       </label>
                       <label>
                           <input type="radio" id="profile3" name="profileURL"checked={formValue.profileURL==='../../assets/profile-images/Ellipse -8.png'}
                                  value="../../assets/profile-images/Ellipse -8.png" onChange={changeValue}/>
                           <img className="profile" id="image3" src={profile_pic_3} alt=""/>
                       </label>
                       <label>
                           <input type="radio" id="profile4" name="profileURL" checked={formValue.profileURL==='../../assets/profile-images/Ellipse -7.png'}
                                  value="../../assets/profile-images/Ellipse -7.png" onChange={changeValue}/>
                           <img className="profile" id="image4" src={profile_pic_4} alt=""/>
                       </label>
                   </div>
                   <div className="error"> {formValue.error.profileURL}</div>
               </div>

               <div className="row-content">
                   <label className="label text" htmlFor="gender">Gender</label>
                   <div>
                       <input type="radio" id="male" name="gender" value="male" onChange={changeValue} checked={formValue.gender === 'male'}/>
                       <label className="text" htmlFor="male">Male</label>
                       <input type="radio" id="female" name="gender" value="female" onChange={changeValue} checked={formValue.gender === 'female'}/>
                       <label className="text" htmlFor="female">Female</label>
                   </div>
                   <div className="error"> {formValue.error.gender}</div>
               </div>

               <div className="row-content">
                   <label className="label text" htmlFor="department">Department</label>
                   <div>
                       {formValue.allDepartments.map(item => (
                           <span key={item}>
                                <input className="checkbox" type="checkbox" onChange={() => onCheckChange(item)} name={item}
                                 checked={getChecked(item)} value={item}/>
                               <label className="text" htmlFor={item}>{item}</label>
                           </span>
                       ))}
                   </div>
                   <div className="error"> {formValue.error.department}</div>
               </div>

               <div className="row-content">
               <label className="label text" htmlFor="salary">Salary</label>
                    <input className="input" type="range" name="salary" id="salary" min="300000" max="500000" step="100" 
                            value={formValue.salary} onChange={changeValue}/>
                    <output className="salary-output text" htmlFor="salary">{formValue.salary}</output>
                   <div className="error"> {formValue.error.salary}</div>
               </div>

               <div className="row-content">
                   <label className="label text" htmlFor="startDate">Start Date</label>
                   <div>
                       <select id="day" name="day" onChange={changeValue} value={formValue.day}>
                           <option value="1">1</option>
                           <option value="2">2</option>
                           <option value="3">3</option>
                           <option value="4">4</option>
                           <option value="5">5</option>
                           <option value="6">6</option>
                           <option value="7">7</option>
                           <option value="8">8</option>
                           <option value="9">9</option>
                           <option value="10">10</option>
                           <option value="11">11</option>
                           <option value="12">12</option>
                           <option value="13">13</option>
                           <option value="14">14</option>
                           <option value="15">15</option>
                           <option value="16">16</option>
                           <option value="17">17</option>
                           <option value="18">18</option>
                           <option value="19">19</option>
                           <option value="20">20</option>
                           <option value="21">21</option>
                           <option value="22">22</option>
                           <option value="23">23</option>
                           <option value="24">24</option>
                           <option value="25">25</option>
                           <option value="26">26</option>
                           <option value="27">27</option>
                           <option value="28">28</option>
                           <option value="29">29</option>
                           <option value="30">30</option>
                           <option value="31">31</option>
                       </select>
                       <select id="month" name="month" onChange={changeValue} value={formValue.month}>
                           <option value="Jan">January</option>
                           <option value="Feb">February</option>
                           <option value="Mar">March</option>
                           <option value="Apr">April</option>
                           <option value="May">May</option>
                           <option value="June">June</option>
                           <option value="July">July</option>
                           <option value="Aug">August</option>
                           <option value="Sept">September</option>
                           <option value="Oct">October</option>
                           <option value="Nov">November</option>
                           <option value="Dec">December</option>
                       </select>
                       <select id="year" name="year" onChange={changeValue} value={formValue.year}>
                           <option value="2021">2021</option>
                           <option value="2020">2020</option>
                           <option value="2019">2019</option>
                           <option value="2018">2018</option>
                           <option value="2017">2017</option>
                           <option value="2016">2016</option>
                       </select>
                   </div>
                   <div className="error">{formValue.error.startDate}</div>
               </div>

               <div className="row-content">
                   <label className="label text" htmlFor="notes">Notes</label>
                   <textarea id="notes" className="input" name="notes" placeholder=""
                             onChange={changeValue} value={formValue.notes}></textarea>
                   <div className="error">{formValue.error.notes}</div>
               </div>

               <div className="buttonParent">
                   <Link to="/" className="resetButton button cancelButton">Cancel</Link>
                   <div className="submit-reset">
                       <button type="submit" className="button submitButton" id="submitButton">{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                       <button type="reset" className="resetButton button" onClick={reset}>Reset</button>
                   </div>
               </div>

           </form>
       </div>
    </>
    )
}

export default PayrollForm;