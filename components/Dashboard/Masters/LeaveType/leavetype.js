import React from "react";
import Link from "next/link";
import Layout from '../../../layout/layout'
import { useState, useEffect } from 'react'
import axios from "axios";
import Swal from "sweetalert2";
import { AiOutlinePlus } from "react-icons/ai";
// import ReactPaginate from "react-paginate";
import { BiFilterAlt } from "react-icons/bi";
function LeaveTypeDashboard() {
    let hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
    const [leaveTypeData, SetleaveTypeData] = useState([]);


    useEffect(() => {
        getData();
    }, [1]);

    const getData = async () => {
        let res = await axios.get(hostURL + "Master/GetLeaveType");
        SetleaveTypeData(res.data);
    };

    const handelDelete = (id) => {
        Swal.fire({
            title: "Are you sure want to delete ?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3247d5",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.get(hostURL + "Master/DeleteLeaveTypeMaster?ID=" + id);
                Swal.fire("SubSection Deleted successfully.");
                getData();
            }
        });
    };

    const [keyword, setKeyword] = useState("");

    // const PER_PAGE = 2;
    // const [currentPage, setCurrentPage] = useState(0);
    // function handlePageClick({ selected: selectedPage }) {
    //     setCurrentPage(selectedPage)
    // }
    // const offset = currentPage * PER_PAGE;
    // const pageCount = Math.ceil(leaveTypeData.length / PER_PAGE);


    return (
        <Layout>
            <div className="container">
                <p className="Heading"> Leave Type </p>
                <div className="card p-3 rounded-3 shadow border-0">
                    <div className="row">
                        <div className="col-1">
                            <p> <BiFilterAlt /> Filter By</p>
                        </div>
                        <div className="col-5">
                            <input
                                type="text"
                                placeholder="Search"
                                className="form-control"
                                onChange={e => setKeyword(e.target.value)}
                            ></input>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <p className="col-2 result-heading">Showing {leaveTypeData.length} Results</p>
                    <div className="col-8"></div>
                    <div className="col-2">
                        <Link href="/Masters/LeaveType/new">
                            <button className=" AddButton">
                                <AiOutlinePlus />    Add New
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="mt-3">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Leave Type</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(leaveTypeData) &&
                                leaveTypeData.length > 0 && (
                                    <>
                                        {leaveTypeData
                                            .filter(data => {
                                                if ((data.short.toLowerCase().includes(keyword.toLowerCase())) || (data.description.toLowerCase().includes(keyword))) {
                                                    return data;
                                                }
                                            })
                                            // .slice(offset, offset + PER_PAGE)
                                            .map((data, index) => {
                                                return (
                                                    <tr classNameName="text-dark" key={index}>
                                                        <td>{data.short}</td>
                                                        <td>{data.description}</td>
                                                        <td>
                                                            <Link href={`/Masters/LeaveType/Edit/${data.id}`}>
                                                                <button
                                                                    className="edit-btn"
                                                                >
                                                                    Edit
                                                                </button>
                                                            </Link>
                                                            &nbsp; &nbsp;
                                                            <button
                                                                className="edit-btn"
                                                                onClick={() => handelDelete(data.id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </>
                                )}
                        </tbody>
                    </table>
                </div>

                {/* <div className="mb-4 mt-4 text-center">
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
                </div> */}
            </div>
        </Layout>
    );
}

export default LeaveTypeDashboard;
