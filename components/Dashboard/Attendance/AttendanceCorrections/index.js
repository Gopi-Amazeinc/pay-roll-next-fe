import React from 'react'
import { useState, useEffect } from 'react'
// import Layout from 'Components/layout/layout.js'
import Link from 'next/link'
import axios from 'axios'
import Swal from 'sweetalert2'

const Attendancecorrectiondashboard = () => {

    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const [pending, setPending] = useState(false)
    const [approved, setApproved] = useState(false)
    const [rejected, setRejected] = useState(false)

    const [pendingDashboardData, setpendingDashboardData] = useState([]);
    const [approvedDashboardData, setapprovedDashboardData] = useState([]);
    const [rejectedDashboardData, setrejectedDashboardData] = useState([]);

    const [SDate, setSDate] = useState("")
    const [EDate, setEDate] = useState("")

    const togglePending = () => {
        setPending(true)
        setRejected(false)
        setApproved(false)
    }

    const toggleApproved = () => {
        setApproved(true)
        setPending(false)
        setRejected(false)
    }

    const toggleRejected = () => {
        setRejected(true)
        setApproved(false)
    }

    const approve = async (id) => {
        await axios.post(hostURL + "Payroll/ApproveAttedanceCoorection?id" + id)
    }


    function formateDate(datetoformat) {
        const day = datetoformat.getDate().toString().padStart(2, '0');
        const month = (datetoformat.getMonth() + 1).toString().padStart(2, '0');
        const year = datetoformat.getFullYear().toString();
        return `${year}-${month}-${day}`;
    }

    async function getPendingData(SDate, EDate) {
        // debugger
        let staffID = sessionStorage.getItem("userID");
        //let staffID = "20540";
        const res = await axios.get(hostURL + "Payroll/GetPendingAttendanceCorrectionByStaffID?userID=" + staffID + "&SDate=" + SDate + "&EDate=" + EDate);
        console.log(res)
        setpendingDashboardData(res.data)
    }

    useEffect(() => {
        debugger;
        let Newtoday = new Date();
        let firstDayOfMonth = new Date(Newtoday.getFullYear(), Newtoday.getMonth(), 1);
        let fromDate = formateDate(firstDayOfMonth);
        let cdate = new Date(Newtoday.getFullYear(), Newtoday.getMonth(), Newtoday.getDate());
        let toDate = formateDate(cdate);

        setSDate(fromDate);
        setEDate(toDate);

        getPendingData(fromDate, toDate)
    }, [1])


    const Delete = (id) => {
        Swal.fire({
            title: 'Are You Sure To Cancel?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(hostURL + "Payroll/DeleteAttendanceCorrection?id=" + id)
                Swal.fire({
                    icon: "success",
                    titleText: "Cancelled Successfully"
                })
                getPendingData();
            }

        }

        )
    }




    return (

        <div className='container'>
            <h2>Yet to bind</h2>
            <h3 className='text-primary fs-5 mt-3'>Attendance Correction  </h3>
            <div className='card p-3 border-0 shadow-lg rounded-3 mt-4'>
                <div className='row p-3'>
                    <div className='col-lg-1'>
                        <p>Filter By</p>
                    </div>

                    <div className='col-lg-5'>
                        <input type="text" className='form-control' placeholder='Search...' />
                    </div>

                    <div className='col-lg-4'>
                        <Link href="/Attendence/attendancecorrectionform"><button className='btn btn-primary'>Add Attendance Correction  </button></Link>
                    </div>
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col-lg-4'>
                    <div className='btn-group'>
                        <button onClick={togglePending} className='btn btn-primary '>Pending</button>
                        <button onClick={toggleApproved} className='btn btn-primary'>Approved</button>
                        <button onClick={toggleRejected} className='btn btn-primary'>Rejected</button>
                    </div>
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col-lg-2 text-primary fs-6 fw-bold'>
                    <h6>Showing Results</h6>
                </div>
                {
                    pending && sessionStorage.getItem("roleID") != "2" && (
                        <table className='table table-hover'>
                            <thead className='bg-info text-white'>
                                <tr>
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Comments</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    pendingDashboardData.map((data) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>{data.date}</td>
                                                <td>{data.startTime}</td>
                                                <td>{data.endTime}</td>
                                                <td>{data.comments}</td>
                                                <td>{data.status}</td>
                                                <td>
                                                    <button onClick={Delete.bind(this, data.id)} className='edit-btn'>Cancel</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    )
                }

                {

                    pending && sessionStorage.getItem("roleID") == "2" && (
                        <table className='table table-hover'>
                            <thead className='bg-info text-white'>
                                <tr>
                                    <th>Employee Name</th>
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th colSpan={2}>Action</th>
                                </tr>
                            </thead>


                        </table>
                    )
                }

                {
                    approved && sessionStorage.getItem("roleID") != "2" && (
                        <table className='table table-hover'>
                            <thead className='bg-info text-white'>
                                <tr>
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Comments</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                        </table>
                    )
                }

                {

                    approved && sessionStorage.getItem("roleID") == "2" && (
                        <table className='table table-hover'>
                            <thead className='bg-info text-white'>
                                <tr>
                                    <th>Employee Name</th>
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    )
                }

                {
                    rejected && sessionStorage.getItem("roleID") != "2" && (
                        <table className='table table-hover'>
                            <thead className='bg-info text-white'>
                                <tr>
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                        </table>
                    )
                }

                {

                    rejected && sessionStorage.getItem("roleID") == "2" && (
                        <table className='table table-hover'>
                            <thead className='bg-info text-white'>
                                <tr>
                                    <th>Employee Name</th>
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                </tr>
                            </thead>
                        </table>
                    )
                }
            </div>
        </div>

    )
}
export default Attendancecorrectiondashboard;

