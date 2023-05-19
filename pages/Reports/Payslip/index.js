import Layout from '@/components/layout/layout.js';
import payslipstyle from "../../../pages/Reports/Payslip/payslip.module.css"
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import axios from "axios";

export default function PayslipReport() {

    const [payroll, setPayroll] = useState([]);
    const [payroll1, setPayroll1] = useState([]);
    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    useEffect(() => {
        getPayslips();
      }, [1]);

      const getPayslips = async () => {
        let res = await axios.get(hostURL + "Payroll/GetEmployeeSalary");
        
        setPayroll(res.data);
      }
    const [isChecked, setIsChecked] = useState(false);
    // const [isChecked1, setIsChecked1] = useState(false);
    // const handleCheckboxChange = () => {
    //     setIsChecked(!isChecked);
    // };
    const payrollChecked = async (data) => {
        debugger
        console.log(data)
        let res = await axios.get(hostURL + "Payroll/GetEmployeeSalary");

        setIsChecked(!isChecked);
    };

    // const handleCheckboxChange1 = () => {
    //     setIsChecked1(!isChecked1)
    // };

    // const tabsData = [
    //     {
    //         label: 'PENDING',
    //         content:
    //             <div className="container-fluid mt-4">
    //                 <div className="row">
    //                     <table className='table  table-striped mt-3 text-center' id={payslipstyle.table} >
    //                         <thead>
    //                             <tr className={payslipstyle.tr}  >
    //                                 <th>Select</th>
    //                                 <th>Year</th>
    //                                 <th>Month</th>
    //                                 <th>Period</th>
    //                                 <th>Payroll Run Type</th>
    //                             </tr>
    //                         </thead>
    //                         <tbody>
    //                             <tr >
    //                                 <td><input type="checkbox" name="" id="" checked={isChecked} onClick={handleCheckboxChange} /></td>
    //                                 <td>2023</td>
    //                                 <td>3</td>
    //                                 <td>1</td>
    //                                 <td>Payroll For -</td>
    //                             </tr>
    //                         </tbody>
    //                     </table>
    //                 </div>
    //             </div>,
    //     }, {
    //         label: 'APPROVED',
    //         content:
    //             <div className="container-fluid mt-4">
    //                 <div className="row">
    //                     <table className='table  table-striped mt-3 text-center' id={payslipstyle.table}  >
    //                         <thead>
    //                             <tr className={payslipstyle.tr} >
    //                                 <th>Select</th>
    //                                 <th>Name</th>
    //                                 <th>Role</th>
    //                                 <th>Payroll Run Type</th>
    //                             </tr>
    //                         </thead>
    //                         <tbody>
    //                             <td>1</td>
    //                             <td>1</td>
    //                             <td>1</td>
    //                             <td>1</td>
    //                         </tbody>
    //                     </table>
    //                 </div>
    //             </div>
    //     }
    // ]
    // const [activeTabIndex, setActiveTabIndex] = useState(0);
    // const tabsRef = useRef([]);

    // useEffect(() => {
    //     function setTabPosition() {
    //         const currentTab = tabsRef.current[activeTabIndex];
    //     }
    //     setTabPosition();
    //     window.addEventListener('resize', setTabPosition);

    //     return () => window.removeEventListener('resize', setTabPosition);
    // }, [activeTabIndex]);

    return (
        <Layout>
            <div>
                <div className='container-fluid'>
                    <h3 className="Heading">Payslip Report</h3>
                    
                    <br></br>
                    <div className='row'>
                        <div className='col-lg-2'>
                            <button className={payslipstyle.payrollbutton}>
                                Normal Payroll
                            </button>
                        </div>
                    </div>
                    <br></br>
                    <div className='row'>
                        <div className="col-lg-12">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Select</th>
                                    <th>Year</th>
                                    <th>Month</th>
                                    <th>Period</th>
                                    <th>Payroll Run Type</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payroll.map((data,index)=>{
                                    return (
                                        <tr className='text-dark' key={index}>
                                            <td><input type="checkbox" name="" value={data.id} id='flexCheckDefault' onClick={payrollChecked(data)} /></td>
                                            <td>{data.endyear}</td>
                                            <td>{data.monthname}</td>
                                            <td>{data.payrolltype}</td>
                                            <td>Normal</td>
                                            <td>Payroll For -  {data.modifiedDate} - {data.endDate}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>

            {isChecked && (
                <div className="row">
                    <h4 className={payslipstyle.reports}>Employees in selected Period </h4>

                    <div className="col-lg-2">
                        <p>Filter By</p>
                    </div>
                    <div className="col-lg-4">
                        <label htmlFor="">Search</label>
                        {/* <input type="text" className="form-control" checked={isChecked1} /> */}
                    </div>
                    <div className="col-lg-3">
                        <label htmlFor="">Role</label>
                        <select name="" id="" className="form-control">
                            <option value="" disabled>Select Role</option>
                            <option value="">ADMIN</option>
                            <option value="">Finance</option>
                            <option value="">EP1</option>
                        </select>
                    </div>
                    <div className="col-lg-3">
                        <label htmlFor="">Department</label>
                        <select name="" id="" className="form-control">
                            <option value="" disabled>Select Role</option>
                            <option value="">ADMIN</option>
                            <option value="">Finance</option>
                            <option value="">EP1</option>
                        </select>
                    </div>
                    <table className='table  table-striped mt-3 text-center' id={payslipstyle.table} >
                        <thead>
                            <tr className={payslipstyle.tr}  >
                                <th>Select</th>
                                <th>EmployeeID</th>
                                <th>Employee Name	</th>
                                <th>Department</th>
                                <th>Status</th>


                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                {/* <td><input type="checkbox" onClick={handleCheckboxChange1} name="" id="" /></td> */}
                                <td>101010101</td>
                                <td>admin</td>
                                <td>IT</td>
                                <td>Active</td>
                            </tr>
                        </tbody>
                    </table>
                </div>)}



            {/* <div className="row">
                <div className="col-lg-12">
                    <h4 className={payslipstyle.reports}>Payslip Report</h4>
                </div>
            </div>
            <div className="col-lg-8">
                {tabsData.map((tab, idx) => {
                    return (
                        <button key={idx} ref={(el) => (tabsRef.current[idx] = el)} className={payslipstyle.btn} onClick={() => setActiveTabIndex(idx)} >
                            {tab.label}
                        </button>
                    );
                })}

            </div>
            <div className="col-lg-12">
                <div className="py-4">
                    {tabsData[activeTabIndex].content}
                </div>

            </div>

            {isChecked && (
                <div className="row">
                    <h4 className={payslipstyle.reports}>Employees in selected Period </h4>

                    <div className="col-lg-2">
                        <p>Filter By</p>
                    </div>
                    <div className="col-lg-4">
                        <label htmlFor="">Search</label>
                        <input type="text" className="form-control" checked={isChecked1} />
                    </div>
                    <div className="col-lg-3">
                        <label htmlFor="">Role</label>
                        <select name="" id="" className="form-control">
                            <option value="" disabled>Select Role</option>
                            <option value="">ADMIN</option>
                            <option value="">Finance</option>
                            <option value="">EP1</option>
                        </select>
                    </div>
                    <div className="col-lg-3">
                        <label htmlFor="">Department</label>
                        <select name="" id="" className="form-control">
                            <option value="" disabled>Select Role</option>
                            <option value="">ADMIN</option>
                            <option value="">Finance</option>
                            <option value="">EP1</option>
                        </select>
                    </div>
                    <table className='table  table-striped mt-3 text-center' id={payslipstyle.table} >
                        <thead>
                            <tr className={payslipstyle.tr}  >
                                <th>Select</th>
                                <th>EmployeeID</th>
                                <th>Employee Name	</th>
                                <th>Department</th>
                                <th>Status</th>


                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td><input type="checkbox" onClick={handleCheckboxChange1} name="" id="" /></td>
                                <td>101010101</td>
                                <td>admin</td>
                                <td>IT</td>
                                <td>Active</td>
                            </tr>
                        </tbody>
                    </table>
                </div>)}
            {isChecked1 && (
                <>
                    <div className="row">
                        <div className="col-lg-4">
                            <h4 className={payslipstyle.reports}>Employees</h4>
                        </div>
                        <div className="col-lg-5"></div>
                        <div className="col-lg-3">
                            <button className="btn btn-primary">Export To PDF</button>
                        </div>
                    </div>
                    <br />
                    <div className='card p-3 border-0 shadow-lg rounded-3 mt-4'>
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h4>Ayala Land, Inc.  </h4>
                            </div>
                            <div className="col-lg-5">
                                <p>NAME: </p>
                                <p>PAYROLL DATE: </p>
                                <p>DATE COVERED: </p>
                                <p>DEPARTMENT: </p>
                                <p>POSITION:  </p>
                            </div>
                            <div className="col-lg-5">
                                <p>TAX STATUS:</p>
                                <p>TIN: </p>
                                <p>SSS NO.: </p>
                                <p>PHILHEALTH NO.:</p>
                                <p>HDMF: </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {isChecked1 && (
                <div className="row">
                    <table className='table  table-striped mt-3 text-center' >
                        <thead>
                            <tr className={payslipstyle.tr}>
                                <th>Earnings</th>
                                <th>Deductions</th>
                                <th></th>
                            </tr>
                        </thead>
                    </table>
                    <div className="col-lg-5">
                        <p>Monthly Salary  </p>
                        <p>OT_ON_SPECIAL_HOL</p>
                        <p>OT_ON_SPECIAL_HOL_GREATER_THAN_8_hrs </p>
                    </div>
                    <div className="col-lg-5">

                        <br /><br /><br /> <br />
                        <p>SSS_EE  </p>
                        <p>HDMF_EE</p>
                        <p>PHIL_EE </p>
                    </div>
                </div>)} */}
        </Layout>
    );
}