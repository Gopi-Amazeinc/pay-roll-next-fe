import React from 'react'
import Link from 'next/link'
import Swal from 'sweetalert2';
import { Button, Card, Collapse } from "reactstrap";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Layout from '@/components/layout/layout'

const InitialPayrollForm = () => {
    const [collapseOpen, setCollapseOpen] = React.useState(false);
    const [paycode, setPayCode] = useState([]);
    const [position, setPosition] = useState([]);
    const [department, setDepartment] = useState([]);
    const [dashboard, setDashboardData] = useState([]);
    const { register, handleSubmit, watch, reset, formState } = useForm();
    const [runPayroll, setRunPayroll] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [runPayrollDashboard, setRunPayrollDashboardData] = useState("");


    useEffect(() => {
        async function getData() {
            let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
            //gurukiran@amazeinc.in, This API is used for fetch the Paycode data for Dropdown
            let res = await axios.get(hostURL + "HR/GetPayPeriodSetting");
            // console.log(res.data)
            sessionStorage.setItem("StartDate", res.data[0].payrollStartDate);
            sessionStorage.setItem("EndDate", res.data[0].payrollEndDate);
            setPayCode(res.data);
            //gurukiran@amazeinc.in, This API is used for fetch the Position data for Dropdown
            res = await axios.get(hostURL + "Master/GetRoleType");
            setPosition(res.data);
            //gurukiran@amazeinc.in, This API is used for fetch the department data for Dropdown
            res = await axios.get(hostURL + "Master/GetDepartmentMaster");
            setDepartment(res.data);
        }
        getData()
    }, []);

    function handleData(data) {
        if (watch("PayCode")) {
            let res = paycode.filter(x => x.paycode == watch("PayCode"))[0].payrollStartDate;
            let rres = paycode.filter(x => x.paycode == watch("PayCode"))[0].payrollEndDate;
            setStartDate(res);
            setEndDate(rres);

        }
        else {
            Swal.fire({
                icon: "error",
                title: "Oops..",
                text: "Data is not there...!",
            });
        }

    }
    const handleButtonClick = async () => {
        try {
            debugger;
            if (watch("PayCode")) {
                let res = paycode.filter(x => x.payCode == watch("PayCode"))[0].payrollStartDate;
                let rres = paycode.filter(x => x.payCode == watch("PayCode"))[0].payrollEndDate;;
                setStartDate(res);
                setEndDate(rres);
                let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
                // This API is used to fetch the dashboard data based on StartDate,EndDate
                const sss = await axios.get(hostURL + `Payroll/Get_Employees_For_Payroll?startdate=${startDate}&enddate=${endDate}`);
                setDashboardData(sss.data);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handlePreliminaryData = (data) => {
        try {
            getPreliminaryData(data.employeID);
            sessionStorage.setItem('EmployeeID', data.employeID);

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Oops..",
                text: "Data was Not fetched..!",
            });
        }
    }

    const getPreliminaryData = async (employeID) => {
        try {
            debugger;
            if (watch("PayCode")) {
                let res = paycode.filter(x => x.payCode == watch("PayCode"))[0].payrollStartDate;
                let rres = paycode.filter(x => x.payCode == watch("PayCode"))[0].payrollEndDate;;
                setStartDate(res);
                setEndDate(rres);
                let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
                // This API is used to fetch the dashboard data based on EmployeeID,LOPdays,StartDate,EndDate
                const response = await axios.get(hostURL + `Payroll/Get_PreliminaryReport?EmployeeID=${employeID}&startdate=${res}&Enddate=${rres}`);
                setRunPayrollDashboardData(response.data);
                console.log(response.data);
                Swal.fire('Initial Payroll Ran Successfully!');
            }

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Oops..",
                text: "Initial payroll Not Started...!",
            });
        }
    }
    const handleRunpayrollClick = () => {
        setRunPayroll(!runPayroll);
    }
    return (
        <Layout>

            <div className='container-fluid'>
                <h3 className='Heading'>Initial Payroll</h3>
                <br />
                <div className="card p-3 " style={{ paddingLeft: "10px" }}>
                    <form>

                        <div className="row">
                            <div className="col-lg-3">
                                <p>Select Paycode </p>
                                <div className="dropdown">
                                    <select id="PayCode" name="PayCode" className="form-select form-select-sm" {...register("PayCode", { required: true })}>
                                        <option value="" disabled="">
                                            Select Paycode </option>
                                        {
                                            paycode.map((data, index) => {
                                                return (
                                                    <option value={data.payCode} key={data.id} onChange={handleData.bind(this, data)}>{data.payCode}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <p >Search <br ></br></p>
                                <input placeholder="Search" type="text" className="form-control form-control-sm" />
                            </div>
                            <div className='col-lg-1'></div>
                            <div className="col-lg-2 ">
                                <br />
                                <p></p>
                                <Button
                                    style={{ background: "#3247d5" }}
                                    type="button"
                                    className='form-control  '
                                    id="collapseExample"
                                    onClick={() => {
                                        setCollapseOpen(!collapseOpen),
                                            handleButtonClick();
                                    }}
                                >
                                    FETCH EMPLOYEES
                                </Button>
                            </div>
                            <div className='col-lg-3'></div>
                        </div>
                        <br />
                        <div className='row '>
                            <br></br>
                            <div className="col-lg-3">
                                <p > Position </p>
                                <div className="dropdown">
                                    <select id="Year" name="Year" className="form-select form-select-sm ">
                                        {/* <br ></br> */}
                                        <option value="Select" style={{ color: "#0C275A" }} disabled="">Select Position
                                        </option>
                                        {
                                            position.map((data, index) => {
                                                return (
                                                    <option value={data.id} key={data.id}>{data.short}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-3 ">
                                <p >Department </p>
                                <div className="dropdown">
                                    <select id="Year" name="Year" className="form-select form-select-sm ">
                                        {/* <br ></br> */}
                                        <option value="Select" style={{ color: " #0C275A" }} disabled="">Select Department
                                        </option>
                                        {
                                            department.map((data, index) => {
                                                return (
                                                    <option value={data.id} key={data.id}>{data.department_name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='col-lg-5'></div>
                            <div className='col-lg-1'>
                                <p>count:{dashboard.length}</p>
                            </div>
                        </div>

                    </form>
                    <div className='row mt-3'>
                        <div className='col-lg-4'></div>
                        <div className='col-lg-2'>
                            {
                                runPayroll && (
                                    <Link href="/Payroll/InitialPayroll" style={{ textDecoration: "none" }}>
                                        <button className="form-control CancelBTN">Run Payroll</button>
                                    </Link>

                                )
                            }
                        </div>
                    </div>
                </div>

                <br ></br>
                <div className="row">
                    <div className="col-lg-4">
                    </div>
                    <div className="col-lg-5">
                    </div>
                    <div className="col-lg-3">
                    </div>
                </div>
                <div id="employee1" className="row row" style={{ height: "500px" }}><div className="col-lg-12">
                    <Collapse isOpen={collapseOpen}>
                        <table id="downloadaplication" className="table table-bordered fonttxt" style={{ height: "300px" }}>
                            <thead className='bg-info text-white ' >
                                <tr >
                                    <th >
                                        <input type="checkbox" onClick={handleRunpayrollClick} />
                                    </th>
                                    <th >Employee ID</th>
                                    <th >Employee Name</th>
                                    <th>Position</th>
                                    <th>Department</th>
                                    <th >Email</th>
                                    <th >Date Of Joining</th>
                                    <th >Manager</th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    dashboard.map((data, index) => {
                                        return (
                                            <div className='row'>
                                                <div className='col-lg-12'>

                                                    <tr className="text-dark" key={index}>
                                                        <td>
                                                            <input onClick={handleRunpayrollClick} onChange={handlePreliminaryData.bind(this, data)} type='checkbox' />
                                                        </td>
                                                        <td>{data.employeID}</td>
                                                        <td>{data.name}</td>
                                                        <td>{data.role}</td>
                                                        <td>{data.department_name}</td>
                                                        <td>{data.emailID}</td>
                                                        <td>{data.joiningDate}</td>
                                                        <td>{data.supervisor}</td>
                                                    </tr>

                                                </div>
                                            </div>

                                        )
                                    })
                                }
                            </tbody>
                        </table> </Collapse>

                </div>

                </div>
            </div>
        </Layout >
    )
}

export default InitialPayrollForm