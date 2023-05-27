import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { apiService } from "@/services/api.service";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";
import { Calendar as BigCalendar, momentLocalizer, Views } from "react-big-calendar";
import ReactPaginate from "react-paginate";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const Index = () => {
    const { register, handleSubmit, reset, formState } = useForm();
    const [pending, setPending] = useState(false)
    const [approved, setApproved] = useState(false)
    const [rejected, setRejected] = useState(false)
    const [pendingdata, setPendingData] = useState([])
    const [approveddata, setApprovedData] = useState([])
    const [rejecteddata, setRejectedData] = useState([])
    const [roleID, setRoleID] = useState();
    const [userID, setUserID] = useState();
    const [keyword, setKeyword] = useState("");
    const [position, setPositionData] = useState([]);
    const [department, setDepartmentData] = useState([]);
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
    const getPendingData = async (StartingDate, EndDate) => {
        const res = await apiService.commonGetCall("Employee/GetPendingStaffLeavesByStaffID?ID=" + userID + "&TypeID=1&Sdate=" + StartingDate + "&Edate=" + EndDate)
        setPendingData(res.data);
    }
    const getApprovedData = async (StartingDate, EndDate) => {
        const res = await apiService.commonGetCall("Employee/GetApprovedStaffLeavesByStaffID?ID=" + userID + "&TypeID=1&Sdate=" + StartingDate + "&Edate=" + EndDate)
        setApprovedData(res.data);
        console.log(res.data);
    }
    const getRejectedData = async (StartingDate, EndDate) => {
        const res = await apiService.commonGetCall("Employee/GetRejectedStaffLeavesByStaffID?ID=" + userID + "&TypeID=1&Sdate=" + StartingDate + "&Edate=" + EndDate)
        setRejectedData(res.data);
        console.log(res.data);
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
        return dateValidation(selectedDate);
        // return getDateBySelectedDate(selectedDate);

    };
    const getDateBySelectedDate = (endDatesss) => {
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
    const dateValidation = (selectedDate) => {
        if (new Date(startDate) > new Date(selectedDate)) {
            Swal.fire("End Date should be greater than Start Date");
        } else {
            setEndDate(selectedDate);
            return getDataBySelectedDate(selectedDate);
        }
    };
    const getDataBySelectedDate = (endDatesss) => {
        return getPendingData(startDate, endDatesss);
    };
    useEffect(() => {
        const usrID = sessionStorage.getItem("userID");
        setUserID(usrID);
        const userRoleID = sessionStorage.getItem("roleID");
        setRoleID(userRoleID);
        setListView(true);
        setPending(true);
        getstaffDetails();
        getDepartmentDetails();
        if (userID) {
            const resu = getCurrentMonthDates();
            if (resu) {
                getPendingData(resu.setStartDate, resu.setEndDate);
                getApprovedData(resu.setStartDate, resu.setEndDate);
                getRejectedData(resu.setStartDate, resu.setEndDate);
            }
        }
        return;
    }, [userID])
    const events = [
        // {
        //     id: 0,
        //     title: "Board meeting",
        //     start: new Date(2018, 0, 29, 9, 0, 0),
        //     end: new Date(2018, 0, 29, 13, 0, 0),
        //     
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

    const PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(pendingdata.length / PER_PAGE);

    const getstaffDetails = async () => {
        const staffDetails = await apiService.commonGetCall("Master/GetDepartmentMaster");
        setPositionData(staffDetails.data);
    };

    const getDepartmentDetails = async () => {
        const deptDetails = await apiService.commonGetCall("Master/GetRoleType");
        setDepartmentData(deptDetails.data);
    }
    return (
        <div className="container-fluid">
            <div claasName="row">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-3">
                            {
                                sessionStorage.getItem("roleID") == 2 && (
                                    <Link href="/Requests/Leaverequest">
                                        <label className="mainheader"> Leave Request</label>
                                    </Link>
                                )
                            }
                        </div>
                        <div className="col-md-3">
                            <label className="mainheader">All staff Leave Details </label>
                        </div>
                    </div><br />
                    <div className='row'>
                        <div className="col-lg-12">
                            <div className="card p-3 border-0">
                                <div className="row">
                                    <div className='col-lg-1'>
                                        <label style={{ fontWeight: "bold" }}>Filter By</label>
                                    </div>
                                    <div className="col-lg-2">
                                        <label style={{ fontWeight: "bold" }}>Start Date:</label>
                                        <input id="date" name="date" type="date" placeholder="Duration" className="form-control " onChange={(e) => getStartDate(e.target.value)} />
                                    </div>
                                    <div className="col-lg-2">
                                        <label style={{ fontWeight: "bold" }}>End Date:</label>
                                        <input id="date" name="date" type="date" placeholder="Duration" className="form-control " onChange={(e) => getEndDate(e.target.value)} />
                                    </div>
                                    <div className="col-lg-2">
                                        <label style={{ fontWeight: "bold" }}>Position:</label>
                                        <select className='form-control'>
                                            <option>Select Position</option>
                                            {position.map((data, index) => {
                                                return (
                                                    <option value={data.id} key={index}>
                                                        {data.department_name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="col-lg-2">
                                        <label style={{ fontWeight: "bold" }}>Department:</label>
                                        <select className='form-control'>
                                            <option>Select Department</option>
                                            {department.map((data, index) => {
                                                return (
                                                    <option value={data.id} key={index}>
                                                        {data.short}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="col-lg-3">
                                        <label style={{ fontWeight: "bold" }}>Search:</label>
                                        <br /><input type="search" placeholder="Search here.." className="form-control " onChange={e => setKeyword(e.target.value)} />
                                    </div>
                                </div>   <br />
                            </div>
                        </div>
                    </div><br />
                    <div className="row">
                        <div className="col-lg-4">
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <div className='btn-group'>
                                        <button onClick={toggleCalender} className={`toggleButton ${calender ? "focus" : ""}`}>Calender</button>
                                        <button onClick={toggleListView} className={`toggleButton ${listview ? "focus" : ""}`}>List View</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-lg-12">
                            {
                                calender && (
                                    <div className='row'>
                                        <div className="col-lg-12">
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
                                    </div>

                                )
                            }
                            {
                                listview && (
                                    <div className='row mt-3'>
                                        <div className='col-lg-4'>
                                            <div className='btn-group'>
                                                <button onClick={togglePending} className={`toggleButton ${pending ? "focus" : ""}`}>Pending</button>
                                                <button onClick={toggleApproved} className={`toggleButton ${approved ? "focus" : ""}`}>Approved</button>
                                                <button onClick={toggleRejected} className={`toggleButton ${rejected ? "focus" : ""}`}>Rejected</button>
                                                <br /><br />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div><br />
                    <div className="row">
                        <div className="col-lg-12">
                            {pending && (
                                <>
                                    <h6 style={{ color: "#3247d5" }}>Showing {pendingdata.length} Results</h6>

                                    <table className='table'>
                                        <thead className='bg-info text-white'>
                                            <tr>
                                                <th>Select All
                                                    <input type='checkbox' />
                                                </th>
                                                <th>Employee Name</th>
                                                <th>From Date</th>
                                                <th>To Date</th>
                                                {/* <th>Leave Type</th> */}
                                                <th>Leave Reason</th>
                                                {/* <th>Leave Days Count</th> */}
                                                {/* <th>Attachment</th> */}
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                pendingdata.filter(data => {
                                                    if ((data.sDateOfLeave.toString().includes(keyword.toLowerCase())) || (data.eDateOfLeave.toString().includes(keyword)) || (data.status.toLowerCase().includes(keyword)) || (data.leaveReason.toString().includes(keyword.toLowerCase()))) {
                                                        return data;
                                                    }
                                                }).slice(offset, offset + PER_PAGE).map((data) => {
                                                    return (
                                                        <tr key={data.id}>
                                                            <td>
                                                                <input type='checkbox' />
                                                            </td>
                                                            <td>{data.firstName}</td>
                                                            <td>{data.sDateOfLeave}</td>
                                                            <td>{data.eDateOfLeave}</td>
                                                            <td>{data.leaveReason}</td>
                                                            <td>{data.status}</td>
                                                            <td>
                                                                <button className='edit-btn'>Cancel</button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </table>
                                </>
                            )}

                            {approved && (
                                <>
                                    <h6 style={{ color: "#3247d5" }}>Showing {approveddata.length} Results</h6>
                                    <table className='table'>
                                        <thead className='bg-info text-white'>
                                            <tr>
                                                <th>Employee Name</th>
                                                <th>From Date</th>
                                                <th>To Date</th>
                                                {/* <th>Leave Type</th> */}
                                                <th>Leave Reason</th>
                                                {/* <th>Leave Days Count</th> */}
                                                {/* <th>Attachment</th> */}
                                                <th> Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                approveddata.filter(data => {
                                                    if ((data.sDateOfLeave.toString().includes(keyword.toLowerCase())) || (data.eDateOfLeave.toString().includes(keyword)) || (data.status.toLowerCase().includes(keyword)) || (data.status.toLowerCase().includes(keyword)) || (data.leaveReason.toString().includes(keyword.toLowerCase()))) {
                                                        return data;
                                                    }
                                                }).slice(offset, offset + PER_PAGE).map((data) => {
                                                    return (
                                                        <tr key={data.id}>
                                                            <td>{data.firstName}</td>
                                                            <td>{data.sDateOfLeave}</td>
                                                            <td>{data.eDateOfLeave}</td>
                                                            <td>{data.leaveReason}</td>
                                                            <td>{data.status}</td>
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </table>
                                </>
                            )}
                            {rejected && (
                                <>
                                    <h6 style={{ color: "#3247d5" }}>Showing {rejecteddata.length} Results</h6>
                                    <table className='table'>
                                        <thead className='bg-info text-white'>
                                            <tr>
                                                <th>Employee Name</th>
                                                <th>From Date</th>
                                                <th>To Date</th>
                                                <th>Leave Reason</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                rejecteddata.filter(data => {
                                                    if ((data.sDateOfLeave.toString().includes(keyword.toLowerCase())) || (data.eDateOfLeave.toString().includes(keyword)) || (data.status.toLowerCase().includes(keyword)) || (data.status.toLowerCase().includes(keyword)) || (data.leaveReason.toString().includes(keyword.toLowerCase()))) {
                                                        return data;
                                                    }
                                                }).slice(offset, offset + PER_PAGE).map((data) => {
                                                    return (
                                                        <tr key={data.id}>
                                                            <td>{data.firstName}</td>
                                                            <td>{data.sDateOfLeave}</td>
                                                            <td>{data.eDateOfLeave}</td>
                                                            <td>{data.leaveReason}</td>
                                                            <td>{data.status}</td>
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </table>
                                </>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Index