import React from 'react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import Styles from "@../../../pages/OT/Ot.module.css"
import { apiService } from "@/services/api.service";
import { useForm } from 'react-hook-form';
import ReactPaginate from "react-paginate";
import { Router, useRouter } from 'next/router';
import * as XLSX from "xlsx";
const Index = () => {
    const router = useRouter()
    const { register, handleSubmit, watch, formState } = useForm();
    const tableRef = useRef(null);
    const [pending, setPending] = useState(false)
    const [approved, setApproved] = useState(false)
    const [rejected, setRejected] = useState(false);
    const [newDashboard, setNewDashboardData] = useState([]);
    const [newApproved, setnewApprovedData] = useState([]);
    const [newRejected, setnewRejectedData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [isOpen, ModalIsOpen] = useState(false)
    const [roleID, setRoleID] = useState();
    const [userID, setUserID] = useState();
    const [keyword, setKeyword] = useState("");

    const togglePending = () => {
        setPending(true)
        setApproved(false)
        setRejected(false)
    }

    const toggleApproved = () => {
        setApproved(true)
        setPending(false)
        setRejected(false)
    }
    const toggleRejected = () => {
        setRejected(true)
        setApproved(false)
        setPending(false)
    }
    const openModal = async () => {
        ModalIsOpen(true)
        setModalOpen(true)
        const res = await apiService.commonGetCall("HR/GetOtNightOt?StartTime=" + data.startTime + "&EndTime=" + data.endTime + "&Shift=1&StaffID=" + userID + "&Date=" + data.filterdate);
        setModalData(res.data);
        console.log("Modal data", res.data);
    }

    const closeModal = () => {
        setModalOpen(false)
    }
    const customStyles = {
        content: {
            top: '30%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            height: '30%'
        }
    }

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
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
        // return dateValidation(selectedDate)
    };

    const getEndDate = (selectedDate) => {
        setEndDate(selectedDate);
        return dateValidation(selectedDate);
    };
    const dateValidation = (selectedDate) => {
        if (new Date(startDate) > new Date(selectedDate)) {
            Swal.fire("End Date should be greater than Start Date");
        } else {
            setEndDate(selectedDate);
            return getManagerPendingDetails(selectedDate);
        }
    };


    const getDataBySelectedDate = (endDatesss) => {
        return getPendingDetails(startDate, endDatesss);
    };
    const getPendingDetails = async () => {
        const res = await apiService.commonGetCall("Payroll/GetPendingStaffOverTimeDetails")
        setNewDashboardData(res.data);
        console.log("Pending emp", res.data);
    }
    const getApprovedDetails = async () => {
        const res = await apiService.commonGetCall("Payroll/GetApproveStaffOverTimeDetails")
        setnewApprovedData(res.data);
        console.log("Approved", res.data);
    }
    const getRejectedDetails = async () => {
        const res = await apiService.commonGetCall("Payroll/GetRejectStaffOverTimeDetails")
        setnewRejectedData(res.data);
        console.log("Rejected", res.data);
    }
    const openEditModal = async (data) => {
        setModalOpen(true)
        const res = await apiService.commonGetCall("HR/GetOtNightOt?StartTime=" + data.startTime + "&EndTime=" + data.endTime + "&Shift=1&StaffID=" + userID + "&Date=" + data.filterdate);
        setModalData(res.data);
        console.log("Modal data", res.data);
    }
    const PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(0);
    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(newDashboard.length / PER_PAGE);
    const Delete = (id) => {
        Swal.fire({
            title: 'Are You Sure To Cancel?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                apiService.commonGetCall("HR/DeleteStaffOverTimeDetails?ID=" + id)
                Swal.fire({
                    icon: "success",
                    titleText: "Cancelled Successfully"
                })
                getPendingDetails();
            }
        }
        )
    }
    useEffect(() => {
        const usrID = sessionStorage.getItem("userID");
        setUserID(usrID);
        const userRoleID = sessionStorage.getItem("roleID");
        setRoleID(userRoleID);
        setPending(true);
        getPendingDetails();
        getApprovedDetails();
        getRejectedDetails();
        setPending(true)
        if (userID) {
            const resu = getCurrentMonthDates();
            if (resu) {
                getPendingDetails();
                getApprovedDetails();
                getRejectedDetails();
            }
        }
        return;

    }, [userID])

    const exportToExcel = () => {
        let element;
        if (pending == true) {
            element = document.getElementById("pendingid");
        }
        else if (approved == true) {
            element = document.getElementById("approvedid");
        }
        else {
            element = document.getElementById("rejectid");
        }
        if (element) {
            const ws = XLSX.utils.table_to_sheet(element);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
            if (pending == true) {
                XLSX.writeFile(wb, "StaffOvertimepending.xlsx");
            }
            else if (approved == true) {
                XLSX.writeFile(wb, "StaffOvertimeapprooved.xlsx");
            }
            else {
                XLSX.writeFile(wb, "StaffOvertimerejected.xlsx");
            }
        }
    };

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className="col-lg-12">
                    <div className="row">
                        <div className='col-lg-3'>
                            {
                                roleID == 2 && (
                                    <Link style={{ textDecoration: "none" }} href="/Requests/OverTimeDetails">
                                        <label className='mainheader' >My Overtime Details</label>
                                    </Link>
                                )
                            }
                        </div>
                        <div className="col-lg-3">
                            <label className='mainheader'>Staff Overtime Details</label>
                        </div>
                    </div><br />
                    <div className='card p-3 border-0 rounded-3'>
                        <div className='row'>
                            <div className='col-lg-1'>
                                <label style={{ fontWeight: "bold" }}>Filter by :</label>
                            </div>
                            <div className="col-lg-3">
                                <label style={{ fontWeight: "bold" }}>Search:</label>
                                <br /><input type="search" placeholder="Search here.." className="form-control " onChange={e => setKeyword(e.target.value)} />
                            </div>
                            <div className='col-lg-6'></div>
                            <div className='col-lg-2'>
                                {/* <DownloadTableExcel filename="users table" sheet="users" currentTableRef={tableRef.current}>
                                    <button className="button" id="AddButton"> Download</button>
                                </DownloadTableExcel> */}
                                <button className="button" onClick={exportToExcel} >
                                    Download
                                </button>
                            </div>
                        </div>
                    </div><br />
                    <div className="row">
                        <div className="col-lg-12">
                            <div className='col-lg-4'><br />
                                <div className='btn-group'>
                                    <button onClick={togglePending} className={`toggleButton ${pending ? "focus" : ""}`}> Pending</button>
                                    <button onClick={toggleApproved} className={`toggleButton ${approved ? "focus" : ""}`}>Approved</button>
                                    <button onClick={toggleRejected} className={`toggleButton ${rejected ? "focus" : ""}`}>Rejected</button>
                                </div>
                            </div>
                            <br />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-12'>
                            {
                                pending && (
                                    <>
                                        <h6 style={{ color: "#3247d5" }}>Showing {newDashboard.length} Results</h6>
                                        <table className='table table-hover' id="pendingid">
                                            <thead className='bg-info text-white'>
                                                <tr>
                                                    <th>Select All&nbsp;
                                                        <input type='checkbox' />
                                                    </th>
                                                    <th>Controll Number</th>
                                                    <th>EmployeID</th>
                                                    <th>Employee Name</th>
                                                    <th>Date </th>
                                                    <th>Start Time</th>
                                                    <th>End Time</th>
                                                    <th>OT Details</th>
                                                    <th>Purpose</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    newDashboard.filter(data => {
                                                        if ((data.controlNumber.toString().includes(keyword.toString())) || (data.staffID.toString().includes(keyword.toString())) || (data.firstName.toString().includes(keyword.toString())) || (data.date.toString().includes(keyword.toString())) || (data.startTime.toString().includes(keyword)) || (data.endTime.toString().includes(keyword)) || (data.status.toString().includes(keyword)) || (data.comments.toString().includes(keyword.toString()))) {
                                                            return data;
                                                        }
                                                    }).slice(offset, offset + PER_PAGE).map((data) => {
                                                        return (
                                                            <tr key={data.id}>
                                                                <td>
                                                                    <input type='checkbox' />
                                                                </td>
                                                                <td>{data.controlNumber}</td>
                                                                <td>{data.staffID}</td>
                                                                <td>{data.firstName}</td>
                                                                <td>{data.date}</td>
                                                                <td>{data.startTime}</td>
                                                                <td>{data.endTime}</td>
                                                                <td>
                                                                    <button className='edit-btn' onClick={openModal.bind(this, data)}>Details</button>
                                                                </td>
                                                                <td>{data.comments}</td>
                                                                <td>{data.status}</td>
                                                                <td>
                                                                    <button onClick={Delete.bind(this, data.id)} className='edit-btn'>Cancel</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </>
                                )
                            }
                            {
                                approved && (
                                    <>
                                        <h6 style={{ color: "#3247d5" }}>Showing {newApproved.length} Results</h6>

                                        <table className='table' id="approvedid">
                                            <thead className=' text-white'>
                                                <tr>
                                                    <th>Controll Number</th>
                                                    <th>EmployeID</th>
                                                    <th>Employee Name</th>
                                                    <th>Date </th>
                                                    <th>Start Time</th>
                                                    <th>End Time</th>
                                                    {/* <th>OT Details</th> */}
                                                    <th>Purpose</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    newApproved.filter(data => {
                                                        if ((data.controlNumber.toString().includes(keyword.toString())) || (data.staffID.toString().includes(keyword.toString())) || (data.firstName.toString().includes(keyword.toString())) || (data.date.toString().includes(keyword.toString())) || (data.startTime.toString().includes(keyword)) || (data.endTime.toString().includes(keyword)) || (data.status.toString().includes(keyword)) || (data.comments.toString().includes(keyword.toString()))) {
                                                            return data;
                                                        }
                                                    }).slice(offset, offset + PER_PAGE).map((data) => {
                                                        return (
                                                            <tr key={data.id}>
                                                                <td>{data.controlNumber}</td>
                                                                <td>{data.staffID}</td>
                                                                <td>{data.firstName}</td>
                                                                <td>{data.date}</td>
                                                                <td>{data.startTime}</td>
                                                                <td>{data.endTime}</td>
                                                                <td>{data.comments}</td>
                                                                <td>{data.status}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </>
                                )
                            }
                            {
                                rejected && (
                                    <>
                                        <h6 style={{ color: "#3247d5" }}>Showing {newApproved.length} Results</h6>
                                        <table className='table table-hover' id="rejectid">
                                            <thead className='bg-info text-white'>
                                                <tr>
                                                    <th>Controll Number</th>
                                                    <th>EmployeID</th>
                                                    <th>Employee Name</th>
                                                    <th>Date </th>
                                                    <th>Start Time</th>
                                                    <th>End Time</th>
                                                    {/* <th>OT Details</th> */}
                                                    <th>Purpose</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    newRejected.filter(data => {
                                                        if ((data.controlNumber.toString().includes(keyword.toString())) || (data.staffID.toString().includes(keyword.toString())) || (data.firstName.toString().includes(keyword.toString())) || (data.date.toString().includes(keyword.toString())) || (data.startTime.toString().includes(keyword)) || (data.endTime.toString().includes(keyword)) || (data.status.toString().includes(keyword)) || (data.comments.toString().includes(keyword.toString()))) {
                                                            return data;
                                                        }
                                                    }).slice(offset, offset + PER_PAGE).map((data) => {
                                                        return (
                                                            <tr key={data.id}>
                                                                <td>{data.controlNumber}</td>
                                                                <td>{data.staffID}</td>
                                                                <td>{data.firstName}</td>
                                                                <td>{data.date}</td>
                                                                <td>{data.startTime}</td>
                                                                <td>{data.endTime}</td>
                                                                <td>{data.comments}</td>
                                                                <td>{data.status}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </>
                                )
                            }
                            <Modal ariaHideApp={false} isOpen={modalOpen} style={customStyles} contentLabel="Example Modal">
                                <div className='row'>
                                    <div className='col-lg-6'>
                                        <div className=" modal-header">
                                            <h5 className=" modal-title" id="exampleModalLabel">
                                                Overtime Details
                                            </h5>
                                        </div>
                                    </div>
                                    <div className='col-lg-5'></div>
                                    <div className='col-lg-1'>
                                        <button aria-label="Close" type="button" className={Styles.close} onClick={closeModal} >X</button>
                                    </div>
                                </div><br />
                                <div className='row'>
                                    <div className='col-lg-12'>
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Normal OT</th>
                                                    <th>Night OT</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    modalData.map((data, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{data.normalOT}</td>
                                                                <td>{data.nightOt}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Index