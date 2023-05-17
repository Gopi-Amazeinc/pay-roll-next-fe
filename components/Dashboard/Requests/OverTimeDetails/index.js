import React from 'react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import loan from "../../../../pages/Requests/Applyloans/applyloans.module.css"
import Modal from 'react-modal';
import Styles from "@../../../pages/OT/Ot.module.css"
import { apiService } from "@/services/api.service";
import { useForm } from 'react-hook-form';
const Index = () => {
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
    const [userID, setUserID] = useState();
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

    const openEditModal = () => {
        setModalOpen(true)
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
        // debugger;
        const res = await apiService.commonGetCall("Payroll/GetPendingStaffOverTimeDetails")
        setNewDashboardData(res.data);
        console.log("Pending emp", res.data);
    }
    const getApprovedDetails = async () => {
        // debugger;
        const res = await apiService.commonGetCall("Payroll/GetApproveStaffOverTimeDetails")
        setnewApprovedData(res.data);
        console.log("Approved", res.data);
    }
    const getRejectedDetails = async () => {
        const res = await apiService.commonGetCall("Payroll/GetRejectStaffOverTimeDetails")
        setnewRejectedData(res.data);
        console.log("Rejected", res.data);
    }
    const getManagerPendingDetails = async () => {
        // debugger;
        const res = await apiService.commonGetCall("Payroll/GetPendingOverTimeDetailsByManagerID?ManagerID=" + userID)
        setManagerPendingData(res.data)
        console.log("Manager Pending", res.data);
    }
    const getManagerApprovedData = async () => {
        // debugger;
        const res = await apiService.commonGetCall("Payroll/GetApprovedOverTimeDetailsByManagerID?ManagerID=" + userID)
        setManagerApprovedData(res.data)
        console.log("Manager Approved", res.data);
    }

    const getManagerRejectedData = async () => {
        // debugger;
        const res = await apiService.commonGetCall("Payroll/GetRejectOverTimeDetailsByManagerID?ManagerID=" + userID)
        setManagerRejectedData(res.data)
        console.log("Manager Rejected", res.data);
    }
    const getModalData = async (startTime, endTime, date, userID) => {
        // debugger;      
        const res = await apiService.commonGetCall("HR/GetOtNightOt?StartTime=" + startTime + "&EndTime=" + endTime + "&Shift=1&StaffID=" + userID + "&Date=" + date);
        setModalData(res.data);
        console.log("Modal data", res.data);
    }
    const approve = (id) => {
        // debugger;
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
                apiService.commonPostCall("Payroll/UpdateApproveOtFromManager?id=" + id + "&Status=ManagerApproved")
                Swal.fire({
                    icon: "success",
                    titleText: "Approved Successfully"
                })
                getManagerPendingDetails();
            }
        })
    }
    let id;
    const reject = () => {
        // debugger;
        id = sessionStorage.getItem("id")
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
                var Reason = watch("Reason")
                // staffID = sessionStorage.getItem("userID");
                apiService.commonPostCall("Payroll/UpdateOtFromManager?id=" + id + "&Status=ManagerRejected" + "RejectedReason=" + Reason);
                Swal.fire({
                    icon: "success",
                    titleText: "Rejected Successfully"
                })
                getManagerPendingDetails();
            }
        })
    }

    useEffect(() => {
        debugger;
        const usrID = sessionStorage.getItem("userID");
        setUserID(usrID);
        const userRoleID = sessionStorage.getItem("roleID");
        setRoleID(userRoleID);
        var date = sessionStorage.getItem("Date");
        var startTime = sessionStorage.getItem("StartTime");
        var endTime = sessionStorage.getItem("EndTime");
        if (roleID == 5) {
            getPendingDetails();
            getApprovedDetails();
            getRejectedDetails();
            getModalData(startTime, endTime, date, userID);
        }
        else if (roleID == 3) {
            getManagerPendingDetails(userID);
            getManagerApprovedData(userID);
            getManagerRejectedData(userID);
            getModalData(startTime, endTime, date, userID);
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
        <div className='container'>
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
                managertogglePending && sessionStorage.getItem("roleID") == 3 && (
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
                                                <button onClick={() => openModal(sessionStorage.setItem("id", data.id))} className='edit-btn'>Reject</button>
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
                managerToggleapproved && sessionStorage.getItem("roleID") == 3 && (
                    <table className='table table-hover'>
                        <thead className='bg-info text-white'>
                            <tr>
                                <th>Date Request</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                {/* <th>Purpose</th> */}
                                <th>Status</th>
                                {/* <th>Actions</th> */}
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
                                            {/* <td>{data.comments}</td> */}
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
                managertogglerejected && sessionStorage.getItem("roleID") == 3 && (
                    <table className='table table-hover'>
                        <thead className='bg-info text-white'>
                            <tr>
                                <th>Date Request</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                {/* <th>OT Details</th> */}
                                {/* <th>Purpose</th> */}
                                <th>Status</th>
                                {/* <th>Actions</th> */}
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
                                            {/* <td>{data.comments}</td> */}
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
                pending && sessionStorage.getItem("roleID") == 5 && (
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
                approved && sessionStorage.getItem("roleID") == 5 && (
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
                                newApproved.map((data) => {
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
                )
            }
            {
                rejected && sessionStorage.getItem("roleID") == 5 && (
                    <table className='table table-hover'>
                        <thead className='bg-info text-white'>
                            <tr>
                                <th>Date Request</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                {/* <th>OT Details</th> */}
                                {/* <th>Purpose</th> */}
                                <th>Status</th>
                                {/* <th>Actions</th> */}
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
                                            {/* <td>{data.comments}</td> */}
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
            <Modal isOpen={isOpen} style={customStyles}>
                <div className='container'>
                    <div className='row card-header'>
                        <div className='col-lg-8 mt-3'>
                            <h4>Rejecting Request</h4>
                        </div>
                        <div className='col-lg-3'></div>
                        <div className='col-lg-1 mt-3 mb-3'>
                            <button onClick={() => ModalIsOpen(false)} className='btn-primary'>X</button>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-lg-12'>
                            <textarea rows={4} {...register("Reason")} className='form-control'></textarea>
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
        </div>
    )
}

export default Index