import Link from 'next/link'
import React from 'react'
// import Layout from 'Components/layout/layout.js';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AttendenceDetails = () => {



  const [Attendence, setAttendence] = useState([]);


  useEffect(() => {
    async function getAttendenceByID() {
      const id = sessionStorage.getItem("id");
      if (id) {
        let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
        let res = await axios.get(hostURL + "HR/GetAttendanceByEmployeeID",
          {
            params: {
              userID: userID,
              SDate: SDate,
              EDate: EDate
            }
          });
        // let res = await axios.get(
        //   hostURL + "HR/GetAttendanceByEmployeeID?ID=" + id  // this Api is used for get the data by id  for updating exact value
        // );
        setAttendence(res.data)
        clearForm(res.data[0]);
      }
      // else {
      //   clearForm();
      // }
    }
    getAttendenceByID();
  }, []);

  return (

    <div>
      <h1 style={{ color: "red" }}>Data Binnding is Pending</h1>
      <div className='container'>
        <div className='row mt-3'>
          <h2>Yet to bind</h2>
          <div className='col-lg-3 text-end'>
            <Link className='Heading active' href="/Attendance/AttendanceDetails">My Attendance Details</Link>
          </div>
          <div className='col-lg-3'>
            <Link className='Heading active' href="/Attendance/MyTeamAttendanceDetails">Company Attendance Details</Link>
          </div>
        </div>

        <div className='card p-3 border-0 shadow-lg rounded-3 mt-4'>
          <div className='row'>
            <div className='col-lg-1'>
              <p>Filter By</p>
            </div>

            <div className='col-lg-3'>
              <p>Start Date</p>
              <input type="date" className='form-control' />
            </div>

            <div className='col-lg-3'>
              <p>End Date</p>
              <input type="date" className='form-control' />
            </div>

            <div className='col-lg-2'><br /><p></p>
              <button className='btn btn-primary' id='AddButton'>Download</button>
            </div>
          </div>
        </div>

        <div className='row mt-4'>
          <div className='col-lg-12'>
            <div className="table-responsive">
              <table className='table table-striped table-bordered '>
                <thead className={'bg-info text-white '}>
                  <tr>
                    <th style={{ whiteSpace: 'nowrap' }}>Date</th>
                    <th style={{ whiteSpace: 'nowrap' }}>SignIn Type</th>
                    <th style={{ whiteSpace: 'nowrap' }}>SignIn Work type</th>
                    <th style={{ whiteSpace: 'nowrap' }}>Expected InTime</th>
                    <th style={{ whiteSpace: 'nowrap' }}>Punch InTime</th>
                    <th style={{ whiteSpace: 'nowrap' }}>Punch InLocation/IP Address</th>
                    <th style={{ whiteSpace: 'nowrap' }}>Expected OutTime</th>
                    <th style={{ whiteSpace: 'nowrap' }}>Punch Out Time</th>
                    <th style={{ whiteSpace: 'nowrap' }}>Punch Out Location/IP Address</th>
                    <th style={{ whiteSpace: 'nowrap' }}>Sign Out Type</th>
                    <th style={{ whiteSpace: 'nowrap' }}>Punch Out Work type</th>
                    <th style={{ whiteSpace: 'nowrap' }}>Work Hours(HH:MM) </th>
                    <th style={{ whiteSpace: 'nowrap' }}>UnderTime </th>
                    <th style={{ whiteSpace: 'nowrap' }}>Late </th>
                  </tr>
                  <tbody>
                    {
                      Attendence.map((data) => {
                        return (
                          <tr key={data.id}>
                            <td>{data.date}</td>
                            <td>{data.signInType}</td>
                            <td>{data.signInWorkType}</td>
                            <td>{data.expectedInTime}</td>
                            <td>{data.punchInTime}</td>
                            <td>{data.punchInLocation / IPAddress}</td>
                            <td>{data.expectedOutTime}</td>
                            <td>{data.punchOutTime}</td>
                            <td>{data.punchOutLocation / IPAddress}</td>
                            <td>{data.signOutType}</td>
                            <td>{data.punchOutWorkType}</td>
                            <td>{data.workHours}</td>
                            <td>{data.underTime}</td>
                            <td>{data.late}</td>
                            <td>
                              <button className='edit-btn'>Cancel</button>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default AttendenceDetails