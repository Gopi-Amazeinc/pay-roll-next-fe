import { useState, useEffect } from "react"
import loan from "../../../../pages/Requests/Applyloans/applyloans.module.css"
import Link from "next/link"
import axios from "axios"
import Swal from "sweetalert2";
import { apiService } from "@/services/api.service";
import ReactPaginate from "react-paginate";
const ApplyloansDashboard = () => {
    const [newrequest, setNewRequest] = useState(false)
    const [approved, setApproved] = useState(false)
    const [Applyloans, setApplyLoans] = useState([]);
    const [newApproved, setnewApprovedData] = useState([]);
    const [keyword, setKeyword] = useState("");
    const toggleNewRequest = () => {
        setNewRequest(true)
        setApproved(false)
    }

    const toggleApproved = () => {
        setApproved(true)
        setNewRequest(false)
    }
    const getApplyLoans = async () => {
        let res = await apiService.commonGetCall("Payroll/GetEmployeeLoans"); //This Api is useed for Get the Dashborad data band Master
        setApplyLoans(res.data);
    };
    const PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(0);
    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(Applyloans.length / PER_PAGE);

    useEffect(() => {
        setNewRequest(true)
        getApplyLoans();
    }, [1]);

    const getnewApprovedData = async () => {
        let res = await apiService.commonGetCall("Payroll/GetEmployeeLoansByApproved"); //This Api is useed for Get the Dashborad data band Master
        setnewApprovedData(res.data);
    };

    useEffect(() => {
        getnewApprovedData();
    }, [1]);

    const getApplyLoansData = (data) => {
        sessionStorage.setItem("id", data.id);
        console.log(data.id);
    };

    const clearFormData = () => {
        sessionStorage.setItem("id", "");
    };

    async function DeleteApplyLoans(id) {
        debugger;
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((res) => {
                if (res.isConfirmed) {
                    apiService.commonGetCall(`Payroll/DeleteEmployeeLoans?id=${id}`);  // this is for deleting the data for dashborad using delete api call         
                }
                getApplyLoans();
            })
        } catch (error) {
            console.error(error);
            alert("Failed to delete data");
        }
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <h4 className="Heading">Apply Loans </h4><br />
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
                            <div className="col-lg-6"></div>
                            <div className="col-lg-2">
                                <Link href="/Requests/Applyloans/new">
                                    <button className="AddButton">Add New</button>
                                </Link>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-lg-12">
                                {
                                    newrequest && (
                                        <>
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
                                                            Applyloans.filter(data => {
                                                                if ((data.dateFormated.toString().includes(keyword.toString())) || (data.loanAmount.toString().includes(keyword.toString())) || (data.loanType.toLowerCase().includes(keyword.toLowerCase())) || (data.comments.toLowerCase().includes(keyword.toLowerCase())) || (data.status.toLowerCase().includes(keyword.toLowerCase())) || (data.status.toLowerCase().includes(keyword.toLowerCase()))) {
                                                                    return data;
                                                                }
                                                            }).slice(offset, offset + PER_PAGE).map((data) => {
                                                                return (
                                                                    <tr key={data.id}>
                                                                        <td>{data.dateFormated}</td>
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
                                                                            <button className="edit-btn" onClick={() => DeleteApplyLoans(data.id)} >Cancel</button>
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
                                                            newApproved.filter(data => {
                                                                if ((data.dateFormated.toString().includes(keyword.toLowerCase())) || (data.loanType.toLowerCase().includes(keyword)) || (data.comments.toLowerCase().includes(keyword.toLowerCase())) || (data.status.toLowerCase().includes(keyword.toLowerCase())) || (data.status.toLowerCase().includes(keyword.toLowerCase()))) {
                                                                    return data;
                                                                }
                                                            }).slice(offset, offset + PER_PAGE).map((data) => {
                                                                return (
                                                                    <tr key={data.id}>
                                                                        <td>{data.modifiedDate}</td>
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
            </div >
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
        </>

    )
}
export default ApplyloansDashboard;