import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai'
import { apiService } from "@/services/api.service";
import leave from "../../../../pages/Requests/Compensationtimeout/compensation.module.css"

const Compensationtimeout = () => {


    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    const [pending, setPending] = useState(false)
    const [approved, setApproved] = useState(false)
    const [rejected, setRejected] = useState(false)
    const [managertogglePending, setManagerTogglePending] = useState(false)
    const [managerToggleapproved, setManagerToggleApproved] = useState(false)
    const [managertogglerejected, setManagerToggleRejected] = useState(false);


    const [pendingDashboard, getPending] = useState([])
    const [approvedDashboard, getApproved] = useState([])
    const [rejecteddDashboard, getRejected] = useState([])
    const [compensation, getComponsation] = useState([])
    const [managerApproved, getManagerApproved] = useState([])
    const [managerRejected, getManagerRejected] = useState([])
    const [isOpen, ModalIsOpen] = useState(false)

    const openModal = () => {
        ModalIsOpen(true)
    }


    const togglePending = (e) => {
        e.preventDefault();
        setPending(true)
        setApproved(false)
        setRejected(false)
        setManagerTogglePending(true)
        setManagerToggleApproved(false)
        setManagerToggleRejected(false)
    }

    const toggleApproved = (e) => {
        e.preventDefault();
        setApproved(true)
        setPending(false)
        setRejected(false)
        setManagerTogglePending(false);
        setManagerToggleApproved(true);
        setManagerToggleRejected(false);
        console.log("pending manager login")
    }

    const toggleRejected = (e) => {
        e.preventDefault();
        setRejected(true)
        setApproved(false)
        setPending(false)
        setManagerTogglePending(false);
        setManagerToggleApproved(false);
        setManagerToggleRejected(true);
    }

    const customStyles = {
        content: {
            top: '5%',
            left: '20%',
            right: '20%',
            bottom: '50%'
        },
    };


    let staffID;
    staffID = sessionStorage.getItem("userID")
    const getPendingData = async () => {
        staffID = sessionStorage.getItem("userID");
        const res = await apiService.commonGetCall("Payroll/GetPendingCompensationTimeOutByStaffID?UserID=" + staffID)
        // sessionStorage.setItem("supervisorID", res.data[0].supervisor)
        getPending(res.data)
    }

    const getApprovedData = async () => {
        staffID = sessionStorage.getItem("userID");
        const res = await apiService.commonGetCall("Payroll/GetApproveCompensationTimeOutByStaffID?UserID=" + staffID)
        getApproved(res.data, "employee approved")
    }

    const getRejectedData = async () => {
        staffID = sessionStorage.getItem("userID");
        const res = await apiService.commonGetCall("Payroll/GetRejectCompensationTimeOutByStaffID?UserID=" + staffID)
        getRejected(res.data)
    }

    const getManagerApprovedData = async () => {
        const res = await apiService.commonGetCall("Payroll/GetApproveCompensationTimeOutBySupervisor?UserID=" + 20540)
        console.log(res.data)
        getManagerApproved(res.data)
    }

    const getManagerRejectedData = async () => {
        const res = await apiService.commonGetCall("Payroll/GetRejectCompensationTimeOutBySupervisor?UserID=" + 20540)
        console.log(res.data)
        getManagerRejected(res.data)
    }

    const getPendingCompensation = async () => {
        staffID = sessionStorage.getItem("userID");
        const res = await apiService.commonGetCall("Payroll/GetPendingCompensationTimeOutBySupervisor?UserID=" + 20540)
        console.log(res.data, "manager pending")
        getComponsation(res.data)
    }

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
                apiService.commonGetCall("Payroll/DeleteCompensationTimeOut?id=" + id)
                Swal.fire({
                    icon: "success",
                    titleText: "Cancelled Successfully"
                })
                getPendingData();
            }
        }
        )
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
                apiService.commonPostCall("Payroll/ApproveCompensationTimeOut?id=" + id)
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
        // Swal.fire({
        //     title: 'Confirm To Reject?',
        //     text: "You won't be able to revert this!",
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Yes, Reject it!'
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         staffID = sessionStorage.getItem("userID");
        //         axios.post(hostURL + "Payroll/RejectCompensationTimeOut?id=" + id)
        //         Swal.fire({
        //             icon: "success",
        //             titleText: "Rejected Successfully"
        //         })
        //         getPendingCompensation();
        //     }
        // })
    }

    useEffect(() => {
        getPendingData()
        getPendingCompensation();
        getApprovedData();
        getRejectedData();
        getManagerApprovedData();
        getManagerRejectedData();
        console.log("working useEffect")
    }, [1])

    return (

        <div className='container'>
            <h3 className='Heading'>Compensation Time Out</h3>
            <div className='card p-3 border-0 shadow-lg rounded-3 mt-4'>
                <div className='row p-3'>
                    <div className='col-lg-1'>
                        <p>Filter By</p>
                    </div>

                    <div className='col-lg-5'>
                        <input type="text" className='form-control' placeholder='Search...' />
                    </div>
                    {
                        sessionStorage.getItem("roleID") != "3" && (
                            <div className='col-lg-6'>
                                <Link href="/Requests/Compensationtimeout/new"><button className='submit-button'>Add Compensation Time Out</button></Link>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col-lg-4'>
                    <div className='btn-group'>
                        <button onClick={() => togglePending} className='toggleButton' >Pending</button>
                        <button onClick={() => toggleApproved} className='toggleButton'  >Approved</button>
                        <button onClick={() => toggleRejected} className='toggleButton' >Rejected</button>
                    </div>
                </div>
            </div>

            <Modal isOpen={isOpen} style={customStyles}>
                <div className='container'>
                    <div className='row card-header'>
                        <div className='col-lg-8 mt-3'>
                            <h4>Rejecting Request</h4>
                        </div>
                        <div className='col-lg-3'></div>
                        <div className='col-lg-1 mt-3 mb-3'>
                            <button onClick={() => ModalIsOpen(false)} className='btn-primary'><AiOutlineClose /></button>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-lg-12'>
                            <textarea rows={4} className='form-control'></textarea>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-8'></div>
                        <div className='col-lg-2 mb-3'>
                            <button type='submit' className=' edit-btn mt-5'>Cancel</button>
                        </div>
                        <div className='col-lg-2 mb-3'>
                            <button onClick={reject} type='submit' className='edit-btn mt-5'>Reject </button>
                        </div>
                    </div>
                </div>
            </Modal>

            <div className='row mt-3'>
                <div className='Heading'>
                    <h6>Showing Results</h6>
                </div>
                {
                    pending && sessionStorage.getItem("roleID") != "3" && (
                        <table className='table table-hover'>
                            <thead className='bg-info text-white'>
                                <tr>
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Comments</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    pendingDashboard.map((data) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>{data.date}</td>
                                                <td>{data.actuval_StartTime}</td>
                                                <td>{data.actuval_EndTime}</td>
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

                    managertogglePending && sessionStorage.getItem("roleID") == "3" && (
                        <table className='table table-hover'>
                            <thead className='bg-info text-white'>
                                <tr>
                                    <th>Employee Name</th>
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th colSpan={2}>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    compensation.map((data) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>{data.staffname}</td>
                                                <td>{data.date}</td>
                                                <td>{data.actuval_StartTime}</td>
                                                <td>{data.actuval_EndTime}</td>
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
                    approved && sessionStorage.getItem("roleID") != "3" && (
                        <table className='table table-hover'>
                            <thead className='bg-info text-white'>
                                <tr>
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Comments</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    approvedDashboard.map((data) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>{data.date}</td>
                                                <td>{data.actuval_StartTime}</td>
                                                <td>{data.actuval_EndTime}</td>
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

                    managerToggleapproved && sessionStorage.getItem("roleID") == "3" && (
                        <table className='table table-hover'>
                            <thead className='bg-info text-white'>
                                <tr>
                                    <th>Employee Name</th>
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    managerApproved.map((data) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>{data.staffname}</td>
                                                <td>{data.date}</td>
                                                <td>{data.actuval_StartTime}</td>
                                                <td>{data.actuval_EndTime}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    )
                }

                {
                    rejected && sessionStorage.getItem("roleID") != "3" && (
                        <table className='table table-hover'>
                            <thead className='bg-info text-white'>
                                <tr>
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    rejecteddDashboard.map((data) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>{data.date}</td>
                                                <td>{data.actuval_StartTime}</td>
                                                <td>{data.actuval_EndTime}</td>
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

                    managertogglerejected && sessionStorage.getItem("roleID") == "3" && (
                        <table className='table table-hover'>
                            <thead className='bg-info text-white'>
                                <tr>
                                    <th>Employee Name</th>
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    managerRejected.map((data) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>{data.staffname}</td>
                                                <td>{data.date}</td>
                                                <td>{data.actuval_StartTime}</td>
                                                <td>{data.actuval_EndTime}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    )
                }
            </div>
        </div>

    )
}

export default Compensationtimeout