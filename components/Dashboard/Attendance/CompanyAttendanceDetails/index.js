import Link from 'next/link';
import React from 'react';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { apiService } from "@/services/api.service";
import Styles from "@/styles/attendancedetails.module.css";
import { DownloadTableExcel } from "react-export-table-to-excel";
import ReactPaginate from "react-paginate";


const CompanyAttendanceDetails = () => {
    const tableRef = useRef(null);
    const [CompanyAttendence, setCompanyAttendence] = useState([]);
    const [userID, setUserID] = useState();
    const [roleID, setRoleID] = useState();

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");


    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    useEffect(() => {
        const userid = sessionStorage.getItem("userID");
        const roleid = sessionStorage.getItem("roleID");
        setUserID(userid);
        setRoleID(roleid);
        // const  getAttendenceByID = async() => {
        //     debugger
        //      const userid = sessionStorage.getItem("userID");
        //     const SDate = '2023-10-10';
        //     const EDate = "2023-11-11";
        //     if (userid) {
        //         const res = await apiService.commonGetCall("HR/GetAttendanceByManagerID?&SDate=" + SDate + '&EDate=' + EDate);
        //         //   let res = await axios.get(hostURL + "HR/GetAttendanceByManagerID?SupervisorID=" + SupervisorID + '&SDate=' + SDate + '&EDate=' + EDate);
        //         setCompanyAttendence(res.data);
        //     }
        // }
        // getAttendenceByID();
    }, []);

    useEffect(() => {
        if (userID) {
            const resu = getCurrentMonthDates();
            if (resu) {
                getCompanyAttendance(resu.setStartDate, resu.setEndDate);
            }
        }
    }, [userID]);

    const PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(CompanyAttendence.length / PER_PAGE);

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
        return getCompanyAttendance(startDate, endDatesss);
    };

    const getCompanyAttendance = async (SDate, EDate) => {
        if (userID) {
            const res = await apiService.commonGetCall(
                "Payroll/GetAttendanceByHR?SDate=" +
                SDate +
                "&EDate=" +
                EDate
            );
            setCompanyAttendence(res.data);
        }
    };


    return (
        <div>
            <div className='container'>
                <div className='row mt-3'>
                    <div className='col-lg-3 ' >
                        <Link className={Styles.mainheader} href="/Attendance/AttendanceDetails">My Attendence Details</Link>
                    </div>
                    <div className='col-lg-3' style={{ marginLeft: "-50px" }}>
                        <div className={Styles.mainheader} onClick={() => router.push("/Attendance/MyTeamAttendanceDetails")} >Company Attendance Details
                        </div>
                        <div className="line-border"></div>
                    </div>

                </div>



                <div className='card p-3 border-0 shadow-lg rounded-3 mt-4'>
                    <div className='row'>
                        <div className='col-lg-1'>
                            <p>Filter By</p>
                        </div>

                        <div className='col-lg-2'>
                            <p>Start Date</p>
                            <input type="date" className='form-control'
                                value={startDate}
                                onChange={(e) => getStartDate(e.target.value)} />
                        </div>

                        <div className='col-lg-2'>
                            <p>End Date</p>
                            <input type="date" className='form-control'
                                value={endDate || ""}
                                onChange={(e) => getEndDate(e.target.value)} />
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

                        <div className='col-lg-2'>

                            <button className='button'>Upload</button><br /><p></p>

                            <DownloadTableExcel
                                filename="users table"
                                sheet="users"
                                currentTableRef={tableRef.current}
                            >
                                <button className='button'>Export To Excel</button>       </DownloadTableExcel>
                        </div>
                    </div>
                </div>

                <table className='table table-hover mt-2 ' ref={tableRef}>
                    <thead className='bg-info text-white '>
                        <tr style={{ whiteSpace: 'nowrap' }}>
                            <th >Date</th>
                            <th>Staff </th>
                            <th>Day Type	</th>

                            <th>Expected In Time	</th>
                            <th>Expected Out Time	</th>
                            <th>Punch In Time</th>

                            <th>Punch Out Time	</th>
                            <th>Work Hours(HH:MM)	</th>
                            <th>Overtime</th>

                            <th>UnderTime</th>
                            <th>Late</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(CompanyAttendence) && CompanyAttendence.length > 0 && (
                            <>
                                {CompanyAttendence.map((data) => {
                                    return (
                                        <tr key={data.id}>
                                            <td>{data.date}</td>
                                            <td>{data.staffname}</td>
                                            <td>{data.position}</td>

                                            <td>{data.expectedIn}</td>
                                            <td>{data.expectedOut}</td>
                                            <td>{data.expectedIn}</td>

                                            <td>{data.expectedOut}</td>
                                            <td>{data.punchedInForm}</td>
                                            <td>{data.overtime}</td>

                                            <td>{data.expectedOutTime}</td>
                                            <td>{data.late}</td>

                                        </tr>
                                    )
                                })
                                }
                            </>
                        )}
                    </tbody>
                </table>
                <div className="mb-4 mt-4 text-center">
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination  justify-content-center"}
                        pageClassName={"page-item "}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active primary"}
                    />
                </div>
            </div>
        </div>
    );
}

export default CompanyAttendanceDetails;
