import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'

function FinalPayrollApproval() {
    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const [normalpayroll, setNormalPayroll] = useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [finalpayroll, setFinalPayroll] = useState(true)
    const toggleNewRequest = () => {
        setNormalPayroll(true)
        setFinalPayroll(false)

    }

    const toggleApproved = () => {
        setFinalPayroll(true)
        setNormalPayroll(false)

    }
    const [pendingdata, setPendingData] = useState([])
    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        const res = await axios.get(hostURL + "Payroll/GetEmployeeSalary")
        setPendingData(res.data);
        console.log("Pending", res.data)
    }

    return (


        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-1"></div>
                <div className="col-lg-4"></div>
                <div className="col-lg-4"></div>
                <div className="col-lg-3">
                    <br /><Link style={{ textDecoration: "none" }} href="/Payroll/RunFinalPayroll"><button className='newPayrollBtn' style={{ width: "80%" }}>New Payroll</button></Link>
                </div>
            </div>
            <br />
            <div className="row">
                <br />
                <div className="col-lg-4">
                    <p className="Heading">Excecuted Payroll Runs For Approval </p>
                </div>
                <div className="col-lg-5"></div>
                <div className="col-lg-3">
                    <p className="Heading">Total Payroll Runs: </p>
                </div>
            </div>
            <div className="row">
                <br />
                <div className='col-lg-4'><br />

                    {/* <button onClick={toggleNewRequest} className='toggleButton' >Normal Payroll</button> */}
                    <button onClick={toggleApproved} className='toggleButton' >Final Payroll</button>

                </div><br />
            </div>
            <div className="row">
                <div className="col-lg-8 "></div>
            </div>
            <br />
            {/* <div className="container-fluid">
                {
                    normalpayroll && (
                        <div id="tab1">
                            <div className="row">
                                <div className="col-lg-12">
                                    <table className="table table-sm">
                                        <thead>
                                            <tr className="tr text-white">
                                                <th>Year</th>
                                                <th>Month</th>
                                                <th>Period</th>
                                                <th>Payroll Run Type</th>
                                                <th>Description</th>
                                                <th>Execution Date</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                            <tr></tr>
                                        </thead>
                                        <tbody>

                                            {pendingdata?.map((data) => {
                                                return (
                                                    <tr key={data.id}>
                                                        <td style={{ color: "#oc275a" }}>{data.endyear}</td>
                                                        <td style={{ color: "#oc275a" }}>{data.month}</td>
                                                        <td style={{ color: "#oc275a" }}>normal</td>
                                                        <td style={{ color: "#oc275a" }}>{data.startdate}</td>
                                                        <td style={{ color: "#oc275a" }}>aproved </td>
                                                        <td>Apr 14, 2023</td>
                                                        <td>

                                                            <p> Finalization Approved </p>

                                                        </td>
                                                        <td>

                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <br />
                        </div>

                    )
                }

            </div> */}
            {
                finalpayroll && (
                    <table className='table'>
                        <thead>
                            <tr className='text-white'>
                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Joining Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>38242</td>
                                <td>dummy</td>
                                <td>CUSTOMER SERVICE</td>
                                <td>Nov 2, 2005</td>
                                <td>Finalization Pending</td>
                                <td><button className='editDeleteBtnTable'>Approve</button></td>

                            </tr>
                        </tbody>
                    </table>
                )
            }
        </div>






    )
}

export default FinalPayrollApproval