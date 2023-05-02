import Layout from "@/components/layout/layout"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link';
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

    const [calender, setCalender] = useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
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


    const [pendingdata, setPendingData] = useState([])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [approveddata, setApprovedData] = useState([])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [rejecteddata, setRejectedData] = useState([])

    // eslint-disable-next-line react-hooks/rules-of-hooks
        fect(() => {
        async function getData() {
           const staffID = sessionStorage.getItem("userID")
            let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
            //get api is not working
            const { dataApproved } = await axios.get(hostURL + "Employee/GetApprovedStaffLeavesByStaffID?ID=" +staffID + "TypeID=1&Sdate=2022-02-01&Edate=2099-02-01") 
            setApprovedData(dataApproved);
            // get api is not working
            const { dataPending } = await axios.get(hostURL + "Employee/GetPendingStaffLeavesByStaffID?ID=" +staffID + "TypeID=1&Sdate=2022-02-01&Edate=2099-02-01")
            setPendingData(dataPending);
            //get api is not working
            const { dataRejected } = await axios.get(hostURL + "Employee/GetRejectedStaffLeavesByStaffID?ID=" +staffID + "TypeID=1&Sdate=2022-02-01&Edate=2099-02-01")
            setRejectedData(dataRejected);


        }
        getData();
    }, [])

    const events = [
        {
            id: 0,
            title: "Board meeting",
            start: new Date(2018, 0, 29, 9, 0, 0),
            end: new Date(2018, 0, 29, 13, 0, 0),
            resourceId: 1
        },
        {
            id: 1,
            title: "MS training",
            allDay: true,
            start: new Date(2018, 0, 29, 14, 0, 0),
            end: new Date(2018, 0, 29, 16, 30, 0),
            resourceId: 2
        },
        {
            id: 2,
            title: "Team lead meeting",
            start: new Date(2018, 0, 29, 8, 30, 0),
            end: new Date(2018, 0, 29, 12, 30, 0),
            resourceId: 3
        },
        {
            id: 11,
            title: "Birthday Party",
            start: new Date(2018, 0, 30, 7, 0, 0),
            end: new Date(2018, 0, 30, 10, 30, 0),
            resourceId: 4
        }
    ];

    const resourceMap = [
        { resourceId: 1, resourceTitle: "Board room" },
        { resourceId: 2, resourceTitle: "Training room" },
        { resourceId: 3, resourceTitle: "Meeting room 1" },
        { resourceId: 4, resourceTitle: "Meeting room 2" }
    ];

    const styles = {
        container: {
            width: "80wh",
            height: "60vh",
            margin: "2em"
        }
    };

    return (

        <div class="col-md-12">
            <div class="row">
                <div class="col-md-7">
                    <h3>Get Api is not Working for Approval Reject and Pending</h3>
                    <Link className="Heading " href="/Requests/leavelistdashboard"><u> My Leave Details</u></Link>

                    <Link href="/Requests/hrleaverequest" class="Heading mx-5" ><u>All Staff Leave Details</u></Link>


                </div>
                <div class="col-md-4"><a class="leavecol">Leave Balance</a></div>
            </div>
            <br />

            <div class="row FilterClass ">
                <div class="col-lg-4">
                    <div class="card shadow p-4">
                        <div class="row">
                            <div class="col-lg-6">
                                <p>START DATE:</p>
                                <input id="date" name="date" type="date" onkeydown="return false" placeholder="Duration" class="form-control " />
                            </div>
                            <div class="col-lg-6">
                                <p>END DATE:</p>
                                <input id="date" name="date" type="date" placeholder="Duration" onkeydown="return false" class="form-control " />
                            </div>

                            <div class="col-lg-12 searchtxt mt-4"><br /><input type="search" placeholder="Search for date , Leave Type or Status" class="form-control " /></div>
                        </div>
                    </div>
                    <br /><br />
                </div>
                <div class="col-lg-8 rw-bg">
                    <div class="row  shadow p-3" style={{ marginBottom: "3px" }}>
                        <div class="col-lg-4 ">
                            <div class="card shadow">
                                <p class="para"><b class="number"> </b> Sick Leave </p>
                            </div>
                        </div>
                        <div className='col-lg-4'>

                        </div>
                        <div class="col-lg-4 ">
                            <div class="card shadow">
                                <p class="para"><b class="number"></b> Vacation Leave</p>

                            </div> <br /><br /><br /><br /><br /><br />
                        </div>
                    </div>
                </div>

            </div>
            <div class="row">
                <div class="col-md-4">
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
                <div class="col-md-4"></div>
                <div class="col-md-4">
                    <Link href="/Requests/Applyleave/new"><button className="submit-button m" tabindex="0"> Apply Leave</button>
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
                                    <button onClick={togglePending} className={'btn ' + leave.btn} role="button" aria-pressed="true">Pending</button>
                                    <button onClick={toggleApproved} className={'btn ' + leave.btn} role="button" aria-pressed="true">Approved</button>
                                    <button onClick={toggleRejected} className={'btn ' + leave.btn}>Rejected</button>
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
                                    <th>Leave Type</th>
                                    <th>Leave Reason</th>
                                    <th>Leave Days Count</th>
                                    <th>Attachment</th>
                                    <th>Stage & Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    pendingdata.map((data) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>{data.Date}</td>
                                                <td>{data.StartTime}</td>
                                                <td>{data.EndTime}</td>
                                                <td>{data.Comments}</td>
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
                                    <th>Leave Type</th>
                                    <th>Leave Reason</th>
                                    <th>Leave Days Count</th>
                                    <th>Attachment</th>
                                    <th>Stage & Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    approveddata.map((data) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>{data.Date}</td>
                                                <td>{data.StartTime}</td>
                                                <td>{data.EndTime}</td>
                                                <td>{data.Comments}</td>
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
                                    <th>Leave Type</th>
                                    <th>Leave Reason</th>
                                    <th>Leave Days Count</th>
                                    <th>Attachment</th>
                                    <th>Stage & Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    rejecteddata.map((data) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>{data.Date}</td>
                                                <td>{data.StartTime}</td>
                                                <td>{data.EndTime}</td>
                                                <td>{data.Comments}</td>
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