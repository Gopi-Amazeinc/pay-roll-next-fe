import Link from "next/link";
import { useEffect, useState } from 'react';
import Layout from "@/components/layout/layout"
import { apiService } from "@/services/api.service";
import Swal from 'sweetalert2';
import ReactPaginate from "react-paginate";
import Image from "next/image";
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai'

const Locatordashboard = () => {

    const [pending, setPending] = useState(false)
    const [approved, setApproved] = useState(false)
    const [rejected, setRejected] = useState(false)

    const [pendingDashboard, getPending] = useState([])
    const [approvedDashboard, getApproved] = useState([])
    const [rejecteddDashboard, getRejected] = useState([])
    const [keyword, setKeyword] = useState("");
    const [userID, setUserID] = useState();
    const [count, setcount] = useState("");

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
        let pending = await apiService.commonGetCall("Payroll/GetLocatorRequests?UserID=" + UserID);
        getPending(pending.data);
        console.log("pending", pending.data)
        setcount(pending.data.length);
    }
    const getApproveData = async () => {
        debugger;
        let UserID = sessionStorage.getItem("userID");
        let approved = await apiService.commonGetCall("Payroll/GetApprovedLocatorRequest?UserID=" + UserID);
        getApproved(approved.data);
        console.log("approved", approved.data)
        setcount(approved.data.length);
    }

    const getRejectedData = async () => {
        debugger;
        let UserID = sessionStorage.getItem("userID");
        let rejected = await apiService.commonGetCall("Payroll/GetRejectedLocatorRequest?UserID=" + UserID);
        getRejected(rejected.data);
        console.log(rejected.data, "rejected")
        setcount(rejected.data.length);
    }

    const Delete = (id) => {
        debugger;
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
                apiService.commonGetCall("Payroll/CancelLocatorRequest?ID=" + id)
                Swal.fire({
                    icon: "success",
                    titleText: "Cancelled Successfully"
                })
                getPendingData();
            }
        }
        )
    }
    const [roleID, setRoleID] = useState();

    useEffect(() => {
        const usrID = sessionStorage.getItem("userID");
        setUserID(usrID);
        const userRoleID = sessionStorage.getItem("roleID");
        setRoleID(userRoleID);
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

    const [modal, setModal] = useState(false);
    const [previewImg, setPreview] = useState()

    const ImagePreview = (image) => {
        setModal(!modal)
        setPreview(image)
    }

    const customStyles = {
        content: {
            top: '3%',
            left: '20%',
            right: '20%',
            bottom: '37%'
        },
    };

    return (
        <Layout>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <br />
                        <div className="row">
                            <div className="col-lg-3">
                                <Link href="/Requests/Locatorrequest">  <label className="mainheader">My Obasis Details</label> </Link>
                                <div className="line-border" style={{
                                    border: "1px solid #2f87cc",
                                    bordertopleftradius: "51px",
                                    bordertoprightradius: "51px",
                                    margintop: "0px",
                                    width: "57%"
                                }}></div>
                            </div>
                            {
                                roleID != 5 && (
                                    <div className="col-lg-3">
                                        <Link href="/Requests/Myteamobasisrequest">  <label className="mainheader">My Team Obasis Details</label> </Link>
                                    </div>
                                )
                            }
                        </div>
                        <br />
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
                                <div className="col-lg-3 searchtxt">
                                    <br />
                                    <input
                                        type="search"
                                        placeholder="Search here.."
                                        className="form-control"
                                        onChange={e => setKeyword(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-lg-4">
                                <button onClick={togglePending} className={`toggleButton ${pending ? "focus" : ""}`}>Pending</button>
                                <button onClick={toggleApproved} className={`toggleButton ${approved ? "focus" : ""}`}>Approved</button>
                                <button onClick={toggleRejected} className={`toggleButton ${rejected ? "focus" : ""}`}>Rejected</button>
                            </div>

                            <div className="col-lg-6"></div>
                            <div className="col-lg-2">
                                <Link href="/Requests/Locatorrequest/new"><button className="submit-button">New Requests </button></Link>
                            </div>
                        </div>

                        <Modal isOpen={modal} style={customStyles}>
                            <div className='container'>
                                <div className='row card-header'>
                                    <div className='col-lg-8 mt-3'>
                                        <h4>Attachment</h4>
                                    </div>
                                    <div className='col-lg-3'></div>
                                    <div className='col-lg-1 mt-3 mb-3'>
                                        <button onClick={() => setModal(false)} className='btn-primary'><AiOutlineClose /></button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <img src={previewImg} width={800} height={400} />
                                    </div>
                                </div>
                            </div>
                        </Modal>

                        <div className="row">
                            <div className="col-lg-12">
                                {pending && (
                                    <>
                                        <h6 style={{ color: "#3247d5" }}>Showing {pendingDashboard.length} Results</h6>
                                        <table className='table' >
                                            <thead>
                                                <tr>
                                                    <th>Control Number</th>
                                                    <th>Date</th>
                                                    <th>Start Time</th>
                                                    <th>End Time</th>
                                                    <th>Task</th>
                                                    <th>Comments</th>
                                                    <th>Attachment</th>
                                                    <th>Status</th>
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
                                                            <td>{data.id}</td>
                                                            <td>{data.date}</td>
                                                            <td>{data.startTime}</td>
                                                            <td>{data.endTime}</td>
                                                            <td>{data.task}</td>
                                                            <td>{data.comments}</td>
                                                            <td><img onClick={ImagePreview.bind(this, data.attachment)} alt={"imagepreive"} src={data.attachment} width={50} height={50} /></td>
                                                            <td>{data.approveStatus}</td>
                                                            {/* <td>{
                                                <b>{data.statusID === 0 ? 'Manager Pending' :
                                                    data.statusID === 1 ? 'Manager approved' :
                                                        data.statusID === 2 ? 'Manager Rejected' : ' '}</b>
                                            }
                                            </td> */}
                                                            <td><button onClick={Delete.bind(this, data.id)} className="edit-btn">Cancel</button></td>
                                                        </tr>
                                                    )
                                                })
                                                }
                                            </tbody>
                                        </table>
                                    </>
                                )}

                                {approved && (
                                    <>
                                        <h6 style={{ color: "#3247d5" }}>Showing {approvedDashboard.length} Results</h6>
                                        <table className='table' >
                                            <thead>
                                                <tr>
                                                    <th>Control Number</th>
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
                                                            <td>{data.id}</td>
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
                                    </>
                                )}

                                {rejected && (
                                    <>
                                        <h6 style={{ color: "#3247d5" }}>Showing {rejecteddDashboard.length} Results</h6>
                                        <table className='table' >
                                            <thead>
                                                <tr>
                                                    <th>Control Number</th>
                                                    <th>Date</th>
                                                    <th>Start Time</th>
                                                    <th>End Time</th>
                                                    <th>Task</th>
                                                    <th>Comments</th>
                                                    <th>Status</th>
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
                                                            <td>{data.id}</td>
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
                                    </>
                                )}
                            </div>
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
        </Layout>
    )
}
export default Locatordashboard;