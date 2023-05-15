import Link from "next/link";
import React from "react";
import { apiService } from "@/services/api.service";
import { useEffect, useState } from "react";
import Styles from "@/styles/attendancedetails.module.css";
import ReactPaginate from "react-paginate";

const AttendenceDetails = () => {
  const [Attendence, setAttendence] = useState([]);

  const [userID, setUserID] = useState();
  const [roleID, setRoleID] = useState();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const userid = sessionStorage.getItem("userID");
    const roleid = sessionStorage.getItem("roleID");
    setUserID(userid);
    setRoleID(roleid);
  }, []);

  useEffect(() => {
    if (userID) {
      const resu = getCurrentMonthDates();
      if (resu) {
        getAttendenceByID(resu.setStartDate, resu.setEndDate);
      }
    }
  }, [userID]);

  const PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(0);
  function handlePageClick({ selected: selectedPage }) {
      setCurrentPage(selectedPage)
  }
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(Attendence.length / PER_PAGE);


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

  // const filterData = (start, end) => {
  //   const filteredData = data.filter((item) => {
  //     return item.start_date >= start && item.end_date <= end;
  //   });
  //   return filteredData;
  // };

  const getStartDate = (selectedDate) => {
    setStartDate(selectedDate);
    setEndDate("");
  };

  const getEndDate = (selectedDate) => {
    setEndDate(selectedDate);
    return getDateBySelectedDate(selectedDate);
  };
  const getDateBySelectedDate = (endDatesss) => {
    return getAttendenceByID(startDate, endDatesss);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setData(filterData(start, end));
  // };

  const getAttendenceByID = async (SDate, EDate) => {
    if (userID) {
      const res = await apiService.commonGetCall(
        "HR/GetAttendanceByEmployeeID?userID=" +
          userID +
          "&SDate=" +
          SDate +
          "&EDate=" +
          EDate
      );
      // let res = await axios.get(hostURL + "HR/GetAttendanceByEmployeeID?userID=" + userID + "&SDate=" + SDate + "&EDate=" + EDate);
      setAttendence(res.data);
    }
  };
  return (
    <div>
      <div className="container">
        <div className="row mt-3">
          <div className="col-lg-3" style={{ marginLeft: "10px" }}>
            <Link
              className={Styles.header}
              href="/Attendance/AttendanceDetails"
            >
              My Attendance Details
            </Link>
          </div>
          {roleID == 3 && (
            <>
              <div className="col-lg-3" style={{ marginLeft: "-80px" }}>
                <Link
                  className="Heading active"
                  href="/Attendance/MyTeamAttendanceDetails"
                >
                  My Team Attendance Details
                </Link>
              </div>
            </>
          )}
          {roleID == 2 && (
            <>
              <div className="col-lg-3" style={{ marginLeft: "-80px" }}>
                <Link
                  className="Heading active"
                  href="/Attendance/CompanyAttendanceDetails"
                >
                  Company Attendance Details
                </Link>
              </div>
            </>
          )}
        </div>
        <div className={Styles.filter}>
          {/* <form onSubmit={handleSubmit}> */}
          <div className="card p-3  border-0 shadow-lg rounded-3 mt-4">
            <div className="row">
              <div className="col-lg-1">
                <p>Filter By</p>
              </div>
              <div className="col-lg-3">
                <p>Start Date</p>
                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => getStartDate(e.target.value)}
                />
              </div>

              <div className="col-lg-3">
                <p>End Date</p>
                <input
                  type="date"
                  className="form-control"
                  value={endDate || ""}
                  onChange={(e) => getEndDate(e.target.value)}
                />
              </div>

              <div className="col-lg-2">
                <br />
                <p></p>
                <button className="button" id="AddButton">
                  Download
                </button>
              </div>
            </div>
          </div>
          {/* </form> */}
        </div>

        <div className="row mt-4">
          <div className="col-lg-12">
            <div className="table-responsive">
              <table
                className="table table-striped table-bordered "
                style={{ marginLeft: "0px", width: "100%" }}
              >
                <thead className={"bg-info text-white "}>
                  <tr style={{ whiteSpace: "nowrap" }}>
                    <th>Date</th>
                    <th>Shift</th>
                    <th>Day Type </th>
                    <th>Expected InTime</th>
                    <th>Expected Out Time </th>
                    <th>Punch In Time </th>
                    <th>Punch Out Time </th>
                    <th>Work Hours(HH:MM) </th>
                    <th>Overtime</th>
                    <th>UnderTime </th>
                    <th>Late</th>
                    {/* <th>Work Hours(HH:MM) </th>
                    <th>UnderTime </th>
                    <th>Late </th> */}
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(Attendence) && Attendence.length > 0 && (
                    <>
                      {Attendence
                    .slice(offset, offset + PER_PAGE)
                      .map((data) => {
                        return (
                          <tr key={data.id}>
                            <td>{data.signinDate}</td>
                            <td>{data.signInType}</td>
                            <td>{data.signInWorkType}</td>
                            <td>{data.expectedIn}</td>
                            <td>{data.expectedOut}</td>
                            <td>{data.punchinip}</td>
                            <td>{data.expectedOutTime}</td>
                            <td>{data.punchOutTime}</td>
                            <td>{data.ot}</td>
                            <td>{data.undertime}</td>
                            <td>{data.latepunchin}</td>
                            {/* <td>{data.hr1}</td>
                        <td>{data.underTime}</td>
                        <td>{data.late}</td> */}
                            {/* <td>
                              <button className='edit-btn'>Cancel</button>
                            </td> */}
                          </tr>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
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

export default AttendenceDetails;
