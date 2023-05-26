// import Layout from 'Components/layout/layout.js';
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import { apiService } from "@/services/api.service";
import Styles from "@/styles/shiftdetails.module.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { DownloadTableExcel } from "react-export-table-to-excel";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";



// import Styles from '../../styles/shiftdetails.module.css'
const Shiftdetails = () => {

  // const [pending, setPending] = useState(false);
  // const [approved, setApproved] = useState(false);
  // const [rejected, setRejected] = useState(false);

  const userid = sessionStorage.getItem("userID");
  const roleID = sessionStorage.getItem("roleID");

  const roleid = sessionStorage.getItem("roleID");
  const [shiftDetails, setShiftDetails] = useState([]);
  const [approvedshiftDetails, setapprovedshiftDetails] = useState([]);
  const [rejectedshiftDetails, setrejectedshiftDetails] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [count, setcount] = useState(0);

  let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  let staffID;
  const tableRef = useRef(null);


  useEffect(() => {
    getShiftDetails();
    // getapprovedshiftDetails();
    // getrejectedshiftDetails();
  }, []);


  useEffect(() => {
    if (userid) {
      const resu = getCurrentMonthDates();
      if (resu) {
        getShiftDetails(resu.setStartDate, resu.setEndDate);
      }
    }
  }, [userid]);


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
    return dateValidation(selectedDate);
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
    return getShiftBySlectedDate(startDate, endDatesss);
  };

  const getShiftBySlectedDate = async (Sdate, Edate) => {
    debugger
    const datesss = shiftDetails.filter((item) => {
      return item.shiftDate == Sdate && item.endDate == Edate;
    });
    return datesss
  }
  const getShiftDetails = async () => {
    const userid = sessionStorage.getItem("userID");
    debugger
    const res = await apiService.commonGetCall("HR/GetStaffShiftDetailsByband?staffID=" + userid);
    console.log(res);
    setShiftDetails(res.data);
    setcount(res.data.length);

    // https://103.12.1.103/PayrollDemoAPI/Master/GetStaffShiftDetails
  };


  const PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(0);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage)
  }
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(shiftDetails.length / PER_PAGE);



  //   const getapprovedshiftDetails = async () => {
  //     const userid = sessionStorage.getItem("userID");
  //     debugger
  //     const res = await apiService.commonGetCall("Payroll/ApproveStaffShiftDetails?staffID=" + userid);
  //     console.log(res);
  //     setShiftDetails(res.data);
  //   };
  // useEffect(() => {
  //   setapprovedshiftDetails();
  // }, []);


  // const getrejectedshiftDetails = async () => {
  //   const userid = sessionStorage.getItem("userID");
  //   debugger
  //   const res = await apiService.commonGetCall("Payroll/RejectStaffShiftDetails?staffID=" + userid);
  //   console.log(res);
  //   setrejectedshiftDetails(res.data);
  // };
  // useEffect(() => {
  //   getrejectedshiftDetails();
  // }, []);

  // const togglePending = () => {
  //   setPending(true);
  //   setRejected(false);
  //   setApproved(false);

  // };

  // const toggleApproved = () => {
  //   setApproved(true);
  //   setPending(false);
  //   setRejected(false);

  // };

  // const toggleRejected = () => {
  //   setRejected(true);
  //   setApproved(false);
  //   setPending(false);

  // };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3">
          <br />
          <Link href="/Attendance/ShiftDetails" className={Styles.mainheader}>
            My Weekly Shift
          </Link>
          <div className="line-border" style={{
            border: "1px solid #2f87cc",
            bordertopleftradius: "51px",
            bordertoprightradius: "51px",
            margintop: "0px",
            width: "51%"
          }}></div>
        </div>
        <div className="col-lg-3" style={{ marginLeft: "-30px" }} >
          <br />
          {roleid != 3 ||
            <Link href="/Attendance/MyTeamWeeklyShift" className={Styles.mainheader}> My Team Weekly Shift
            </Link>
          }
          {roleid != 2 ||
            <Link href="/Attendance/CompanyShiftDetails" className={Styles.mainheader}> Company Weekly Shift</Link>
          }
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className={Styles.filter}>
            <div className="card p-3  border-0 shadow-lg rounded-3 mt-4">
              <div className="row">
                <div className="col-lg-3">
                  <p className={Styles.filterdate}>
                    START DATE <span style={{ color: "red" }}>*</span>
                  </p>
                  <input type="date" className="form-control form-control-sm m-o"
                    // value={startDate}
                    onChange={(e) => getStartDate(e.target.value)} />
                </div>
                <div className="col-lg-3">
                  <p className={Styles.filterdate}>
                    END DATE <span style={{ color: "red" }}>*</span>
                  </p>
                  <input type="date" className="form-control form-control-sm"
                    // value={endDate || ""}
                    onChange={(e) => getEndDate(e.target.value)} />
                </div>

                <div className="col-lg-3">
                  <br />
                  {
                    sessionStorage.getItem("roleID") != 2 && (
                      <Link href="/Attendance/StaffShiftForm/new" className={Styles.adddetail}>
                        <button className="button" style={{ fontSize: "15px", marginTop: "7px" }}><IoIosAddCircleOutline size={18} color={"white"} />  Add Shift Details</button>
                      </Link>
                    )
                  }
                </div>
                <div className="col-lg-2">
                  <br />
                  {count > 0 ?
                    <>
                      <DownloadTableExcel
                        filename="users table"
                        sheet="users"
                        currentTableRef={tableRef.current}
                      > <button className="button" style={{ marginTop: "7px" }} > Download</button></DownloadTableExcel>

                    </>
                    : null}
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-12">
          <h6 style={{ color: "#3247d5" }}>Showing {count} Results</h6>
          <table className="table" style={{ width: "99%" }} ref={tableRef}>
            <thead>
              <tr className="bg-info text-white">
                <th>Start Date</th>
                <th>End Time</th>
                <th>Shift Name</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(shiftDetails) && shiftDetails.length > 0 && (
                <>
                  {shiftDetails.slice(offset, offset + PER_PAGE).map((data) => {
                    return (
                      <tr key={data.id}>
                        <td>{data.shiftDate}</td>
                        <td>{data.endDate}</td>
                        <td>{data.formattedShiftName}</td>
                        <td>{data.startTime}</td>
                        <td>{data.endTime}</td>
                        <td>{data.status}</td>
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
        </div>
      </div>
    </div>
  );
};

export default Shiftdetails;
