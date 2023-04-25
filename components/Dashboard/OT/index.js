// import Layout from '@/Components/layout'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link';
// import leave from "@/styles/Requests/leavelistdashboard.module.css"
const Myovertimedetails = () => {

        const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [pending, setPending] = useState(false)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [approved, setApproved] = useState(false)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [rejected, setRejected] = useState(false)
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
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [pendingdata, setPendingData] = useState([])
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [approveddata, setApprovedData] = useState([])
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [rejecteddata, setRejectedData] = useState([])

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            async function getData() {
                let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
                const { dataApproved } = await axios.get(hostURL + "Payroll/GetApproveStaffOverTimeDetails")
                setApprovedData(dataApproved);

                const { dataPending } = await axios.get(hostURL + "Payroll/GetPendingStaffOverTimeDetails")
                setPendingData(dataPending);
                const { dataRejected } = await axios.get(hostURL + "Payroll/GetRejectStaffOverTimeDetails")
                setRejectedData(dataRejected);


            }
            getData();
        }, [])
        return (
        
                <div >
                    <br />


                    <div className="container-fluid ">
                        <div className="col-12">
                            <div className="row">
                            <h2>Yet to bind</h2>
                            </div>
                            <div className="align-width">
                                <div className="dashbutton bttn">
                                    <div className="tab-slider--nav">
                                        <ul className="tab-slider--tabs">
                                            <li type="button" rel="tab111" className="tab-slider--trigger gray"> My Overtime Details</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <br /><br /><br />
                            <div className="card shadow">
                                <div className="row">

                                    <div className="col-lg-7 mx-4">
                                        <p className="leavereq">Select Dates </p>
                                        <div className="row">
                                            <div className="col-lg-6"><input type="date" onkeydown="return false" id="sdate" name="sdate" className="form-control " /></div>
                                            <div className="col-lg-6"><input type="date" onkeydown="return false" id="edate" name="edate" className="form-control " /></div>
                                        </div>
                                    </div>
                                    <div className="col-lg-1"></div>
                                    <div className="col-lg-3">

                                        <Link href="/OT/new"><button className="submit-button mt-5" tabindex="0">Apply Overtime</button></Link>

                                    </div>
                                </div>
                                <br />
                                <div className='row mt-3'>
                                    <div className='col-lg-4 mx-4'>
                                        <div className='btn-group'>
                                            <button onClick={togglePending} className='btn ' role="button" aria-pressed="true">Pending</button>
                                            <button onClick={toggleApproved} className='btn '  role="button" aria-pressed="true">Approved</button>
                                            <button onClick={toggleRejected} className='btn '>Rejected</button>
                                        </div>
                                    </div>
                                </div>

                                <div className='row mt-3'>
                                    <div className='col-lg-2 text-primary fs-6 fw-bold mx-4'>
                                        <h6>Showing Results</h6>
                                    </div>
                                    <div className='container'>
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
                                                            <th>status</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            pendingdata?.map((data) => {
                                                                return (
                                                                    <tr key={data.id}>
                                                                        <td>{data.Date}</td>
                                                                        <td>{data.StartTime}</td>
                                                                        <td>{data.EndTime}</td>
                                                                        <td>{data.Comments}</td>
                                                                        <td>{data.status}</td>
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
                                                            <th>Date</th>
                                                            <th>Start Time</th>
                                                            <th>End Time</th>
                                                            <th>Comments</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            approveddata?.map((data) => {
                                                                return (
                                                                    <tr key={data.id}>
                                                                        <td>{data.Date}</td>
                                                                        <td>{data.StartTime}</td>
                                                                        <td>{data.EndTime}</td>
                                                                        <td>{data.Comments}</td>
                                                                        <td>{data.status}</td>
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
                                                            <th>Approved Start Time</th>
                                                            <th>ApprovedEnd Time</th>
                                                            <th>OT Details</th>
                                                            <th>Attachment</th>
                                                            <th>Reject Reason</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            rejecteddata?.map((data) => {
                                                                return (
                                                                    <tr key={data.id}>
                                                                        <td>{data.Date}</td>
                                                                        <td>{data.StartTime}</td>
                                                                        <td>{data.EndTime}</td>
                                                                        <td>{data.Comments}</td>
                                                                        <td>{data.status}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
          
        )
    }

export default Myovertimedetails;
