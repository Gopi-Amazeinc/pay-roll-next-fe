// import Layout from 'Components/layout/layout.js';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
// import Styles from '../../styles/shiftdetails.module.css'
const Shiftdetails = () => {
  const [shiftDetails, setShiftDetails] = useState([]);
  let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
  let staffID;

  const getShiftDetails = async () => {
    staffID = sessionStorage.getItem("userID");
    const { data } = await axios.get(
      hostURL + "HR/GetStaffShiftDetailsByband?staffID=" + staffID
    );
    console.log(data);
    setShiftDetails(data);
  };
  useEffect(() => {
    getShiftDetails();
  }, []);
  return (
    <>
      <div className="row mt-3">
        <div className="col-lg-3 ">
          <Link href="/Attendance/shiftdetails" className="Heading active">
            {" "}
            My Weekly Shift
          </Link>
        </div>
        {/* <div className='col-lg-3'>
                    <Link href="/Attendance/MyTeamWeeklyShift" className='Heading active'> My Team Weekly Shift</Link>
                </div> */}
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
            <p>
              START DATE <span>*</span>
            </p>
            <input type="date" className="form-control form-control-sm m-o" />
          </div>
          <div className="col-lg-3">
            <p>
              END DATE <span>*</span>
            </p>
            <input type="date" className="form-control form-control-sm" />
          </div>
          <div className="col-lg-3 mt-4">
            <Link href="/Attendance/StaffShiftForm/new">
              <button className="button">Add Shift Details</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <table className="table table-striped mt-3">
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
            { Array.isArray(shiftDetails) && shiftDetails.length > 0 && (
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
