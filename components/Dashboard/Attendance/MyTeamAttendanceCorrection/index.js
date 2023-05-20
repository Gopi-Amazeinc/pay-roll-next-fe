import React from "react";
import { useState, useEffect } from "react";
import { useRef } from 'react';
import Link from "next/link";
import Swal from "sweetalert2";
import { apiService } from "@/services/api.service";
import Styles from "@/styles/attendancedetails.module.css";
import { useRouter } from "next/router";
import { DownloadTableExcel } from 'react-export-table-to-excel';

const MyTeamAttendancecorrectiondashboard = () => {
    const tableRef = useRef(null);

    const [roleID, setRoleID] = useState();
    const [userID, setUserID] = useState();

    const [pending, setPending] = useState(false);
    const [approved, setApproved] = useState(false);
    const [rejected, setRejected] = useState(false);

    const [pendingDashboardData, setpendingDashboardData] = useState([]);
    const [approvedDashboardData, setapprovedDashboardData] = useState([]);
    const [rejectedDashboardData, setrejectedDashboardData] = useState([]);

    const [managerPending, setManagerPendingData] = useState([]);
    const [managerApproved, setManagerApprovedData] = useState([]);
    const [managerRejected, setManagerRejectedData] = useState([]);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [keyword, setKeyword] = useState("");

    const togglePending = () => {
        setPending(true);
        setRejected(false);
        setApproved(false);
    };

    const toggleApproved = () => {
        setApproved(true);
        setPending(false);
        setRejected(false);
    };

    const toggleRejected = () => {
        setRejected(true);
        setApproved(false);
        setPending(false);
    };

    useEffect(() => {
        const userid = sessionStorage.getItem("userID");
        setUserID(userid);

        const userRoleID = sessionStorage.getItem("roleID");
        setRoleID(userRoleID);

        setPending(true);
    }, []);

    useEffect(() => {
        if (userID) {
            const resu = getCurrentMonthDates();
            if (resu) {
                if (roleID == 3) {
                    debugger;
                    getPendingManager(resu.setStartDate, resu.setEndDate);
                    getApprovedManager(resu.setStartDate, resu.setEndDate);
                    getRejectedManager(resu.setStartDate, resu.setEndDate);
                } else {
                    getPendingData(resu.setStartDate, resu.setEndDate);
                    getApprovedData(resu.setStartDate, resu.setEndDate);
                    getRejectedData(resu.setStartDate, resu.setEndDate);
                }
            }
        }
    }, [roleID]);

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

    const getPendingManager = async (SDate, EDate) => {
        const res = await apiService.commonGetCall(
            "Payroll/GetPendingAttendanceCorrectionBySupervisor?userID=" +
            userID +
            "&SDate=" +
            SDate +
            "&EDate=" +
            EDate
        );
        // const res = await axios.get( hostURL + "Payroll/GetPendingAttendanceCorrectionBySupervisor?userID=" + userID +"&SDate=" + SDate +"&EDate=" +EDate);
        setManagerPendingData(res.data);
    };

    const getApprovedManager = async (SDate, EDate) => {
        const res = await apiService.commonGetCall(
            "Payroll/GetApprovedAttendanceCorrectionBySupervisor?userID=" +
            userID +
            "&SDate=" +
            SDate +
            "&EDate=" +
            EDate
        );
        // const res = await axios.get( hostURL + "Payroll/GetApprovedAttendanceCorrectionBySupervisor?userID=" + userID +  "&SDate=" +  SDate +  "&EDate=" +EDate );
        setManagerApprovedData(res.data);
    };

    const getRejectedManager = async (SDate, EDate) => {
        const res = await apiService.commonGetCall(
            "Payroll/GetApprovedAttendanceCorrectionBySupervisor?userID=" +
            userID +
            "&SDate=" +
            SDate +
            "&EDate=" +
            EDate
        );
        //  const res = await axios.get( hostURL + "Payroll/GetApprovedAttendanceCorrectionBySupervisor?userID=" +  userID + "&SDate=" + SDate + "&EDate=" + EDate);
        setManagerRejectedData(res.data);
    };



    const approveAttedanceCorrection = async (data) => {
        Swal.fire({
            title: "Confirm To Approve?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Approve it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await apiService.commonPostCall(
                    "Payroll/ApproveAttedanceCoorection?id=" +
                    data.id +
                    "&UserID=" +
                    data.staffID +
                    "&SigninDate=" +
                    startDate +
                    "&SignoutDate=" +
                    endDate
                );
                Swal.fire({
                    icon: "success",
                    titleText: "Approved Successfully",
                });
                getPendingManager(startDate, endDate);
            }
        });
    };

    // const getPendingData = async (SDate, EDate) => {
    //     const res = await apiService.commonGetCall(
    //         "Payroll/GetPendingAttendanceCorrectionByStaffID?userID=" +
    //         userID +
    //         "&SDate=" +
    //         SDate +
    //         "&EDate=" +
    //         EDate
    //     );
    //     // const res = await axios.get( hostURL +  "Payroll/GetPendingAttendanceCorrectionByStaffID?userID=" + staffID + "&SDate=" + SDate + "&EDate=" + EDate);
    //     console.log(res, "pending");
    //     setpendingDashboardData(res.data);
    // };

    // const getApprovedData = async (SDate, EDate) => {
    //     const res = await apiService.commonGetCall(
    //         "Payroll/GetApprovedAttendanceCorrectionByStaffID?userID=" +
    //         userID +
    //         "&SDate=" +
    //         SDate +
    //         "&EDate=" +
    //         EDate
    //     );
    //     // const res = await axios.get( hostURL +"Payroll/GetApprovedAttendanceCorrectionByStaffID?userID=" + staffID +"&SDate=" + SDate + "&EDate=" + EDate  );
    //     console.log(res, "approved");
    //     setapprovedDashboardData(res.data);
    // };

    // const getRejectedData = async (SDate, EDate) => {
    //     const res = await apiService.commonGetCall(
    //         "Payroll/GetRejectedAttendanceCorrectionByStaffID?userID=" +
    //         userID +
    //         "&SDate=" +
    //         SDate +
    //         "&EDate=" +
    //         EDate
    //     );
    //     //  const res = await axios.get(hostURL + "Payroll/GetRejectedAttendanceCorrectionByStaffID?userID=" +staffID + "&SDate=" + SDate + "&EDate=" + EDate );
    //     console.log(res, "rejected");
    //     setrejectedDashboardData(res.data);
    // };

    const deleteAttendanceCorrection = (id) => {
        Swal.fire({
            title: "Are You Sure To Cancel?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await apiService.commonGetCall(
                    "Payroll/DeleteAttendanceCorrection?id=" + id
                );
                //  axios.get(hostURL + "Payroll/DeleteAttendanceCorrection?id=" + id);
                Swal.fire({
                    icon: "success",
                    titleText: "Cancelled Successfully",
                });
            }
            getPendingData();
        });
    };

    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-lg-3" style={{ float: "left" }}>
                    <Link
                        className={Styles.mainheader}
                        href="/Attendance/AttendanceCorrections"
                    >
                        Attendance Correction
                    </Link>
                </div>
                {roleID == 3 && (
                    <>
                        <div className="col-lg-3" style={{ marginLeft: "-60px" }}>
                            <Link
                                className={Styles.mainheader}
                                href="/Attendance/MyTeamAttendanceCorrection"
                            >
                                My Team Attendance Correction
                            </Link>
                        </div>
                    </>
                )}
            </div>


            <div
                className="card p-3 border-0 shadow-lg rounded-3 mt-4"
                style={{ marginLeft: "-8px" }}
            >
                <div className="row p-3">
                    <div className="col-lg-1">
                        <p>Filter By</p>
                    </div>

                    <div className="col-lg-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>

                    <div className="col-lg-4">
                        {roleID != 3 || (
                            <>
                                <div className="row">
                                    <div className="col-lg-5">
                                        <button className="button">Download</button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-lg-4">
                    <div className="btn-group">
                        <button
                            onClick={togglePending}
                            className={`toggleButton ${pending ? "focus" : ""}`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={toggleApproved}
                            className={`toggleButton ${approved ? "focus" : ""}`}
                        >
                            Approved
                        </button>
                        <button
                            onClick={toggleRejected}
                            className={`toggleButton ${rejected ? "focus" : ""}`}
                        >
                            Rejected
                        </button>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-lg-2 text-primary fs-6 fw-bold">
                    <h6>Showing Results</h6>
                </div>

                {/* {pending && roleID != "2" && (
                    <table className="table table-hover"
                        ref={tableRef}>
                        <thead className="bg-info text-white">
                            <tr>
                                <th>Date</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Comments</th>

                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Array.isArray(pendingDashboardData) &&
                                pendingDashboardData.length > 0 && (
                                    <>
                                        {pendingDashboardData
                                            .filter(data => {
                                                if ((data.startTime.toLowerCase().includes(keyword)) || (data.date.toLowerCase().includes(keyword)) || (data.endTime.toLowerCase().includes(keyword))) {
                                                    return data;
                                                }
                                            })
                                            .map((data) => {
                                                return (
                                                    <tr key={data.id}>
                                                        <td>{data.date}</td>
                                                        <td>{data.startTime}</td>
                                                        <td>{data.endTime}</td>
                                                        <td>{data.comments}</td>

                                                        <td>
                                                        <button sName="edit-btn" >
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={deleteAttendanceCorrection.bind(
                                                                    this,
                                                                    data.id
                                                                )}
                                                                className="edit-btn"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </>
                                )}
                        </tbody>
                    </table>
                )} */}

                {pending && roleID == "3" && (
                    <table className="table table-hover" ref={tableRef}>
                        <thead className="bg-info text-white">
                            <tr>
                                <th>Employee Name</th>
                                <th>Date</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th colSpan={2}>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Array.isArray(managerPending) && managerPending.length > 0 && (
                                <>
                                    {managerPending.map((data) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>{data.staffname}</td>
                                                <td>{data.attendanceDate}</td>
                                                <td>{data.startTime}</td>
                                                <td>{data.endTime}</td>
                                                <td>
                                                    <button
                                                        onClick={approveAttedanceCorrection.bind(
                                                            this,
                                                            data
                                                        )}
                                                        className="edit-btn"
                                                    >
                                                        Accept
                                                    </button>&nbsp;
                                                    <button className="edit-btn">Reject</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </>
                            )}
                        </tbody>
                    </table>
                )}

                {approved && roleID != "3" && (
                    <table className="table table-hover" ref={tableRef}>
                        <thead className="bg-info text-white">
                            <tr>
                                <th>Date</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Comments</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Array.isArray(approvedDashboardData) &&
                                approvedDashboardData.length > 0 && (
                                    <>
                                        {approvedDashboardData.map((data) => {
                                            return (
                                                <tr key={data.id}>
                                                    <td>{data.date}</td>
                                                    <td>{data.startTime}</td>
                                                    <td>{data.endTime}</td>
                                                    <td>{data.Comments}</td>
                                                    <td>{data.status}</td>
                                                </tr>
                                            );
                                        })}
                                    </>
                                )}
                        </tbody>
                    </table>
                )}

                {approved && roleID == "3" && (
                    <table className="table table-hover" ref={tableRef}>
                        <thead className="bg-info text-white">
                            <tr>
                                <th>Employee Name</th>
                                <th>Date</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Array.isArray(managerApproved) && managerApproved.length > 0 && (
                                <>
                                    {managerApproved.map((data) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>{data.date}</td>
                                                <td>{data.startTime}</td>
                                                <td>{data.endTime}</td>
                                                <td>{data.Comments}</td>
                                                <td>{data.status}</td>
                                            </tr>
                                        );
                                    })}
                                </>
                            )}
                        </tbody>
                    </table>
                )}

                {rejected && roleID != "2" && (
                    <table className="table table-hover" ref={tableRef}>
                        <thead className="bg-info text-white">
                            <tr>
                                <th>Date</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Reason</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Array.isArray(rejectedDashboardData) &&
                                rejectedDashboardData.length > 0 && (
                                    <>
                                        {rejectedDashboardData.map((data) => {
                                            return (
                                                <tr key={data.id}>
                                                    <td>{data.date}</td>
                                                    <td>{data.startTime}</td>
                                                    <td>{data.endTime}</td>
                                                    <td>{data.Comments}</td>
                                                    <td>{data.status}</td>
                                                </tr>
                                            );
                                        })}
                                    </>
                                )}
                        </tbody>
                    </table>
                )}

                {rejected && roleID == "2" && (
                    <table className="table table-hover" ref={tableRef}>
                        <thead className="bg-info text-white">
                            <tr>
                                <th>Employee Name</th>
                                <th>Date</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Array.isArray(managerRejected) && managerRejected.length > 0 && (
                                <>
                                    {managerRejected.map((data) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>{data.date}</td>
                                                <td>{data.startTime}</td>
                                                <td>{data.endTime}</td>
                                                <td>{data.Comments}</td>
                                                <td>{data.status}</td>
                                            </tr>
                                        );
                                    })}
                                </>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};
export default MyTeamAttendancecorrectiondashboard;
