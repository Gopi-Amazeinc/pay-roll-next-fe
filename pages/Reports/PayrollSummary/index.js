import React from 'react'
import Styles from "../../../styles/payrollsummary.module.css";
import table from "/styles/table.module.css";
import axios from 'axios';
import Layout from '@/components/layout/layout.js';
import { useEffect, useState } from 'react';

function Payrollsummary() {
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const [payrollsummary, setpayrollsummary] = useState(false);
    const handleRunpayrollClick = () => {
        setpayrollsummary(!payrollsummary);
    }

    const [payrollsummarydetail, setpayrollsummarydetail] = useState(false);
    const handleRunpayrolldetailClick = () => {
        setpayrollsummarydetail(!payrollsummarydetail);
    }

    const [salary, setSalary] = useState([]);
    const [presentYear, setPresentYear] = useState();
    const [presentMonth, setPresentMonth] = useState();

    useEffect(() => {
        debugger
        let currentDate = new Date();
        let year=currentDate.getFullYear();
        let month = currentDate.getMonth() + 1
        setPresentYear(year)
        setPresentMonth(month)
        console.log(month,year)
        getData()
    }, [1]);

     const getData = async () =>{
        let res = await axios.get(hostURL + `Payroll/GetEmployeeFinalSalaryByMonth?Year=${presentYear}&Month=${presentMonth}`);
        setSalary(res.data);

    }

    return (
        <Layout>
            <div className='container'>
                <br></br>
                <p id={Styles.title}>Payroll Summary Report</p>
                <div className="container-fluid mt-4">
                    <div className="row mt-4">
                        <div className="col-lg-8">
                        </div>
                        <div className="col-lg-2"></div>
                        <div className="col-lg-2">
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <table className={table.commonTable}>
                            <thead>
                                <tr>
                                    <th>Select</th>
                                    <th>Year</th>
                                    <th>Month</th>
                                    <th>Period</th>
                                    <th>Payroll Run Type</th>
                                    <th>Description</th>
                                </tr>
                                {salary.map((data,index)=>{
                                    return (
                                      <tr className="text-dark" key={index}>
                                        <td>
                                          <input
                                            type="checkbox"
                                            onClick={handleRunpayrollClick}
                                          />
                                        </td>
                                        <td>{data.employeID}</td>
                                        <td>{data.name}</td>
                                        <td>{data.department_name}</td>
                                        <td>{data.level}</td>
                                        <td>{data.gender}</td>
                                      </tr>
                                    );
                                })}
                                {/* <tr>
                                    <td><input type="checkbox" onClick={handleRunpayrollClick} /></td>
                                    <td>2022</td>
                                    <td>09</td>
                                    <td>3</td>
                                    <td>Normal</td>
                                    <td>PayRollFor</td>

                                </tr>
                                <tr>
                                    <td><input type="checkbox" onClick={handleRunpayrollClick} /></td>
                                    <td>2022</td>
                                    <td>09</td>
                                    <td>3</td>
                                    <td>Normal</td>
                                    <td>PayRollFor</td>

                                </tr> */}
                            </thead>
                        </table>
                    </div>

                </div>
                <div className='row mt-4' style={{ textAlign: "center" }}>
                    <div className='col-lg-12'>
                        {
                            payrollsummary &&
                            (
                                <div id="demo" class="collapse show" >
                                    <div class="row">
                                        <div class="col-lg-8">
                                            <p class="active Heading1" style={{ textAlign: "center" }}>Employees in selected Period</p>
                                            <a data-toggle="collapse" data-target="#paygroup" class="active fontheading">Select ALL</a>
                                        </div>
                                        <div class="col-lg-4">
                                            <p ><input type="search" placeholder="search" class="form-control ng-untouched ng-pristine ng-valid" /></p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <table className="table table-bordered">
                                                <thead >
                                                    <tr className="newFont">
                                                        <th class="SelectData">Select</th>
                                                        <th >Employee ID</th>
                                                        <th >Employee Name</th>
                                                        <th >Status</th>
                                                        <th >Pay Group</th>
                                                    </tr>
                                                    <tr >
                                                        <td class="SelectData"><input type="checkbox" onClick={handleRunpayrolldetailClick} value="item.value" /></td>
                                                        <td >22961</td>
                                                        <td >priyanka</td>
                                                        <td >Active</td>
                                                        <td >Rank and File</td>
                                                    </tr>
                                                    <tr >
                                                        <td class="SelectData"><input type="checkbox" onClick={handleRunpayrolldetailClick} value="item.value" /></td>
                                                        <td >10403</td>
                                                        <td >Sudharshan</td>
                                                        <td >Active</td>
                                                        <td >Rank and File</td>
                                                    </tr>
                                                    <tr >
                                                        <td class="SelectData"><input type="checkbox" onClick={handleRunpayrolldetailClick} value="item.value" /></td>
                                                        <td >22184</td>
                                                        <td >venkat</td>
                                                        <td >Active</td>
                                                        <td >Rank and File</td>
                                                    </tr>
                                                    <tr >
                                                        <td class="SelectData"><input type="checkbox" onClick={handleRunpayrolldetailClick} value="item.value" /></td>
                                                        <td >22484</td>
                                                        <td >Raman</td>
                                                        <td >Active</td>
                                                        <td >Rank and File</td>
                                                    </tr>
                                                    <tr >
                                                        <td class="SelectData"><input type="checkbox" onClick={handleRunpayrolldetailClick} value="item.value" /></td>
                                                        <td >22183</td>
                                                        <td >Sindhu</td>
                                                        <td >Active</td>
                                                        <td >Rank and File</td>
                                                    </tr>

                                                </thead>
                                            </table>
                                        </div>

                                    </div>
                                </div>

                            )
                        }

                    </div>
                </div>
                <div className='row mt-4' style={{ textAlign: "center" }}>
                    <div className='col-lg-12'>
                        {
                            payrollsummarydetail &&
                            (
                                <div class="row">
                                    <div class="col-lg-10"></div>
                                    <div class="col-lg-2">
                                        <button class="AddButton">Export to Excel</button><br /><br />
                                        <p >Total Amount:19,491.90</p>
                                    </div>
                                    <br />
                                    <div id="showData" class="table table-bordered fonttxt listscroll">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th>employeID</th>
                                                    <th>name</th>
                                                    <th>baseSal</th>
                                                    <th>department_name</th>
                                                    <th>month</th>
                                                    <th>payrolltype</th>
                                                    <th>month_Name</th>
                                                    <th>period</th>
                                                    <th>Meal_ALLWNCE</th>
                                                    <th>Petrol_ALLWNCE</th>
                                                    <th>Tax</th>
                                                    <th>TaxableIncome</th>
                                                    <th>TaxableEarning</th>
                                                    <th>TaxableDeduction</th>
                                                    <th>PHIL_EE</th>
                                                    <th>SSS_EE</th>
                                                    <th>SSS_ER</th>
                                                    <th>SSS_EC</th>
                                                    <th>HDMF_EE</th>
                                                    <th>LWOP</th>
                                                    <th>NonTaxableIncome</th>
                                                    <th>NETPAY</th>
                                                </tr>
                                                <tr>
                                                    <td>22961</td>
                                                    <td>priyanka</td>
                                                    <td>42000</td>
                                                    <td>FOOD TECHNOLOGY</td>
                                                    <td>4</td>
                                                    <td>2</td>
                                                    <td>April</td>
                                                    <td>6</td>
                                                    <td>1500</td>
                                                    <td>2000</td>
                                                    <td>1878.1</td>
                                                    <td>21370</td>
                                                    <td>3500</td>
                                                    <td>3130</td>
                                                    <td>1680</td>
                                                    <td>1350</td>
                                                    <td>2850</td>
                                                    <td>30</td>
                                                    <td>100</td>
                                                    <td>0</td>
                                                    <td>-3500</td>
                                                    <td>19491.9</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>

            </div>
        </Layout>

    )
}

export default Payrollsummary
