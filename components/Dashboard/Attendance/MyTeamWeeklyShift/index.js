import React from 'react';
import Link from 'next/link';
import { apiService } from "@/services/api.service";
import { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from 'react-hook-form';
import Styles from "@/styles/attendancedetails.module.css";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useRef } from "react";
import ReactPaginate from "react-paginate";
import Swal from 'sweetalert2';

const Index = () => {

    // const [pending, setPending] = useState(true)
    // const [approved, setApproved] = useState(false)
    // const [rejected, setRejected] = useState(false)
    // const [cancelled, setCancelled] = useState(false)

    // const togglePending = () => {
    //     setApproved(false)
    //     setRejected(false)
    //     setPending(true)
    //     setCancelled(false)
    // }

    // const toggleApproved = () => {
    //     setApproved(true)
    //     setPending(false)
    //     setRejected(false)
    //     setCancelled(false)
    // }

    // const toggleRejected = () => {
    //     setRejected(true)
    //     setApproved(false)
    //     setPending(false)
    //     setCancelled(false)
    // }

    // const toggleCancelled = () => {
    //     setCancelled(true)
    //     setApproved(false)
    //     setPending(false)
    //     setRejected(false)
    // }

    const [userID, setUserID] = useState();
    const [roleID, setRoleID] = useState();

    const tableRef = useRef(null);

    const [weeklyShiftData, getWeeklyShiftData] = useState([])
    const [modalOpen, setModalOpen] = useState(false);

    const [count, setcount] = useState("");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [keyword, setKeyword] = useState("");

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    useEffect(() => {
        const userid = sessionStorage.getItem("userID");
        const roleid = sessionStorage.getItem("roleID");
        setUserID(userid);
        setRoleID(roleid);
    }, []);

    useEffect(() => {

        if (userID) {
            getData();
        }
    }, [userID])

    const getData = async () => {
        debugger
        const res = await apiService.commonGetCall("Payroll/GetStaffShiftDetailsBySupervisor?Supervisor=" +
            userID);
        console.log(res.data)
        getWeeklyShiftData(res.data)
        setcount(res.data.length);

    }

    const approve = async (id) => {
        const res = await apiService.commonPostCall("Payroll/ApproveStaffShiftDetails", id)
        Swal.fire("Approved Successfully")
        getData();
    }

    const reject = async (id) => {
        setModalOpen(!modalOpen)
        sessionStorage.setItem("rejectID", id)
    }
    const getStartDate = (selectedDate) => {
        setStartDate(selectedDate);
        setEndDate("");
        // return dateValidation(selectedDate)
    };
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


    const getEndDate = (selectedDate) => {
        setEndDate(selectedDate);
        return dateValidation(selectedDate);
    };
    const dateValidation = (selectedDate) => {
        if (new Date(startDate) > new Date(selectedDate)) {
            Swal.fire("End Date should be greater than Start Date");
            // setEndDate("");
        }
        // else if (new Date(startDate) == new Date(selectedDate)) {
        //   Swal.fire("End Date should not be same as Start Date");

        // }
        else {
            setEndDate(selectedDate);
            return getDataBySelectedDate(selectedDate);
        }
    };
    const getDataBySelectedDate = (endDatesss) => {
        debugger;
        return getData(startDate, endDatesss);
    };



    const onReject = async () => {
        let ID = sessionStorage.getItem("rejectID")
        let Reason = watch("reason")
        const res = await apiService.commonPostCall("Payroll/RejectStaffShiftDetails", Reason, ID)
        Swal.fire("Rejected Successfully")
        sessionStorage.removeItem('rejectID');
        setModalOpen(!modalOpen)
    }
    const PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(weeklyShiftData.length / PER_PAGE);


    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='row'>

                        <div className='col-lg-3'>
                            <br />
                            <Link href="/Attendance/ShiftDetails" className={Styles.mainheader}>  My Weekly Shift</Link>

                        </div>

                        <div className='col-lg-3' style={{ marginLeft: "-30px" }}>
                            <br />
                            <Link href="/Attendance/MyTeamWeeklyShift" className={Styles.mainheader}> My Team Weekly Shift</Link>
                            <div className="line-border" style={{
                                border: "1px solid #2f87cc",
                                bordertopleftradius: "51px",
                                bordertoprightradius: "51px",
                                margintop: "0px",
                                width: "69%"
                            }}></div>
                        </div>
                    </div>
                    <br />

                    <div className='card border-0 p-3 rounded-3'>
                        <div className='row'>
                            <div className="col-lg-1">
                                <p> <b>Filter By</b></p>
                            </div>
                            <div className='col-lg-2'>
                                <label ><b>START DATE</b> <span style={{ color: "red" }} >*</span></label>
                                <input type='date' onChange={(e) => getStartDate(e.target.value)} className='form-control' />
                            </div>
                            <div className='col-lg-2'>
                                <label > <b>END DATE </b><span style={{ color: "red" }} >*</span></label>
                                <input type='date' onChange={(e) => getEndDate(e.target.value)} className='form-control' />
                            </div>
                            <div className="col-lg-2">
                                <br />
                                <input type="text" className='form-control' placeholder='Serach For Band' onChange={(e) => setKeyword(e.target.value)} />
                                {/* <Link href="/Attendance/StaffShiftForm/new" ><button className='button'>Add Shift Details</button></Link> */}
                            </div>
                            <div className="col-lg-1"></div>
                            <div className="col-lg-2">
                                <br />
                                {count > 0 ?
                                    <>
                                        <DownloadTableExcel
                                            filename="users table"
                                            sheet="users"
                                            currentTableRef={tableRef.current}
                                        >
                                            <button className='button' >Export To excel</button>     </DownloadTableExcel>
                                    </>
                                    : null}

                            </div>
                        </div>
                    </div>
                    {/* <br />
                    <div className='row'>
                        <div className='btn-group'>
                            <button onClick={togglePending} className={`toggleButton ${pending ? "focus" : ""}`}>Pending</button>
                            <button onClick={toggleApproved} className={`toggleButton ${approved ? "focus" : ""}`}>Approved</button>
                            <button onClick={toggleRejected} className={`toggleButton ${rejected ? "focus" : ""}`}>Rejected</button>
                            <button onClick={toggleCancelled} className={`toggleButton ${cancelled ? "focus" : ""}`}>Cancelled</button>
                        </div>
                    </div> */}
                    <br />
                    <h6 style={{ color: "#3247d5" }}>Showing {count} Results</h6>

                    <div className='row'>
                        <div className='col-lg-12'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>EMPLOYEID</th>
                                        <th>EMPLOYEE NAME</th>
                                        <th>START DATE</th>
                                        <th>END DATE</th>
                                        <th>SHIFT NAME</th>
                                        <th>START TIME</th>
                                        <th>END TIME</th>
                                        <th>REST DAYS</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        weeklyShiftData
                                            .filter(post => {
                                                return Object.values(post).some(value =>
                                                    value !== null && value.toString().toLowerCase().includes(keyword.toLowerCase())
                                                );
                                            })
                                            .slice(offset, offset + PER_PAGE).map((data) => {
                                                return (
                                                    <tr key={data.id}>
                                                        <td>{data.staffID}</td>
                                                        <td>{data.employeeName}</td>
                                                        <td>{data.shiftdate}</td>
                                                        <td>{data.endDate}</td>
                                                        <td>{data.shiftName}</td>
                                                        <td>{data.startTime1}</td>
                                                        <td>{data.endTime1}</td>
                                                        <td>{data.restDays}</td>
                                                        <td>{data.status}</td>
                                                        <td>
                                                            <button onClick={approve.bind(this, data.id)} className='edit-btn'>Approve</button>
                                                            &nbsp;
                                                            <button onClick={reject.bind(this, data.id)} className='edit-btn'>Reject</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
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

                    <div className='row'>
                        <Modal isOpen={modalOpen} >
                            <div className='modal-header'>
                                <div className='modal-title'>
                                    <p className='Heading'>Rejecting Request</p>
                                </div>
                                <button
                                    aria-label="Close"
                                    type="button"
                                    className={Styles.close}
                                    onClick={() => setModalOpen(!modalOpen)}
                                >X</button>
                            </div>
                            <form onSubmit={handleSubmit(reject)}>
                                <ModalBody>
                                    <div className='row'>
                                        <div className='col-lg-12'>
                                            <label>Reason *</label>
                                            <textarea placeholder='Reason'{...register("reason", { required: true })} className='form-control'></textarea>
                                            {errors.reason && (
                                                <p className="text-danger">
                                                    Please enter Valid Reason
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                </ModalBody>
                                <ModalFooter>
                                    <div className='row'>
                                        <div className='col-lg-6'>
                                            <button onClick={() => setModalOpen(!modalOpen)} className='edit-btn'>Cancel</button>
                                        </div>
                                        <div className='col-lg-5'>
                                            <button onClick={onReject} className='edit-btn'>Reject</button>
                                        </div>
                                    </div>
                                </ModalFooter>
                            </form>
                        </Modal>
                    </div>

                    {/* <div className='row'>
                        <div className='col-lg-12'>
                            {
                                pending && (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th><input type='checkbox' className='form-check' /></th>
                                                <th>CONTROLL NUMBER	</th>
                                                <th>EMPLOYEID</th>
                                                <th>EMPLOYEE NAME</th>
                                                <th>START DATE</th>
                                                <th>END DATE</th>
                                                <th>SHIFT NAME</th>
                                                <th>START TIME</th>
                                                <th>END TIME</th>
                                                <th>REST DAYS</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                    </table>
                                )
                            }

                            {
                                approved && (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>CONTROLL NUMBER	</th>
                                                <th>EMPLOYEID</th>
                                                <th>EMPLOYEE NAME</th>
                                                <th>START DATE</th>
                                                <th>END DATE</th>
                                                <th>SHIFT NAME</th>
                                                <th>START TIME</th>
                                                <th>END TIME</th>
                                                <th>REST DAYS</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                    </table>
                                )
                            }

                            {
                                rejected && (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>CONTROLL NUMBER	</th>
                                                <th>EMPLOYEID</th>
                                                <th>EMPLOYEE NAME</th>
                                                <th>START DATE</th>
                                                <th>END DATE</th>
                                                <th>SHIFT NAME</th>
                                                <th>START TIME</th>
                                                <th>END TIME</th>
                                                <th>REST DAYS</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                    </table>
                                )
                            }

                            {
                                cancelled && (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>CONTROLL NUMBER	</th>
                                                <th>EMPLOYEID</th>
                                                <th>EMPLOYEE NAME</th>
                                                <th>START DATE</th>
                                                <th>END DATE</th>
                                                <th>SHIFT NAME</th>
                                                <th>START TIME</th>
                                                <th>END TIME</th>
                                                <th>REST DAYS</th>
                                                <th>Hr Cancel Comments</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                    </table>
                                )
                            }
                        </div>
                    </div> */}
                </div>
            </div>
        </div >
    );
}

export default Index;
