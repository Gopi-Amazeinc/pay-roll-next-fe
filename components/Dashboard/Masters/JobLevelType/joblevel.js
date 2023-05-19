import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../../../layout/layout'
import { apiService } from "@/services/api.service";
import Swal from 'sweetalert2';
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import ReactPaginate from "react-paginate";

function LevelTypeDash() {

    let [dashboard, setDashboardData] = useState([])
    const getLevelType = async () => {
        const res = await apiService.commonGetCall("Master/GetLevelType") //getting job level type data and displayed in a table [Shashank]
        console.log(res.data)
        setDashboardData(res.data)
    }

    const deleteLevelType = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                apiService.commonGetCall("Master/DeleteLevelType?ID=" + id)// deleting data based on ID [Shashank]
                Swal.fire({
                    icon: "success",
                    titleText: "Deleted Successfully"
                })
            }
            getLevelType();
        })

    }

    useEffect(() => {
        getLevelType();
    }, [])

    const PER_PAGE = 2;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(dashboard.length / PER_PAGE);
    const [keyword, setKeyword] = useState("");

    return (
        <Layout>
            <div className="container-fluid">
                <p className="Heading">Job Level Type</p>
                <div className="card p-3 rounded-3 border-0">
                    <div className="row">
                        <div className="col-lg-1">
                            <p> <BiFilterAlt /> Filter By</p>
                        </div>
                        <div className="col-lg-3">
                            <input
                                type="text"
                                placeholder="Search"
                                className="form-control"
                                onChange={e => setKeyword(e.target.value)}
                            ></input>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <p className="col-lg-2 result-heading">Showing {dashboard.length} Results</p>
                    <div className="col-lg-8"></div>
                    <div className="col-lg-2">
                        <Link href="/Masters/JobLevel/new">
                            <button className=" AddButton">
                                <AiOutlinePlus />    Add New
                            </button>
                        </Link>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className='col-lg-12'>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Leave Type</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(dashboard) &&
                                    dashboard.length > 0 && (
                                        <>
                                            {dashboard
                                                .filter(data => {
                                                    if ((data.short.toLowerCase().includes(keyword.toLowerCase())) || (data.description.toLowerCase().includes(keyword))) {
                                                        return data;
                                                    }
                                                })
                                                .slice(offset, offset + PER_PAGE)
                                                .map((data, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{data.short}</td>
                                                            <td>{data.description}</td>
                                                            <td>
                                                                <Link href={`/Masters/JobLevel/Edit/${data.id}`}>
                                                                    <button
                                                                        className="edit-btn"
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                </Link>
                                                                &nbsp;&nbsp;
                                                                <button
                                                                    onClick={deleteLevelType.bind(this, data.id)}
                                                                    className="edit-btn"
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
                </div>

                <div className="row">
                    {/* <div className="col-lg-3"></div> */}
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
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
                    <div className="col-lg-4"></div>
                </div>
            </div>
        </Layout>
    )
}

export default LevelTypeDash