import Link from "next/link";
import React from "react";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useRef } from 'react';
import axios from "axios";
import Styles from "@/styles/attendancedetails.module.css";
import { apiService } from "@/services/api.service";
import ReactPaginate from "react-paginate";
import { DownloadTableExcel } from "react-export-table-to-excel";

const MyTeamAttendence = () => {
  const staffDetailsRef = useRef(null);
  const tableRef = useRef(null);
  const [MyTeamAttendence, setMyTeamAttendence] = useState([]);

  const [userID, setUserID] = useState();
  const [roleID, setRoleID] = useState();

  const [StaffData, setStaffData] = useState();
  const [selctedStaffdata, setselctedStaffdata] = useState();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const userid = sessionStorage.getItem("userID");
    const roleid = sessionStorage.getItem("roleID");
    setUserID(userid);
    setRoleID(roleid);

    // const getAttendenceByID = async () => {
    //     const Supervisor = 20540;
    //     const SDate = "2000-10-10";
    //     const EDate = "2025-11-11";
    //     if (userid) {
    //         const res = await apiService.commonGetCall("HR/GetAttendanceByManagerID?Supervisor=" + Supervisor + '&SDate=' + SDate + '&EDate=' + EDate);
    //         setMyTeamAttendence(res.data);
    //     }
    // }
    // getAttendenceByID();
  }, []);

  // Gopi's Code => tried for onchnage function
  useEffect(async () => {
    await apiService.commonGetCall("Payrool/GetStaff").then((staffData) => {// check the URL OF THE API ONCE GIVEN
      staffDetailsRef.current = staffData.filter((x) =>
        x.data.id = userID
      )
    })
    setStaffData(staffDetailsRef.current)
  }, []);

  // Gopi's code end's

  useEffect(() => {
    if (userID) {
      const resu = getCurrentMonthDates();
      if (resu) {
        getAttendenceByID(20540, resu.setStartDate, resu.setEndDate);
      }
    }
  }, [userID]);

  const PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(0);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(MyTeamAttendence.length / PER_PAGE);

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

  const getStartDate = (selectedDate) => {
    setStartDate(selectedDate);
    setEndDate("");
  };

  const getEndDate = (selectedDate) => {
    setEndDate(selectedDate);
    return getDateBySelectedDate(selectedDate);
  };
  const getDateBySelectedDate = (endDatesss) => {
    return getAttendenceByID(20540, startDate, endDatesss);
  };

  const getAttendenceByID = async (Supervisor, SDate, EDate) => {
    if (userID) {
      const res = await apiService.commonGetCall(
        "HR/GetAttendanceByManagerID?Supervisor=" +
        Supervisor +
        "&SDate=" +
        SDate +
        "&EDate=" +
        EDate
      );
      setMyTeamAttendence(res.data);
    }
  };

  const handleStaffChange = (selectedStaff) => {
    setselctedStaffdata(selectedStaff)
  }

  return (
    <div>
      <div className="container">
        <div className="row mt-3">
          <div className="col-lg-3" style={{ marginLeft: "15px" }}>
            <Link
              className={Styles.mainheader}
              href="/Attendance/AttendanceDetails"
            >
              My Attendence Details
            </Link>
          </div>
          <div className="col-lg-4" style={{ marginLeft: "-30px" }}>
            <Link
              className={Styles.mainheader}
              href="/Attendance/MyTeamAttendanceDetails"
            >
              My Team Attendance Details
            </Link>
          </div>
        </div>

        <div className="card p-3 border-0 shadow-lg rounded-3 mt-4">
          <div className="row">
            <div className="col-lg-1">
              <p className={Styles.filterdate}>Filter By</p>
            </div>

            <div className="col-lg-2">
              <p className={Styles.filterdate}>Start Date</p>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => getStartDate(e.target.value)}
              />
            </div>

            <div className="col-lg-2">
              <p className={Styles.filterdate}>End Date</p>
              <input type="date" className="form-control"
                value={endDate || ""}
                onChange={(e) => getEndDate(e.target.value)}
              />
            </div>

            <div className="col-lg-2">
              <p className={Styles.filterdate}>
                Staff<i className="text-danger">*</i>
              </p>
              <select className="form-select" onChange={(e) => handleStaffChange(e.target.value)}>
                <option>Select Staff</option>
                {staffDetailsRef.current.map((data, index) => {
                  return (
                    <option value={data.id} key={index}>
                      {data.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="col-lg-2">
              <p className={Styles.filterdate}>
                Search<i className="text-danger">*</i>
              </p>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
            </div>

            <div className="col-lg-2">
              <button className="button">Upload</button>
              <br />
              <p></p>
              <DownloadTableExcel
                filename="users table"
                sheet="users"
                currentTableRef={tableRef.current}
              >
                <button className="button">Export To Excel</button>
              </DownloadTableExcel>
            </div>
          </div>
        </div>
        <br />
        <table
          className="table table-hover"
          style={{ marginLeft: "0px" }}
          ref={tableRef}
        >
          <thead className="bg-info text-white ">
            <tr style={{ whiteSpace: "nowrap" }}>
              <th>Date</th>
              <th>Staff Name</th>
              <th>Shift</th>
              <th>Day Type </th>
              <th>Expected in Time</th>
              <th>Expected Out Time</th>
              <th>Punch in Time</th>
              <th>Punch Out Time </th>
              <th>Work Hours(HH:MM) </th>
              <th>Overtime</th>
              <th>Late</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(MyTeamAttendence) && MyTeamAttendence.length > 0 && (
              <>
                {MyTeamAttendence.slice(offset, offset + PER_PAGE).map(
                  (data) => {
                    return (
                      <tr key={data.id}>
                        <td>{data.date}</td>
                        <td>{data.staffname1}</td>
                        <td>{data.position}</td>
                        <td>{data.department}</td>
                        <td>{data.signInType}</td>
                        <td>{data.expectedInTime}</td>
                        <td>{data.punchInTime}</td>
                        <td>{data.punchinip}</td>
                        <td>{data.punchedInForm}</td>
                        <td>{data.signInType}</td>
                        <td>{data.expectedOutTime}</td>

                        {/* <td>
                              <button className='edit-btn'>Cancel</button>
                            </td> */}
                      </tr>
                    );
                  }
                )}
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
      </div>
    </div>
  );
};

export default MyTeamAttendence;
