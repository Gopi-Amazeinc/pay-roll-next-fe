import Link from "next/link";
import { useEffect, useState } from 'react';
import Layout from "@/components/layout/layout"
import { apiService } from "@/services/api.service";

const Locatordashboard = () => {

    const [pending, setPending] = useState(true)
    const [approved, setApproved] = useState(false)
    const [rejected, setRejected] = useState(false)

    const [pendingDashboard, getPending] = useState([])
    const [approvedDashboard, getApproved] = useState([])
    const [rejecteddDashboard, getRejected] = useState([])

    const togglePending = (e) => {
        e.preventDefault();
        setPending(true)
        setApproved(false)
        setRejected(false)
    }

    const toggleApproved = (e) => {
        e.preventDefault();
        setApproved(true)
        setPending(false)
        setRejected(false)
    }

    const toggleRejected = (e) => {
        e.preventDefault();
        setRejected(true)
        setApproved(false)
        setPending(false)
    }

    const getlocator = async () => {
        let UserID = sessionStorage.getItem("userID")
        let pending = await apiService.commonGetCall(`Payroll/GetLocatorRequests?UserID=${UserID}`);
        console.log(pending, "pending")
        getPending(pending.data);
        let approved = await apiService.commonGetCall(`Payroll/GetApprovedLocatorRequest?UserID=${UserID}`);
        console.log(pending, "approved")
        getApproved(approved.data);
        let rejected = await apiService.commonGetCall(`Payroll/GetRejectedLocatorRequest?UserID=${UserID}`);
        console.log(pending, "rejected")
        getRejected(rejected.data);
    }

    useEffect(() => {
        getlocator()
    }, [])

    return (
        <Layout>
            <div className="container">
                <p className="Heading">My OBASIS Details</p>
                <div className="card p-3 rounded-3 shadow border-0 ">
                    <div className="row">
                        <div className="col-1">
                            <p> Filter By</p>
                        </div>
                        <div className="col-2">
                            <label>From Date</label>
                            <input type="date" className="form-control" />
                        </div>
                        <div className="col-2">
                            <label>To Date</label>
                            <input type="date" className="form-control" />
                        </div>
                        <div className="col-5">
                            <br />
                            <input
                                type="text"
                                placeholder="Search"
                                className="form-control"
                            ></input>
                        </div>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-4">
                        <button onClick={togglePending} className={`toggleButton ${pending ? "focus" : ""}`}>Pending</button>
                        <button onClick={toggleApproved} className={`toggleButton ${approved ? "focus" : ""}`}>Approved</button>
                        <button onClick={toggleRejected} className={`toggleButton ${rejected ? "focus" : ""}`}>Rejected</button>
                    </div>
                    <div className="col-6"></div>
                    <div className="col-2">
                        <Link href="/Requests/Locatorrequest/new"><button className="submit-button">New Requests </button></Link>
                    </div>
                </div>

                <div>
                    {pending && (
                        <table className='table  table-striped mt-3' >
                            <thead>
                                <tr>
                                    <th>Control Number</th>
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Task</th>
                                    <th>Comments</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingDashboard.map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{data.id}</td>
                                            <td>{data.date}</td>
                                            <td>{data.startTime}</td>
                                            <td>{data.endTime}</td>
                                            <td>{data.task}</td>
                                            <td>{data.comments}</td>
                                            <td>{data.approveStatus}</td>
                                            {/* <td>{
                                                <b>{data.statusID === 0 ? 'Manager Pending' :
                                                    data.statusID === 1 ? 'Manager approved' :
                                                        data.statusID === 2 ? 'Manager Rejected' : ' '}</b>
                                            }
                                            </td> */}
                                            <td><button className="editDeleteBtnTable">Cancel</button></td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    )}

                    {approved && (
                        <table className='table  table-striped mt-3' >
                            <thead>
                                <tr>
                                    <th>Control Number</th>
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Task</th>
                                    <th>Comments</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {approvedDashboard.map((data, index) => {
                                    return (
                                        <tr className="text-dark" key={index}>
                                            <td>{data.id}</td>
                                            <td>{data.date}</td>
                                            <td>{data.startTime}</td>
                                            <td>{data.endTime}</td>
                                            <td>{data.task}</td>
                                            <td>{data.comments}</td>
                                            <td>{data.approveStatus}</td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    )}

                    {rejected && (
                        <table className='table  table-striped mt-3 ' >
                            <thead>
                                <tr>
                                    <th>Control Number</th>
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Task</th>
                                    <th>Comments</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rejecteddDashboard.map((data, index) => {
                                    return (
                                        <tr className="text-dark" key={index}>
                                            <td>{data.id}</td>
                                            <td>{data.date}</td>
                                            <td>{data.startTime}</td>
                                            <td>{data.endTime}</td>
                                            <td>{data.task}</td>
                                            <td>{data.comments}</td>
                                            <td>{data.approveStatus}</td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </Layout>
    )
}
export default Locatordashboard;