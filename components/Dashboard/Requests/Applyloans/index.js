import { useState, useEffect } from "react"
import loan from "../../../../pages/Requests/Applyloans/applyloans.module.css"
import Link from "next/link"
import axios from "axios"
import Swal from "sweetalert2";
import { apiService } from "@/services/api.service";
const ApplyloansDashboard = () => {
    const [newrequest, setNewRequest] = useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [approved, setApproved] = useState(false)
    const [Applyloans, setApplyLoans] = useState([]);
    const [newApproved, setnewApprovedData] = useState([]);
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

    useEffect(() => {
        getApplyLoans();
    }, [1]);

    const getnewApprovedData = async () => {
        let res = await apiService.commonGetCall("Payroll/GetEmployeeLoans"); //This Api is useed for Get the Dashborad data band Master
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
                if (res) {
                    apiService.commonGetCall(`Payroll/DeleteEmployeeLoans?id=${id}`);  // this is for deleting the data for dashborad using delete api call         
                }
                getApplyLoans();
            });
            // const res = await axios.get(
            //   hostURL + `Master/DeleteBrandMaster?id=${id}`
            // );
            // console.log(res.data);
            // alert("Data Deleted Sucessfully");
            // getBrandMaster();
        } catch (error) {
            console.error(error);
            alert("Failed to delete data");
        }
    }
    return (
        <>
            <div className="container">
                <h4 className="Heading">Apply Loans </h4>
                <div className='card p-4 border-0 shadow-lg mt-4'>
                    <div className="row">
                        <div className="col-lg-1">
                            <label>Filter By</label>
                        </div>
                        <div className="col-lg-4">
                            <label>Search</label>
                            <input type="text" className="form-control" placeholder="Search..." />
                        </div>
                    </div>
                </div><div className="row">
                    <div className="col-lg-12 dashbutton bttn">
                        <div className='col-lg-4 mx-2'><br />
                            <div className='btn-group'>
                                <button onClick={toggleNewRequest} className='toggleButton'>New Request</button>
                                <button onClick={toggleApproved} className='toggleButton'>Approved</button>
                            </div>
                        </div><br />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-2 text-primary fs-6 fw-bold'>
                        <h6>Showing Results</h6>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-lg-9"></div>
                    <div className="col-lg-3">
                        <Link href="/Requests/Applyloans/new">
                            <button className={loan.addButton}>Add New</button>
                        </Link>
                    </div>
                </div>

                {
                    newrequest && (
                        <table className='table table-hover'>
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
                                    Applyloans.map((data) => {
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
                                                <td>{data.period}</td>
                                                <td>{data.comments}</td>
                                                <td>{data.managerComments}</td>
                                                <td>{data.status}</td>

                                                <td>
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() => DeleteApplyLoans(data.id)}
                                                    >
                                                        Delete
                                                    </button>
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
                    approved && (
                        <table className='table table-hover'>
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
                                    newApproved.map((data) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>{data.modifiedDate}</td>
                                                <td>{data.approvedDate}</td>
                                                <td>{data.loanstartdate}</td>
                                                <td>{data.loanenddate}</td>
                                                <td>{data.loanType}</td>
                                                <td>{data.loanAmount}</td>
                                                <td>{data.comments}</td>
                                                <td>{data.managerComments}</td>
                                                <td>{data.hRComments}</td>
                                                <td>{data.financeComments}</td>
                                                <td>{data.payrollComments}</td>
                                                <td>{data.status}</td>
                                                {/* <td>{data.comments}</td>
                                            <td>{data.status}</td>
                                            <td>
                                                <button onClick={Delete.bind(this, data.id)} className='edit-btn'>Cancel</button>
                                            </td> */}
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    )
                }
            </div>
        </>

    )
}
export default ApplyloansDashboard;