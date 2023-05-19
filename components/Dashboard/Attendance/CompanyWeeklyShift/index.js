import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react'
import Styles from "@/styles/shiftdetails.module.css";

const Index = () => {

    const [myTeamshiftDetails, setmyTeamshiftDetails] = useState([])
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    return (
        <>
            <div className='row'>
                <div className='col-lg-3'>
                    <br />
                    <Link href="/Attendance/ShiftDetails" className={Styles.mainheader}>  My Weekly Shift</Link>
                </div>
                <div className='col-lg-3' style={{ marginLeft: "-10%" }}>
                    <br />
                    <Link href="/Attendance/MyTeamWeeklyShift" className={Styles.mainheader}> Company Shift Details</Link>
                </div>
            </div>
            <div className='card shadow-lg p-4 rounded-3 mt-4'>
                <div className='row'>
                    <div className="col-lg-1">
                        <p>Filter By</p>
                    </div>

                    <div className='col-lg-2'>
                        <p >START DATE <span style={{ color: "red" }} >*</span></p>
                        <input type='date' className='form-control form-control-sm' />
                    </div>
                    <div className='col-lg-2'>
                        <p >END DATE <span style={{ color: "red" }} >*</span></p>
                        <input type='date' className='form-control form-control-sm' />
                    </div>
                    <div className="col-lg-2">
                        <input type="text" className='form-control' style={{ marginTop: "35px" }} placeholder='Serach For Band' />
                        {/* <Link href="/Attendance/StaffShiftForm/new" ><button className='button'>Add Shift Details</button></Link> */}
                    </div>  
                    <div className="col-lg-1"></div>
                    <div className="col-lg-2">
                      <button className='button' style={{marginTop:"30px",float:"right",marginRight:"0px"}}>Export To excel</button>
                    </div>  
                </div>
            </div>

            <div className='row mt-3'>
                <table className='table table-striped mt-3' style={{marginLeft:"10px",width:"98%"}}  >
                    <thead>
                        <tr className='bg-info text-white'>
                            <th> EMPLOYEE NAME</th>
                            <th>START DATE</th>
                            <th>END DATE</th>
                            <th>SHIFT NAME</th>
                            <th>START TIME</th>
                            <th>END TIME</th>
                            <th> Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myTeamshiftDetails.map((data) => {
                                return (
                                    <tr key={data.id}>
                                        <td>{data.Band}</td>
                                        <td>{data.shiftDate}</td>
                                        <td>{data.endDate}</td>
                                        <td>{data.shiftName}</td>
                                        <td>{data.startTime}</td>
                                        <td>{data.endTime}</td>
                                        <td>{data.endTime}</td>
                                        <td>
                                            <button >Approve</button>
                                            <button>Reject</button>

                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

            </div>
        </>

    );
}

export default Index;
