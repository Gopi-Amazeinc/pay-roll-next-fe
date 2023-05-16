import Layout from "@/components/layout/layout"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link';
import { apiService } from "@/services/api.service";
import {
    Calendar as BigCalendar,
    momentLocalizer,
    Views
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import leave from "../../../../pages/Requests/Compensationtimeout/compensation.module.css"
moment.locale("en-GB");
//momentLocalizer(moment);
const localizer = momentLocalizer(moment);

function LeaveListDashboard() {

    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    var date = new Date();
    let Sdate = date.toISOString().slice(0, 10);
    var edate = new Date();
    let Edate = edate.toISOString().slice(0, 10);

    const [pending, setPending] = useState(false)
    const [approved, setApproved] = useState(false)
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
        setPending(false)
        setApproved(false)
    }

    const [calender, setCalender] = useState(false)
    const [listview, setListView] = useState(false)
    const toggleCalender = () => {
        setCalender(true)
        setListView(false)
        setApproved(false)
        setPending(false)
        setRejected(false)

    }

    const toggleListView = () => {
        setListView(true)
        setCalender(false)

    }

    // const dateFormat = () => {
    //     var StartDate = new Date();
    //     let Sdate = StartDate.toISOString().slice(0, 10);
    //     var EndDate = new Date();
    //     let Edate = EndDate.toISOString().slice(0, 10);
    //     getPendingData(Sdate, Edate);
    //     getApprovedData(Sdate, Edate);
    //     getRejectedData(Sdate, Edate);
    // }


    const [pendingdata, setPendingData] = useState([])
    const [approveddata, setApprovedData] = useState([])
    const [rejecteddata, setRejectedData] = useState([])

    const getPendingData = async () => {
        const staffID = sessionStorage.getItem("userID")
        const res = await apiService.commonGetCall("Employee/GetPendingStaffLeavesByStaffID?ID=" + staffID + "&TypeID=1&Sdate=" + Sdate + "&Edate=" + Edate)
        setPendingData(res.data);
        console.log(res.data);
    }
    const getApprovedData = async () => {
        const staffID = sessionStorage.getItem("userID")
        const res = await apiService.commonGetCall("Employee/GetApprovedStaffLeavesByStaffID?ID=" + staffID + "&TypeID=1&Sdate=" + Sdate + "&Edate=" + Edate)
        setApprovedData(res.data);
        console.log(res.data);
    }
    const getRejectedData = async () => {
        const staffID = sessionStorage.getItem("userID")
        const res = await apiService.commonGetCall("Employee/GetRejectedStaffLeavesByStaffID?ID=" + staffID + "&TypeID=1&Sdate=" + Sdate + "&Edate=" + Edate)
        setRejectedData(res.data);
        console.log(res.data);
    }
    useEffect(() => {
        getPendingData();
        getApprovedData();
        getRejectedData();
    }, [])

    const events = [
        // {
        //     id: 0,
        //     title: "Board meeting",
        //     start: new Date(2018, 0, 29, 9, 0, 0),
        //     end: new Date(2018, 0, 29, 13, 0, 0),
        //     resourceId: 1
        // },
        // {
        //     id: 1,
        //     title: "MS training",
        //     allDay: true,
        //     start: new Date(2018, 0, 29, 14, 0, 0),
        //     end: new Date(2018, 0, 29, 16, 30, 0),
        //     resourceId: 2
        // },
        // {
        //     id: 2,
        //     title: "Team lead meeting",
        //     start: new Date(2018, 0, 29, 8, 30, 0),
        //     end: new Date(2018, 0, 29, 12, 30, 0),
        //     resourceId: 3
        // },
        // {
        //     id: 11,
        //     title: "Birthday Party",
        //     start: new Date(2018, 0, 30, 7, 0, 0),
        //     end: new Date(2018, 0, 30, 10, 30, 0),
        //     resourceId: 4
        // }
    ];

    const resourceMap = [
        // { resourceId: 1, resourceTitle: "Board room" },
        // { resourceId: 2, resourceTitle: "Training room" },
        // { resourceId: 3, resourceTitle: "Meeting room 1" },
        // { resourceId: 4, resourceTitle: "Meeting room 2" }
    ];

    const styles = {
        container: {
            width: "80wh",
            height: "60vh",
            margin: "2em"
        }
    };

    return (

        <div className="col-md-12">
            <div className="row">
                <div className="col-md-7">
                    {/* <h5>Api is not Working for Approval Reject and Pending</h5> */}
                    {
                        sessionStorage.getItem("roleID")==2  && (
                            <Link href="/Requests/hrleaverequest" className="Heading mx-5" ><u>All Staff Leave Details</u></Link>
                        )
                    }
                    {/* <Link className="Heading" href="/Requests/leavelistdashboard"><u> My Leave Details</u></Link> */}

                    


                </div>
                {/* <div className="col-md-4"><a className="leavecol">Leave Balance</a></div> */}
            </div>
            <br />

            <div className="row FilterClass ">
                <div className="col-lg-4">
                    <div className="card shadow p-4">
                        <div className="row">
                            <div className="col-lg-6">
                                <p>START DATE:</p>
                                <input id="date" name="date" type="date" placeholder="Duration" className="form-control " />
                            </div>
                            <div className="col-lg-6">
                                <p>END DATE:</p>
                                <input id="date" name="date" type="date" placeholder="Duration" onKeyDown={()=> handleEndDate()} className="form-control " />
                            </div>

                            <div className="col-lg-12 searchtxt mt-4"><br /><input type="search" placeholder="Search for date , Leave Type or Status" className="form-control " /></div>
                        </div>
                    </div>
                    <br /><br />
                </div>
                <div className="col-lg-8">
                    <div className="card shadow">
                        <div className="row" style={{ marginBottom: "3px" }}>
                            <div className="col-lg-4 ">
                                <div className="card shadow p-1">
                                    <p className="para"><b className="number"> </b> Sick Leave </p>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className="card shadow p-1">
                                    <p className="para"><b className="number"></b> Vacation Leave</p>

                                </div>
                            </div>
                            <div className="col-lg-4 ">
                                <br /><br /><br /><br /><br /><br /><br /><br />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className='row mt-3'>
                        <div className='col-lg-4 mx-5'>
                            <div className='btn-group'>
                                <button onClick={toggleCalender} className={'btn ' + leave.btn}>Calender</button>
                                <button onClick={toggleListView} className={'btn ' + leave.btn}>List View</button>

                            </div>
                        </div>
                    </div>
                    <br />
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <Link href="/Requests/Applyleave/new"><button className="submit-button m" tabIndex="0"> Apply Leave</button>
                    </Link>
                </div>
            </div>
            <br />

            <div className='container'>
                {
                    calender && (
                        <div className='row'>
                            <div className='card shadow'>
                                <div style={styles.container}>
                                    <BigCalendar
                                        selectable
                                        localizer={localizer}
                                        events={events}
                                        defaultView={Views.DAY}
                                        views={[Views.DAY, Views.WEEK, Views.MONTH]}
                                        steps={60}
                                        defaultDate={new Date(2018, 0, 29)}
                                        resources={resourceMap}
                                        resourceIdAccessor="resourceId"
                                        resourceTitleAccessor="resourceTitle"
                                    />
                                </div>
                            </div>
                        </div>

                    )
                }
                {
                    listview && (

                        <div className='row mt-3'>
                            <div className='col-lg-4'>
                                <div className='btn-group'>
                                    <button onClick={togglePending} className="toggleButton" role="button" aria-pressed="true">Pending</button>
                                    <button onClick={toggleApproved} className="toggleButton" role="button" aria-pressed="true">Approved</button>
                                    <button onClick={toggleRejected} className="toggleButton">Rejected</button>
                                    <br /><br />
                                </div>
                            </div>
                        </div>


                    )
                }
                <div className='container'>
                    {pending && (

                        <table className='table table-hover mt-4'>
                            <thead className='bg-info text-white'>
                                <tr>
                                    <th>From Date</th>
                                    <th>To Date</th>
                                    <th>Leave Reason</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    pendingdata.map((data) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>{data.sDateOfLeave}</td>
                                                <td>{data.eDateOfLeave}</td>
                                                <td>{data.leaveReason}</td>
                                                <td>{data.status}</td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    )}

                    {approved && (
                        <table className='table table-hover mt-4'>
                            <thead className='bg-info text-white'>
                                <tr>
                                    <th>From Date</th>
                                    <th>To Date</th>
                                    <th>Leave Reason</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    approveddata.map((data) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>{data.sDateOfLeave}</td>
                                                <td>{data.eDateOfLeave}</td>
                                                <td>{data.leaveReason}</td>
                                                <td>{data.status}</td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    )}

                    {rejected && (
                        <table className='table table-hover mt-4'>
                            <thead className='bg-info text-white'>
                                <tr>
                                    <th>From Date</th>
                                    <th>To Date</th>
                                    <th>Leave Reason</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    rejecteddata.map((data) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>{data.sDateOfLeave}</td>
                                                <td>{data.eDateOfLeave}</td>
                                                <td>{data.leaveReason}</td>
                                                <td>{data.status}</td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>


        </div>

    )
}

export default LeaveListDashboard