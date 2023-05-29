import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react'
import Styles from "@/styles/shiftdetails.module.css";
import { useRef } from 'react';
import { apiService } from "@/services/api.service";
import * as XLSX from "xlsx";



const Index = () => {
    const tableRef = useRef(null);
    const [myTeamshiftDetails, setmyTeamshiftDetails] = useState([])
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    // const [pending, setPending] = useState(false);
    // const [approved, setApproved] = useState(false);
    // const [rejected, setRejected] = useState(false);

    const [pendingcount, setpendingcount] = useState();
    // const [rejectcount, setrejectcount] = useState();
    // const [approvedcount, setapprovedcount] = useState();

    const [companypendingweeklyshift, setcompanypendingweeklyshift] = useState([]);
    // const [companyApprovedweeklyshift, setcompanyApprovedweeklyshift] = useState([]);
    // const [companyRejectedweeklyshift, setcompanyRejectedweeklyshift] = useState([]);

    const [keyword, setKeyword] = useState("");

    // const togglePending = () => {
    //     setPending(true);
    //     setRejected(false);
    //     setApproved(false);
    // };

    // const toggleApproved = () => {
    //     setApproved(true);
    //     setPending(false);
    //     setRejected(false);
    // };

    // const toggleRejected = () => {
    //     setRejected(true);
    //     setApproved(false);
    //     setPending(false);
    // };

    const getcompanyweeklyPendingData = async () => {
        const res = await apiService.commonGetCall("HR/GetStaffShiftDetails");
        setpendingcount(res.data.length);
        // const res = await axios.get( hostURL +  "Payroll/GetPendingAttendanceCorrectionByStaffID?userID=" + staffID + "&SDate=" + SDate + "&EDate=" + EDate);
        console.log(res, "pending");
        setcompanypendingweeklyshift(res.data);
    };


    useEffect(() => {
        getcompanyweeklyPendingData();
    }, []);

    const exportToExcel = () => {
        let  element = document.getElementById("comanyshiftID");
        if (element) {
          const ws = XLSX.utils.table_to_sheet(element);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
          if (myattendance == true) {
            XLSX.writeFile(wb, "CompanyShiftDetails.xlsx");
          }
        }
      };
    return (
        <>
            <div className='row'>
                <div className='col-lg-3'>
                    <br />
                    <Link href="/Attendance/ShiftDetails" className={Styles.mainheader}>  My Weekly Shift</Link>
                </div>
                <div className='col-lg-3' style={{ marginLeft: "-30px" }}>
                    <br />
                    <Link href="/Attendance/MyTeamWeeklyShift" className={Styles.mainheader}> Company Weekly Shift</Link>
                    <div className="line-border" style={{
                        border: "1px solid #2f87cc",
                        bordertopleftradius: "51px",
                        bordertoprightradius: "51px",
                        margintop: "0px",
                        width: "70%"
                    }}></div>
                </div>

            </div>
            <div className='card shadow-lg p-4 rounded-3 mt-4'>
                <div className='row'>
                    <div className="col-lg-1">
                        <p><b>Filter By</b></p>
                    </div>

                    <div className='col-lg-2'>
                        <p ><b> START DATE</b> <span style={{ color: "red" }} >*</span></p>
                        <input type='date' className='form-control form-control-sm' />
                    </div>
                    <div className='col-lg-2'>
                        <p ><b>END DATE </b><span style={{ color: "red" }} >*</span></p>
                        <input type='date' className='form-control form-control-sm' />
                    </div>
                    <div className="col-lg-2">
                        <input type="text" className='form-control' style={{ marginTop: "35px" }} placeholder='Serach For Band' />
                        {/* <Link href="/Attendance/StaffShiftForm/new" ><button className='button'>Add Shift Details</button></Link> */}
                    </div>
                    <div className="col-lg-1"></div>
                    <div className="col-lg-2">  
                   
                        <button className='button' onClick={exportToExcel} style={{ marginTop: "30px", float: "right", marginRight: "0px" }}>Export To excel</button> 
                    </div>
                </div>
            </div>
            <br />
            {/* <div className="row ">
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


            <div className="row mt-3">
                <div className="col-lg-12">
                    <table className="table" id='comanyshiftID'>
                        <thead className="bg-info text-white">
                            <tr>
                                <th>EMPLOYEID</th>
                                <th>EMPLOYEE NAME</th>
                                <th>START DATE</th>
                                <th>END DATE</th>
                                <th>SHIFT NAME</th>
                                <th>START TIME</th>
                                <th>END TIME</th>
                                <th>REST DAYS</th>
                                <th>Status	</th>
                                {/* <th>Action	</th> */}
                            </tr>
                        </thead>

                        <tbody>
                            {Array.isArray(companypendingweeklyshift) &&
                                companypendingweeklyshift.length > 0 && (
                                    <>
                                        {companypendingweeklyshift
                                            .filter(data => {
                                                if ((data.startTime.toLowerCase().includes(keyword)) || (data.date.toLowerCase().includes(keyword)) || (data.endTime.toLowerCase().includes(keyword))) {
                                                    return data;
                                                }
                                            })
                                            .map((data, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{data.staffID}</td>
                                                        <td>{data.employeeName}</td>
                                                        <td>{data.shiftdate}</td>
                                                        <td>{data.endDate}</td>
                                                        <td>{data.shiftName}</td>
                                                        <td>{data.startTime1}</td>
                                                        <td>{data.endTime1}</td>
                                                        <td>{data.restDays}</td>
                                                        <td>{data.status}</td>
                                                        {/* <td>
                                                            <button className="edit-btn" >
                                                                Approve
                                                            </button>&nbsp;
                                                            <button className="edit-btn">Reject</button>
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


        </>

    );
}

export default Index;
