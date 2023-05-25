import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { apiService } from '@/services/api.service';
import ReactPaginate from "react-paginate";
import Swal from 'sweetalert2';

function FinalPayrollApproval() {

    const [uniquelist, setUniqueList] = useState([]);
    const [normalpayroll, setNormalPayroll] = useState(false)
    const [finalpayroll, setFinalPayroll] = useState(true)
    const [userID, setUserID] = useState()
    const toggleNewRequest = () => {
        setNormalPayroll(true)
        setFinalPayroll(false)

    }

    const toggleApproved = () => {
        setFinalPayroll(true)
        setNormalPayroll(false)

    }
    const [finalData, setFinalData] = useState([])
    useEffect(() => {
        const usrID = sessionStorage.getItem("userID");
        setUserID(usrID);
        getData();

    }, [])
    const getData = async () => {
        const res = await apiService.commonGetCall("Payroll/GetEmployeeFinalSalary")
        setFinalData(res.data);
        console.log("Pending", res.data)
    }

    const approveData = async () => {
        let Approve = 1

        const res = await apiService.commonPostCall(`Payroll/ApproveFinalPayroll?StaffID`, userID, Approve)
        Swal.fire({
            icon: 'success',
            text: 'Payroll has been Approved'

        })
    }
    const PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(finalData.length / PER_PAGE);


    return (


        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-4">
                    <br />
                    <span className="Heading">Excecuted Payroll Runs For Approval </span>

                </div>
                <div className="col-lg-1"></div>
                <div className="col-lg-4"></div>
                <div className="col-lg-3">
                    <br /><Link style={{ textDecoration: "none" }} href="/Payroll/RunFinalPayroll"><button className='uploadButton' style={{ width: "80%" }}>New Payroll</button></Link>
                </div>
            </div>
            <br />
            <div className="row">
                <br />

                <div className="col-lg-4">
                    <p onClick={toggleApproved} className='Heading' >Final Payroll</p>

                </div>

                <div className="col-lg-5">
                    {/* <p className="Heading">Excecuted Payroll Runs For Approval </p> */}
                </div>
                <div className="col-lg-3">
                    <p className="Heading">Total Payroll Runs: </p>
                </div>
            </div>
            <div className="row">
                <br />
                <div className='col-lg-4'><br />

                    {/* <button onClick={toggleNewRequest} className='toggleButton' >Normal Payroll</button> */}
                    {/* <p onClick={toggleApproved} className='Heading' >Final Payroll</p> */}

                </div><br />
            </div>
            <div className="row">
                <div className="col-lg-8 "></div>
            </div>
            <br />
            {/* <div className="container-fluid">
                {
                    normalpayroll && (
                        <div id="tab1">
                            <div className="row">
                                <div className="col-lg-12">
                                    <table className="table table-sm">
                                        <thead>
                                            <tr className="tr text-white">
                                                <th>Year</th>
                                                <th>Month</th>
                                                <th>Period</th>
                                                <th>Payroll Run Type</th>
                                                <th>Description</th>
                                                <th>Execution Date</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                            <tr></tr>
                                        </thead>
                                        <tbody>

                                            {pendingdata?.map((data) => {
                                                return (
                                                    <tr key={data.id}>
                                                        <td style={{ color: "#oc275a" }}>{data.endyear}</td>
                                                        <td style={{ color: "#oc275a" }}>{data.month}</td>
                                                        <td style={{ color: "#oc275a" }}>normal</td>
                                                        <td style={{ color: "#oc275a" }}>{data.startdate}</td>
                                                        <td style={{ color: "#oc275a" }}>aproved </td>
                                                        <td>Apr 14, 2023</td>
                                                        <td>

                                                            <p> Finalization Approved </p>

                                                        </td>
                                                        <td>

                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <br />
                        </div>

                    )
                }

            </div> */}
            {
                finalpayroll && (
                    <table className='table'>
                        <thead>
                            <tr className='text-white'>
                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Joining Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                finalData.slice(offset, offset + PER_PAGE).map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{data.employeID}</td>
                                            <td>{data.name}</td>
                                            <td>{data.department_name}</td>
                                            <td>{data.hiredDate}</td>
                                            <td>
                                                {
                                                    data.approve == 0 || data.approve == null && (
                                                        <p>Finalization Pending</p>
                                                    )
                                                }
                                                {
                                                    data.approve == 1 && (
                                                        <p>Finalization Approved</p>
                                                    )
                                                }
                                            </td>
                                            <td> {data.approve == 0 || data.approve == null && (
                                                <button className='submit-button ' onClick={approveData}>Approve</button>
                                            )}</td>


                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                )
            }

            <div className="text-center">
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
            <br />
        </div>






    )
}

export default FinalPayrollApproval