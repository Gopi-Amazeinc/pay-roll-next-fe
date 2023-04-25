import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai'
const Compensationtimeout = () => {
    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [pending, setPending] = useState(false)
    const [approved, setApproved] = useState(false)
    const [rejected, setRejected] = useState(false)


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
        setApproved(false)
        setPending(false)
    }

    const customStyles = {
        content: {
            top: '5%',
            left: '20%',
            right: '20%',
            bottom: '50%'
        },
    };

    return (
        <div className='container'>
            <h3 className='text-primary fs-5 mt-3'>Compensation Time Out</h3>
            <div className='card p-3 border-0 shadow-lg rounded-3 mt-4'>
                <div className='row p-3'>
                    <div className='col-lg-1'>
                        <p>Filter By</p>
                    </div>

                    <div className='col-lg-5'>
                        <input type="text" className='form-control' placeholder='Search...' />
                    </div>

                    <div className='col-lg-4'>
                        <Link href="/Requests/compensationtimeoutform"><button className='btn btn-primary AddButton'>Add Compensation Time Out</button></Link>
                    </div>
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col-lg-4'>
                    <div className='btn-group'>
                        <button onClick={togglePending} className='btn btn-primary' >Pending</button>
                        <button onClick={toggleApproved} className='btn btn-primary'  >Approved</button>
                        <button onClick={toggleRejected} className='btn btn-primary' >Rejected</button>
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
                            <button type='submit' className='edit-btn mt-5'>Reject </button>
                        </div>
                    </div>
                </div>
            </Modal>

            <div className='row mt-3'>
                <div className='col-lg-2 text-primary fs-6 fw-bold'>
                    <h6>Showing Results</h6>
                </div>
                {
                    pending && sessionStorage.getItem("roleID") != "2" && (
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

                    pending && sessionStorage.getItem("roleID") == "2" && (
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
                    approved && sessionStorage.getItem("roleID") != "2" && (
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

                    approved && sessionStorage.getItem("roleID") == "2" && (
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
                    rejected && sessionStorage.getItem("roleID") != "2" && (
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

                    rejected && sessionStorage.getItem("roleID") == "2" && (
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