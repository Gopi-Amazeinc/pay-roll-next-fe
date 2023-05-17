// import Layout from 'Components/layout/layout.js';
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import { apiService } from "@/services/api.service";
import Styles from "@/styles/attendancedetails.module.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { DownloadTableExcel } from "react-export-table-to-excel";




// import Styles from '../../styles/shiftdetails.module.css'
const Shiftdetails = () => {

  const [pending, setPending] = useState(false);
  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);

  const roleid = sessionStorage.getItem("roleID");
  const [shiftDetails, setShiftDetails] = useState([]);
  let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  let staffID;
  const tableRef = useRef(null);
  const getShiftDetails = async () => {
    const userid = sessionStorage.getItem("userID");
    debugger
    const res = await apiService.commonGetCall("HR/GetStaffShiftDetailsByband?staffID=" + userid);
    console.log(res);
    setShiftDetails(res.data);
  };
  useEffect(() => {
    getShiftDetails();
  }, []);



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

  return (
    <>
      <div className="row mt-3"  >
        <div className="col-lg-3 " style={{ marginLeft: "15px" }}>
          <Link href="/Attendance/shiftdetails" className={Styles.mainheader}>
            {" "}
            My Weekly Shift
          </Link>
        </div>
        {roleid != 3 ||
          <div className='col-lg-3' style={{ marginLeft: "-120px" }}>
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

      <div className="card shadow-lg p-4 rounded-3 mt-4 text-start">
        <div className="row">
          <div className="col-lg-3">
            <p> <b>
              START DATE <span>*</span></b>
            </p>
            <input type="date" className="form-control form-control-sm m-o" />
          </div>
          <div className="col-lg-3">
            <p><b>
              END DATE <span>*</span></b>
            </p>
            <input type="date" className="form-control form-control-sm" />
          </div>
          <div className="col-lg-3 mt-4">
            <Link href="/Attendance/StaffShiftForm/new">
              <button className="button"><IoIosAddCircleOutline size={24} color={"white"} />  ADD SHIFT DETAILS</button>
            </Link>
          </div>
          <div className="col-lg-2 mt-4">
            <DownloadTableExcel
              filename="users table"
              sheet="users"
              currentTableRef={tableRef.current}
            > <button className="button"> Download</button></DownloadTableExcel>

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
      </div>
    </>
  );
};

export default Shiftdetails;
