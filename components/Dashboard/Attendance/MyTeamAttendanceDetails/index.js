import Link from 'next/link';
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Styles from "@/styles/attendancedetails.module.css";
import { apiService } from "@/services/api.service";

const MyTeamAttendence = () => {
    const [MyTeamAttendence, setMyTeamAttendence] = useState([]);
    const [userID, setUserID] = useState();




    useEffect(() => {
        async function getAttendenceByID() {
            debugger
            const userid = sessionStorage.getItem("userID");
            const Supervisor = 20540;
            const SDate = "2000-10-10";
            const EDate = "2025-11-11";
            if (userid) {
                const res = await apiService.commonGetCall("HR/GetAttendanceByManagerID?Supervisor=" + Supervisor + '&SDate=' + SDate + '&EDate=' + EDate);
                setMyTeamAttendence(res.data);
            }
        }
        getAttendenceByID();
    }, []);



    return (
        <div>
            <div className='container'>
                <div className='row mt-3'>
                    <div className='col-lg-3' style={{ marginLeft: "15px" }}>
                        <Link className={Styles.mainheader} href="/Attendance/AttendanceDetails">My Attendence Details</Link>
                    </div>
                    <div className='col-lg-4' style={{ marginLeft: "-30px" }}>  
                        <Link className={Styles.mainheader} href="/Attendance/MyTeamAttendanceDetails">My Team Attendance Details</Link>
                    </div>
                </div>


                <div className='card p-3 border-0 shadow-lg rounded-3 mt-4'>
                    <div className='row'>
                        <div className='col-lg-1'>
                            <p>Filter By</p>
                        </div>

                        <div className='col-lg-2'>
                            <p>Start Date</p>
                            <input type="date" className='form-control' />
                        </div>

                        <div className='col-lg-2'>
                            <p>End Date</p>
                            <input type="date" className='form-control' />
                        </div>

                        <div className='col-lg-2'>
                            <p>Staff<i className='text-danger'>*</i></p>
                            <select className='form-select'>
                                <option>Select Staff</option>
                            </select>
                        </div>

                        <div className='col-lg-2'>
                            <p>Search<i className='text-danger'>*</i></p>
                            <input type="text" className='form-control' placeholder='Search' />
                        </div>

                        <div className='col-lg-3'>
                            <button className='button'>Upload</button><br /><p></p>
                            <button className='button'>Export To Excel</button>
                        </div>
                    </div>
                </div>

                <table className='table table-hover mt-2 ' style={{ marginLeft: "13px" }} >
                    <thead className='bg-info text-white '>
                        <tr style={{ whiteSpace: 'nowrap' }}>
                            <th >Date</th>
                            <th>Staff Name</th>
                            <th>Shift</th>
                            <th>Day Type	</th>
                            <th>Expected in Time</th>
                            <th>Expected Out Time</th>
                            <th>Punch in Time</th>
                            <th>Punch Out Time	</th>
                            <th >Work Hours(HH:MM)	</th>
                            <th>Overtime</th>
                            <th>Late</th>

                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(MyTeamAttendence) && MyTeamAttendence.length > 0 && (
                            <>
                                {
                                    MyTeamAttendence.map((data) => {
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
                                        )
                                    })
                                }
                            </>
                         )} 
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MyTeamAttendence;
