import Link from "next/link";
import { useEffect, useState } from 'react';
import Layout from "@/components/layout/layout"
import { apiService } from "@/services/api.service";
import Swal from 'sweetalert2';

const Locatordashboard = () => {

    const [pending, setPending] = useState(false)
    const [approved, setApproved] = useState(false)
    const [rejected, setRejected] = useState(false)

    const [pendingDashboard, getPending] = useState([])
    const [approvedDashboard, getApproved] = useState([])
    const [rejecteddDashboard, getRejected] = useState([])
    const [keyword, setKeyword] = useState("");
    const [userID, setUserID] = useState();

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const getStartDate = (selectedDate) => {
        setStartDate(selectedDate);
        setEndDate("");
        sessionStorage.setItem("StartDate", startDate);

    };

    const getEndDate = (selectedDate) => {
        setEndDate(selectedDate);
        sessionStorage.setItem("EndDate", endDate);
        return getDateBySelectedDate(selectedDate);
    };
    const getDateBySelectedDate = (endDatesss) => {
        debugger;
        return getPendingData(startDate, endDatesss);
    };
    const getCurrentMonthDates = () => {
        let newDate = new Date();
        let firstDayOfMonth = new Date(newDate.getFullYear(), newDate.getMonth());
        let fromDate = formateDate(firstDayOfMonth);
        const year = newDate.getFullYear();
        const month = newDate.getMonth() + 1;
        const lastDay = new Date(year, month, 0).getDate();
        const toDate = `${year}-${month.toString().padStart(2, "0")}-${lastDay
            .toString()
            .padStart(2, "0")}`;
        setStartDate(fromDate);
        setEndDate(toDate);
        return {
            setStartDate: fromDate,
            setEndDate: toDate,
        };
    };

    const formateDate = (datetoformat) => {
        const day = datetoformat.getDate().toString().padStart(2, "0");
        const month = (datetoformat.getMonth() + 1).toString().padStart(2, "0");
        const year = datetoformat.getFullYear().toString();
        return `${year}-${month}-${day}`;
    };
    const togglePending = () => {
        setApproved(false)
        setRejected(false)
        setPending(true)
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
    const getPendingData = async () => {
        debugger;
        let UserID = sessionStorage.getItem("userID");
        let pending = await apiService.commonGetCall("Payroll/GetLocatorRequests?UserID=" + UserID);
        getPending(pending.data);
        console.log("pending", pending.data)
    }
    const getApproveData = async () => {
        debugger;
        let UserID = sessionStorage.getItem("userID");
        let approved = await apiService.commonGetCall("Payroll/GetApprovedLocatorRequest?UserID=" + UserID);
        getApproved(approved.data);
        console.log("approved", approved.data)
    }

    const getRejectedData = async () => {
        debugger;
        let UserID = sessionStorage.getItem("userID");
        let rejected = await apiService.commonGetCall("Payroll/GetRejectedLocatorRequest?UserID=" + UserID);
        getRejected(rejected.data);
        console.log(rejected.data, "rejected")
    }

    const Delete = (id) => {
        debugger;
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
                apiService.commonGetCall("Payroll/CancelLocatorRequest?ID=" + id)
                Swal.fire({
                    icon: "success",
                    titleText: "Cancelled Successfully"
                })
                getPendingData();
            }
        }
        )
    }
    useEffect(() => {
        const usrID = sessionStorage.getItem("userID");
        setUserID(usrID);
        setPending(true);
        if (userID) {
            const resu = getCurrentMonthDates();
            if (resu) {
                getPendingData(userID)
                getApproveData(userID);
                getRejectedData(userID);
            }
        }
        return;
    }, [userID])



    return (
        <Layout>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <p className="Heading">My OBASIS Details</p>
                        <div className="card p-3 rounded-3 shadow border-0 ">
                            <div className="row">
                                <div className="col-lg-1">
                                    <label style={{ fontWeight: "bold" }}> Filter By</label>
                                </div>
                                <div className="col-lg-2">
                                    <label style={{ fontWeight: "bold" }}>From Date</label>
                                    <input type="date" className="form-control" value={startDate} onChange={(e) => getStartDate(e.target.value)} />
                                </div>
                                <div className="col-lg-2">
                                    <label style={{ fontWeight: "bold" }}>To Date</label>
                                    <input type="date" className="form-control" value={endDate || ""} onChange={(e) => getEndDate(e.target.value)} />
                                </div>
                                <div className="col-lg-3">
                                    <br />
                                    <input
                                        type="text"
                                        placeholder="Search for Date or Status"
                                        className="form-control"
                                        onChange={e => setKeyword(e.target.value)}
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
                                <Link href="/Requests/Locatorrequest/new"><button className="submit-button">NEW REQUESTS </button></Link>
                            </div>
                        </div>
                        <br /><br />

                        <div className="row">
                            <div className="col-lg-12">
                                {pending && (
                                    <table className='table' >
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
                                            {pendingDashboard.filter(data => {
                                                if ((data.date.toString().includes(keyword.toLowerCase())) || (data.approveStatus.toLowerCase().includes(keyword))) {
                                                    return data;
                                                }
                                            }).map((data, index) => {
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
                                                        <td><button onClick={Delete.bind(this, data.id)} className="edit-btn">CANCEL</button></td>
                                                    </tr>
                                                )
                                            })
                                            }
                                        </tbody>
                                    </table>
                                )}

                                {approved && (
                                    <table className='table' >
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
                                            {approvedDashboard.filter(data => {
                                                if ((data.date.toString().includes(keyword.toLowerCase())) || (data.approveStatus.toLowerCase().includes(keyword))) {
                                                    return data;
                                                }
                                            }).map((data, index) => {
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
                                    <table className='table' >
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
                                            {rejecteddDashboard.filter(data => {
                                                if ((data.date.toString().includes(keyword.toLowerCase())) || (data.approveStatus.toLowerCase().includes(keyword))) {
                                                    return data;
                                                }
                                            }).map((data, index) => {
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
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default Locatordashboard;