import React from 'react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import loan from "../../../../pages/Requests/Applyloans/applyloans.module.css"

const Index = () => {
    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const [pending, setPending] = useState(false)
    const [approved, setApproved] = useState(false)
    const [rejected, setRejected] = useState(false);
    const [newDashboard, setNewDashboardData] = useState([]);
    const [newApproved, setnewApprovedData] = useState([]);
    const [newRejected, setnewRejectedData] = useState([]);
    const togglePending = () => {
        setPending(true)
        setApproved(false)
        setRejected(false)

    }

    const toggleApproved = () => {
        setApproved(true)
        setPending(false)
        setRejected(false)

    }
    const toggleRejected = () => {
        setRejected(true)
        setApproved(false)
        setPending(false)

    }

    const getPendingDetails = async () => {
        const res = await axios.get(hostURL + "Payroll/GetPendingStaffOverTimeDetails")
        setNewDashboardData(res.data);
        console.log("Pending", res.data);
    }
    const getApprovedDetails = async () => {
        const res = await axios.get(hostURL + "Payroll/GetApproveStaffOverTimeDetails")
        setnewApprovedData(res.data);
        console.log("Approved", res.data);
    }
    const getRejectedDetails = async () => {
        const res = await axios.get(hostURL + "Payroll/GetRejectStaffOverTimeDetails")
        setnewRejectedData(res.data);
        console.log("Rejected", res.data);
    }
    useEffect(() => {
        getPendingDetails();
        getApprovedDetails();
        getRejectedDetails();
    }, [])
    


    return (
        <div>
            <div className='row'>
                <div className='col-lg-3 mt-3 text-primary fs-6 fw-bold'>
                    <h4>My OvertimeDetails</h4>
                </div>
            </div>
            <div className='card p-3 border-0 shadow-lg rounded-3 mt-4'>
                <div className='row'>
                    <div className='col-lg-3 text-dark fs-6 fw-bolder'>
                        <p>Select Dates</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-4'>
                        <input type="date" className='form-control' />
                    </div>
                    <div className='col-lg-4'>
                        <input type="date" className='form-control' />
                    </div>
                    <div className='col-lg-4 mb-4'>
                        <Link href="/Requests/OverTimeDetails/new">
                            <button className={loan.addButton}>Apply Overtime</button>
                        </Link>
                    </div>
                    <br />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-lg-9"></div>
                <div className="col-lg-3">

                </div>
            </div>
            <div className="row mt-2">
                <div className="col-lg-12 dashbutton bttn">
                    <div className='col-lg-4 mx-2'><br />
                        <div className='btn-group'>
                            <button onClick={togglePending} className={loan.tabBtn}>Pending</button>
                            <button onClick={toggleApproved} className={loan.tabBtn}>Approved</button>
                            <button onClick={toggleRejected} className={loan.tabBtn}>Rejected</button>
                        </div>
                    </div>
                    <br />
                </div>
            </div>
            {
                pending && (
                    <table className='table table-hover'>
                        <thead className='bg-info text-white'>
                            <tr>
                                <th>Date Request</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>OT Details</th>
                                <th>Attachment</th>
                                <th>Purpose</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                newDashboard.map((data) => {
                                    return (
                                        <tr key={data.id}>
                                            <td>{data.date}</td>
                                            <td>{data.actuval_StartTime}</td>
                                            <td>{data.actuval_EndTime}</td>
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
                approved && (
                    <table className='table table-hover'>
                        <thead className='bg-info text-white'>
                            <tr>
                                <th>Date Request</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>OT Details</th>
                                <th>Attachment</th>
                                <th>Purpose</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                newApproved.map((data) => {
                                    return (
                                        <tr key={data.id}>
                                            <td>{data.date}</td>
                                            <td>{data.actuval_StartTime}</td>
                                            <td>{data.actuval_EndTime}</td>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                )
            }
            {
                rejected && (
                    <table className='table table-hover'>
                        <thead className='bg-info text-white'>
                            <tr>
                                <th>Date Request</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>OT Details</th>
                                <th>Attachment</th>
                                <th>Purpose</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                newRejected.map((data) => {
                                    return (
                                        <tr key={data.id}>
                                            <td>{data.date}</td>
                                            <td>{data.actuval_StartTime}</td>
                                            <td>{data.actuval_EndTime}</td>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}

export default Index