import Link from "next/link";
import { useEffect, useState } from 'react';
import Layout from "@/components/layout/layout"
import { apiService } from "@/services/api.service";
import Swal from 'sweetalert2';
import ReactPaginate from "react-paginate";
import Modal from 'react-modal';
import Styles from "@../../../pages/OT/Ot.module.css"
import { useForm } from 'react-hook-form';




const MyTeamObasisRequest = () => {

    const { register, handleSubmit, watch, formState } = useForm();

    const [pending, setPending] = useState(false)
    const [approved, setApproved] = useState(false)
    const [rejected, setRejected] = useState(false)

    const [pendingDashboard, getPending] = useState([])
    const [approvedDashboard, getApproved] = useState([])
    const [rejecteddDashboard, getRejected] = useState([])
    const [keyword, setKeyword] = useState("");
    const [userID, setUserID] = useState();

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [isOpen, ModalIsOpen] = useState(false)

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
    const PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(0);
    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(pendingDashboard.length / PER_PAGE);
    const togglePending = () => {
        setApproved(false)
        setRejected(false)
        setPending(true)
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
    const getPendingData = async () => {
        debugger;
        let UserID = sessionStorage.getItem("userID");
        let pending = await apiService.commonGetCall("Payroll/GetPendingLocatorTableBySupervisorID?UserID=" + UserID);
        getPending(pending.data);
        console.log("pending", pending.data)
    }
    const getApproveData = async () => {
        debugger;
        let UserID = sessionStorage.getItem("userID");
        let approved = await apiService.commonGetCall("Payroll/GetApproveLocatorTableBySupervisorID?UserID=" + UserID);
        getApproved(approved.data);
        console.log("approved", approved.data)
    }

    const getRejectedData = async () => {
        debugger;
        let UserID = sessionStorage.getItem("userID");
        let rejected = await apiService.commonGetCall("Payroll/GetRejectLocatorTableBySupervisorID?UserID=" + UserID);
        getRejected(rejected.data);
        console.log(rejected.data, "rejected")
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
                apiService.commonPostCall("Payroll/ApproveLocatorTable?id=" + id + "&Status=ManagerApproved")
                Swal.fire({
                    icon: "success",
                    titleText: "Approved Successfully"
                })
                getPendingData();
            }
        })
    }
    let id;

    // const reject = async () => {
    //     let ID = sessionStorage.getItem("id")
    //     let reason = watch("reason")
    //     const res = await apiService.commonPostCall("Payroll/UpdateOtFromManager", reason, id)
    //     sessionStorage.removeItem('id');
    //     setModalOpen(!modalOpen)
    // }
    const reject = () => {
        debugger;
        id = sessionStorage.getItem("id")
        let reason = watch("Reason")
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
                apiService.commonPostCall("Payroll/UpdateOtFromManager", reason, id);
                Swal.fire({
                    icon: "success",
                    titleText: "Rejected Successfully"
                })
                getPendingData();
            }
        })
    }
    useEffect(() => {
        const usrID = sessionStorage.getItem("userID");
        setUserID(usrID);
        setPending(true);
        if (userID) {
            const resu = getCurrentMonthDates();
            if (resu) {
                getPendingData(userID)
                getApproveData(userID);
                getRejectedData(userID);
            }
        }
        return;
    }, [userID])

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

    return (
        <Layout>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <Link style={{ textDecoration: "none" }} href="/Requests/Locatorrequest">  <span className="Heading">My OBASIS Details</span> </Link>&nbsp;&nbsp;&nbsp;
                        <Link style={{ borderBottom: "2px solid #2f87cc;" }} href="/Requests/Myteamobasisrequest">  <span className="Heading">My Team OBASIS Details</span> </Link>
                        <br />         <br />
                        <div className="card p-3 rounded-3 shadow border-0 ">

                            <div className="row">
                                <div className="col-lg-1">
                                    <label style={{ fontWeight: "bold" }}> Filter By</label>
                                </div>
                                <div className="col-lg-2">
                                    <label style={{ fontWeight: "bold" }}>From Date</label>
                                    <input type="date" className="form-control" onChange={(e) => getStartDate(e.target.value)} />
                                </div>
                                <div className="col-lg-2">
                                    <label style={{ fontWeight: "bold" }}>To Date</label>
                                    <input type="date" className="form-control" onChange={(e) => getEndDate(e.target.value)} />
                                </div>
                                <div className="col-lg-3">
                                    <br />
                                    <input
                                        type="search"
                                        placeholder="Search for Date and Staff"
                                        className="form-control"
                                        onChange={e => setKeyword(e.target.value)}
                                    ></input>
                                </div>
                                <div className="col-lg-2">
                                    <br />
                                    <button className="download-btn">Download</button>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col-4">
                                <button onClick={togglePending} className={`toggleButton ${pending ? "focus" : ""}`}>Pending</button>
                                <button onClick={toggleApproved} className={`toggleButton ${approved ? "focus" : ""}`}>Approved</button>
                                <button onClick={toggleRejected} className={`toggleButton ${rejected ? "focus" : ""}`}>Rejected</button>
                            </div>
                            <div className="col-6"></div>
                            <div className="col-2">
                                {/* <Link href="/Requests/Locatorrequest/new"><button className="submit-button">New Requests </button></Link> */}
                            </div>
                        </div>
                        <br />

                        <div className="row">
                            <div className="col-lg-12">
                                {pending && (
                                    <>
                                        <div className="row">
                                            <span style={{ color: "#3247d5" }}>Showing {pendingDashboard.length} results</span>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-lg-12">


                                                <table className='table text-center' >
                                                    <thead>
                                                        <tr>
                                                            <th>Select All &nbsp;   <input type="checkbox" /> </th>
                                                            {/* <th>Controll Number</th> */}
                                                            <th>EmployeID</th>
                                                            <th>Employee Name</th>
                                                            <th>Date</th>
                                                            <th>Start Time</th>
                                                            <th>End Time</th>
                                                            <th>Task</th>
                                                            <th>Comments</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {pendingDashboard.filter(data => {
                                                            if ((data.date.toString().includes(keyword.toString())) || (data.approveStatus.toLowerCase().includes(keyword.toLowerCase())) || (data.startTime.toString().includes(keyword.toString())) || (data.endTime.toString().includes(keyword.toString())) || (data.task.toString().includes(keyword.toString())) || (data.comments.toString().includes(keyword.toString()))) {
                                                                return data;
                                                            }
                                                        }).slice(offset, offset + PER_PAGE).map((data, index) => {
                                                            return (
                                                                <tr key={index}>

                                                                    <td><input type="checkbox" /></td>
                                                                    <td>{data.staffID}</td>
                                                                    <td>{data.staffname}</td>
                                                                    <td>{data.date}</td>
                                                                    <td>{data.startTime}</td>
                                                                    <td>{data.endTime}</td>
                                                                    <td>{data.task}</td>
                                                                    <td>{data.comments}</td>
                                                                    <td>
                                                                        <button onClick={approve.bind(this, data.id)} className='edit-btn'>Approve</button>&nbsp;&nbsp;&nbsp;
                                                                        <button onClick={() => openModal(sessionStorage.setItem("id", data.id))} className='edit-btn'>Reject</button>
                                                                    </td>
                                                                    {/* <td>{data.approveStatus}</td> */}
                                                                    {/* <td>{
                                                <b>{data.statusID === 0 ? 'Manager Pending' :
                                                    data.statusID === 1 ? 'Manager approved' :
                                                        data.statusID === 2 ? 'Manager Rejected' : ' '}</b>
                                            }
                                            </td> */}
                                                                    {/* <td><button onClick={Delete.bind(this, data.id)} className="edit-btn">Cancel</button></td> */}
                                                                </tr>
                                                            )
                                                        })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </>
                                )}

                                {approved && (
                                    <>
                                        <div className="row">
                                            <span style={{ color: "#3247d5" }} >Showing {approvedDashboard.length} results</span>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <table className='table text-center' >
                                                    <thead>
                                                        <tr>
                                                            {/* <th>Controll Number</th> */}
                                                            <th>EmployeID</th>
                                                            <th>Employee Name</th>
                                                            <th>Date</th>
                                                            <th>Start Time</th>
                                                            <th>End Time</th>
                                                            <th>Task</th>
                                                            <th>Comments</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {approvedDashboard.filter(data => {
                                                            if ((data.date.toString().includes(keyword.toString())) || (data.approveStatus.toLowerCase().includes(keyword.toLowerCase())) || (data.startTime.toString().includes(keyword.toString())) || (data.endTime.toString().includes(keyword.toString())) || (data.task.toString().includes(keyword.toString())) || (data.comments.toString().includes(keyword.toString()))) {
                                                                return data;
                                                            }
                                                        }).slice(offset, offset + PER_PAGE).map((data, index) => {
                                                            return (
                                                                <tr className="text-dark" key={index}>

                                                                    <td>{data.staffID}</td>
                                                                    <td>{data.staffname}</td>
                                                                    <td>{data.date}</td>
                                                                    <td>{data.startTime}</td>
                                                                    <td>{data.endTime}</td>
                                                                    <td>{data.task}</td>
                                                                    <td>{data.comments}</td>
                                                                    <td>{data.approveStatus}</td>
                                                                </tr>
                                                            )
                                                        })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {rejected && (
                                    <>
                                        <div className="row">
                                            <span style={{ color: "#3247d5" }} >Showing {rejecteddDashboard.length} results</span>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <table className='table text-center' >
                                                    <thead>
                                                        <tr>
                                                            <th>Controll Number</th>
                                                            <th>EmployeID</th>
                                                            <th>Employee Name</th>
                                                            <th>Date</th>
                                                            <th>Start Time</th>
                                                            <th>End Time</th>
                                                            <th>Task</th>
                                                            <th>Comments</th>
                                                            <th>Status</th>
                                                            <th>Reason</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {rejecteddDashboard.filter(data => {
                                                            if ((data.date.toString().includes(keyword.toString())) || (data.approveStatus.toLowerCase().includes(keyword.toLowerCase())) || (data.startTime.toString().includes(keyword.toString())) || (data.endTime.toString().includes(keyword.toString())) || (data.task.toString().includes(keyword.toString())) || (data.comments.toString().includes(keyword.toString()))) {
                                                                return data;
                                                            }
                                                        }).slice(offset, offset + PER_PAGE).map((data, index) => {
                                                            return (
                                                                <tr className="text-dark" key={index}>
                                                                    <td>{data.staffID}</td>
                                                                    <td>{data.staffname}</td>
                                                                    <td>{data.date}</td>
                                                                    <td>{data.startTime}</td>
                                                                    <td>{data.endTime}</td>
                                                                    <td>{data.task}</td>
                                                                    <td>{data.comments}</td>
                                                                    <td>{data.approveStatus}</td>
                                                                    <td>{data.rejectComments}</td>
                                                                </tr>
                                                            )
                                                        })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
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
        </Layout>
    )
}
export default MyTeamObasisRequest;