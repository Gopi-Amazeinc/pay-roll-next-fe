import Layout from "@/components/layout/layout"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link';
import { apiService } from "@/services/api.service";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";
import Modal from 'react-modal';
import Styles from "@../../../pages/OT/Ot.module.css"
import {
    Calendar as BigCalendar,
    momentLocalizer,
    Views
} from "react-big-calendar";
import ReactPaginate from "react-paginate";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
moment.locale("en-GB");
//momentLocalizer(moment);
const localizer = momentLocalizer(moment);
const Index = () => {
    const { register, handleSubmit, reset, formState } = useForm();
    const [pending, setPending] = useState(false)
    const [approved, setApproved] = useState(false)
    const [rejected, setRejected] = useState(false)
    const [pendingdata, setPendingData] = useState([])
    const [approveddata, setApprovedData] = useState([])
    const [rejecteddata, setRejectedData] = useState([])
    const [roleID, setRoleID] = useState();
    const [userID, setUserID] = useState();
    const [isOpen, ModalIsOpen] = useState(false)
    const [keyword, setKeyword] = useState("");
    const getPendingData = async (StartingDate, EndDate) => {
        debugger;
        const res = await apiService.commonGetCall("Employee/GetPendingManagerLeavesByStaffID?ID=" + userID + "&TypeID=1&Sdate=" + StartingDate + "&Edate=" + EndDate)
        setPendingData(res.data);
        console.log(res.data);
    }
    const getApprovedData = async (StartingDate, EndDate) => {
        debugger;
        const res = await apiService.commonGetCall("Employee/GetApprovedManagerLeavesByStaffID?ID=" + userID + "&TypeID=1&Sdate=" + StartingDate + "&Edate=" + EndDate)
        setApprovedData(res.data);
        console.log(res.data);
    }
    const getRejectedData = async (StartingDate, EndDate) => {
        debugger;
        const res = await apiService.commonGetCall("Employee/GetRejectedManagerLeavesByStaffID?ID=" + userID + "&TypeID=1&Sdate=" + StartingDate + "&Edate=" + EndDate)
        setRejectedData(res.data);
        console.log(res.data);
    }
    const togglePending = () => {
        setPending(true)
        setRejected(false)
        setApproved(false)
    }

    const toggleApproved = () => {
        setApproved(true)
        setPending(false)
        setRejected(false)
    }

    const toggleRejected = () => {
        setRejected(true)
        setPending(false)
        setApproved(false)
    }

    const [calender, setCalender] = useState(false)
    const [listview, setListView] = useState(false)
    const toggleCalender = () => {
        setCalender(true)
        setListView(false)
        setApproved(false)
        setPending(false)
        setRejected(false)
    }

    const toggleListView = () => {
        setListView(true)
        setCalender(false)
    }
    const openModal = () => {
        ModalIsOpen(true)
    }
    const closeModal = () => {
        setModalOpen(false)
    }
    const customStyles = {
        content: {
            top: '20%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            height: '40%'
        }
    }
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const getStartDate = (selectedDate) => {
        setStartDate(selectedDate);
        setEndDate("");
        sessionStorage.setItem("StartDate", startDate);

    };

    const getEndDate = (selectedDate) => {
        setEndDate(selectedDate);
        sessionStorage.setItem("EndDate", endDate);
        return dateValidation(selectedDate);
        // return getDateBySelectedDate(selectedDate);

    };
    const getDateBySelectedDate = (endDatesss) => {
        debugger;
        return getPendingData(startDate, endDatesss);
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

    const formateDate = (datetoformat) => {
        const day = datetoformat.getDate().toString().padStart(2, "0");
        const month = (datetoformat.getMonth() + 1).toString().padStart(2, "0");
        const year = datetoformat.getFullYear().toString();
        return `${year}-${month}-${day}`;
    };
    const dateValidation = (selectedDate) => {
        if (new Date(startDate) > new Date(selectedDate)) {
            Swal.fire("End Date should be greater than Start Date");
        } else {
            setEndDate(selectedDate);
            return getDataBySelectedDate(selectedDate);
        }
    };
    const getDataBySelectedDate = (endDatesss) => {
        debugger;
        return getPendingData(startDate, endDatesss);
    };
    const PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(pendingdata.length / PER_PAGE);
    useEffect(() => {
        const usrID = sessionStorage.getItem("userID");
        setUserID(usrID);
        const userRoleID = sessionStorage.getItem("roleID");
        setRoleID(userRoleID);
        // var StartingDate = sessionStorage.getItem("StartDate");
        // var EndDate = sessionStorage.getItem("StartDate");
        // getDateBySelectedDate();
        // getPendingData(userID, StartingDate, EndDate);
        // getApprovedData(userID, StartingDate, EndDate);
        // getRejectedData(userID, StartingDate, EndDate);
        setListView(true);
        setPending(true);
        if (userID) {
            const resu = getCurrentMonthDates();
            if (resu) {
                getPendingData(resu.setStartDate, resu.setEndDate);
                getApprovedData(resu.setStartDate, resu.setEndDate);
                getRejectedData(resu.setStartDate, resu.setEndDate);
            }
        }
        return;
    }, [userID])

    const styles = {
        container: {
            width: "80wh",
            height: "60vh",
            margin: "2em"
        }
    };
    const events = [];

    const resourceMap = [];
    const approve = (id) => {
        let data = {
            "id": id,
            "Status": "Manager Approved"
        }
        Swal.fire({
            title: 'Confirm To Approve?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Approve it!'
        }).then((result) => {
            if (result.isConfirmed) {
                apiService.commonPostCall("Payroll/?id=" + id + "&Status=ManagerApproved")
                Swal.fire({
                    icon: "success",
                    titleText: "Approved Successfully"
                })
                getPendingData();
            }
        })
    }
    let id;
    const reject = () => {
        debugger;
        id = sessionStorage.getItem("id")
        let reason = watch("Reason")
        let data = {
            "id": id,
            "RejectReason": reason,
            "Status": "Manager Rejected"
        }
        Swal.fire({
            title: 'Confirm To Reject?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Reject it!'
        }).then((result) => {
            if (result.isConfirmed) {
                apiService.commonPostCall(`Payroll/?id=${id}&Status=ManagerRejected&RejectedReason=${reason}`);
                Swal.fire({
                    icon: "success",
                    titleText: "Rejected Successfully"
                })
                getManagerPendingDetails();
            }
        })
    }

    return (
        <div className="container-fluid">
            <div claasName="row">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-md-7">
                            <Link href="/Requests/Leaverequest">
                                <label className="Heading">My Leave Request</label>
                            </Link>&nbsp;&nbsp;&nbsp;&nbsp;
                            <label className="Heading">My Team Leave Request</label>

                        </div>
                    </div><br />
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card p-3 border-0">
                                <div className="row">
                                    <div className="col-lg-3">
                                        <label style={{ fontWeight: "bold" }}>Start Date:</label>
                                        <input id="date" name="date" type="date" placeholder="Duration" className="form-control " onChange={(e) => getStartDate(e.target.value)} />
                                    </div>
                                    <div className="col-lg-3">
                                        <label style={{ fontWeight: "bold" }}>End Date:</label>
                                        <input id="date" name="date" type="date" placeholder="Duration" className="form-control " onChange={(e) => getEndDate(e.target.value)} />
                                    </div>
                                    <div className="col-lg-4">
                                        <label style={{ fontWeight: "bold" }}>Search:</label>
                                        <br /><input type="search" placeholder="Search here.." className="form-control " onChange={e => setKeyword(e.target.value)} />
                                    </div>
                                    <br /><br /><br />
                                </div>
                            </div>

                        </div>
                    </div>
                    <br /><br />
                    <div className="row">
                        <div className="col-lg-4">
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <div className='btn-group'>
                                        <button onClick={toggleCalender} className={`toggleButton ${calender ? "focus" : ""}`}>Calender</button>
                                        <button onClick={toggleListView} className={`toggleButton ${listview ? "focus" : ""}`}>List View</button>
                                    </div>
                                </div>
                            </div>
                            <br />
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-lg-12">
                            {
                                calender && (
                                    <div className='row'>
                                        <div className="col-lg-12">
                                            <div className='card shadow'>
                                                <div style={styles.container}>
                                                    <BigCalendar
                                                        selectable
                                                        localizer={localizer}
                                                        events={events}
                                                        defaultView={Views.DAY}
                                                        views={[Views.DAY, Views.WEEK, Views.MONTH]}
                                                        steps={60}
                                                        defaultDate={new Date(2018, 0, 29)}
                                                        resources={resourceMap}
                                                        resourceIdAccessor="resourceId"
                                                        resourceTitleAccessor="resourceTitle"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )
                            }
                            {
                                listview && (
                                    <div className='row mt-3'>
                                        <div className='col-lg-4'>
                                            <div className='btn-group'>
                                                <button onClick={togglePending} className={`toggleButton ${pending ? "focus" : ""}`}>Pending</button>
                                                <button onClick={toggleApproved} className={`toggleButton ${approved ? "focus" : ""}`}>Approved</button>
                                                <button onClick={toggleRejected} className={`toggleButton ${rejected ? "focus" : ""}`}>Rejected</button>
                                                <br /><br />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div><br />
                    <br />
                    <div className="row">
                        <div className="col-lg-12">
                            {pending && (
                                <>
                                    <h6 style={{ color: "#3247d5" }}>Showing {pendingdata.length} Results</h6>
                                    <table className='table'>
                                        <thead className='bg-info text-white'>
                                            <tr>
                                                <th>Select all</th>
                                                <th>From Date</th>
                                                <th>To Date</th>
                                                <th>Leave Reason</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                pendingdata.filter(data => {
                                                    if ((data.sDateOfLeave.toString().includes(keyword.toLowerCase())) || (data.eDateOfLeave.toString().includes(keyword)) || (data.status.toLowerCase().includes(keyword)) || (data.leaveReason.toString().includes(keyword.toLowerCase()))) {
                                                        return data;
                                                    }
                                                }).slice(offset, offset + PER_PAGE).map((data) => {
                                                    return (
                                                        <tr key={data.id}>
                                                            <td>
                                                                <input type="checkbox"></input>
                                                            </td>
                                                            <td>{data.sDateOfLeave}</td>
                                                            <td>{data.eDateOfLeave}</td>
                                                            <td>{data.leaveReason}</td>
                                                            <td>{data.status}</td>
                                                            <td>
                                                                <button onClick={approve.bind(this, data.id)} className='edit-btn'>Approve</button>
                                                                <button onClick={() => openModal(sessionStorage.setItem("id", data.id))} className='edit-btn'>Reject</button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </table>
                                </>
                            )}

                            {approved && (
                                <>
                                    <h6 style={{ color: "#3247d5" }}>Showing {approveddata.length} Results</h6>
                                    <table className='table'>
                                        <thead className='bg-info text-white'>
                                            <tr>
                                                <th>From Date</th>
                                                <th>To Date</th>
                                                <th>Leave Reason</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                approveddata.filter(data => {
                                                    if ((data.sDateOfLeave.toString().includes(keyword.toLowerCase())) || (data.eDateOfLeave.toString().includes(keyword)) || (data.status.toLowerCase().includes(keyword)) || (data.status.toLowerCase().includes(keyword)) || (data.leaveReason.toString().includes(keyword.toLowerCase()))) {
                                                        return data;
                                                    }
                                                }).slice(offset, offset + PER_PAGE).map((data) => {
                                                    return (
                                                        <tr key={data.id}>
                                                            <td>{data.sDateOfLeave}</td>
                                                            <td>{data.eDateOfLeave}</td>
                                                            <td>{data.leaveReason}</td>
                                                            <td>{data.status}</td>
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </table>
                                </>
                            )}
                            {rejected && (
                                <>
                                    <h6 style={{ color: "#3247d5" }}>Showing {rejecteddata.length} Results</h6>
                                    <table className='table'>
                                        <thead className='bg-info text-white'>
                                            <tr>
                                                <th>From Date</th>
                                                <th>To Date</th>
                                                <th>Leave Reason</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                rejecteddata.filter(data => {
                                                    if ((data.sDateOfLeave.toString().includes(keyword.toLowerCase())) || (data.eDateOfLeave.toString().includes(keyword)) || (data.status.toLowerCase().includes(keyword)) || (data.status.toLowerCase().includes(keyword)) || (data.leaveReason.toString().includes(keyword.toLowerCase()))) {
                                                        return data;
                                                    }
                                                }).slice(offset, offset + PER_PAGE).map((data) => {
                                                    return (
                                                        <tr key={data.id}>
                                                            <td>{data.sDateOfLeave}</td>
                                                            <td>{data.eDateOfLeave}</td>
                                                            <td>{data.leaveReason}</td>
                                                            <td>{data.status}</td>
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </table>
                                </>
                            )}
                        </div>
                    </div>
                    <Modal ariaHideApp={false} isOpen={isOpen} style={customStyles}>
                        <div className='container'>
                            <div className='row card-header'>
                                <div className='col-lg-8'>
                                    <h4>Rejecting Request</h4>
                                </div>
                                <div className='col-lg-3'></div>
                                <div className='col-lg-1'>
                                    <button aria-label="Close" type="button" className={Styles.close} onClick={() => ModalIsOpen(false)}>X</button>
                                </div>
                            </div><br />
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <textarea rows={4} {...register("Reason")} className='form-control' placeholder='Write the reason here..'></textarea>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-lg-8'></div>
                                <div className='col-lg-2'>
                                    <button type='submit' className='edit-btn mt-5' onClick={() => ModalIsOpen(false)}>Cancel</button>
                                </div>
                                <div className='col-lg-2'>
                                    <button onClick={reject} type='submit' className='edit-btn mt-5'>REJECT </button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
            <div className="text-center">
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
    )

}
export default Index