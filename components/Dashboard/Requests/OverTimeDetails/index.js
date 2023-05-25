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
const Index = () => {
    const router = useRouter()
    const { register, handleSubmit, watch, formState } = useForm();
    const [pending, setPending] = useState(false)
    const [approved, setApproved] = useState(false)
    const [rejected, setRejected] = useState(false);
    const [managertogglePending, setManagerTogglePending] = useState(false)
    const [managerToggleapproved, setManagerToggleApproved] = useState(false)
    const [managertogglerejected, setManagerToggleRejected] = useState(false);
    const [newDashboard, setNewDashboardData] = useState([]);
    const [newApproved, setnewApprovedData] = useState([]);
    const [newRejected, setnewRejectedData] = useState([]);
    const [managerPending, setManagerPendingData] = useState([]);
    const [managerApproved, setManagerApprovedData] = useState([]);
    const [managerRejected, setManagerRejectedData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [isOpen, ModalIsOpen] = useState(false)
    const [roleID, setRoleID] = useState();
    const [userID, setUserID] = useState()
    const [count, setcount] = useState("");

    const togglePending = () => {
        setPending(true)
        setApproved(false)
        setRejected(false)
        setManagerTogglePending(true);
        setManagerToggleApproved(false);
        setManagerToggleRejected(false);
    }

    const toggleApproved = () => {
        setApproved(true)
        setPending(false)
        setRejected(false)
        setManagerTogglePending(false);
        setManagerToggleApproved(true);
        setManagerToggleRejected(false);
    }
    const toggleRejected = () => {
        setRejected(true)
        setApproved(false)
        setPending(false)
        setManagerTogglePending(false);
        setManagerToggleApproved(false);
        setManagerToggleRejected(true);
    }
    const openModal = () => {
        ModalIsOpen(true)
    }

    const openEditModal = async (data) => {
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
        debugger;
        return getPendingDetails(startDate, endDatesss);
    };
    const getPendingDetails = async () => {
        const res = await apiService.commonGetCall("Payroll/GetPendingStaffOverTimeDetails")
        setNewDashboardData(res.data);
        console.log("Pending emp", res.data);
        setcount(res.data.length);
    }
    const getApprovedDetails = async () => {
        const res = await apiService.commonGetCall("Payroll/GetApproveStaffOverTimeDetails")
        setnewApprovedData(res.data);
        console.log("Approved", res.data);
        setcount(res.data.length);
    }
    const getRejectedDetails = async () => {
        const res = await apiService.commonGetCall("Payroll/GetRejectStaffOverTimeDetails")
        setnewRejectedData(res.data);
        console.log("Rejected", res.data);
        setcount(res.data.length);
    }
    const getManagerPendingDetails = async () => {
        const res = await apiService.commonGetCall("Payroll/GetPendingOverTimeDetailsByManagerID?ManagerID=" + userID)
        setManagerPendingData(res.data)
        console.log("Manager Pending", res.data);
        setcount(res.data.length);
    }
    const getManagerApprovedData = async () => {
        const res = await apiService.commonGetCall("Payroll/GetApprovedOverTimeDetailsByManagerID?ManagerID=" + userID)
        setManagerApprovedData(res.data)
        console.log("Manager Approved", res.data);
        setcount(res.data.length);
    }

    const getManagerRejectedData = async () => {
        // debugger;
        const res = await apiService.commonGetCall("Payroll/GetRejectOverTimeDetailsByManagerID?ManagerID=" + userID)
        setManagerRejectedData(res.data)
        console.log("Manager Rejected", res.data);
        setcount(res.data.length);
    }

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
                apiService.commonPostCall("Payroll/UpdateApproveOtFromManager", data)
                Swal.fire({
                    icon: "success",
                    titleText: "Approved Successfully"
                })

            }
        })
        getManagerPendingDetails();
    }
    let id;
    const reject = () => {
        id = sessionStorage.getItem("id")
        let Reason = watch("Reason")
        let data = {
            "id": id,
            "RejectReason": Reason,
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
                apiService.commonPostCall(`Payroll/UpdateOtFromManager`, data);
                Swal.fire({
                    icon: "success",
                    titleText: "Rejected Successfully"
                })


            }

        })
        getManagerPendingDetails();
        router.push("/Requests/OverTimeDetails")
    }
    const PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(0);
    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(newDashboard.length / PER_PAGE);

    useEffect(() => {
        const usrID = sessionStorage.getItem("userID");
        setUserID(usrID);
        const userRoleID = sessionStorage.getItem("roleID");
        setRoleID(userRoleID);
        var date = sessionStorage.getItem("Date");
        var startTime = sessionStorage.getItem("StartTime");
        var endTime = sessionStorage.getItem("EndTime");
        setManagerTogglePending(true);
        setPending(true)
        if (roleID == 5) {
            getManagerPendingDetails(userID);
            getManagerApprovedData(userID);
            getManagerRejectedData(userID);
            getModalData(startTime, endTime, date, userID);

        }
        else {
            getPendingDetails();
            getApprovedDetails();
            getRejectedDetails();
        }
        if (userID) {
            const resu = getCurrentMonthDates();
            if (resu) {
                getManagerPendingDetails(resu.setStartDate, resu.setEndDate);
                getManagerApprovedData(resu.setStartDate, resu.setEndDate);
                getManagerRejectedData(resu.setStartDate, resu.setEndDate);
            }
        }
        return;

    }, [userID])
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


    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-3">
                            <h4 className='Heading'>My Overtime Details</h4>&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        <div className='col-lg-4'>
                            {
                                sessionStorage.getItem("roleID") == 3 && (
                                    <Link style={{ textDecoration: "none" }} href="/Requests/Myteamovertimedetails">
                                        <h4 className='Heading' >My Team Overtime Details</h4>
                                    </Link>
                                )
                            }
                        </div>
                    </div><br />
                    <div className='card p-3 border-0 rounded-3'>
                        <div className='row'>
                            <div className='col-lg-4'>
                                <label style={{ fontWeight: "bold" }}>Start Date:</label>
                                <input type="date" className='form-control' onChange={(e) => getStartDate(e.target.value)} />
                            </div>
                            <div className='col-lg-4'>
                                <label style={{ fontWeight: "bold" }}>End Date:</label>
                                <input type="date" className='form-control' onChange={(e) => getEndDate(e.target.value)} />
                            </div>
                            <div className='col-lg-1'></div>
                            <div className='col-lg-3 mt-3'>
                                <Link href="/Requests/OverTimeDetails/new">
                                    <button className="AddButton">Apply Overtime</button>
                                </Link>
                            </div><br /><br /><br />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className='col-lg-4'><br />
                                <div className='btn-group'>
                                    <button onClick={togglePending} className={`toggleButton ${pending ? "focus" : ""}`}> Pending</button>
                                    <button onClick={toggleApproved} className={`toggleButton ${approved ? "focus" : ""}`}>Approved</button>
                                    <button onClick={toggleRejected} className={`toggleButton ${rejected ? "focus" : ""}`}>Rejected</button>
                                </div><br /><br />
                                {/* <h6 style={{ color: "#3247d5" }}>Showing {managerRejected.length} Results</h6> */}
                            </div>
                            <br />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-12'>
                            {
                                managertogglePending && sessionStorage.getItem("roleID") == 3 && (
                                    <>
                                        <h6 style={{ color: "#3247d5" }}>Showing {managerPending.length} Results</h6>

                                        <table className='table table-hover'>
                                            <thead className='bg-info text-white'>
                                                <tr>
                                                    <th>Controll Number</th>
                                                    <th>EmployeID</th>
                                                    <th>Employee Name</th>
                                                    <th>Date Request</th>
                                                    <th>Start Time</th>
                                                    <th>End Time</th>
                                                    <th>OT Details</th>
                                                    <th>Attachment</th>
                                                    <th>Purpose</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    managerPending.slice(offset, offset + PER_PAGE).map((data) => {
                                                        return (
                                                            <tr key={data.id}>
                                                                <td>{data.date}</td>
                                                                <td>{data.startTime}</td>
                                                                <td>{data.endTime}</td>
                                                                <td>
                                                                    <button className='edit-btn' onClick={openEditModal.bind(this, data)} >Details</button>
                                                                </td>
                                                                <td>{data.comments}</td>
                                                                <td>{data.status}</td>
                                                                <td>
                                                                    <button onClick={approve.bind(this, data.id)} className='edit-btn'>Approve</button>
                                                                    <button onClick={() => openModal(sessionStorage.setItem("id", data.id))} className='edit-btn'>Reject</button>
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
                                managerToggleapproved && sessionStorage.getItem("roleID") == 3 && (
                                    <>
                                        <h6 style={{ color: "#3247d5" }}>Showing {managerApproved.length} Results</h6>
                                        <table className='table table-hover'>
                                            <thead className='bg-info text-white'>
                                                <tr>
                                                    <th>Controll Number</th>
                                                    <th>EmployeID</th>
                                                    <th>Employee Name</th>
                                                    <th>Date Request</th>
                                                    <th>Approved Start Time</th>
                                                    <th>Approved End Time</th>
                                                    <th>OT Details</th>
                                                    <th>Attachment</th>
                                                    <th>Purpose</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    managerApproved.slice(offset, offset + PER_PAGE).map((data) => {
                                                        return (
                                                            <tr key={data.id}>
                                                                <td>{data.date}</td>
                                                                <td>{data.startTime}</td>
                                                                <td>{data.endTime}</td>
                                                                {/* <td>{data.comments}</td> */}
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
                                managertogglerejected && sessionStorage.getItem("roleID") == 3 && (
                                    <>
                                        <h6 style={{ color: "#3247d5" }}>Showing {managerRejected.length} Results</h6>
                                        <table className='table table-hover'>
                                            <thead className='bg-info text-white'>
                                                <tr>
                                                <th>Controll Number</th>
                                                    <th>EmployeID</th>
                                                    <th>Employee Name</th>
                                                    <th>Date Request</th>
                                                    <th>Approved Start Time</th>
                                                    <th>Approved End Time</th>
                                                    <th>OT Details</th>
                                                    <th>Attachment</th>
                                                    <th>Reject Reason</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    managerRejected.slice(offset, offset + PER_PAGE).map((data) => {
                                                        return (
                                                            <tr key={data.id}>
                                                                <td>{data.date}</td>
                                                                <td>{data.startTime}</td>
                                                                <td>{data.endTime}</td>
                                                                {/* <td>{data.comments}</td> */}
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
                                pending && sessionStorage.getItem("roleID") == 5 && (
                                    <>
                                        <h6 style={{ color: "#3247d5" }}>Showing {newDashboard.length} Results</h6>
                                        <table className='table table-hover'>
                                            <thead className='bg-info text-white'>
                                                <tr>
                                                    <th>Date Request</th>
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
                                                    newDashboard.slice(offset, offset + PER_PAGE).map((data) => {
                                                        return (
                                                            <tr key={data.id}>
                                                                <td>{data.date}</td>
                                                                <td>{data.startTime}</td>
                                                                <td>{data.endTime}</td>
                                                                <td>
                                                                    <button className='edit-btn' onClick={openEditModal}>Details</button>
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
                                approved && sessionStorage.getItem("roleID") == 5 && (
                                    <>
                                        <h6 style={{ color: "#3247d5" }}>Showing {newApproved.length} Results</h6>

                                        <table className='table table-hover'>
                                            <thead className='bg-info text-white'>
                                                <tr>
                                                    <th>Date Request</th>
                                                    <th>Start Time</th>
                                                    <th>End Time</th>
                                                    {/* <th>OT Details</th> */}
                                                    <th>Status</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    newApproved.slice(offset, offset + PER_PAGE).map((data) => {
                                                        return (
                                                            <tr key={data.id}>
                                                                <td>{data.date}</td>
                                                                <td>{data.startTime}</td>
                                                                <td>{data.endTime}</td>
                                                                {/* <td>{data.comments}</td> */}
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
                                rejected && sessionStorage.getItem("roleID") == 5 && (
                                    <>
                                        <h6 style={{ color: "#3247d5" }}>Showing {newApproved.length} Results</h6>
                                        <table className='table table-hover'>
                                            <thead className='bg-info text-white'>
                                                <tr>
                                                    <th>Date Request</th>
                                                    <th>Start Time</th>
                                                    <th>End Time</th>
                                                    <th>Status</th>
                                                    {/* <th>Actions</th> */}
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    newRejected.slice(offset, offset + PER_PAGE).map((data) => {
                                                        return (
                                                            <tr key={data.id}>
                                                                <td>{data.date}</td>
                                                                <td>{data.startTime}</td>
                                                                <td>{data.endTime}</td>
                                                                {/* <td>{data.comments}</td> */}
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
                </div >
            </div>
        </div>
    )
}

export default Index