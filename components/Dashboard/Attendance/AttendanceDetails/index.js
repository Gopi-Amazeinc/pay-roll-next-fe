import Link from "next/link";
import React from "react";
import { apiService } from "@/services/api.service";
import { useEffect, useState } from "react";
import axios from "axios";
import Styles from "..//..//..//..//styles/attendancedetails.module.css"

const AttendenceDetails = () => {
  const [Attendence, setAttendence] = useState([]);
  const [userID, setUserID] = useState();
  const [roleID, setRoleID] = useState();
  let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  // function Attendance() {

  useEffect(() => {
    const userid = sessionStorage.getItem("userID");
    const roleid = sessionStorage.getItem("roleID");
    setUserID(userid);
    setRoleID(roleid);
    async function getAttendenceByID() {
      debugger;
      // const userid = sessionStorage.getItem("userID");
      const roleid = sessionStorage.getItem("roleID");
      setRoleID(roleid)
      const userID = sessionStorage.userID;
      const SDate = "2000-10-10";
      const EDate = "2025-11-11";
      if (userID) {
        const res = await apiService.commonGetCall("HR/GetAttendanceByEmployeeID?userID=" + userID + "&SDate=" + SDate + "&EDate=" + EDate);
        // let res = await axios.get(hostURL + "HR/GetAttendanceByEmployeeID?userID=" + userID + "&SDate=" + SDate + "&EDate=" + EDate);
        setAttendence(res.data);
      }
    }
    getAttendenceByID();
  }, []);
  // }

  return (
    <div>
      <div className="container">
        <div className="row mt-3">
          <div className="col-lg-3" style={{marginLeft:"10px"}}>
            <Link className={Styles.header} href="/Attendance/AttendanceDetails"  >   My Attendance Details  </Link>
          </div>
          {roleID == 3 && (
            <>
              <div className="col-lg-3" style={{ marginLeft: '-80px' }}>
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
              <div className="col-lg-3" style={{ marginLeft: '-80px' }}>
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
          <div className="card p-3  border-0 shadow-lg rounded-3 mt-4">
            <div className="row">
              <div className="col-lg-1">
                <p>Filter By</p>
              </div>
              <div className="col-lg-3">
                <p>Start Date</p>
                <input type="date" className="form-control" />
              </div>

              <div className="col-lg-3">
                <p>End Date</p>
                <input type="date" className="form-control" />
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
        </div>

        <div className="row mt-4">
          <div className="col-lg-12">
            <div className="table-responsive">
              <table className="table table-striped table-bordered " style={{ marginLeft: "0px", width: "100%" }}>
                <thead className={"bg-info text-white "}>
                  <tr style={{ whiteSpace: "nowrap" }}>
                    <th>Date</th>
                    <th>Shift</th>
                    <th>Day Type	</th>
                    <th>Expected InTime</th>
                    <th>Expected Out Time	</th>
                    <th>Punch In Time	</th>
                    <th>Punch Out Time	</th>
                    <th>Work Hours(HH:MM)	</th>
                    <th>Overtime</th>
                    <th>UnderTime	</th>
                    <th>Late</th>
                    {/* <th>Work Hours(HH:MM) </th>
                    <th>UnderTime </th>
                    <th>Late </th> */}
                  </tr>

                </thead>
                <tbody>
                  {Array.isArray(Attendence) && Attendence.length > 0 && (
                    <>
                      {Attendence.map((data) => {
                        return (
                          <tr key={data.id}>
                            <td>{data.signinDate}</td>
                            <td>{data.signInType}</td>
                            <td>{data.signInWorkType}</td>
                            <td>{data.expectedInTime}</td>
                            <td>{data.punchInTime}</td>
                            <td>{data.punchinip}</td>
                            <td>{data.expectedOutTime}</td>
                            <td>{data.punchOutTime}</td>
                            <td>{data.punchoutip}</td>
                            <td>{data.signOutType}</td>
                            <td>{data.punchOutWorkType}</td>
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
      </div>
    </div>
  );
};

export default AttendenceDetails;
