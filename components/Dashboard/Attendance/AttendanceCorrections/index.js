import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";

const Attendancecorrectiondashboard = () => {
  const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  const [pending, setPending] = useState(false);
  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);

  const [pendingDashboardData, setpendingDashboardData] = useState([]);
  const [approvedDashboardData, setapprovedDashboardData] = useState([]);
  const [rejectedDashboardData, setrejectedDashboardData] = useState([]);

  const [managerPending, getManagerPending] = useState([]);
  const [managerApproved, getManagerApproved] = useState([]);
  const [managerRejected, getManagerRejected] = useState([]);

  const [SDate, setSDate] = useState("");
  const [EDate, setEDate] = useState("");

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
  };

  const getPendingManager = async (SDate, EDate) => {
    const res = await axios.get(
      hostURL +
      "Payroll/GetPendingAttendanceCorrectionBySupervisor?userID=" +
      20540 +
      "&SDate=" +
      SDate +
      "&EDate=" +
      EDate
    );
    console.log(res, "manager pending");
    getManagerPending(res.data);
  }

  const getApprovedManager = async (SDate, EDate) => {
    const res = await axios.get(
      hostURL +
      "Payroll/GetApprovedAttendanceCorrectionBySupervisor?userID=" +
      20540 +
      "&SDate=" +
      SDate +
      "&EDate=" +
      EDate
    );
    console.log(res, "manager Approved");
    getManagerApproved(res.data);
  }

  const getRejectedManager = async (SDate, EDate) => {
    const res = await axios.get(
      hostURL +
      "Payroll/GetApprovedAttendanceCorrectionBySupervisor?userID=" +
      20540 +
      "&SDate=" +
      SDate +
      "&EDate=" +
      EDate
    );
    console.log(res, "manager Rejected");
    getManagerRejected(res.data);
  }

  const approve = (data) => {
    Swal.fire({
      title: 'Confirm To Approve?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Approve it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.get(hostURL + "Payroll/ApproveAttedanceCoorection?id=" + data.id + "&UserID=" + data.staffID + "&SigninDate=" + SDate + "&SignoutDate=" + EDate)
        Swal.fire({
          icon: "success",
          titleText: "Approved Successfully"
        })
        getPendingManager(SDate, EDate);
      }
    })
  }

  function formateDate(datetoformat) {
    const day = datetoformat.getDate().toString().padStart(2, "0");
    const month = (datetoformat.getMonth() + 1).toString().padStart(2, "0");
    const year = datetoformat.getFullYear().toString();
    return `${year}-${month}-${day}`;
  }

  async function getPendingData(SDate, EDate) {
    let staffID = sessionStorage.getItem("userID");
    const res = await axios.get(
      hostURL +
      "Payroll/GetPendingAttendanceCorrectionByStaffID?userID=" +
      staffID +
      "&SDate=" +
      SDate +
      "&EDate=" +
      EDate
    );
    console.log(res, "pending");
    setpendingDashboardData(res.data);
  }


  async function getApprovedData(SDate, EDate) {
    let staffID = sessionStorage.getItem("userID");
    const res = await axios.get(
      hostURL +
      "Payroll/GetApprovedAttendanceCorrectionByStaffID?userID=" +
      staffID +
      "&SDate=" +
      SDate +
      "&EDate=" +
      EDate
    );
    console.log(res, "approved");
    setapprovedDashboardData(res.data);
  }


  async function getRejectedData(SDate, EDate) {
    let staffID = sessionStorage.getItem("userID");
    const res = await axios.get(
      hostURL +
      "Payroll/GetRejectedAttendanceCorrectionByStaffID?userID=" +
      staffID +
      "&SDate=" +
      SDate +
      "&EDate=" +
      EDate
    );
    console.log(res, "rejected");
    setrejectedDashboardData(res.data);
  }



  useEffect(() => {

    let Newtoday = new Date();
    let firstDayOfMonth = new Date(
      Newtoday.getFullYear(),
      Newtoday.getMonth(),

    );
    let fromDate = formateDate(firstDayOfMonth);

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const lastDay = new Date(year, month, 0).getDate();
    const EndDate = `${year}-${month.toString().padStart(2, '0')}-${lastDay.toString().padStart(2, '0')}`;

    console.log(EndDate);

    setSDate(fromDate);
    setEDate(EndDate);

    getPendingData(fromDate, EndDate);
    getApprovedData(fromDate, EndDate);
    getRejectedData(fromDate, EndDate);
    getPendingManager(fromDate, EndDate);
    getApprovedManager(fromDate, EndDate);
    getRejectedManager(fromDate, EndDate);
  }, [1]);

  const Delete = (id) => {
    Swal.fire({
      title: "Are You Sure To Cancel?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.get(hostURL + "Payroll/DeleteAttendanceCorrection?id=" + id);
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
      <h3 className="text-primary fs-5 mt-3">Attendance Correction </h3>
      <div className="card p-3 border-0 shadow-lg rounded-3 mt-4">
        <div className="row p-3">
          <div className="col-lg-1">
            <p>Filter By</p>
          </div>

          <div className="col-lg-5">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
            />
          </div>

          <div className="col-lg-4">
            {
              sessionStorage.getItem("roleID") != "2" && (
                <Link href="/Attendance/AttendanceCorrections/attendancecorrectionform">
                  <button className="button">
                    Add Attendance Correction
                  </button>
                </Link>
              )
            }
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-4">
          <div className="btn-group">
            <button onClick={togglePending} className="toggleButton">
              Pending
            </button>
            <button onClick={toggleApproved} className="toggleButton">
              Approved
            </button>
            <button onClick={toggleRejected} className="toggleButton">
              Rejected
            </button>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-2 text-primary fs-6 fw-bold">
          <h6>Showing Results</h6>
        </div>
        {pending && sessionStorage.getItem("roleID") != "2" && (
          <table className="table table-hover">
            <thead className="bg-info text-white">
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
              {pendingDashboardData.map((data) => {
                return (
                  <tr key={data.id}>
                    <td>{data.date}</td>
                    <td>{data.startTime}</td>
                    <td>{data.endTime}</td>
                    <td>{data.Comments}</td>
                    <td>{data.status}</td>
                    <td>
                      <button
                        onClick={Delete.bind(this, data.id)}
                        className="edit-btn"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {pending && sessionStorage.getItem("roleID") == "2" && (
          <table className="table table-hover">
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
              {
                managerPending.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td>{data.staffname}</td>
                      <td>{data.date}</td>
                      <td>{data.startTime}</td>
                      <td>{data.endTime}</td>
                      <td>
                        <button onClick={approve.bind(this, data)} className="edit-btn">Accept</button>
                        <button className="edit-btn">Reject</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        )}

        {approved && sessionStorage.getItem("roleID") != "2" && (
          <table className="table table-hover">
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
            </tbody>
          </table>
        )}

        {approved && sessionStorage.getItem("roleID") == "2" && (
          <table className="table table-hover">
            <thead className="bg-info text-white">
              <tr>
                <th>Employee Name</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>

            <tbody>
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
            </tbody>
          </table>
        )}

        {rejected && sessionStorage.getItem("roleID") != "2" && (
          <table className="table table-hover">
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
            </tbody>
          </table>
        )}

        {rejected && sessionStorage.getItem("roleID") == "2" && (
          <table className="table table-hover">
            <thead className="bg-info text-white">
              <tr>
                <th>Employee Name</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>

            <tbody>
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
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
export default Attendancecorrectiondashboard;
