import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai'
import { apiService } from "@/services/api.service";
import ReactPaginate from "react-paginate";
import leave from "../../../../pages/Requests/Compensationtimeout/compensation.module.css"

const MyTeamCompensationtimeout = () => {


    const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;

    const [pending, setPending] = useState(true)
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
    const [isOpen, ModalIsOpen] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [roleID, setRoleID] = useState();
    const [userID, setUserID] = useState()
    const [count, setcount] = useState("");

    const openModal = () => {
        ModalIsOpen(true)
    }


    const togglePending = () => {
        setPending(true);
        setApproved(false)
        setRejected(false)
        setManagerTogglePending(true)
        setManagerToggleApproved(false)
        setManagerToggleRejected(false)
        console.log("pending manager login")
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


    const customStyles = {
        content: {
            top: '5%',
            left: '20%',
            right: '20%',
            bottom: '50%'
        },
    };



    const getPendingData = async () => {

        const res = await apiService.commonGetCall("Payroll/GetPendingCompensationTimeOutBySupervisor?UserID=" + userID)
        // sessionStorage.setItem("supervisorID", res.data[0].supervisor)
        getPending(res.data)
        setcount(res.data.length);
    }

    const getApprovedData = async () => {

        const res = await apiService.commonGetCall("Payroll/GetApproveCompensationTimeOutBySupervisor?UserID=" + userID)
        getApproved(res.data, "employee approved")
        setcount(res.data.length);
    }

    const getRejectedData = async () => {

        const res = await apiService.commonGetCall("Payroll/GetRejectCompensationTimeOutBySupervisor?UserID=" + userID)
        getRejected(res.data)
        setcount(res.data.length);
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
    const PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(0);
    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(pendingDashboard.length / PER_PAGE);

    useEffect(() => {
        const usrID = sessionStorage.getItem("userID");
        setUserID(usrID);
        const userRoleID = sessionStorage.getItem("roleID");
        setRoleID(userRoleID);
        getPendingData()
        getPendingCompensation();
        getApprovedData();
        getRejectedData();
        getManagerApprovedData();
        getManagerRejectedData();
        setPending(true);
        console.log("working useEffect")
    }, [])

    return (

        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-12'>
                    <p className='Heading'>Compensation Time Out</p>
                    <div className='card p-3 border-0 rounded-3'>
                        <div className='row p-3'>
                            <div className='col-lg-1'>
                                <label style={{ fontWeight: "bold" }}>Filter By</label>
                            </div>

                            <div className='col-lg-3'>
                                <input type="search" className='form-control' placeholder='Search here...' onChange={e => setKeyword(e.target.value)} />
                            </div>
                            {
                                roleID != "3" && (
                                    <div className='col-lg-3' style={{ whiteSpace: "nowrap" }}>
                                        <Link href="/Requests/Compensationtimeout/new"><button className='EditDelteBTN'>Add Compensation Time Out</button></Link>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <br /><br />
                    <div className='row'>
                        <div className='col-lg-4'>
                            <div className='btn-group'>
                                <button onClick={togglePending} className={`toggleButton ${pending ? "focus" : ""}`} >Pending</button>
                                <button onClick={toggleApproved} className={`toggleButton ${approved ? "focus" : ""}`}  >Approved</button>
                                <button onClick={toggleRejected} className={`toggleButton ${rejected ? "focus" : ""}`} >Rejected</button>
                            </div>
                            <h6 style={{ color: "#3247d5" }}>Showing {count} Results</h6>
                        </div>
                    </div>
                    <br /><br />

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
                    <div className='row'>
                        <div className='col-lg-12'>
                            {
                                pending && roleID == "3" && (
                                    <table className='table'>
                                        <thead className='bg-info text-white'>
                                            <tr>
                                                <th input type='checkbox'></th>
                                                <th>Controll Number</th>
                                                <th>Employe ID</th>
                                                <th>Employee Name</th>
                                                <th>Date</th>
                                                <th>Start Time</th>
                                                <th>End Time</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                pendingDashboard.filter(data => {
                                                    if ((data.date.toString().includes(keyword.toLowerCase())) || (data.status.toLowerCase().includes(keyword)) || (data.actuval_StartTime.toString().includes(keyword.toLowerCase())) || (data.actuval_EndTime.toString().includes(keyword.toLowerCase())) || (data.comments.toString().includes(keyword.toLowerCase()))) {
                                                        return data;
                                                    }
                                                }).slice(offset, offset + PER_PAGE).map((data) => {
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
                                approved && roleID == "3" && (
                                    <table className='table table-hover'>
                                        <thead className='bg-info text-white'>
                                            <tr>
                                                <th>Controll Number</th>
                                                <th>Employe ID</th>
                                                <th>Employee Name</th>
                                                <th>Date</th>
                                                <th>Start Time</th>
                                                <th>End Time</th>  <th>Date</th>
                                                <th>Start Time</th>
                                                <th>End Time</th>
                                                <th>Reason</th>

                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                approvedDashboard.filter(data => {
                                                    if ((data.date.toString().includes(keyword.toLowerCase())) || (data.status.toLowerCase().includes(keyword))) {
                                                        return data;
                                                    }
                                                }).slice(offset, offset + PER_PAGE).map((data) => {
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
                                rejected && roleID == "3" && (
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
                                                rejecteddDashboard.filter(data => {
                                                    if ((data.date.toLowerCase().includes(keyword.toLowerCase())) || (data.status.toLowerCase().includes(keyword))) {
                                                        return data;
                                                    }
                                                }).slice(offset, offset + PER_PAGE).map((data) => {
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


                        </div>
                    </div>
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
        </div>



    )
}

export default MyTeamCompensationtimeout