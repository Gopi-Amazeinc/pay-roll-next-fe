import React from "react";
import Layout from "@/components/layout/layout";
import Styles from "../../../styles/LeaveReport.module.css";
import { useEffect, useState } from "react";
import Id from "@/pages/Requests/Compensationtimeout/[id]";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useRef } from "react";
import { apiService } from "@/services/api.service";

function Leavereport() {
  const [userID, setUserID] = useState();
  const [roleID, setRoleID] = useState();
  const [LeaveReport, setLeaveReport] = useState([]);
  const tableRef = useRef(null);

  //   const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

  var date = new Date();
  let Sdate = date.toISOString().slice(0, 10);
  var edate = new Date();
  let Edate = edate.toISOString().slice(0, 10);

  useEffect(() => {
    const userid = sessionStorage.getItem("userID");
    const roleid = sessionStorage.getItem("roleID");
    setUserID(userid);
    setRoleID(roleid);
  }, [1]);
  useEffect(() => {
    if (userID) {
      getLeaveReport();
    }
  }, [userID]);

  //   TODO:Type ID issue
  const getLeaveReport = async () => {
    let res = await apiService.commonGetCall(
      "Employee/GetStaffLeaves?ID=" +
        userID +
        "&Sdate=" +
        Sdate +
        "&Edate=" +
        Edate
    );
    setLeaveReport(res.data);
    console.log(res.data);
  };

  return (
    <>
      <Layout>
        <h4 style={{ color: "red" }}>Api Issue</h4>
        <br></br>
        <div>
          <h4>My Leaves Report</h4>
        </div>
        <br></br>

        <div className="shadow-lg p-3 mb-5 bg-body rounded">
          <div className="row">
            <div className="col-lg-3">
              <label><b>Start Date</b></label>
              <br />
              <input type="date" className="form-control" />
            </div>
            <div className="col-lg-3">
              <label><b>End Date</b></label>
              <br />
              <input type="date" className="form-control" />
            </div>
            <br />
            <div className="col-lg-4">
              <br></br>
              <DownloadTableExcel
                filename="Leave Report"
                sheet="users"
                currentTableRef={tableRef.current}
              >
                <button type="button" className="download-btn">
                  Download
                </button>
              </DownloadTableExcel>
            </div>
          </div>
        </div>

        <div className="row">
          <table className={Styles.commonTable}>
            <thead>
              <tr>
                <th>From Date</th>
                <th>To Date</th>
                <th>Leave Type</th>
                <th>Leave Reason</th>
                <th>Leave Days Count</th>
                <th>Stage & Status</th>
              </tr>
            </thead>
            <tbody>
              {LeaveReport.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{data.fromDate}</td>
                    <td>{data.toDate}</td>
                    <td>{data.leaveType}</td>
                    <td>{data.leaveReason}</td>
                    <td>{data.leaveDaysCount}</td>
                    <td>{data.stageAndStatus}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
}

export default Leavereport;
