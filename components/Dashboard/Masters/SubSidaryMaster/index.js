import React from 'react'
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import Link from 'next/link'
import { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import { apiService } from "@/services/api.service";
import Swal from 'sweetalert2'

export default function SubsidaryMasterDash() {

    const [SubsidaryMaster, setSubsidaryMaster] = useState([]);
    const [keyword, setKeyword] = useState("");
    const PER_PAGE = 2;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(SubsidaryMaster.length / PER_PAGE);

    const getSubsidaryMaster = async () => {
        let res = await apiService.commonGetCall("Master/GetSubsidaryMaster");
        setSubsidaryMaster(res.data);
    }

    useEffect(() => {
        getSubsidaryMaster()
    }, [1])


    const handleDelete = async (id) => {
        try {
            let res = await apiService.commonGetCall(`Master/DeleteSubsidaryMaster?id=${id}`);
            console.log(res.data);
            Swal.fire('Data deleted successfully')
            getSubsidaryMaster();
        } catch (error) {
            console.error(error);
            Swal.fire('failed to  delete data')
        }
    };


    return (
        <div className="container-fluid">
            <p className="Heading">Subsidary Master</p>
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
                            onChange={get => { setKeyword(get.target.value) }}
                        ></input>
                    </div>
                </div>
            </div>
            <br />
            <div className="row">
                <p className="col-lg-2 result-heading">Showing {SubsidaryMaster.length} Results</p>
                <div className="col-lg-8"></div>
                <div className="col-lg-2">
                    <Link href="/Masters/SubSidaryMaster/new">
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
                                <th>Short Name</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(SubsidaryMaster) &&
                                SubsidaryMaster.length > 0 && (
                                    <>
                                        {SubsidaryMaster
                                            .filter(data => {
                                                if ((data.name.toLowerCase().includes(keyword.toLowerCase())) || (data.description.toLowerCase().includes(keyword))) {
                                                    return data;
                                                }
                                            })
                                            .slice(offset, offset + PER_PAGE)
                                            .map((data, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{data.name}</td>
                                                        <td>{data.description}</td>
                                                        <td>
                                                            <Link href={`/Masters/SubSidaryMaster/Edit/${data.id}`}>
                                                                <button
                                                                    className="edit-btn"
                                                                >
                                                                    Edit
                                                                </button>
                                                            </Link>
                                                            &nbsp;&nbsp;
                                                            <button
                                                                onClick={() => handleDelete(data.id)}
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
    )
}
