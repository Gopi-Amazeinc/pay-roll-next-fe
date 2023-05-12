import React from 'react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import loan from "../../../../pages/Requests/Applyloans/applyloans.module.css"
import Modal from 'react-modal';
import Styles from "@../../../pages/OT/Ot.module.css"
import { apiService } from "@/services/api.service";
const Index = () => {
    let staffID;
    let roleID = sessionStorage.getItem("roleID")
    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const [pending, setPending] = useState(false)
    const [approved, setApproved] = useState(false)
    const [rejected, setRejected] = useState(false);
    const [newDashboard, setNewDashboardData] = useState([]);
    const [newApproved, setnewApprovedData] = useState([]);
    const [newRejected, setnewRejectedData] = useState([]);
    const [managerPending, setManagerPendingData] = useState([]);
    const [managerApproved, setManagerApprovedData] = useState([]);
    const [managerRejected, setManagerRejectedData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState([]);
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

    const openEditModal = () => {
        setModalOpen(true)
        console.log("Modal opened");
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
            height: '30%'
        }
    }

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
    const getPendingCompensation = async () => {
        staffID = sessionStorage.getItem("userID");
        const res = await apiService.commonGetCall("Payroll/GetPendingOverTimeDetailsByManagerID?ManagerID=" + staffID)
        setManagerPendingData(res.data)
        console.log("Manager Pending", res.data)
    }
    const getManagerApprovedData = async () => {
        staffID = sessionStorage.getItem("userID");
        const res = await apiService.commonGetCall("Payroll/GetApprovedOverTimeDetailsByManagerID?ManagerID=" + staffID)
        setManagerApprovedData(res.data)
        console.log("Manager Approved", res.data)
    }

    const getManagerRejectedData = async () => {
        staffID = sessionStorage.getItem("userID");
        const res = await apiService.commonGetCall("Payroll/GetRejectOverTimeDetailsByManagerID?ManagerID=" + staffID)
        setManagerRejectedData(res.data)
        console.log("Manager Rejected", res.data)
    }
    const getModalData = async () => {
        staffID = sessionStorage.getItem("userID");
        var date = sessionStorage.getItem("Date");
        var startTime = sessionStorage.getItem("StartTime");
        var endTime = sessionStorage.getItem("EndTime");
        const res = await apiService.commonGetCall("HR/GetOtNightOt?StartTime=" + startTime + "&EndTime=" + endTime + "&Shift=1&StaffID=" + staffID + "&Date=" + date);
        setModalData(res.data);
        console.log("Modal data", res.data);
    }
    const approve = (id) => {
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
                apiService.commonPostCall("Payroll/Payroll/UpdateOtFromManager?id=" + id)
                Swal.fire({
                    icon: "success",
                    titleText: "Approved Successfully"
                })
                getPendingCompensation();
            }
        })
    }
    let id;
    const reject = () => {
        id = sessionStorage.getItem("id")
        alert(id)
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
                staffID = sessionStorage.getItem("userID");
                apiService.commonPostCall("Payroll/Payroll/UpdateOtFromManager?id=" + id)
                Swal.fire({
                    icon: "success",
                    titleText: "Rejected Successfully"
                })
                getPendingCompensation();
            }
        })
    }


    useEffect(() => {
        if (roleID == 5) {
            getPendingDetails();
            getApprovedDetails();
            getRejectedDetails();
            getModalData();
        }
        else if (roleID == 3) {
            staffID=sessionStorage.getItem("userID")
            getPendingCompensation();
            getManagerApprovedData();
            getManagerRejectedData();
            getModalData();
        }

    }, [])
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
        <div>
            <div className='row'>
                <div className='col-lg-3 mt-3 text-primary fs-6 fw-bold'>
                    <h4 className='Heading'>My OvertimeDetails</h4>
                </div>
            </div>
            <div className='card p-3 border-0 shadow-lg rounded-3 mt-4'>
                <div className='row'>
                    <div className='col-lg-3 text-dark fs-6 fw-bolder'>
                        <p>Select Dates</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-4'>
                        <input type="date" className='form-control' />
                    </div>
                    <div className='col-lg-4'>
                        <input type="date" className='form-control' />
                    </div>
                    <div className='col-lg-4 mb-4'>
                        <Link href="/Requests/OverTimeDetails/new">
                            <button className={loan.addButton}>Apply Overtime</button>
                        </Link>
                    </div>
                    <br />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-lg-9"></div>
                <div className="col-lg-3">

                </div>
            </div>
            <div className="row mt-2">
                <div className="col-lg-12 dashbutton bttn">
                    <div className='col-lg-4 mx-2'><br />
                        <div className='btn-group'>
                            <button onClick={togglePending} className="toggleButton">Pending</button>
                            <button onClick={toggleApproved} className="toggleButton">Approved</button>
                            <button onClick={toggleRejected} className="toggleButton">Rejected</button>
                        </div>
                    </div>
                    <br />
                </div>
            </div>
            {
                pending && sessionStorage.getItem("roleID") == 3 && (
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
                                managerPending.map((data) => {
                                    return (
                                        <tr key={data.id}>
                                            <td>{data.date}</td>
                                            <td>{data.startTime}</td>
                                            <td>{data.endTime}</td>
                                            <td>
                                                <button className='edit-btn' onClick={openEditModal} >Details</button>
                                            </td>
                                            <td>{data.comments}</td>
                                            <td>{data.status}</td>
                                            <td>
                                                <button onClick={approve.bind(this, data.id)} className='edit-btn'>Approve</button>
                                                <button onClick={openModal(sessionStorage.setItem("id", data.id))} className='edit-btn'>Reject</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                )
            }


            {
                approved && sessionStorage.getItem("roleID") == 3 && (
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
                                managerApproved.map((data) => {
                                    return (
                                        <tr key={data.id}>
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
                )
            }


            {
                rejected && sessionStorage.getItem("roleID") == 3 && (
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
                                managerRejected.map((data) => {
                                    return (
                                        <tr key={data.id}>
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
                )
            }
            {
                pending && sessionStorage.getItem("roleID") != 2 && (
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
                                newDashboard.map((data) => {
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
                )
            }
            {
                approved && sessionStorage.getItem("roleID") != 2 && (
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
                                newApproved.map((data) => {
                                    return (
                                        <tr key={data.id}>
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
                )
            }
            {
                rejected && sessionStorage.getItem("roleID") != 2 && (
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
                                newRejected.map((data) => {
                                    return (
                                        <tr key={data.id}>
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
                )
            }
            <Modal isOpen={modalOpen} style={customStyles} contentLabel="Example Modal">
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
                        <button
                            aria-label="Close"
                            type="button"
                            className={Styles.close}
                            onClick={closeModal}
                        >X
                        </button>
                    </div>
                </div>
                <div className='row mt-4'>
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
    )
}

export default Index