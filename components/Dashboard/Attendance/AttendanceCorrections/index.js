import React from "react";
import { useState, useEffect } from "react";
import { useRef } from 'react';
import Link from "next/link";
import Swal from "sweetalert2";
import { apiService } from "@/services/api.service";
import Styles from "@/styles/attendancedetails.module.css";
import { useRouter } from "next/router";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { IoIosAddCircleOutline } from "react-icons/io";
import ReactPaginate from "react-paginate";


const Attendancecorrectiondashboard = () => {
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

  const [pendingcount, setpendingcount] = useState();
  const [rejectcount, setrejectcount] = useState();
  const [approvedcount, setapprovedcount] = useState();

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



  const PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(0);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage)
  }
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(pendingDashboardData.length / PER_PAGE);


  useEffect(() => {
    if (userID) {
      const resu = getCurrentMonthDates();
      if (resu) {
        getPendingData(resu.setStartDate, resu.setEndDate);
        getApprovedData(resu.setStartDate, resu.setEndDate);
        getRejectedData(resu.setStartDate, resu.setEndDate);
      }
    }
  }, [userID]);

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

  // const approveAttedanceCorrection = async (data) => {
  //   Swal.fire({
  //     title: "Confirm To Approve?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, Approve it!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       await apiService.commonGetCall(
  //         "Payroll/ApproveAttedanceCoorection?id=" +
  //         data.id +
  //         "&UserID=" +
  //         data.staffID +
  //         "&SigninDate=" +
  //         SDate +
  //         "&SignoutDate=" +
  //         EDate
  //       );
  //       Swal.fire({
  //         icon: "success",
  //         titleText: "Approved Successfully",
  //       });
  //       getPendingManager(SDate, EDate);
  //     }
  //   });
  // };

  const getPendingData = async (SDate, EDate) => {
    debugger;
    const res = await apiService.commonGetCall(
      "Payroll/GetPendingAttendanceCorrectionByStaffID?userID=" +
      userID +
      "&SDate=" +
      SDate +
      "&EDate=" +
      EDate
    );
    setpendingcount(res.data.length);
    // const res = await axios.get( hostURL +  "Payroll/GetPendingAttendanceCorrectionByStaffID?userID=" + staffID + "&SDate=" + SDate + "&EDate=" + EDate);
    console.log(res, "pending");
    setpendingDashboardData(res.data);
  };

  const getApprovedData = async (SDate, EDate) => {
    const res = await apiService.commonGetCall(
      "Payroll/GetApprovedAttendanceCorrectionByStaffID?userID=" +
      userID +
      "&SDate=" +
      SDate +
      "&EDate=" +
      EDate
    );
    setapprovedcount(res.data.length);
    // const res = await axios.get( hostURL +"Payroll/GetApprovedAttendanceCorrectionByStaffID?userID=" + staffID +"&SDate=" + SDate + "&EDate=" + EDate  );
    console.log(res, "approved");
    setapprovedDashboardData(res.data);
  };

  const getRejectedData = async (SDate, EDate) => {
    const res = await apiService.commonGetCall(
      "Payroll/GetRejectedAttendanceCorrectionByStaffID?userID=" +
      userID +
      "&SDate=" +
      SDate +
      "&EDate=" +
      EDate
    );
    setrejectcount(res.data.length);
    //  const res = await axios.get(hostURL + "Payroll/GetRejectedAttendanceCorrectionByStaffID?userID=" +staffID + "&SDate=" + SDate + "&EDate=" + EDate );
    console.log(res, "rejected");
    setrejectedDashboardData(res.data);
  };

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
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-lg-3" style={{ float: "left" }}>
          <Link
            className={Styles.mainheader}
            href="/Attendance/AttendanceCorrections"
          >
            Attendance Correction
          </Link>
          <div className="line-border"></div>
        </div>

        <div className="col-lg-3">
          {(roleID == 3) && (
            <>
              <Link
                className={Styles.mainheader}
                href="/Attendance/MyTeamAttendanceCorrection"
              >
                My Team Attendance Correction

              </Link>

            </>
          )}
        </div>
      </div>

      <br />
      <div className="card p-3 border-0 rounded-3">
        <div className="row p-3">
          <div className="col-lg-1">
            <p> <b>Filter By</b></p>
          </div>

          <div className="col-lg-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <div className="col-lg-5">
            {(roleID == 3 || roleID == 5 || roleID == 2) && (
              <div className="row">
                <div className="col-lg-7">
                  <Link href="/Attendance/AttendanceCorrections/attendancecorrectionform">
                    <button className="button">
                      <IoIosAddCircleOutline size={18} color={"white"} />  Add Attendance Correction
                    </button>
                  </Link>
                </div>


                <div className="col-lg-3">
                  <DownloadTableExcel
                    filename="Attendance table"
                    sheet="Attendance"
                    currentTableRef={tableRef.current}
                  >
                    <button className="button">Download</button>
                  </DownloadTableExcel>
                </div>

              </div>



            )}

            {/* {roleID != 3 || (
              <>
                <div className="row">
                  <div className="col-lg-4">
                    <button className="button">Download</button>
                  </div>
                </div>
              </>
            )} */}
          </div>
        </div>
      </div>
      <br />
      <div className="row ">
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
        <div className="col-lg-12">

          {pending && roleID != "4" && (

            <>
              <div className="col-lg-2 text-primary fs-6 fw-bold">

                <h6 style={{ color: "#3247d5" }}>Showing {pendingcount} Results</h6>
              </div>


              <table className="table"
                ref={tableRef}>
                <thead className="bg-info text-white">
                  <tr>
                    <th>Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Comments</th>
                    <th>Status</th>
                    {/* <th>Action</th> */}
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
                          .map((data, index) => {
                            return (
                              <tr key={index}>
                                <td>{data.date}</td>
                                <td>{data.startTime}</td>
                                <td>{data.endTime}</td>
                                <td>{data.comments}</td>
                                <td>{data.status}</td>
                                {/* <td>
                                  <button
                                    onClick={deleteAttendanceCorrection.bind(
                                      this,
                                      data.id
                                    )}
                                    className="edit-btn"
                                  >
                                    Cancel
                                  </button>
                                </td> */}
                              </tr>
                            );
                          })}
                      </>
                    )}
                </tbody>
              </table>
              <div className="mb-4 mt-4 text-center">
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination  justify-content-center"}
                  pageClassName={"page-item "}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  breakClassName={"page-item"}
                  breakLinkClassName={"page-link"}
                  activeClassName={"active primary"}
                />
              </div>
            </>
          )}

          {/* {pending && roleID == "2" && (
            <>
              <div className="col-lg-2 text-primary fs-6 fw-bold">
                <h6>Showing {pendingcount} Results</h6>
              </div>
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
                            <td>{data.date}</td>
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
                              </button>
                              <button className="edit-btn">Reject</button>
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
            </>
          )} */}

          {/* {approved && roleID != "2" && (
            <>
              <div className="col-lg-2 text-primary fs-6 fw-bold">
                <h6>Showing {approvedcount} Results</h6>
              </div>
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
            </>
          )} */}

          {approved && roleID != "4" && (
            <>
              <div className="col-lg-2 text-primary fs-6 fw-bold">
                <h6 style={{ color: "#3247d5" }}>Showing {approvedcount} Results</h6>
              </div>
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
            </>
          )}

          {rejected && roleID != "4" && (
            <>
              <div className="col-lg-2 text-primary fs-6 fw-bold">
                <h6>Showing {rejectcount} Results</h6>
              </div>
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
            </>
          )}

          {/* {rejected && (
            <>
              <div className="col-lg-2 text-primary fs-6 fw-bold">
                <h6 style={{ color: "#3247d5" }}>Showing {rejectcount} Results</h6>
              </div>
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
            </>
          )} */}
        </div>
      </div>
    </div>
  );
};
export default Attendancecorrectiondashboard;
