import { useState, useEffect } from "react"
import loan from "../../../../pages/Requests/Applyloans/applyloans.module.css"
import Link from "next/link"
import axios from "axios"
import Swal from "sweetalert2";
import { apiService } from "@/services/api.service";
import ReactPaginate from "react-paginate";
const Allloans = () => {
    const [newrequest, setNewRequest] = useState(false)
    const [approved, setApproved] = useState(false)
    const [Applyloans, setApplyLoans] = useState([]);
    const [newApproved, setnewApprovedData] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [roleID, setRoleID] = useState();
    const [userID, setUserID] = useState();
    const toggleNewRequest = () => {
        setNewRequest(true)
        setApproved(false)
    }

    const toggleApproved = () => {
        setApproved(true)
        setNewRequest(false)
    }
    const getApplyLoans = async () => {
        let res = await apiService.commonGetCall("Payroll/GetEmployeeLoansByNewRequest"); //This Api is useed for Get the Dashborad data band Master
        setApplyLoans(res.data);
    };
    const getnewApprovedData = async () => {
        let res = await apiService.commonGetCall("Payroll/GetEmployeeLoansByApproved"); //This Api is useed for Get the Dashborad data band Master
        setnewApprovedData(res.data);
    };
    const openModal = () => {
        ModalIsOpen(true)
    }
    const PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(0);
    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(Applyloans.length / PER_PAGE);
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
        getApplyLoans();
    }
    let id;
    const reject = () => {
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
                apiService.commonPostCall(`Payroll/UpdateOtFromManager`, data);
                Swal.fire({
                    icon: "success",
                    titleText: "Rejected Successfully"
                })
            }
        })
        getApplyLoans();
    }
    useEffect(() => {
        const usrID = sessionStorage.getItem("userID");
        setUserID(usrID);
        const userRoleID = sessionStorage.getItem("roleID");
        setRoleID(userRoleID);
        setNewRequest(true)
        if (userID) {
            getApplyLoans();
            getnewApprovedData();
        }
        return;
    }, [userID]);
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-3">
                            {
                                roleID == 2 && (
                                    <Link href="/Requests/Applyloans">
                                        <label className="mainheader"> My Loans </label>
                                    </Link>
                                )
                            }
                        </div>
                        <div className="col-lg-3">
                            <label className="mainheader">All Staff Loans </label>
                        </div>
                    </div><br />
                    <div className='card p-4 border-0'>
                        <div className="row">
                            <div className="col-lg-1">
                                <label style={{ fontWeight: "bold" }}>Filter By</label>
                            </div>
                            <div className="col-lg-4 searchtxt">
                                <label style={{ fontWeight: "bold" }}>Search</label>
                                <input type="search" className="form-control" placeholder="Search here.." onChange={e => setKeyword(e.target.value)} />
                            </div>
                        </div>
                    </div><br /><br />
                    <div className="row">
                        <div className='col-lg-4'>
                            <div className='btn-group'>
                                <button onClick={toggleNewRequest} className={`toggleButton ${newrequest ? "focus" : ""}`}>New Request</button>
                                <button onClick={toggleApproved} className={`toggleButton ${approved ? "focus" : ""}`}>Approved</button>
                            </div>
                        </div>
                    </div><br />
                    <div className="row">
                        <div className="col-lg-12">
                            {
                                newrequest && (<>
                                    <h6 style={{ color: "#3247d5" }}>Showing {Applyloans.length} Results</h6>
                                    <div className="table-responsive">
                                        <table className='table table-hover' style={{ whiteSpace: "nowrap" }}>
                                            <thead className='bg-info text-white'>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Loan Approved Date</th>
                                                    <th>Loan Start Date</th>
                                                    <th>Loan End Date</th>
                                                    <th>Loan Type</th>
                                                    <th>Loan Amount</th>
                                                    <th>Tenure</th>
                                                    <th>Comments</th>
                                                    <th>HR Comments</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    Applyloans.filter(post => {
                                                        return Object.values(post).some(value => value !== null && value.toString().toLowerCase().includes(keyword.toLowerCase()));

                                                    }).slice(offset, offset + PER_PAGE).map((data) => {
                                                        return (
                                                            <tr key={data.id}>
                                                                <td>{data.filterdate}</td>
                                                                <td>
                                                                    {
                                                                        data.approvedDate && (
                                                                            data.approvedDate
                                                                        )
                                                                    }
                                                                    {
                                                                        !data.approvedDate && (
                                                                            "Yet to approve"
                                                                        )
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        data.loanstartdate && (
                                                                            data.loanstartdate
                                                                        )
                                                                    }
                                                                    {
                                                                        !data.loanstartdate && (
                                                                            "Yet to approve"
                                                                        )
                                                                    }

                                                                </td>
                                                                <td>{
                                                                    data.loanenddate && (
                                                                        data.loanenddate
                                                                    )}
                                                                    {
                                                                        !data.loanenddate && (
                                                                            "Yet to approve"
                                                                        )
                                                                    }
                                                                </td>

                                                                <td>{data.loanType}</td>
                                                                <td>{data.loanAmount}</td>
                                                                <td>{data.period}</td>
                                                                <td>{data.comments}</td>
                                                                <td>{data.managerComments}</td>
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
                                    </div>
                                </>
                                )
                            }
                            {
                                approved && (
                                    <>
                                        <h6 style={{ color: "#3247d5" }}>Showing {newApproved.length} Results</h6>
                                        <div className="table-responsive">
                                            <table className='table table-hover' style={{ whiteSpace: "nowrap" }}>
                                                <thead className='bg-info text-white'>
                                                    <tr>
                                                        <th>Date</th>
                                                        <th>Loan Approved Date</th>
                                                        <th>Loan Start Date</th>
                                                        <th>Loan End Date</th>
                                                        <th>Loan Type</th>
                                                        <th>Loan Amount</th>
                                                        <th>Comments</th>
                                                        <th>Manager Comments</th>
                                                        <th>HR Comments</th>
                                                        <th>Finance Comments</th>
                                                        <th>Payroll Comments</th>
                                                        <th>Status</th>

                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {
                                                        newApproved.filter(post => {
                                                            return Object.values(post).some(value => value !== null && value.toString().toLowerCase().includes(keyword.toLowerCase()));

                                                        }).slice(offset, offset + PER_PAGE).map((data) => {
                                                            return (
                                                                <tr key={data.id}>
                                                                    <td>{data.filterdate}</td>
                                                                    <td>
                                                                        {
                                                                            data.approvedDate && (
                                                                                data.approvedDate
                                                                            )
                                                                        }
                                                                        {
                                                                            !data.approvedDate && (
                                                                                "Yet to approve"
                                                                            )
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            data.loanstartdate && (
                                                                                data.loanstartdate
                                                                            )
                                                                        }
                                                                        {
                                                                            !data.loanstartdate && (
                                                                                "Yet to approve"
                                                                            )
                                                                        }

                                                                    </td>
                                                                    <td>{
                                                                        data.loanenddate && (
                                                                            data.loanenddate
                                                                        )}
                                                                        {
                                                                            !data.loanenddate && (
                                                                                "Yet to approve"
                                                                            )
                                                                        }
                                                                    </td>
                                                                    <td>{data.loanType}</td>
                                                                    <td>{data.loanAmount}</td>
                                                                    <td>{data.comments}</td>
                                                                    <td>{data.managerComments}</td>
                                                                    <td>{data.hrComments}</td>
                                                                    <td>{data.financeComments}</td>
                                                                    <td>{data.payrollComments}</td>
                                                                    <td>{data.status}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Allloans