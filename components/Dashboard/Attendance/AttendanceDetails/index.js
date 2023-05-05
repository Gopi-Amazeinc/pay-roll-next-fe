import Link from "next/link";
import React from "react";

import { useEffect, useState } from "react";
import axios from "axios";

const AttendenceDetails = () => {
  const [Attendence, setAttendence] = useState([]);
  const [userID, setUserID] = useState();
  const [roleID, setRoleID] = useState();
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
      const userID = 10348;
      const SDate = "2023-10-10";
      const EDate = "2023-11-11";
      if (userID) {
        let res = await axios.get(
          hostURL +
            "HR/GetAttendanceByEmployeeID?userID=" +
            userID +
            "&SDate=" +
            SDate +
            "&EDate=" +
            EDate
        );
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
          <div className="col-lg-3 text-end">
            <Link
              className="Heading active"
              href="/Attendance/AttendanceDetails"
            >
              My Attendance Details
            </Link>
          </div>
          {roleID== 9 && (
            <>
          <div className="col-lg-3">
            <Link
              className="Heading active"
              href="/Attendance/MyTeamAttendanceDetails"
            >
              Company Attendance Details
            </Link>
          </div>
          </>
          )}
        </div>

        <div className="card p-3 border-0 shadow-lg rounded-3 mt-4">
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
              <button className="btn btn-primary" id="AddButton">
                Download
              </button>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-12">
            <div className="table-responsive">
              <table className="table table-striped table-bordered ">
                <thead className={"bg-info text-white "}>
                  <tr style={{ whiteSpace: "nowrap" }}>
                    <th>Date</th>
                    <th>SignIn Type</th>
                    <th>SignIn Work type</th>
                    <th>Expected InTime</th>
                    <th>Punch InTime</th>
                    <th>Punch InLocation/IP Address</th>
                    <th>Expected OutTime</th>
                    <th>Punch Out Time</th>
                    <th>Punch Out Location/IP Address</th>
                    <th>Sign Out Type</th>
                    <th>Punch Out Work type</th>
                    <th>Work Hours(HH:MM) </th>
                    <th>UnderTime </th>
                    <th>Late </th>
                  </tr>
                </thead>
                <tbody>
                  {Attendence.map((data) => {
                    return (
                      <tr key={data.id}>
                        <td>{data.date}</td>
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
                        <td>{data.hr1}</td>
                        <td>{data.underTime}</td>
                        <td>{data.late}</td>
                        {/* <td>
                              <button className='edit-btn'>Cancel</button>
                            </td> */}
                      </tr>
                    );
                  })}
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
