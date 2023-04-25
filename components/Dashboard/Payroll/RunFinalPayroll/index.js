import Layout from '@/components/Layout/index'
import React from 'react'
import { Button, Card, Collapse } from "reactstrap";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
const RunFinalPayroll = () => {
    const [collapseOpen, setCollapseOpen] = React.useState(false);
    const [paycode, setPayCode] = useState([]);
    const [position, setPosition] = useState([]);
    const [department, setDepartment] = useState([]);
    const [dashboard, setDashboardData] = useState([]);
    const { register, handleSubmit, watch, reset, formState } = useForm();
    const [runPayrollData, setRunPayrollData] = useState(false)
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [runPayrollDashboard, setRunPayrollDashboardData] = useState("");



    useEffect(() => {
        async function getData() {
            let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
            // This API is used for fetch the Payperiod data for Dropdown
            let res = await axios.get(hostURL + "HR/GetPayPeriodSetting");
            setPayCode(res.data);
            // This API is used for fetch the Roletype data for Dropdown
            res = await axios.get(hostURL + "Master/GetRoleType");
            setPosition(res.data);
            // This API is used for fetch the departmentMaster data for Dropdown
            res = await axios.get(hostURL + "Master/GetDepartmentMaster");
            setDepartment(res.data);
        }
        getData()
    }, []);

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

    const handlePayrollData = (data) => {
        try {
            getFinalPayrollData(data.employeID);
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

    const getFinalPayrollData = async (employeID) => {
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
                Swal.fire('Final Payroll Ran Successfully!');
            }

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Oops..",
                text: "Final payroll Not Started...!",
            });
        }
    }

    const handleRunpayrolldata = () => {
        setRunPayrollData(!runPayrollData)
    }

    return (
        <Layout>
            <div>
                <br></br>
                <br></br>
                <br></br>
                <div id={runpayroll.card} className="row card card1">
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
                                                    <option value={data.payCode} key={data.id}>{data.payCode}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='col-lg-1'></div>
                            <div className="col-lg-2 mt-3">
                                <br />
                                <Button
                                    color="primary"
                                    type="button"
                                    id="collapseExample"
                                    onClick={() => {
                                        setCollapseOpen(!collapseOpen);
                                        handleButtonClick();
                                    }}
                                >
                                    FETCH EMPLOYEES
                                </Button>
                            </div>
                            <div className="col-lg-2">
                                <p >Search <br ></br></p>
                                <input placeholder="Search" type="text" className="form-control form-control-sm"></input>
                            </div>
                            <div className="col-lg-2">
                                <p >Select Position </p>
                                <div className="dropdown">
                                    <select id="Year" name="Year" className="form-control form-control-sm ">
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
                            <div className="col-lg-2">
                                <p >Select Department </p>
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
                        </div>
                    </form>
                </div>
                <div class="row">
                    <div className="col-lg-2">
                    </div>
                    <div className="col-lg-2">
                    </div>
                    <div className="col-lg-2">
                        <br ></br>
                        {
                            runPayrollData && (
                                <button type="button" id="btn_button" className="form-control CancelBTN" style={{ width: "70%" }}>Run Payroll</button>
                            )
                        }
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
                                        <input type="checkbox" onClick={handleRunpayrolldata} ></input>
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
                                            <tr className="text-dark" key={index}>
                                                <td ><input type='checkbox' onClick={handleRunpayrolldata} onChange={handlePayrollData.bind(this, data)} /></td>
                                                <td>{data.employeID}</td>
                                                <td>{data.name}</td>
                                                <td>{data.role}</td>
                                                <td>{data.department_name}</td>
                                                <td>{data.emailID}</td>
                                                <td>{data.joiningDate}</td>
                                                <td>{data.supervisor}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table> </Collapse>
                </div>
                    <div className="text-right">
                        <br></br>
                    </div>
                </div>
                <br ></br><br ></br>
                <div id="employee" className="row rowwidth collapse" >
                    <div className="col-lg-12">
                        <table id="downloadaplication" className="table table-bordered fonttxt" style={{ height: "300px" }}><thead ><tr ><th >
                            <input type="checkbox">
                            </input>
                        </th>
                            <th >Employee Id</th>
                            <th >Employee Name</th>
                            <th >Department</th>
                            <th >Position</th>
                            <th >Email</th>
                            <th >Date Of Joining</th>
                            <th >Manager</th>
                        </tr>
                        </thead>
                            <tbody >

                            </tbody>
                        </table>
                    </div>
                    <div className="text-right">
                        <br ></br>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default RunFinalPayroll