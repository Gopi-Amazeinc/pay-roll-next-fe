// import Layout from 'Components/layout/layout.js';
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import { apiService } from "@/services/api.service";
import Styles from "@/styles/shiftDetails.module.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { DownloadTableExcel } from "react-export-table-to-excel";




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

  let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  let staffID;
  const tableRef = useRef(null);


  useEffect(() => {
    if (userid) {
      const resu = getCurrentMonthDates();
      if (resu) {
        getShiftDetails(resu.setStartDate, resu.setEndDate);
      }
    }
  }, [userid]);


  useEffect(() => {
    getShiftDetails();
    // getapprovedshiftDetails();
    // getrejectedshiftDetails();
  }, []);


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
    return getShiftDetails(startDate, endDatesss);
  };

  const getShiftDetails = async (SDate, EDate) => {
    const userid = sessionStorage.getItem("userID");
    debugger
    const res = await apiService.commonGetCall("HR/GetStaffShiftDetailsByband?staffID=" + userid);
    console.log(res);
    setShiftDetails(res.data);
    // https://103.12.1.103/PayrollDemoAPI/Master/GetStaffShiftDetails
  };

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
    <>
      <div classname="cotainer-fluid">
        <div className="row"  >
          <div className="col-lg-3 mt-4 " >
            <Link href="/Attendance/shiftdetails" className={Styles.mainheader}>
              {" "}
              My Weekly Shift
            </Link>
          </div>
          {roleid != 3 ||
            <div className='col-lg-3 mt-4' style={{ marginLeft: "-10%" }}>
              <Link href="/Attendance/MyTeamWeeklyShift" className={Styles.mainheader}> My Team Weekly Shift</Link>
            </div>
          }
        </div>
        {/* <div className="row">
                <div className="col-lg-3">
                    <Link href="/Attendence/shiftdetails"> <h3></h3></Link>

                </div>
                <div className="col-lg-3">

                    <Link href="/Attendence/MyTeamWeeklyShift"> <h3> My Team Weekly Shift</h3></Link>
                </div>
            </div> */}
        <div className={Styles.filter}>
          <div className="card p-3  border-0 shadow-lg rounded-3 mt-4">
            <div className="row">
              <div className="col-lg-3">
                <p className={Styles.filterdate}>
                  START DATE <span style={{ color: "red" }}>*</span>
                </p>
                <input type="date" className="form-control form-control-sm m-o"
                  value={startDate}
                  onChange={(e) => getStartDate(e.target.value)} />
              </div>
              <div className="col-lg-3">
                <p className={Styles.filterdate}>
                  END DATE <span style={{ color: "red" }}>*</span>
                </p>
                <input type="date" className="form-control form-control-sm"
                  value={endDate || ""}
                  onChange={(e) => getEndDate(e.target.value)} />
              </div>

              <div className="col-lg-2">
                <br />
                <Link href="/Attendance/StaffShiftForm/new" className={Styles.adddetail}>
                  <button className="button" style={{ fontSize: "15px" }}><IoIosAddCircleOutline size={18} color={"white"} />  ADD SHIFT DETAILS</button>
                </Link>
              </div>
              <div className="col-lg-2">
                <br />
                <DownloadTableExcel
                  filename="users table"
                  sheet="users"
                  currentTableRef={tableRef.current}
                > <button className="button" > DOWNLOAD</button></DownloadTableExcel>

              </div>
            </div>
          </div>
        </div>
        {/* 
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
      </div> */}
        {/* {pending && roleID == "5" && (
        <table className="table table-striped mt-3" style={{ marginLeft: "22px", width: "98%" }} ref={tableRef}>
          <thead>
            <tr className="bg-info text-white">
              <th>START DATE</th>
              <th>END DATE</th>
              <th>SHIFT NAME</th>
              <th>START TIME</th>
              <th>END TIME</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(shiftDetails) && shiftDetails.length > 0 && (
              <>
                {shiftDetails.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td>{data.shiftDate}</td>
                      <td>{data.endDate}</td>
                      <td>{data.shiftName}</td>
                      <td>{data.startTime}</td>
                      <td>{data.endTime}</td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      )}

      {approved && roleID == "5" && (
        <table className="table table-striped mt-3" style={{ marginLeft: "22px", width: "98%" }} ref={tableRef}>
          <thead>
            <tr className="bg-info text-white">
              <th>START DATE</th>
              <th>END DATE</th>
              <th>SHIFT NAME</th>
              <th>START TIME</th>
              <th>END TIME</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(approvedshiftDetails) && approvedshiftDetails.length > 0 && (
              <>
                {approvedshiftDetails.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td>{data.shiftDate}</td>
                      <td>{data.endDate}</td>
                      <td>{data.shiftName}</td>
                      <td>{data.startTime}</td>
                      <td>{data.endTime}</td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      )}



      {rejected && roleID == "5" && (
        <table className="table table-striped mt-3" style={{ marginLeft: "22px", width: "98%" }} ref={tableRef}>
          <thead>
            <tr className="bg-info text-white">
              <th>START DATE</th>
              <th>END DATE</th>
              <th>SHIFT NAME</th>
              <th>START TIME</th>
              <th>END TIME</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(rejectedshiftDetails) && rejectedshiftDetails.length > 0 && (
              <>
                {rejectedshiftDetails.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td>{data.shiftDate}</td>
                      <td>{data.endDate}</td>
                      <td>{data.shiftName}</td>
                      <td>{data.startTime}</td>
                      <td>{data.endTime}</td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      )} */}

        <div className="row mt-3">
          <table className="table table-striped mt-3" style={{ marginLeft: "18px", width: "98%" }} ref={tableRef}>
            <thead>
              <tr className="bg-info text-white">
                <th>START DATE</th>
                <th>END DATE</th>
                <th>SHIFT NAME</th>
                <th>START TIME</th>
                <th>END TIME</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(shiftDetails) && shiftDetails.length > 0 && (
                <>
                  {shiftDetails.map((data) => {
                    return (
                      <tr key={data.id}>
                        <td>{data.shiftDate}</td>
                        <td>{data.endDate}</td>
                        <td>{data.shiftName}</td>
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
        </div>
      </div>
    </>
  );
};

export default Shiftdetails;
